import apiClient from './apiClient';
import { ENDPOINTS } from './apiConstants';

export const createSubscription = async (payload) => {
  const response = await apiClient.post(ENDPOINTS.subscriptionCreate, payload);
  return response.data;
};
