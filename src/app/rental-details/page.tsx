'use client';

import { useEffect, useState } from 'react';
import { getRentalsAPI } from '@/services/api';
import { Rental, User } from '@/types';
import Image from 'next/image';
import AuthCheck from '@/components/AuthCheck';
import Link from 'next/link';

export default function RentalDetails() {
  const [rentals, setRentals] = useState<Rental[]>([]);

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsedUser: User = JSON.parse(storedUser);
          const response = await getRentalsAPI(parsedUser.id);
          setRentals(response.data);
        } else {
          console.error('No user found in local storage.');
        }
      } catch (error) {
        console.error('Error fetching rentals:', error);
      }
    };

    fetchRentals();
  }, []);

  return (
    <AuthCheck>
      {rentals && (<div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Your Rental History</h1>
        {rentals && rentals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rentals.map((rental) => (
              <div key={rental.id} className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                <div className="relative h-48">
                  <Image
                    src={rental.bookImageUrl || 'https://m.media-amazon.com/images/I/51CxmVYKYsL._SR290,290_.jpg'}
                    alt={rental.bookTitle}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2 truncate">{rental.bookTitle}</h2>
                  <p className="text-indigo-600 font-bold mb-2">₹{rental.bookPrice}</p>
                  <p className="text-gray-600 text-sm mb-4 h-12 overflow-hidden">
                    {rental.bookDescription}
                  </p>
                  <p className="text-xs text-gray-500">
                    Rented on: {new Date(rental.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <p className="text-center text-gray-600">You have not rented any books yet.</p>
            <button className='w-full px-6 py-3'>
              <Link 
                href={`/books`}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition duration-300"
              >
                Rent Now
              </Link>
            </button>
          </>
        )} 
      </div>)}
    </AuthCheck>
  );
}