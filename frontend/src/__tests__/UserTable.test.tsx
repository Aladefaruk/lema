import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserTable from '../features/users/components/UserTable';
import { User } from '../shared/types';

// Mock the Loader component
jest.mock('../shared', () => ({
  ...jest.requireActual('../shared'),
  Loader: () => <div data-testid="mock-loader">Loading...</div>,
}));

const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    phone: '123-456-7890',
    address: {
      id: '1',
      user_id: '1',
      street: '123 Main St',
      state: 'CA',
      city: 'San Francisco',
      zipcode: '94102',
    },
  },
  {
    id: '2',
    name: 'Jane Smith',
    username: 'janesmith',
    email: 'jane@example.com',
    phone: '098-765-4321',
  },
];

describe('UserTable Component', () => {
  const mockOnUserClick = jest.fn();

  beforeEach(() => {
    mockOnUserClick.mockClear();
  });

  describe('Data Rendering', () => {
    it('renders user data with complete address information', () => {
      render(<UserTable users={mockUsers} onUserClick={mockOnUserClick} />);

      expect(screen.getAllByText('John Doe')[0]).toBeInTheDocument();
      expect(screen.getAllByText('john@example.com')[0]).toBeInTheDocument();
      expect(screen.getAllByText('123 Main St, CA, San Francisco, 94102')[0]).toBeInTheDocument();
    });

    it('handles users without address gracefully', () => {
      render(<UserTable users={mockUsers} onUserClick={mockOnUserClick} />);

      expect(screen.getAllByText('Jane Smith')[0]).toBeInTheDocument();
      expect(screen.getAllByText('jane@example.com')[0]).toBeInTheDocument();
      expect(screen.getAllByText('No address')[0]).toBeInTheDocument();
    });

    it('displays loading state correctly', () => {
      render(<UserTable users={[]} onUserClick={mockOnUserClick} isLoading={true} />);
      
      expect(screen.getAllByTestId('mock-loader')[0]).toBeInTheDocument();
    });

    it('displays empty state when no users are provided', () => {
      render(<UserTable users={[]} onUserClick={mockOnUserClick} isLoading={false} />);
      
      expect(screen.getAllByText('No users found')[0]).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('calls onUserClick with correct user data when row is clicked', async () => {
      render(<UserTable users={mockUsers} onUserClick={mockOnUserClick} />);

      const firstRow = screen.getAllByText('John Doe')[0].closest('tr');
      fireEvent.click(firstRow!);

      await waitFor(() => {
        expect(mockOnUserClick).toHaveBeenCalledTimes(1);
        expect(mockOnUserClick).toHaveBeenCalledWith(mockUsers[0]);
      });
    });

    it('calls onUserClick for different users correctly', async () => {
      render(<UserTable users={mockUsers} onUserClick={mockOnUserClick} />);

      const secondRow = screen.getAllByText('Jane Smith')[0].closest('tr');
      fireEvent.click(secondRow!);

      await waitFor(() => {
        expect(mockOnUserClick).toHaveBeenCalledWith(mockUsers[1]);
      });
    });

    it('applies hover styles on row interaction', () => {
      render(<UserTable users={mockUsers} onUserClick={mockOnUserClick} />);

      const firstRow = screen.getAllByText('John Doe')[0].closest('tr');
      expect(firstRow).toHaveClass('cursor-pointer', 'hover:bg-gray-50');
    });
  });

  describe('Address Formatting', () => {
    it('formats complete address correctly', () => {
      render(<UserTable users={mockUsers} onUserClick={mockOnUserClick} />);
      
      const addressElements = screen.getAllByText('123 Main St, CA, San Francisco, 94102');
      expect(addressElements[0]).toBeInTheDocument();
      expect(addressElements[0].closest('div')).toHaveClass('truncate');
    });

    it('provides tooltip with full address for truncated text', () => {
      render(<UserTable users={mockUsers} onUserClick={mockOnUserClick} />);
      
      const addressElements = screen.getAllByText('123 Main St, CA, San Francisco, 94102');
      expect(addressElements[0].closest('div')).toHaveAttribute('title', '123 Main St, CA, San Francisco, 94102');
    });
  });

  describe('Responsive Design', () => {
    it('renders table headers for desktop view', () => {
      render(<UserTable users={mockUsers} onUserClick={mockOnUserClick} />);

      const tableHeaders = screen.getAllByText('Full Name');
      expect(tableHeaders.length).toBeGreaterThan(0);
      expect(screen.getAllByText('Email Address').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Address').length).toBeGreaterThan(0);
    });

    it('maintains proper column width for address column', () => {
      render(<UserTable users={mockUsers} onUserClick={mockOnUserClick} />);
      
      const addressCell = screen.getAllByText('123 Main St, CA, San Francisco, 94102')[0].closest('td');
      expect(addressCell).toHaveStyle('width: 392px');
    });
  });
});