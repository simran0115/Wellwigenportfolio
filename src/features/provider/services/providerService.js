import apiClient from "../../../services/apiClient.js";
import { ENDPOINTS } from "../../../services/apiConstants.js";

export const registerProviderApi = async (payload) => {
  const { data } = await apiClient.post(ENDPOINTS.providerRegister, payload);
  return data;
};

export const uploadProviderDocumentsApi = async (payload) => {
  const { data } = await apiClient.post(ENDPOINTS.providerUploadDocs, payload);
  return data;
};
