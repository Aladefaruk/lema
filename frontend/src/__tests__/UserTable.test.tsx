import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserTable from '../features/users/components/UserTable';
import { User } from '../shared/types';

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

describe('UserTable', () => {
  const mockOnUserClick = jest.fn();

  beforeEach(() => {
    mockOnUserClick.mockClear();
  });

  it('renders user data correctly', () => {
    render(<UserTable users={mockUsers} onUserClick={mockOnUserClick} />);

    expect(screen.getByText('John Doe')).toBeTruthy();
    expect(screen.getByText('john@example.com')).toBeTruthy();
    expect(screen.getByText('123 Main St, CA, San Francisco, 94102')).toBeTruthy();

    expect(screen.getByText('Jane Smith')).toBeTruthy();
    expect(screen.getByText('jane@example.com')).toBeTruthy();
    expect(screen.getByText('No address')).toBeTruthy();
  });

  it('calls onUserClick when a row is clicked', () => {
    render(<UserTable users={mockUsers} onUserClick={mockOnUserClick} />);

    const firstRow = screen.getByText('John Doe').closest('tr');
    fireEvent.click(firstRow!);

    expect(mockOnUserClick).toHaveBeenCalledWith(mockUsers[0]);
  });

  it('renders table headers correctly', () => {
    render(<UserTable users={mockUsers} onUserClick={mockOnUserClick} />);

    expect(screen.getByText('Full Name')).toBeTruthy();
    expect(screen.getByText('Email Address')).toBeTruthy();
    expect(screen.getByText('Address')).toBeTruthy();
  });
});