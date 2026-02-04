import { QueryClientProvider } from '@tanstack/react-query';

import { ErrorBoundary } from '@/components';
import { queryClient } from '@/data';

type Props = {
  children: React.ReactNode;
};

export function ReactQueryProvider({ children }: Props) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export function ErrorBoundaryProvider({ children }: Props) {
  return <ErrorBoundary>{children}</ErrorBoundary>;
}

export function AllProviders({ children }: Props) {
  return (
    <ErrorBoundaryProvider>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </ErrorBoundaryProvider>
  );
}
