import { queryClient } from '../queryClient';
import { queryKeys } from './queries';
import { Comment } from './types';

export function createComment(comment: Comment) {
  return queryClient.setQueryData<Array<Comment>>(queryKeys.comments(), data => {
    if (!data) {
      return [comment];
    }

    return [...data, comment];
  });
}

export function updateComment(comment: Comment) {
  return queryClient.setQueryData<Array<Comment>>(queryKeys.comments(), data => {
    if (!data) {
      return;
    }

    return data.map(item => (item.id === comment.id ? comment : item));
  });
}

export function deleteComment(id: string) {
  return queryClient.setQueryData<Array<Comment>>(queryKeys.comments(), data => {
    if (!data) {
      return;
    }

    return data.filter(item => item.id !== id);
  });
}
