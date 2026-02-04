import { MdCheck } from 'react-icons/md';
import { toast } from 'sonner';
import styled from 'styled-components';

import { type Comment, useUpdateComment } from '@/data/comments';
import { usePlayerActions } from '@/data/player';
import { media } from '@/theme';
import { formatTime } from '@/utils';

import { getRelativeTime } from './utils';

type CommentItemProps = {
  comment: Comment;
  isActive: boolean;
  ref?: ((el: HTMLDivElement | null) => void) | React.RefObject<HTMLDivElement>;
};

export function CommentItem({ comment, isActive, ref }: CommentItemProps) {
  const { update: updateComment } = useUpdateComment();
  const { seek, pause } = usePlayerActions();

  const handleSeekToTime = () => {
    pause();
    seek(comment.time);
  };

  const handleToggleResolved = async () => {
    try {
      await updateComment({
        id: comment.id,
        resolved: !comment.resolved,
      });

      toast.success(comment.resolved ? 'Comment reopened' : 'Comment marked as resolved');
    } catch {
      toast.error('Failed to update comment. Please try again.');
    }
  };

  return (
    <Container ref={ref} $isActive={isActive} $resolved={comment.resolved}>
      <Header>
        <Avatar>{comment.author[0].toUpperCase()}</Avatar>
        <HeaderRight>
          <AuthorName>{comment.author}</AuthorName>
          <Timestamp>{getRelativeTime(comment.timestamp ?? comment.time)}</Timestamp>
        </HeaderRight>
      </Header>
      <VideoTimestamp onClick={handleSeekToTime} title="Click to jump to this time">
        {formatTime(comment.time)}
      </VideoTimestamp>
      <Content $resolved={comment.resolved}>{comment.text}</Content>
      <ResolvedButton onClick={handleToggleResolved} $resolved={comment.resolved}>
        {comment.resolved ? (
          <>
            <CheckIcon>
              <MdCheck />
            </CheckIcon>
            Resolved
          </>
        ) : (
          'Mark as resolved'
        )}
      </ResolvedButton>
    </Container>
  );
}

const Container = styled.div<{ $isActive: boolean; $resolved: boolean }>`
  background: ${props => (props.$isActive ? props.theme.colors.primaryDark : props.theme.colors.background.tertiary)};
  border-radius: 8px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: all 0.2s ease;

  border: 2px solid;
  ${props => {
    if (props.$isActive) {
      return `
        border-color: ${props.theme.colors.primary};
        border-style: solid;
      `;
    } else {
      return `
        border-color: ${props.theme.colors.border.accent};
        border-style: dashed;
      `;
    }
  }}

  ${media.mobile} {
    padding: 10px;
    gap: 6px;
  }
`;

const Header = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
  margin-bottom: 8px;

  ${media.mobile} {
    gap: 8px;
    margin-bottom: 6px;
  }
`;

const Avatar = styled.div`
  width: 36px;
  height: 36px;
  min-width: 36px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;

  ${media.mobile} {
    width: 32px;
    height: 32px;
    min-width: 32px;
    font-size: 14px;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  gap: 12px;
`;

const AuthorName = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};

  ${media.mobile} {
    font-size: 14px;
  }
`;

const Timestamp = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text.tertiary};
  white-space: nowrap;

  ${media.mobile} {
    font-size: 12px;
  }
`;

const VideoTimestamp = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.comment.timestamp};
  font-weight: 500;
  font-family: 'Monaco', 'Courier New', monospace;
  cursor: pointer;
  margin-bottom: 8px;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Content = styled.div<{ $resolved: boolean }>`
  font-size: 14px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 8px;
  text-decoration: ${props => (props.$resolved ? 'line-through' : 'none')};
  opacity: ${props => (props.$resolved ? 0.7 : 1)};

  ${media.mobile} {
    font-size: 13px;
    margin-bottom: 6px;
  }
`;

const ResolvedButton = styled.button<{ $resolved: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: ${props => (props.$resolved ? props.theme.colors.comment.resolved : props.theme.colors.text.tertiary)};
  font-weight: 500;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: color 0.2s;

  &:hover {
    color: ${props => (props.$resolved ? props.theme.colors.comment.resolved : props.theme.colors.text.primary)};
  }
`;

const CheckIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  background: ${({ theme }) => theme.colors.comment.resolved};
  color: ${({ theme }) => theme.colors.text.primary};
  border-radius: 50%;
  font-size: 14px;
  line-height: 1;
`;
