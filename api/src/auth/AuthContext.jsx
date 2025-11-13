import React, { createContext, useEffect, useMemo, useState } from "react";
import { login as svcLogin, logout as svcLogout, getAccessToken, decodeJwt } from "../services/authService.js";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => getAccessToken());
  const [user, setUser] = useState(() => {//Αν υπάρχει token, κάνει decodeJwt(token) (από το authService.js) για να διαβάσει ποιος είναι ο χρήστης.Αν όχι, βάζει null.
    const t = getAccessToken();
    return t ? decodeJwt(t) : null;
  });

  useEffect(() => {
    if (!token) setUser(null);
    else setUser(decodeJwt(token));
  }, [token]);

  const value = useMemo(() => ({
    token,
    user,
    isAuthenticated: Boolean(token),
    async login({ username, password, remember }) {  //Στέλνει τα στοιχεία στο server και περιμένει το token ως απάντηση.
      const data = await svcLogin({ username, password, remember });
      setToken(data.access_token);
      return data;
    },
    logout() {
      svcLogout();
      setToken(null);
    },
  }), [token, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
