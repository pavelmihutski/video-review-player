import { fetchComments } from '@/api';

import { queryClient } from '../queryClient';

export const queryKeys = {
  comments: () => ['COMMENTS'],
};

export function createCommentsQueryOptions() {
  return {
    queryKey: queryKeys.comments(),
    queryFn: () => fetchComments(),
    staleTime: Infinity,
  };
}

export const fetchCommentsQuery = () => {
  return queryClient.fetchQuery(createCommentsQueryOptions());
};
