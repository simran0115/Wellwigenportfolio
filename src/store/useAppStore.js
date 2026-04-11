import create from 'zustand';
import { loginUser, registerUser } from '../services/authService';
import { createSubscription as createSubscriptionService } from '../services/subscriptionService';

const useAppStore = create((set) => ({
  auth: {
    user: null,
    loading: false,
    error: null,
    success: null,
  },
  subscription: {
    selectedPlan: null,
    loading: false,
    error: null,
    success: null,
  },

  setSelectedPlan: (plan) =>
    set((state) => ({
      subscription: {
        ...state.subscription,
        selectedPlan: plan,
        error: null,
        success: null,
      },
    })),

  clearAuthStatus: () =>
    set((state) => ({
      auth: {
        ...state.auth,
        error: null,
        success: null,
      },
    })),

  clearSubscriptionStatus: () =>
    set((state) => ({
      subscription: {
        ...state.subscription,
        error: null,
        success: null,
      },
    })),

  login: async (credentials) => {
    set((state) => ({
      auth: {
        ...state.auth,
        loading: true,
        error: null,
        success: null,
      },
    }));

    try {
      const user = await loginUser(credentials);
      set((state) => ({
        auth: {
          ...state.auth,
          user,
          loading: false,
          error: null,
          success: 'Login successful',
        },
      }));
      return user;
    } catch (error) {
      set((state) => ({
        auth: {
          ...state.auth,
          loading: false,
          error: error.message || 'Login failed',
          success: null,
        },
      }));
      throw error;
    }
  },

  logout: () =>
    set(() => ({
      auth: {
        user: null,
        loading: false,
        error: null,
        success: null,
      },
    })),

  register: async (payload) => {
    set((state) => ({
      auth: {
        ...state.auth,
        loading: true,
        error: null,
        success: null,
      },
    }));

    try {
      const data = await registerUser(payload);
      set((state) => ({
        auth: {
          ...state.auth,
          loading: false,
          error: null,
          success: data.message || 'Registration successful',
        },
      }));
      return data;
    } catch (error) {
      set((state) => ({
        auth: {
          ...state.auth,
          loading: false,
          error: error.message || 'Registration failed',
          success: null,
        },
      }));
      throw error;
    }
  },

  submitSubscription: async (payload) => {
    set((state) => ({
      subscription: {
        ...state.subscription,
        loading: true,
        error: null,
        success: null,
      },
    }));

    try {
      const data = await createSubscriptionService(payload);
      set((state) => ({
        subscription: {
          ...state.subscription,
          loading: false,
          error: null,
          success: data.message || 'Subscription created successfully',
        },
      }));
      return data;
    } catch (error) {
      set((state) => ({
        subscription: {
          ...state.subscription,
          loading: false,
          error: error.message || 'Subscription failed',
          success: null,
        },
      }));
      throw error;
    }
  },
}));

export default useAppStore;
