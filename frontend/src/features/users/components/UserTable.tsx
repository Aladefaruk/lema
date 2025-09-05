import React from 'react';
import { User } from '../../../shared/types';
import { Loader } from '../../../shared';

interface UserTableProps {
  users: User[];
  onUserClick: (user: User) => void;
  isLoading?: boolean;
}

const UserTable: React.FC<UserTableProps> = ({ users, onUserClick, isLoading }) => {

  const formatAddress = (user: User) => {
    if (!user?.address) return 'No address';
    const { street, state, city, zipcode } = user?.address;
    return `${street}, ${state}, ${city}, ${zipcode}`;
  };
  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-lg border border-gray-200">
        <table className="min-w-full">
          <thead>
            <tr className="text-xs text-gray-500">
              <th className="px-6 py-4 text-left font-medium">
                Full Name
              </th>
              <th className="px-6 py-4 text-left font-medium">
                Email Address
              </th>
              <th className="px-6 py-4 text-left font-medium">
                Address
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={3} className="px-6 py-20 text-center">
                  <Loader />
                </td>
              </tr>
            ) : (
              users?.map((user, index) => (
                <tr
                  key={user?.id}
                  onClick={() => onUserClick(user)}
                  className={`cursor-pointer hover:bg-gray-50 text-xs text-gray-600 ${
                    index !== users.length - 1 ? 'border-b border-gray-200' : ''
                  }`}
                >
                  <td className="px-6 py-6 font-medium">
                    {user?.name}
                  </td>
                  <td className="px-6 py-6">
                    {user?.email}
                  </td>
                  <td className="px-6 py-6" style={{ width: '392px' }}>
                    <div className="truncate" title={formatAddress(user)}>
                      {formatAddress(user)}
                    </div>
                  </td>
                </tr>
              )) || (
                <tr>
                  <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {isLoading ? (
          <div className="py-20 text-center">
            <Loader />
          </div>
        ) : (
          users?.map((user) => (
            <div
              key={user?.id}
              onClick={() => onUserClick(user)}
              className="bg-white rounded-lg border border-gray-200 p-4 cursor-pointer hover:bg-gray-50"
            >
              <div className="space-y-2">
                <div>
                  <span className="text-xs text-gray-500 font-medium">Full Name</span>
                  <p className="text-sm text-gray-900 font-medium">{user?.name}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500 font-medium">Email Address</span>
                  <p className="text-sm text-gray-600">{user?.email}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500 font-medium">Address</span>
                  <p className="text-sm text-gray-600 truncate" title={formatAddress(user)}>
                    {formatAddress(user)}
                  </p>
                </div>
              </div>
            </div>
          )) || (
            <div className="bg-white rounded-lg border border-gray-200 p-6 text-center text-gray-500">
              No users found
            </div>
          )
        )}
      </div>
    </>
  );
};

export default UserTable;