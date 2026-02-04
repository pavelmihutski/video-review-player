import { useMutation } from '@tanstack/react-query';

import { createComment as createCommentRequest } from '@/api';

import { createComment as createCommentMutation } from './mutations';

export function useCreateComment() {
  const mutation = useMutation({
    mutationFn: createCommentRequest,
    onSuccess: createCommentMutation,
  });

  return { create: mutation.mutateAsync };
}
