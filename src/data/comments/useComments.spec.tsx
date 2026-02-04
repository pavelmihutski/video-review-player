import { renderHook, waitFor } from '@testing-library/react';

import { AllProviders } from '@/app/providers';

import { queryClient } from '../queryClient';
import { useComments } from './useComments';

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

describe('useComments', () => {
  it('should return the comments', async () => {
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

    expect(result.current.data[0]).toStrictEqual({
      id: 'c_1',
      author: 'Alice',
      time: 12.5,
      timestamp: 1769971103216,
      text: 'Colour in background looks warm',
      resolved: false,
    });
  });
});
