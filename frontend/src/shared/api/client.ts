const API_BASE_URL = process.env.REACT_APP_API_URL || 
  (process.env.NODE_ENV === 'production' ? 'https://web-developer-backend.onrender.com' : 'http://localhost:3001');

export const apiClient = {
  get: async (endpoint: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return response.json();
      }
      return response.text();
    } catch (error) {
      if (error instanceof TypeError) {
        throw new Error('Network error: Please check your connection');
      }
      throw error;
    }
  },

  post: async (endpoint: string, data: Record<string, unknown>) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return response.json();
      }
      return response.text();
    } catch (error) {
      if (error instanceof TypeError) {
        throw new Error('Network error: Please check your connection');
      }
      throw error;
    }
  },

  delete: async (endpoint: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return response.json();
      }
      return response.text();
    } catch (error) {
      if (error instanceof TypeError) {
        throw new Error('Network error: Please check your connection');
      }
      throw error;
    }
  },
};