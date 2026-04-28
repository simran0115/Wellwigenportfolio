import apiClient from "../../../services/apiClient.js";
import { ENDPOINTS } from "../../../services/apiConstants.js";

export const createSubscriptionApi = async (payload) => {
  const { data } = await apiClient.post(ENDPOINTS.subscriptionCreate, payload);
  return data;
};

export const verifyPaymentApi = async (payload) => {
  const { data } = await apiClient.post(ENDPOINTS.subscriptionVerify, payload);
  return data;
};

export const fetchMySubscriptionApi = async (userId) => {
  const { data } = await apiClient.get(ENDPOINTS.subscriptionMe(userId));
  return data;
};

export const cancelSubscriptionApi = async (subscriptionId) => {
  const { data } = await apiClient.post(ENDPOINTS.subscriptionCancel(subscriptionId));
  return data;
};

export const pauseSubscriptionApi = async (subscriptionId) => {
  const { data } = await apiClient.post(ENDPOINTS.subscriptionPause(subscriptionId));
  return data;
};
