// src/services/authService.js
// Όλη η δουλειά με το Keycloak token endpoint μέσω proxy:
// login({ username, password, remember }) → POST /kc-token με grant_type=password, βάζει access_token (και refresh_token αν υπάρχει) σε localStorage ή sessionStorage ανάλογα με remember.
// getAccessToken() → διαβάζει token από storage.
// decodeJwt(token) → κάνει decode το JWT payload σε αντικείμενο χρήστη.
// logout() → καθαρίζει και τα δύο storages.

import axios from "axios";

const TOKEN_URL = "/kc-token"; // proxy προς Keycloak

function storage(remember) {
  return remember ? localStorage : sessionStorage;
}

export function getAccessToken() {
  return localStorage.getItem("access_token") || sessionStorage.getItem("access_token");
}

export function decodeJwt(token) {    //Διαβάζει το token και “μεταφράζει” ποιος είναι ο χρήστης και πότε λήγει.
  try {
    const [, payload] = token.split("."); //Κόβει το token στο . και παίρνει το payload (yyyyy).
    return JSON.parse(atob(payload));  //Το μετατρέπει από Base64 σε κείμενο (atob(payload))
  } catch {
    return null;
  }
}

export async function login({ username, password, remember = true }) {  //Στέλνει αίτημα στο Keycloak (μέσω proxy) για να πάρει token.
  const form = new URLSearchParams({
    grant_type: "password",
    username,
    password,
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
