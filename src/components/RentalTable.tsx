// src/components/RentalTable.tsx
import { Rental } from '@/types';
import Image from 'next/image';

interface RentalTableProps {
  rentals: Rental[];
}

const RentalTable: React.FC<RentalTableProps> = ({ rentals }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 text-left">Cover</th>
            <th className="py-3 px-4 text-left">Title</th>
            <th className="py-3 px-4 text-left">Price</th>
            <th className="py-3 px-4 text-left">Rental Date</th>
          </tr>
        </thead>
        <tbody>
          {rentals.map((rental) => (
            <tr key={rental.id} className="border-b">
              <td className="py-3 px-4">
                {rental.bookImageUrl && (
                  <Image src={rental.bookImageUrl} alt={rental.bookTitle} width={50} height={75} className="object-cover" />
                )}
              </td>
              <td className="py-3 px-4">{rental.bookTitle}</td>
              <td className="py-3 px-4">${rental.bookPrice.toFixed(2)}</td>
              <td className="py-3 px-4">{new Date(rental.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RentalTable;