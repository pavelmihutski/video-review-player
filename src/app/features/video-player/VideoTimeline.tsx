import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import type { Comment } from '@/data/comments/types';
import { useHover } from '@/hooks';
import { formatTime } from '@/utils';

import { calculateSeekTime, calculateTimelinePosition } from './utils/timelinePosition';
import { getProgress } from './utils';

type VideoTimelineProps = {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
  comments?: Comment[];
};

export const VideoTimeline = ({ currentTime, duration, onSeek, comments = [] }: VideoTimelineProps) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const isHovering = useHover<HTMLDivElement>(timelineRef);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [hoverPosition, setHoverPosition] = useState<number>(0);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!timelineRef.current || duration === 0) {
      return;
    }

    const time = calculateSeekTime(e.clientX, timelineRef.current, duration);

    onSeek(time);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!timelineRef.current || duration === 0) {
      return;
    }

    const { time, percentage } = calculateTimelinePosition(e.clientX, timelineRef.current, duration);

    setHoverTime(time);
    setHoverPosition(percentage * 100);
  };

  useEffect(() => {
    if (!isHovering) {
      setHoverTime(null);
    }
  }, [isHovering]);

  const progress = getProgress(currentTime, duration);

  const handleCommentMarkerClick = (e: React.MouseEvent, commentTime: number) => {
    e.stopPropagation();
    onSeek(commentTime);
  };

  return (
    <Container ref={timelineRef} onClick={handleClick} onMouseMove={handleMouseMove}>
      <ProgressBar style={{ width: `${progress}%` }} />

      {duration > 0 &&
        comments.map(comment => {
          const position = (comment.time / duration) * 100;
          return (
            <CommentMarker
              key={comment.id}
              style={{ left: `${position}%` }}
              $resolved={comment.resolved}
              onClick={e => handleCommentMarkerClick(e, comment.time)}
              title={`${comment.author}: ${comment.text}`}
            />
          );
        })}

      <Scrubber style={{ left: `${progress}%` }} />

      {hoverTime !== null && <TimeTooltip style={{ left: `${hoverPosition}%` }}>{formatTime(hoverTime)}</TimeTooltip>}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  height: 6px;
  background: ${({ theme }) => `${theme.colors.text.primary}33`};
  cursor: pointer;
  margin: 0 16px 8px;
  transition: height 0.2s;

  &:hover {
    height: 8px;
  }
`;

const ProgressBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: ${({ theme }) => theme.colors.primary};
  transition: width 0.1s linear;
  pointer-events: none;
`;

const Scrubber = styled.div`
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 14px;
  height: 14px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 2px 4px ${({ theme }) => `${theme.colors.background.black}4d`};
  pointer-events: none;
  transition: transform 0.2s;

  ${Container}:hover & {
    transform: translate(-50%, -50%) scale(1.2);
  }
`;

const CommentMarker = styled.div<{ $resolved: boolean }>`
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  background: ${props => (props.$resolved ? props.theme.colors.comment.resolved : props.theme.colors.text.tertiary)};
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
  z-index: 1;
  box-shadow: 0 1px 3px ${({ theme }) => `${theme.colors.background.black}4d`};

  &:hover {
    transform: translate(-50%, -50%) scale(1.4);
    box-shadow: 0 2px 6px ${({ theme }) => `${theme.colors.background.black}66`};
  }

  ${Container}:hover & {
    width: 12px;
    height: 12px;
  }
`;

const TimeTooltip = styled.div`
  position: absolute;
  bottom: 100%;
  transform: translateX(-50%);
  background: ${({ theme }) => `${theme.colors.background.black}e6`};
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-family: 'Monaco', 'Courier New', monospace;
  white-space: nowrap;
  margin-bottom: 8px;
  pointer-events: none;
  box-shadow: 0 2px 8px ${({ theme }) => `${theme.colors.background.black}4d`};
`;
