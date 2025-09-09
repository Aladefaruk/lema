import React, { useState, useCallback } from 'react';
import { FormInput, Loader, Button } from '../../../shared';

interface AddPostFormProps {
  onSubmit: (title: string, body: string) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const AddPostForm: React.FC<AddPostFormProps> = ({ onSubmit, onCancel, isLoading }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && body.trim()) {
      onSubmit(title.trim(), body.trim());
      setTitle('');
      setBody('');
    }
  }, [title, body, onSubmit]);

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
          maxLength={40}
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
            maxLength={500}
            className="w-full px-4 py-3 h-44 border border-gray-300 rounded outline-none text-sm resize-none"
            required
          />
          <div className="text-xs text-gray-500 mt-1 text-right">
            {body.length}/500 characters
          </div>
        </div>
        
        <div className="flex justify-end space-x-3">
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            className="w-20"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            className={isLoading ? "w-28" : "w-20"}
          >
            {isLoading ? (
              <div className='flex items-center'>
                <span className='mr-2'>Publish</span>
                <Loader color="white" size="small" />
              </div>
            ) : (
              'Publish'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddPostForm;