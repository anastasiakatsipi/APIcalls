// src/App.jsx
import React from "react";
import { useAuth } from "./auth/useAuth";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import LogoutButton from "./components/LogoutButton";

export default function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div style={{ padding: 16 }}>
      {isAuthenticated ? (
        <>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <LogoutButton />
          </div>
          <Dashboard />
        </>
      ) : (
        <LoginPage />
      )}
    </div>
  );
}
