import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUsers, useUsersCount } from '../hooks/useUsers';
import { User } from '../../../shared/types';
import UserTable from '../components/UserTable';
import Pagination from '../components/Pagination';
import { ErrorMessage } from '../../../shared';

const UsersPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  
  const { data: users, isLoading: usersLoading, error: usersError } = useUsers(currentPage);
  const { data: countData, error: countError } = useUsersCount();
  const totalPages = useMemo(() => Math.ceil((countData?.count || 0) / 4), [countData?.count]);

  const handleUserClick = (user: User) => {
    navigate(`/users/${user.id}/posts`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (usersError || countError) {
    return (
      <ErrorMessage 
        message={`Error loading data: ${usersError?.message || countError?.message}`} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#fff] ">
      <div className="max-w-6xl mx-auto px-6 py-32">
        <h1 className="text-[60px] leading-[72px] font-[500] text-[#181D27] mb-6">Users</h1>
        
        <UserTable users={users || []} onUserClick={handleUserClick} isLoading={usersLoading} />
        
        {!usersLoading && (
          <div className='w-full flex justify-end'>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersPage;