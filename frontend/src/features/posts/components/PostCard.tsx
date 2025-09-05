import React from 'react';
import { Post } from '../../../shared/types';
import { TrashIcon } from '../../../assets/icons';

interface PostCardProps {
  post: Post;
  onDelete: (postId: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onDelete }) => {
  return (
    <div className="bg-white border-[1px] border-[#D5D7DA]  rounded-[8px] py-9 px-6 relative w-[270px] h-[293px]" style={{ boxShadow: "0px 2px 4px -2px rgba(10, 13, 18, 0.1)" }}>
      <button
        onClick={() => onDelete(post.id)}
        className="absolute top-2 right-2  flex items-center justify-center w-[24px] h-[24px] rounded-[4px] hover:bg-[#FEF4F5]"
        title="Delete post"
      >
       <TrashIcon/>
      </button>
      
      <div className="overflow-hidden h-[209px]">
        <h3 className="text-[18px] font-[500] leading-[20px] text-[#535862] space-[20px] tracking-wide mb-3">{post.title}</h3>
        <p className="text-[#535862] text-[14px] font-[400] leading-[20px] leading-relaxed ">{post.body.slice(0, 190)} { post?.body.length>190 &&"..."}</p>
      </div>
    </div>
  );
};

export default PostCard;