// src/components/ConsumerDetails.tsx
'use client';

import { useEffect, useState } from 'react';
import { getUserAPI } from '@/services/api';
import { User } from '@/types';
import Image from 'next/image';
import AuthCheck from '@/components/AuthCheck';
import { useRouter } from 'next/navigation';

export default function ConsumerDetails() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsedUser: User = JSON.parse(storedUser);
          const response = await getUserAPI(parsedUser.id);
          setUser(response.data);
        } else {
          console.error('No user found in local storage.');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthCheck>    
      {user && (<div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-6 text-center">Consumer Details</h1>
          <div className="flex flex-col items-center">
            <div className="relative h-32 w-32 mb-4">
              <Image
                src={'https://static.thenounproject.com/png/363639-200.png'}
                alt={`${user.firstName} ${user.lastName}`}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <p className="text-xl font-bold mb-2">Uniqure ID: {user.id}</p>
            <p className="text-xl font-semibold mb-2">Email : {user.email}</p>
            {(user.firstName && user.lastName) && <p className="text-lg mb-1">Consumer Name: {user.firstName} {user.lastName}</p>}
            <p className="text-lg">Member since: {new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>)}
    </AuthCheck>
  );
}
