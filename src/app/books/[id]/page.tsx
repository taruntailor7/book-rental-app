'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getBookAPI, rentBookAPI } from '@/services/api';
import { Book } from '@/types';
import Image from 'next/image';
import { User } from '@/types';
import AuthCheck from '@/components/AuthCheck';

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [isRented, setIsRented] = useState(false);


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
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser: User = JSON.parse(storedUser);
        console.log("user", parsedUser);
        await rentBookAPI({
          userId: parsedUser.id,
          bookId: book?.id,
          bookTitle: book?.title,
          bookPrice: book?.price,
          bookImageUrl: book?.imageUrl,
          bookDescription: book?.description,
        });
        setIsRented(true);
        alert('Book rented successfully!');
      } else {
        console.error('No user found in local storage.');
      }
    } catch (error) {
      console.error('Error renting book:', error);
      alert('Failed to rent book. Please try again.');
    }
  };

  return (
    <AuthCheck>
      {book && (<div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                <div className="h-96 w-full md:w-96 relative">
                  <Image
                    src={book.imageUrl ||'https://m.media-amazon.com/images/I/51CxmVYKYsL._SR290,290_.jpg' }
                    alt={book.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                  />
                </div>
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-between">
                <div>
                  <h1 className="text-3xl font-extrabold text-gray-900 mb-4">{book.title}</h1>
                  <div className="flex items-center mb-6">
                    <span className="text-2xl font-bold text-indigo-600">{book.price} Rs.</span>
                    <span className="ml-2 text-sm text-gray-500">per month</span>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed mb-8">{book.description}</p>
                </div>
                <div>
                  <button 
                    className={`w-full px-6 py-3 rounded-lg text-lg font-semibold transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg ${
                      isRented 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                    onClick={handleRent}
                    disabled={isRented}
                  >
                    {isRented ? 'Already Rented' : 'Rent Now'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>)}
    </AuthCheck>
  );
}