import axios from "axios";
import { getAccessToken } from "./authService";

export const apiSuper = axios.create({
  baseURL: "/super", // ΣΩΣΤΟ για το proxy του Vite
});

apiSuper.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
