import { create } from 'zustand';
import {
  registerProviderApi,
  uploadProviderDocumentsApi,
} from '../services/providerService.js';

export const useProviderStore = create((set, get) => ({
  provider: null,
  isLoading: false,
  error: null,

  registerProvider: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const data = await registerProviderApi(payload);
      set({ provider: data.data, isLoading: false });
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
