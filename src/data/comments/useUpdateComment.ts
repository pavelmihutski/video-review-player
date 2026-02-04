import { useMutation } from '@tanstack/react-query';

import { updateComment as updateCommentRequest } from '@/api';

import { updateComment as updateCommentMutation } from './mutations';
import { Comment } from './types';

type UpdateComment = Partial<Comment> & { id: string };

export function useUpdateComment() {
  const mutation = useMutation({
    mutationFn: (comment: UpdateComment) => updateCommentRequest(comment.id, comment),
    onSuccess: updateCommentMutation,
  });

  return { update: mutation.mutateAsync };
}
