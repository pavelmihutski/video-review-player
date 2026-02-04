import { useEffect } from 'react';
import { toast } from 'sonner';
import styled from 'styled-components';

import { useComments } from '@/data/comments';
import { useThrottledCurrentTime } from '@/data/player';
import { media } from '@/theme';

import { useAutoScroll } from './hooks/useAutoScroll';
import { CommentInput } from './CommentInput';
import { CommentItem } from './CommentItem';
import { CommentsPanelHeader } from './CommentsPanelHeader';
import { isCommentActive } from './utils';

export function CommentsPanel() {
  const { data: comments, isLoading, error } = useComments();

  const currentVideoTime = useThrottledCurrentTime(2); // update every 2 seconds

  const { scrollContainerRef, registerComment } = useAutoScroll({
    comments,
    currentVideoTime,
    enabled: true,
  });

  useEffect(() => {
    if (error) {
      toast.error('Failed to load comments. Please try again.');
    }
  }, [error]);

  if (isLoading) {
    return (
      <Container>
        <LoadingText>Loading comments...</LoadingText>
      </Container>
    );
  }

  if (comments.length === 0) {
    return (
      <Container>
        <LoadingText>No comments yet</LoadingText>
      </Container>
    );
  }

  return (
    <Container>
      <CommentsPanelHeader count={comments.length} />
      <CommentsList ref={scrollContainerRef}>
        {comments?.map(comment => (
          <CommentItem
            key={comment.id}
            comment={comment}
            isActive={isCommentActive({ commentTime: comment.time, currentVideoTime })}
            ref={el => registerComment(comment.id, el)}
          />
        ))}
      </CommentsList>
      <CommentInput />
    </Container>
  );
}

const Container = styled.div`
  width: 360px;
  background: ${({ theme }) => theme.colors.background.secondary};
  color: ${({ theme }) => theme.colors.text.primary};
  display: flex;
  flex-direction: column;
  border-left: 1px solid ${({ theme }) => theme.colors.border.primary};
  height: 100%;
  overflow: hidden;

  ${media.tablet} {
    width: 100%;
    border-left: none;
    border-top: 1px solid ${({ theme }) => theme.colors.border.primary};
    flex: 1;
    min-height: 0;
  }
`;

const LoadingText = styled.div`
  padding: 24px;
  color: ${({ theme }) => theme.colors.text.tertiary};
  text-align: center;
`;

const CommentsList = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 8px;
  padding-bottom: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-height: 0;
`;
