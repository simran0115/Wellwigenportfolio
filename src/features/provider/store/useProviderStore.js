import { create } from 'zustand';
import {
  registerProviderApi,
  saveProgressApi,
  uploadProviderDocumentsApi,
} from '../services/providerService.js';

export const useProviderStore = create((set, get) => ({
  provider: JSON.parse(localStorage.getItem('wellwigen_onboarding_provider')) || null,
  isLoading: false,
  error: null,

  initialize: () => {
    const saved = localStorage.getItem('wellwigen_onboarding_provider');
    if (saved) set({ provider: JSON.parse(saved) });
  },

  saveProgress: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const data = await saveProgressApi(payload);
      set({ provider: data.data, isLoading: false });
      localStorage.setItem('wellwigen_onboarding_provider', JSON.stringify(data.data));
      return data;
    } catch (error) {
      set({ isLoading: false, error: error.message });
      throw error;
    }
  },

  registerProvider: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const data = await registerProviderApi(payload);
      set({ provider: data.data, isLoading: false });
      localStorage.setItem('wellwigen_onboarding_provider', JSON.stringify(data.data));
      return data;
    } catch (error) {
      set({ isLoading: false, error: error.message });
      throw error;
    }
  },

  uploadDocuments: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const data = await uploadProviderDocumentsApi(payload);
      set({ provider: data.data, isLoading: false });
      return data;
    } catch (error) {
      set({ isLoading: false, error: error.message });
      throw error;
    }
  },
}));
