import { useRef } from 'react';
import styled from 'styled-components';

import { useIsBuffering, usePlayerActions } from '@/data/player';
import { useKeyPress } from '@/hooks';

import { usePlayer, usePlayerHandlers } from './hooks';
import { VideoControls } from './VideoControls';

type VideoPlayerProps = {
  src: string;
};

export const VideoPlayer = ({ src }: VideoPlayerProps) => {
  const { togglePlay, jump } = usePlayerActions();

  useKeyPress(' ', togglePlay);
  useKeyPress('ArrowLeft', () => jump(-5));
  useKeyPress('ArrowRight', () => jump(5));

  const videoRef = useRef<HTMLVideoElement>(null);

  usePlayer({ videoRef, src });

  usePlayerHandlers(videoRef);

  const isBuffering = useIsBuffering();

  return (
    <Container>
      <VideoWrapper>
        <Video ref={videoRef} />
        {isBuffering && <LoadingOverlay>Loading...</LoadingOverlay>}
      </VideoWrapper>
      <VideoControls />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.background.black};
  position: relative;
  flex: 1;
  overflow: hidden;
  height: 100%;
`;

const VideoWrapper = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 0;
  max-height: calc(100% - 100px);
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: contain;
  max-height: 100%;
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${({ theme }) => `${theme.colors.background.black}cc`};
  color: white;
  padding: 16px 24px;
  border-radius: 8px;
  font-size: 14px;
`;
