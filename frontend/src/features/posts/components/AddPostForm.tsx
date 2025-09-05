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
      <h2 className="text-4xl font-medium text-gray-900 mb-5">New Post</h2>
      
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
          <label htmlFor="body" className="block text-lg font-medium text-gray-600 mb-2">
            Post content
          </label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write something mind-blowing"
            rows={6}
            className="w-full px-4 py-3 h-44 border border-gray-300 rounded outline-none text-sm resize-none"
            required
          />
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="py-2 w-20 h-10 text-gray-700 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 outline-none"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className={`py-2 px-4 ${isLoading ? "w-28" : "w-20"} h-10 text-white text-sm bg-gray-700 border border-gray-700 rounded outline-none flex items-center justify-center`}
          >
            {isLoading ? (<div className='px-4 flex items-center justify-around'>
              <span className='mx-2'>
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