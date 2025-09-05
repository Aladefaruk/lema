import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UsersPage } from './features/users';
import { UserPostsPage } from './features/posts';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<UsersPage />} />
          <Route path="/users/:userId/posts" element={<UserPostsPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;