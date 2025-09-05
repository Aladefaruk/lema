import { apiClient } from './client';
import { Post } from '../types';

export const postsApi = {
  getPosts: (userId: string): Promise<Post[]> =>
    apiClient.get(`/posts?userId=${userId}`),

  createPost: (userId: string, title: string, body: string): Promise<Post> =>
    apiClient.post('/posts', { userId, title, body }),

  deletePost: (postId: string): Promise<{ message: string }> =>
    apiClient.delete(`/posts/${postId}`),
};