'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, [router]);

  const handleSignOut = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    router.push('/signin');
    window.location.reload();
  };

  return (
    <nav className="bg-indigo-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-white">BooKRent</span>
            </Link>
          </div>
          <div className="flex items-center">
            {!isLoggedIn ? (
              <>
                <Link href="/signup" className="text-gray-200 hover:bg-indigo-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Sign Up
                </Link>
                <Link href="/signin" className="ml-4 text-gray-200 hover:bg-indigo-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Sign In
                </Link>
              </>
            ) : (
              <button onClick={handleSignOut} className="ml-4 text-gray-200 hover:bg-indigo-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Sign Out
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
