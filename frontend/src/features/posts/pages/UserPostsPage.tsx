import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePosts, useCreatePost, useDeletePost } from '../hooks/usePosts';
import PostCard from '../components/PostCard';
import AddPostForm from '../components/AddPostForm';
import AddPostCard from '../components/AddPostCard';
import { Modal, Loader, ErrorMessage } from '../../../shared';
import { ArrowLeftIcon } from '../../../assets/icons';

const UserPostsPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const { data: posts, isLoading, error } = usePosts(userId!);
  
  const createPostMutation = useCreatePost();
  const deletePostMutation = useDeletePost();

  // Get user info for display (simplified - in real app you'd have a separate hook)
  const userName = "James Sunderland"; // This would come from user data
  const userEmail = "james.sunderland@acme.corp";

  const handleAddPost = (title: string, body: string) => {
    createPostMutation.mutate(
      { userId: userId!, title, body },
      {
        onSuccess: () => {
          setShowModal(false);
        },
      }
    );
  };

  const handleDeletePost = (postId: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePostMutation.mutate(postId);
    }
  };

  if (isLoading) {
    return <Loader fullPage />;
  }

  if (error) {
    return <ErrorMessage message={`Error loading posts: ${error.message}`} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <button
          onClick={() => navigate('/')}
          className="flex items-center  mb-8"
        >
          <ArrowLeftIcon />
          <span className='ml-3 text-[#535862]  text-[14px] leading-[20px]   font-[600]'>
            Back to Users
</span>
        </button>
        
        <div className="mb-12">
          <h1 className="text-[#181D27]  text-[36px] leading-[60px]   font-[500] mb-2">{userName}</h1>
          <p className="text-[#535862] text-[14px] leading-[20px]  font-[400] ">{userEmail} <span className='font-[500]'>• {posts?.length || 0} Posts</span> </p>
        </div>



        {createPostMutation.isError && (
          <ErrorMessage message="Failed to create post. Please try again." />
        )}

        {deletePostMutation.isError && (
          <ErrorMessage message="Failed to delete post. Please try again." />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:flex flex-wrap items-center gap-5">
          <AddPostCard onClick={() => setShowModal(true)} />
          {posts && posts.length > 0 && (
            posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onDelete={handleDeletePost}
              />
            ))
          )}
        </div>

        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <AddPostForm
            onSubmit={handleAddPost}
            onCancel={() => setShowModal(false)}
            isLoading={createPostMutation.isPending}
          />
        </Modal>
      </div>
    </div>
  );
};

export default UserPostsPage;