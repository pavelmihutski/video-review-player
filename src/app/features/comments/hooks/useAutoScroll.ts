import { useEffect, useRef } from 'react';

import type { Comment } from '@/data/comments/types';

type UseAutoScrollProps = {
  comments: Comment[] | undefined;
  currentVideoTime: number;
  enabled?: boolean;
};

export const useAutoScroll = ({ comments, currentVideoTime, enabled = true }: UseAutoScrollProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const commentRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const lastActiveCommentId = useRef<string | null>(null);

  const registerComment = (id: string, element: HTMLDivElement | null) => {
    if (element) {
      commentRefs.current.set(id, element);
      return;
    }

    commentRefs.current.delete(id);
  };

  useEffect(() => {
    if (!enabled || !comments || comments.length === 0 || !scrollContainerRef.current) {
      return;
    }

    const activeComment = comments.find(comment => Math.abs(comment.time - currentVideoTime) < 1); // within 1 second

    if (activeComment && activeComment.id !== lastActiveCommentId.current) {
      const commentElement = commentRefs.current.get(activeComment.id);

      if (commentElement && scrollContainerRef.current) {
        commentElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });

        lastActiveCommentId.current = activeComment.id;
      }

      return;
    }

    if (!activeComment) {
      lastActiveCommentId.current = null;

      return;
    }
  }, [comments, currentVideoTime, enabled]);

  return {
    scrollContainerRef,
    registerComment,
  };
};
