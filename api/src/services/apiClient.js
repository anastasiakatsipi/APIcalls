import axios from "axios";

export const api = axios.create({
  baseURL: "/snap", // proxy προς https://snap4.rhodes.gr
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token") || sessionStorage.getItem("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});