import { create } from 'zustand';
import {
  createSubscriptionApi,
  verifyPaymentApi,
  fetchMySubscriptionApi,
  cancelSubscriptionApi,
  pauseSubscriptionApi
} from '../services/subscriptionService.js';

export const useSubscriptionStore = create((set, get) => ({
  subscription: null,
  isLoading: false,
  error: null,

  createSubscription: async (plan, billingCycle, userId) => {
    set({ isLoading: true, error: null });
    try {
      const data = await createSubscriptionApi({ plan, billingCycle, userId });
      set({ isLoading: false });
      return data; // Returns razorpaySubscriptionId and key
    } catch (error) {
      set({ isLoading: false, error: error.message });
      throw error;
    }
  },

  verifyPayment: async (paymentResponse, subscriptionId) => {
    set({ isLoading: true, error: null });
    try {
      const data = await verifyPaymentApi({ ...paymentResponse, subscriptionId });
      set({ subscription: data.data, isLoading: false });
      return data;
    } catch (error) {
      set({ isLoading: false, error: error.message });
      throw error;
    }
  },

  fetchMySubscription: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const data = await fetchMySubscriptionApi(userId);
      set({ subscription: data.data, isLoading: false });
    } catch (error) {
      set({ isLoading: false, error: error.message });
    }
  },

  cancelSubscription: async (subscriptionId) => {
    set({ isLoading: true, error: null });
    try {
      const data = await cancelSubscriptionApi(subscriptionId);
      set({ subscription: data.data, isLoading: false });
    } catch (error) {
      set({ isLoading: false, error: error.message });
      throw error;
    }
  },

  pauseSubscription: async (subscriptionId) => {
    set({ isLoading: true, error: null });
    try {
      const data = await pauseSubscriptionApi(subscriptionId);
      set({ subscription: data.data, isLoading: false });
    } catch (error) {
      set({ isLoading: false, error: error.message });
      throw error;
    }
  }
}));
