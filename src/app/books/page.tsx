'use client';

import { useEffect, useState } from 'react';
import { getBooksAPI } from '@/services/api';
import { Book } from '@/types';
import Link from 'next/link';
import AuthCheck from '@/components/AuthCheck';

export default function Books() {
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
      <div>
        <h1 className="text-2xl font-bold mb-4">Books</h1>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td className="py-2 px-4 border-b">{book.title}</td>
                <td className="py-2 px-4 border-b">${book.price.toFixed(2)}</td>
                <td className="py-2 px-4 border-b">
                  <Link href={`/books/${book.id}`} className="text-blue-500 hover:underline mr-2">
                    View
                  </Link>
                  <button className="text-green-500 hover:underline">Rent</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AuthCheck>
  );
}