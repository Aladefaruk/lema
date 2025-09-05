import React, { useState } from 'react';
import { FormInput, Loader } from '../../../shared';

interface AddPostFormProps {
  onSubmit: (title: string, body: string) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const AddPostForm: React.FC<AddPostFormProps> = ({ onSubmit, onCancel, isLoading }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && body.trim()) {
      onSubmit(title.trim(), body.trim());
      setTitle('');
      setBody('');
    }
  };

  return (
    <div className='h-full'>
      <h2 className="text-[36px] font-[500] text-[#181D27] mb-5">New Post</h2>
      
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Post title"
          id="title"
          value={title}
          onChange={setTitle}
          placeholder="Give your post a title"
          required
        />
        
        <div className="mb-8">
          <label htmlFor="body" className="block text-[18px] font-[500] text-[#535862] mb-2">
            Post content
          </label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write something mind-blowing"
            rows={6}
            className="w-full px-4 py-3 h-[179px] border border-[#E2E8F0] rounded-[4px] outline-none text-[14px] font-[400] leading-[21px] resize-none"
            required
          />
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className=" py-2 w-[78px] h-[40px] text-[#334155] text-[14px] font-[400] text-center bg-white border border-[#E2E8F0] rounded-[4px] hover:bg-gray-50 outline-none text-center"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className={`py-2 px-4 ${isLoading ? "w-[82px]" :"w-[112px]"} h-[40px] text-[#FFFFFF] text-[14px] font-[400] text-center bg-[#334155] border border-[#334155] rounded-[4px] outline-none text-center flex items-center justify-center`}
          >
            {isLoading ? (<div className='px-4 flex items-center justfy-around'>
              <span className='mr-2'>
                Publish
              </span>

              <Loader color="white" size="small" />
            </div>
            ) : (
              'Publish'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPostForm;