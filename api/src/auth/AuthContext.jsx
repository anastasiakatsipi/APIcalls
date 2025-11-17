// ✅ ΟΛΑ τα imports στην κορυφή
import React, { createContext, useEffect, useMemo, useState } from "react";
import {
  login as svcLogin,
  logout as svcLogout,
  getAccessToken,
  decodeJwt,
} from "../services/authService.js";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => getAccessToken());
  const [user, setUser] = useState(() => {
    const t = getAccessToken();
    return t ? decodeJwt(t) : null;
  });

  useEffect(() => {
    if (!token) setUser(null);
    else setUser(decodeJwt(token));
  }, [token]);

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token),
      async login({
        username,
        password,
        client_id,
        client_secret,
        remember = true,
      }) {
        const data = await svcLogin({
          username,
          password,
          client_id,
          client_secret,
          remember,
        });
        setToken(data.access_token);
        return data;
      },
      logout() {
        svcLogout();
        setToken(null);
      },
    }),
    [token, user]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}
