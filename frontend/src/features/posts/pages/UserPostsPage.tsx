import React, { useState, useCallback, useMemo } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { usePosts, useCreatePost, useDeletePost } from '../hooks/usePosts';
import PostCard from '../components/PostCard';
import AddPostForm from '../components/AddPostForm';
import AddPostCard from '../components/AddPostCard';
import { Modal, Loader, ErrorMessage, Button, ConfirmModal } from '../../../shared';
import { ArrowLeftIcon } from '../../../assets/icons';

const UserPostsPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const userName = searchParams.get('name') || 'Unknown User';
  const userEmail = searchParams.get('email') || 'No email';
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);

  const { data: posts, isLoading, error } = usePosts(userId || '');
  const createPostMutation = useCreatePost();
  const deletePostMutation = useDeletePost();

  const handleAddPost = useCallback((title: string, body: string) => {
    if (!userId) return;
    createPostMutation.mutate(
      { userId, title, body },
      {
        onSuccess: () => {
          setShowModal(false);
        },
      }
    );
  }, [userId, createPostMutation]);

  const handleDeletePost = useCallback((postId: string) => {
    setPostToDelete(postId);
    setShowDeleteModal(true);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (postToDelete) {
      deletePostMutation.mutate(postToDelete, {
        onSuccess: () => {
          setShowDeleteModal(false);
          setPostToDelete(null);
        },
      });
    }
  }, [postToDelete, deletePostMutation]);

  const handleCancelDelete = useCallback(() => {
    setShowDeleteModal(false);
    setPostToDelete(null);
  }, []);

  const handleBackToUsers = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const handleOpenModal = useCallback(() => {
    setShowModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const sortedPosts = useMemo(() => {
    return posts?.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()) || [];
  }, [posts]);

  const postCards = useMemo(() => {
    return sortedPosts?.map((post) => (
      <PostCard
        key={post.id}
        post={post}
        onDelete={handleDeletePost}
        isDeleting={deletePostMutation.isPending && postToDelete === post.id}
      />
    ));
  }, [sortedPosts, handleDeletePost, deletePostMutation.isPending, postToDelete]);

  if (!userId) {
    return <ErrorMessage message="User ID not found" />;
  }

  if (isLoading) {
    return <Loader fullPage />;
  }

  if (error) {
    return <ErrorMessage message={`Error loading posts: ${error.message}`} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <Button
          variant="ghost"
          onClick={handleBackToUsers}
          className="mb-8 px-0"
        >
          <ArrowLeftIcon />
          <span className='ml-3 text-gray-600 text-sm font-semibold'>
            Back to Users
          </span>
        </Button>
        
        <div className="mb-12">
          <h1 className="text-gray-900 text-4xl font-medium mb-2">{userName}</h1>
          <p className="text-gray-600 text-sm">{userEmail} <span className='font-medium'>• {sortedPosts?.length || 0} Posts</span></p>
        </div>

        {createPostMutation.isError && (
          <ErrorMessage message="Failed to create post. Please try again." />
        )}

        {deletePostMutation.isError && (
          <ErrorMessage message="Failed to delete post. Please try again." />
        )}

        <div className="mx-auto w-full sm:w-full flex flex-wrap items-center justify-center md:justify-start gap-5">
          <AddPostCard onClick={handleOpenModal} />
          {postCards}
        </div>

        <Modal isOpen={showModal} onClose={handleCloseModal}>
          <AddPostForm
            onSubmit={handleAddPost}
            onCancel={handleCloseModal}
            isLoading={createPostMutation.isPending}
          />
        </Modal>

        <ConfirmModal
          isOpen={showDeleteModal}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          title="Delete Post"
          message="Are you sure you want to delete this post? This action cannot be undone."
          isLoading={deletePostMutation.isPending}
        />
      </div>
    </div>
  );
};

export default UserPostsPage;