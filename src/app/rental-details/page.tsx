'use client';

import { useEffect, useState } from 'react';
import { getRentalsAPI } from '@/services/api';
import { Rental } from '@/types';
import Image from 'next/image';

export default function RentalDetails() {
  const [rentals, setRentals] = useState<Rental[]>([]);

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        // Assuming you have the user ID stored somewhere (e.g., in localStorage)
        const userId = 1; // Replace with actual user ID
        const response = await getRentalsAPI(userId);
        setRentals(response.data);
      } catch (error) {
        console.error('Error fetching rentals:', error);
      }
    };

    fetchRentals();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Rental Details</h1>
      {rentals.map((rental) => (
        <div key={rental.id} className="mb-6 p-4 border rounded">
          <h2 className="text-xl font-semibold">{rental.bookTitle}</h2>
          {rental.bookImageUrl && (
            <Image
              src={rental.bookImageUrl}
              alt={rental.bookTitle}
              width={100}
              height={150}
              className="mt-2"
            />
          )}
          <p className="mt-2">Price: ${rental.bookPrice.toFixed(2)}</p>
          {rental.bookDescription && <p className="mt-2">{rental.bookDescription}</p>}
          <p className="mt-2 text-sm text-gray-500">
            Rented on: {new Date(rental.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}