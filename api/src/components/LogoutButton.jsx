import React from "react";
import { useAuth } from "../auth/useAuth.js";

export default function LogoutButton() {
  const { logout } = useAuth();
  return <button onClick={logout}>Logout</button>;
}
