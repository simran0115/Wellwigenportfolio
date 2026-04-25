import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

// 🔐 attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const getProducts = () => API.get("/products/vendor-products");
export const getStats = () => API.get("/dashboard/stats");