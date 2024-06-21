'use client';

import { useEffect, useState } from 'react';
import { getUserAPI } from '@/services/api';
import { User } from '@/types';

export default function ConsumerDetails() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Assuming you have the user ID stored somewhere (e.g., in localStorage)
        const userId = 1; // Replace with actual user ID
        const response = await getUserAPI(userId);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Consumer Details</h1>
      <p>Email: {user.email}</p>
      {user.firstName && <p>First Name: {user.firstName}</p>}
      {user.lastName && <p>Last Name: {user.lastName}</p>}
      <p>Member since: {new Date(user.createdAt).toLocaleDateString()}</p>
    </div>
  );
}