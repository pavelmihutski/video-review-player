import { act, renderHook } from '@testing-library/react';

import { AllProviders } from '@/app/providers';

import { queryClient } from '../queryClient';
import { fetchCommentsQuery, queryKeys } from './queries';
import { Comment } from './types';
import { useUpdateComment } from './useUpdateComment';

describe('useUpdateComment', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    queryClient.clear();
  });

  beforeAll(() => {
    queryClient.setDefaultOptions({
      queries: {
        staleTime: 1 * 1000,
        gcTime: 1 * 1000,
      },
    });
  });

  afterAll(() => {
    queryClient.clear();
  });

  it('should update a comment', async () => {
    const { result } = renderHook(() => useUpdateComment(), {
      wrapper: AllProviders,
    });

    await fetchCommentsQuery();

    const comments = queryClient.getQueryData<Array<Comment>>(queryKeys.comments());

    expect(comments).toHaveLength(4);

    await act(async () => {
      await result.current.update({
        id: 'c_1',
        resolved: true,
      });
    });

    const updatedComments = queryClient.getQueryData<Array<Comment>>(queryKeys.comments());

    expect(updatedComments).toHaveLength(4);

    expect(updatedComments && updatedComments[0].resolved).toBe(true);
  });

  it('should throw error when error occurs', async () => {
    const { result } = renderHook(() => useUpdateComment(), {
      wrapper: AllProviders,
    });

    const comments = queryClient.getQueryData<Array<Comment>>(queryKeys.comments());

    expect(comments).toBeUndefined();

    await act(async () => {
      await expect(result.current.update({ id: 'c_1', author: 'bad-request' })).rejects.toThrowError(
        'NETWORK_REQUEST_ERROR',
      );
    });

    const updatedComments = queryClient.getQueryData<Array<Comment>>(queryKeys.comments());

    expect(updatedComments).toBeUndefined();
  });
});
