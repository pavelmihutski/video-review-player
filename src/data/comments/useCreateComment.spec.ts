import { act, renderHook } from '@testing-library/react';

import { AllProviders } from '@/app/providers';

import { queryClient } from '../queryClient';
import { fetchCommentsQuery, queryKeys } from './queries';
import { Comment } from './types';
import { useCreateComment } from './useCreateComment';

describe('useCreateComment', () => {
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

  it('should create a comment', async () => {
    const { result } = renderHook(() => useCreateComment(), {
      wrapper: AllProviders,
    });

    await fetchCommentsQuery();

    const comments = queryClient.getQueryData<Comment[]>(queryKeys.comments());

    expect(comments).toHaveLength(4);

    await act(async () => {
      await result.current.create({
        time: 100.5,
        author: 'Test User',
        text: 'Test comment',
        resolved: false,
        timestamp: Date.now(),
      });
    });

    const updatedComments = queryClient.getQueryData<Comment[]>(queryKeys.comments());

    expect(updatedComments).toHaveLength(5);
  });

  it('should throw error when error occurs', async () => {
    const { result } = renderHook(() => useCreateComment(), {
      wrapper: AllProviders,
    });

    const comments = queryClient.getQueryData<Comment[]>(queryKeys.comments());

    expect(comments).toBeUndefined();

    await act(async () => {
      await expect(
        result.current.create({
          time: 100.5,
          author: 'bad-request',
          text: 'Test',
          resolved: false,
          timestamp: Date.now(),
        }),
      ).rejects.toThrowError('NETWORK_REQUEST_ERROR');
    });

    const updatedList = queryClient.getQueryData<Comment[]>(queryKeys.comments());

    expect(updatedList).toBeUndefined();
  });
});
