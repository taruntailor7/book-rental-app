// src/components/AuthCheck.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthCheck = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      router.push('/signup');
    } 
    if(isLoggedIn) {
      router.push('/books');
    }
  }, [router]);

  return <>{children}</>;
};

export default AuthCheck;