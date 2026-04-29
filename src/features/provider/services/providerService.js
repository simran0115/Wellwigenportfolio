import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const saveProgressApi = async (data) => {
  const response = await axios.post(`${API_URL}/provider/save-progress`, data);
  return response.data;
};

export const registerProviderApi = async (formData) => {
  const response = await axios.post(`${API_URL}/provider/register`, formData);
  return response.data;
};

export const uploadProviderDocumentsApi = async (formData) => {
  const response = await axios.post(`${API_URL}/provider/upload-documents`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

export const getProviderStatusApi = async (providerId) => {
  const response = await axios.get(`${API_URL}/provider/me/${providerId}`);
  return response.data;
};

export const addProviderItemApi = async (itemData) => {
  const response = await axios.post(`${API_URL}/product`, itemData);
  return response.data;
};

// Also keeping the object export for flexibility
export const providerService = {
  register: registerProviderApi,
  uploadDocs: uploadProviderDocumentsApi,
  getStatus: getProviderStatusApi,
  addItem: addProviderItemApi
};
