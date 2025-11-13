import React, { useState } from "react";
import { useAuth } from "../auth/useAuth";

export default function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login({ username, password, remember });
    } catch {
      setError("Λάθος στοιχεία ή πρόβλημα σύνδεσης.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <form
        onSubmit={handleSubmit}
        className="grid gap-3 max-w-xs mx-auto p-4 bg-white rounded-xl shadow"
      >
        <h2 className="text-2xl font-bold text-center">Σύνδεση</h2>

        <input
          className="border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="h-4 w-4"
          />
          Remember me
        </label>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>

        {error && (
          <small className="text-red-600 text-center">{error}</small>
        )}
      </form>
    </div>
  );
}
