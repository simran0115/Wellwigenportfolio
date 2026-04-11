import axios from 'axios';
import { API_BASE_URL } from './apiConstants';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.message ||
      error?.response?.statusText ||
      error?.message ||
      'Network error';
    return Promise.reject(new Error(message));
  }
);

export default apiClient;
