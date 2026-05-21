import apiClient from './apiClient';
import { ENDPOINTS } from './apiConstants';

export const loginUser = async ({ email, password }) => {
  try {
    const response = await apiClient.post('/api/user/login', { email, password });
    
    // The backend typically returns { message: "...", user: {...}, token: "..." }
    // or just the user data. Let's return the user payload.
    if (response.data && response.data.user) {
        return {
            ...response.data.user,
            token: response.data.token
        };
    }
    
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || 'Login failed');
  }
};

export const registerUser = async (payload) => {
  try {
    // payload usually has name, email, mobile, password
    const response = await apiClient.post('/api/user/register', payload);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || 'Registration failed');
  }
};

