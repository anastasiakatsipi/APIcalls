// src/App.jsx
import React from "react";
import { useAuth } from "./auth/useAuth";
import LoginPage from "./pages/LoginPage";
import ManagerDashboard from "./pages/ManagerDashboard";

export default function App() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return <ManagerDashboard />;
}
