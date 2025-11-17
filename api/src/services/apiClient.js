// src/services/apiClient.js
import axios from "axios";
import {
  getAccessToken,
  refreshTokens,
  logout as svcLogout,
} from "./authService";

// Δημιουργούμε ένα axios instance για τα API calls προς Snap4City
export const api = axios.create({
  baseURL: "/snap", // όπως ήδη το έχεις
});

// 🔹 Request interceptor – βάζει πάντα το Authorization header
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔹 Response interceptor – παίζει το "refresh" παιχνίδι όταν πάρουμε 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Αν δεν έχουμε response ή δεν είναι 401 → απλά πέτα το error
    if (!error.response || error.response.status !== 401) {
      return Promise.reject(error);
    }

    // Αποφεύγουμε infinite loop
    if (originalRequest._retry) {
      return Promise.reject(error);
    }
    originalRequest._retry = true;

    try {
      // Προσπάθησε να κάνεις refresh
      const newAccessToken = await refreshTokens();

      // Βάλε το νέο token στο header του αρχικού request
      originalRequest.headers = originalRequest.headers || {};
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      // Ξαναδοκίμασε το αρχικό request με το νέο token
      return api(originalRequest);
    } catch (refreshError) {
      console.error("Refresh token failed:", refreshError);

      // Αν αποτύχει το refresh → καθαρίζουμε και πάμε για login
      svcLogout();
      window.location.href = "/"; // ή "/login" ανάλογα τι έχεις

      return Promise.reject(refreshError);
    }
  }
);
