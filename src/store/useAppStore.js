import { create } from "zustand";
import { loginUser, registerUser } from "../services/authService";
import { createSubscription as createSubscriptionService } from "../services/subscriptionService";

const useAppStore = create((set) => ({
  // ================= AUTH =================
  auth: {
    user: null,
    loading: false,
    error: null,
    success: null,
  },

  // ================= SUBSCRIPTION =================
  subscription: {
    selectedPlan: null,
    loading: false,
    error: null,
    success: null,
  },

  // ================= PLAN =================
  setSelectedPlan: (plan) =>
    set((state) => ({
      subscription: {
        ...state.subscription,
        selectedPlan: plan,
        error: null,
        success: null,
      },
    })),

  // ================= CLEAR AUTH STATUS =================
  clearAuthStatus: () =>
    set((state) => ({
      auth: {
        ...state.auth,
        error: null,
        success: null,
      },
    })),

  // ================= CLEAR SUBSCRIPTION STATUS =================
  clearSubscriptionStatus: () =>
    set((state) => ({
      subscription: {
        ...state.subscription,
        error: null,
        success: null,
      },
    })),

  // ================= LOGIN =================
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
          success: "Login successful",
        },
      }));

      return user;
    } catch (error) {
      set((state) => ({
        auth: {
          ...state.auth,
          loading: false,
          error: error?.message || "Login failed",
          success: null,
        },
      }));
      throw error;
    }
  },

  // ================= LOGOUT =================
  logout: () =>
    set({
      auth: {
        user: null,
        loading: false,
        error: null,
        success: null,
      },
    }),

  // ================= REGISTER =================
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
          success: data?.message || "Registration successful",
        },
      }));

      return data;
    } catch (error) {
      set((state) => ({
        auth: {
          ...state.auth,
          loading: false,
          error: error?.message || "Registration failed",
          success: null,
        },
      }));
      throw error;
    }
  },

  // ================= SUBSCRIPTION =================
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
          success: data?.message || "Subscription created successfully",
        },
      }));

      return data;
    } catch (error) {
      set((state) => ({
        subscription: {
          ...state.subscription,
          loading: false,
          error: error?.message || "Subscription failed",
          success: null,
        },
      }));
      throw error;
    }
  },
}));

export default useAppStore;