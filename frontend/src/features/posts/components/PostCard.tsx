import React from 'react';
import { Post } from '../../../shared/types';
import { TrashIcon } from '../../../assets/icons';
import { Loader } from '../../../shared';

interface PostCardProps {
  post: Post;
  onDelete: (postId: string) => void;
  isDeleting?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, onDelete, isDeleting = false }) => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg py-6 sm:py-9 px-4 sm:px-6 relative w-4/5 sm:w-[270px] h-[270px] sm:h-[293px] shadow-sm">
      <button
        onClick={() => onDelete(post.id)}
        className="absolute top-2 right-2 flex items-center justify-center w-6 h-6 rounded hover:bg-red-50"
        title="Delete post"
        disabled={isDeleting}
      >
        {isDeleting ? <div className="w-4 h-4"><Loader /></div> : <TrashIcon />}
      </button>
      
      <div className="overflow-hidden h-52 flex flex-col">
        <h3 className="text-lg font-medium text-gray-600 tracking-wide mb-3 h-14 line-clamp-2">{post.title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-6 flex-1">{post.body}</p>
      </div>
    </div>
  );
};

export default PostCard;