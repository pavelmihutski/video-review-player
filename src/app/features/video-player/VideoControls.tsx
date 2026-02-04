import { MdFastForward, MdFastRewind, MdForward5, MdPause, MdPlayArrow, MdReplay5 } from 'react-icons/md';
import styled from 'styled-components';

import { useComments } from '@/data/comments';
import {
  useCurrentTime,
  useDuration,
  useFps,
  useIsBuffering,
  useIsPlaying,
  usePlayerActions,
  useVideoElement,
} from '@/data/player';
import { formatTime } from '@/utils';

import { VideoTimeline } from './VideoTimeline';

export const VideoControls = () => {
  const isPlaying = useIsPlaying();
  const isBuffering = useIsBuffering();
  const currentTime = useCurrentTime();
  const duration = useDuration();
  const fps = useFps();
  const videoElement = useVideoElement();

  const { data: comments } = useComments();

  const { togglePlay, seek, jump, stepFrame } = usePlayerActions();

  const handleOnSeek = (time: number) => {
    seek(time);
  };
  const canStep = !isPlaying && !!videoElement;

  return (
    <Container>
      <VideoTimeline currentTime={currentTime} duration={duration} onSeek={handleOnSeek} comments={comments} />

      <ControlsBar>
        <LeftControls>
          <PlayButton onClick={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'} disabled={isBuffering}>
            {isPlaying ? <MdPause size={20} /> : <MdPlayArrow size={20} />}
          </PlayButton>

          <ControlButton onClick={() => jump(-5)} aria-label="Jump back 5 seconds" title="-5s">
            <MdReplay5 size={20} />
          </ControlButton>

          <ControlButton
            onClick={() => stepFrame(-1)}
            disabled={!canStep}
            aria-label="Previous frame"
            title={`-1 frame (1/${fps}s)`}
          >
            <MdFastRewind size={20} />
          </ControlButton>

          <ControlButton
            onClick={() => stepFrame(1)}
            disabled={!canStep}
            aria-label="Next frame"
            title={`+1 frame (1/${fps}s)`}
          >
            <MdFastForward size={20} />
          </ControlButton>

          <ControlButton onClick={() => jump(5)} aria-label="Jump forward 5 seconds" title="+5s">
            <MdForward5 size={20} />
          </ControlButton>
        </LeftControls>

        <RightControls>
          <Timecode>
            <CurrentTime>{formatTime(currentTime)}</CurrentTime>
            <Separator>/</Separator>
            <Duration>{formatTime(duration)}</Duration>
          </Timecode>
        </RightControls>
      </ControlsBar>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => `${theme.colors.background.black}e6`};
  border-top: 1px solid ${({ theme }) => theme.colors.border.primary};
  min-height: 80px;
`;

const ControlsBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  gap: 16px;
  min-height: 56px;
`;

const LeftControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const RightControls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ControlButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s;
  min-width: 32px;
  height: 32px;

  &:hover:not(:disabled) {
    background: ${({ theme }) => `${theme.colors.text.primary}1a`};
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const PlayButton = styled(ControlButton)`
  width: 40px;
  height: 40px;
  background: ${({ theme }) => theme.colors.primary};
  font-size: 16px;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primaryHover};
  }
`;

const Timecode = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 14px;
  color: white;
  user-select: none;
`;

const CurrentTime = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
`;

const Separator = styled.span`
  color: ${({ theme }) => theme.colors.text.quaternary};
`;

const Duration = styled.span`
  color: ${({ theme }) => theme.colors.text.tertiary};
`;
