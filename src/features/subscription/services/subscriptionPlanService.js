import apiClient from "../../../services/apiClient";

const ENDPOINT = "/api/subscription-plans";

export const subscriptionPlanService = {
  getAllPlans: async () => {
    const res = await apiClient.get(ENDPOINT);
    return res.data;
  },

  getActivePlans: async () => {
    const res = await apiClient.get(`${ENDPOINT}/active`);
    return res.data;
  },

  createPlan: async (planData) => {
    const res = await apiClient.post(ENDPOINT, planData);
    return res.data;
  },

  updatePlan: async (id, planData) => {
    const res = await apiClient.put(`${ENDPOINT}/${id}`, planData);
    return res.data;
  },

  deletePlan: async (id) => {
    const res = await apiClient.delete(`${ENDPOINT}/${id}`);
    return res.data;
  },

  togglePlanStatus: async (id) => {
    const res = await apiClient.patch(`${ENDPOINT}/${id}/status`);
    return res.data;
  },
};

