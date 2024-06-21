// src/components/BookTable.tsx
import { Book } from '@/types';
import Link from 'next/link';
import Image from 'next/image';

interface BookTableProps {
  books: Book[];
  onRent: (bookId: number) => void;
}

const BookTable: React.FC<BookTableProps> = ({ books, onRent }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 text-left">Cover</th>
            <th className="py-3 px-4 text-left">Title</th>
            <th className="py-3 px-4 text-left">Price</th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id} className="border-b">
              <td className="py-3 px-4">
                {book.imageUrl && (
                  <Image src={book.imageUrl} alt={book.title} width={50} height={75} className="object-cover" />
                )}
              </td>
              <td className="py-3 px-4">{book.title}</td>
              <td className="py-3 px-4">${book.price.toFixed(2)}</td>
              <td className="py-3 px-4">
                <Link href={`/books/${book.id}`} className="text-blue-500 hover:underline mr-2">
                  View
                </Link>
                <button
                  onClick={() => onRent(book.id)}
                  className="text-green-500 hover:underline"
                >
                  Rent
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookTable;