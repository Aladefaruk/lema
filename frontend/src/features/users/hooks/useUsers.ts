import { useQuery } from '@tanstack/react-query';
import { usersApi } from '../../../shared/api/users';

export const useUsers = (pageNumber: number) => {
  return useQuery({
    queryKey: ['users', pageNumber],
    queryFn: () => usersApi.getUsers(pageNumber),
  });
};

export const useUsersCount = () => {
  return useQuery({
    queryKey: ['users', 'count'],
    queryFn: () => usersApi.getUsersCount(),
  });
};

export const useUser = (userId: string) => {
  return useQuery({
    queryKey: ['users', userId],
    queryFn: () => usersApi.getUserById(userId),
    enabled: !!userId,
  });
};