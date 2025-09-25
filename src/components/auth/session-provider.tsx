'use client';

import { ReactNode } from 'react';

interface AuthSessionProviderProps {
  children: ReactNode;
}

export function AuthSessionProvider({ children }: AuthSessionProviderProps) {
  // NextAuth v5 doesn't require a session provider wrapper
  return <>{children}</>;
}
