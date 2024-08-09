'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import { Toaster } from 'sonner';

import { queryClient } from '@/lib/react-query/query-client';

export default function Providers({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider afterSignOutUrl={'/'}>
        <Toaster />
        {children}
      </ClerkProvider>
    </QueryClientProvider>
  );
}
