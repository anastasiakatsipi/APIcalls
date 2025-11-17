import React from "react";
import { useAuth } from "../../auth/useAuth.js";

export default function LogoutButton() {
  const { logout } = useAuth();
  return <button onClick={logout}
                className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg disabled:opacity-60" >Logout</button>;
}
