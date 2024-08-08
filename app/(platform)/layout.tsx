import { ClerkProvider } from '@clerk/nextjs';
import { PropsWithChildren } from 'react';

export default function PlatformLayout({ children }: PropsWithChildren) {
  return <ClerkProvider afterSignOutUrl={'/'}>{children}</ClerkProvider>;
}
