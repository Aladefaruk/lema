# Frontend

A React TypeScript application for managing users and their posts.

## Features

- **Users Table**: Paginated list of users with their details
- **User Posts**: View, create, and delete posts for each user
- **Responsive Design**: Built with Tailwind CSS
- **State Management**: React Query for server state
- **Error Handling**: Error states and loading indicators
- **Unit Tests**: Jest and React Testing Library

## Tech Stack

- React 18
- TypeScript
- React Query (TanStack Query)
- React Router DOM
- Tailwind CSS
- Jest & React Testing Library

## Installation

1. Install dependencies:
```bash
pnpm install
```

2. Start the development server:
```bash
pnpm start
```

3. Run tests:
```bash
pnpm test
```

## API Configuration

The app connects to the backend API at `http://localhost:3001`. Make sure the backend server is running before starting the frontend.

## Project Structure

```
src/
├── api/           # API client and endpoints
├── components/    # Reusable UI components
├── hooks/         # Custom React Query hooks
├── pages/         # Page components
├── types/         # TypeScript type definitions
└── App.tsx        # Main app component
```

## Available Scripts

- `pnpm start` - Start development server
- `pnpm build` - Build for production
- `pnpm test` - Run unit tests
- `pnpm eject` - Eject from Create React App