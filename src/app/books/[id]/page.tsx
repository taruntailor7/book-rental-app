'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getBookAPI, rentBookAPI } from '@/services/api';
import { Book } from '@/types';
import Image from 'next/image';

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await getBookAPI(Number(id));
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book:', error);
      }
    };

    fetchBook();
  }, [id]);

  const handleRent = async () => {
    try {
      // Assuming you have the user ID stored somewhere (e.g., in localStorage)
      const userId = 1; // Replace with actual user ID
      await rentBookAPI({
        userId,
        bookId: book?.id,
        bookTitle: book?.title,
        bookPrice: book?.price,
        bookImageUrl: book?.imageUrl,
        bookDescription: book?.description,
      });
      alert('Book rented successfully!');
    } catch (error) {
      console.error('Error renting book:', error);
      alert('Failed to rent book. Please try again.');
    }
  };

  if (!book) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{book.title}</h1>
      {book.imageUrl && (
        <Image src={book.imageUrl} alt={book.title} width={200} height={300} className="mb-4" />
      )}
      <p>Price: ${book.price.toFixed(2)}</p>
      {book.description && <p className="mt-2">{book.description}</p>}
      <button
        onClick={handleRent}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Rent Book
      </button>
    </div>
  );
}