import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { postsApi } from '../../../shared/api/posts';

export const usePosts = (userId: string) => {
  return useQuery({
    queryKey: ['posts', userId],
    queryFn: () => postsApi.getPosts(userId),
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ userId, title, body }: { userId: string; title: string; body: string }) =>
      postsApi.createPost(userId, title, body),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['posts', variables.userId] });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (postId: string) => postsApi.deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};