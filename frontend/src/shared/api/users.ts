import { apiClient } from './client';
import { User } from '../types';

export const usersApi = {
  getUsers: (pageNumber: number, pageSize: number = 4): Promise<User[]> =>
    apiClient.get(`/users?pageNumber=${pageNumber}&pageSize=${pageSize}`),

  getUsersCount: (): Promise<{ count: number }> =>
    apiClient.get('/users/count'),

  getUserById: (userId: string): Promise<User> =>
    apiClient.get(`/users/${userId}`),
};