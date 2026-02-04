import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { createCommentsQueryOptions } from './queries';

export function useComments() {
  const { data, isLoading, error } = useQuery(createCommentsQueryOptions());

  const comments = useMemo(() => {
    if (!data) {
      return [];
    }

    return data;
  }, [data]);

  return { data: comments, isLoading, error };
}
