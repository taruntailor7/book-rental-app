// src/components/ConsumerDetails.tsx
import { User } from '@/types';

interface ConsumerDetailsProps {
  user: User;
}

const ConsumerDetails: React.FC<ConsumerDetailsProps> = ({ user }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Consumer Details</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600">Email</p>
          <p className="font-medium">{user.email}</p>
        </div>
        <div>
          <p className="text-gray-600">First Name</p>
          <p className="font-medium">{user.firstName || 'N/A'}</p>
        </div>
        <div>
          <p className="text-gray-600">Last Name</p>
          <p className="font-medium">{user.lastName || 'N/A'}</p>
        </div>
        <div>
          <p className="text-gray-600">Member Since</p>
          <p className="font-medium">{new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default ConsumerDetails;