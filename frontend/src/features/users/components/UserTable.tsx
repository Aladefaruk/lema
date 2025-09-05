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
    <div className="bg-white rounded-lg border-[1px] rounded-[8px] border-[#E9EAEB]">
      <table className="min-w-full h-[332px]">
        <thead>
          <tr className=" text-[12px] leading-[18px] text-[#535862]">
            <th className="px-6 py-4 text-left  font-[500]  ">
              Full Name
            </th>
            <th className="px-6 py-4 text-left  font-[500] ">
              Email Address
            </th>
            <th className="px-6 py-4 text-left font-[500] ] ">
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
                className={`cursor-pointer hover:bg-gray-50 text-[12px] text-[#535862] font-[400] ${
                  index !== users.length - 1 ? 'border-b-[1px] border-[#E9EAEB]' : ''
                }`}
              >
                <td className="px-6 py-6  font-[500]">
                  {user?.name}
                </td>
                <td className="px-6 py-6 ">
                  {user?.email}
                </td>
                <td className="px-6 py-6 " style={{ width: '392px' }}>
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
  );
};

export default UserTable;