// src/services/apiClient.js
// Axios instance για τα business endpoints (π.χ. Snap4City) με:
// baseURL: "/snap" (proxy προς https://snap4.rhodes.gr)
// request interceptor που βάζει αυτόματα Authorization: Bearer <token> από storage.

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


//Request interceptor. Τρέχει πριν φύγει το αίτημα.
// Φαντάσου ότι κάθε φορά που η εφαρμογή σου στέλνει ένα αίτημα (request) προς το API,
// αυτό περνάει από έναν “διάδρομο”.
// Στην είσοδο και στην έξοδο αυτού του διαδρόμου μπορείς να βάλεις φρουρούς που θα ελέγχουν, θα αλλάζουν ή θα προσθέτουν πράγματα στο αίτημα.
// Αυτοί οι “φρουροί” είναι οι interceptors.