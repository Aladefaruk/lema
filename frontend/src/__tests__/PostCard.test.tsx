import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PostCard from '../features/posts/components/PostCard';
import { Post } from '../shared/types';

jest.mock('../shared', () => ({
  ...jest.requireActual('../shared'),
  Loader: () => <div data-testid="mock-loader">Loading...</div>,
}));

const mockPost: Post = {
  id: '1',
  user_id: '1',
  title: 'Test Post Title',
  body: 'This is a test post body content that should be displayed in the card.',
  created_at: '2023-01-01T00:00:00.000Z',
};

describe('PostCard Component', () => {
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    mockOnDelete.mockClear();
  });

  describe('Delete Functionality', () => {
    it('renders delete button', () => {
      render(<PostCard post={mockPost} onDelete={mockOnDelete} />);
      
      const deleteButton = screen.getByTitle('Delete post');
      expect(deleteButton).toBeInTheDocument();
    });

    it('calls onDelete with correct post ID when delete button is clicked', () => {
      render(<PostCard post={mockPost} onDelete={mockOnDelete} />);
      
      const deleteButton = screen.getByTitle('Delete post');
      fireEvent.click(deleteButton);
      
      expect(mockOnDelete).toHaveBeenCalledTimes(1);
      expect(mockOnDelete).toHaveBeenCalledWith('1');
    });

    it('shows loading state when deleting', () => {
      render(<PostCard post={mockPost} onDelete={mockOnDelete} isDeleting={true} />);
      
      expect(screen.queryByTestId('mock-loader')).toBeInTheDocument();
    });

    it('disables delete button when deleting', () => {
      render(<PostCard post={mockPost} onDelete={mockOnDelete} isDeleting={true} />);
      
      const deleteButton = screen.getByTitle('Delete post');
      expect(deleteButton).toBeDisabled();
    });
  });
});