import React from 'react';
import { Post } from '../../../shared/types';
import { TrashIcon } from '../../../assets/icons';

interface PostCardProps {
  post: Post;
  onDelete: (postId: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onDelete }) => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg py-9 px-6 relative w-[270px] h-[293px] shadow-sm">
      <button
        onClick={() => onDelete(post.id)}
        className="absolute top-2 right-2 flex items-center justify-center w-6 h-6 rounded hover:bg-red-50"
        title="Delete post"
      >
       <TrashIcon/>
      </button>
      
      <div className="overflow-hidden h-52">
        <h3 className="text-lg font-medium text-gray-600 tracking-wide mb-3">{post.title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{post.body.slice(0, 190)}{post?.body.length > 190 && "..."}</p>
      </div>
    </div>
  );
};

export default PostCard;