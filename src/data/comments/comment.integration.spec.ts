import { act, renderHook } from '@testing-library/react';
import { waitFor } from '@testing-library/react';

import { AllProviders } from '@/app/providers';

import { queryClient } from '../queryClient';
import { queryKeys } from './queries';
import { Comment } from './types';
import { useComments } from './useComments';
import { useCreateComment } from './useCreateComment';

describe('integration', () => {
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

  it('should update comments when a new comment is created', async () => {
    const { result } = renderHook(() => useComments(), {
      wrapper: AllProviders,
    });

    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toHaveLength(0);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBeNull();
    expect(result.current.data).toHaveLength(4);

    const { result: createResult } = renderHook(() => useCreateComment(), {
      wrapper: AllProviders,
    });

    await act(async () => {
      await createResult.current.create({
        time: 100.5,
        author: 'Test User',
        text: 'Test comment',
        resolved: false,
        timestamp: Date.now(),
      });
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toHaveLength(5);
  });

  it('should add comment to cache when creating', async () => {
    const { result: createResult } = renderHook(() => useCreateComment(), {
      wrapper: AllProviders,
    });

    await act(async () => {
      await createResult.current.create({
        time: 50.0,
        author: 'New Author',
        text: 'New comment',
        resolved: false,
        timestamp: Date.now(),
      });
    });

    const comments = queryClient.getQueryData<Array<Comment>>(queryKeys.comments());

    expect(comments).toHaveLength(1);
  });
});
