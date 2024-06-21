// src/components/AuthCheck.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthCheck = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/signin');
    }
  }, [router]);

  return <>{children}</>;
};

export default AuthCheck;