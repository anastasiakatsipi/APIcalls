import axios from "axios";

const TOKEN_URL = "/kc-token"; // proxy προς Keycloak

function storage(remember) {
  return remember ? localStorage : sessionStorage;
}

export function getAccessToken() {
  return localStorage.getItem("access_token") || sessionStorage.getItem("access_token");
}

export function decodeJwt(token) {
  try {
    const [, payload] = token.split(".");
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

export async function login({ username, password, remember = true }) {
  const form = new URLSearchParams({
    grant_type: "password",
    username,
    password,
    // scope: "offline_access" // αν θες refresh tokens
  });

  const { data } = await axios.post(TOKEN_URL, form, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    auth: {
      username: import.meta.env.VITE_CLIENT_ID,
      password: import.meta.env.VITE_CLIENT_SECRET,
    },
  });

  const s = storage(remember);
  s.setItem("access_token", data.access_token);
  if (data.refresh_token) s.setItem("refresh_token", data.refresh_token);

  return data;
}

export function logout() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  sessionStorage.removeItem("access_token");
  sessionStorage.removeItem("refresh_token");
}
