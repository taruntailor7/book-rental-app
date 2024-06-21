'use client';

import React, { useEffect, useState } from 'react';
import { getBooksAPI } from '@/services/api';
import { Book } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import AuthCheck from '@/components/AuthCheck';

const Books: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getBooksAPI();
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <AuthCheck>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Our Book Collection</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books?.map((book) => (
            <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-64 w-full">
                <Image
                  src={book.imageUrl || 'https://m.media-amazon.com/images/I/51CxmVYKYsL._SR290,290_.jpg'}
                  alt={book.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2 truncate">{book.title}</h2>
                <p className="text-lg font-bold text-indigo-600 mb-4">{book.price} Rs.</p>
                <Link 
                  href={`/books/${book.id}`}
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AuthCheck>
  );
};

export default Books;