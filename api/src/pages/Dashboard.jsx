// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { api } from "../services/apiClient";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      const { data } = await api.get("/ServiceMap/api/v1/?serviceUri=http://www.disit.org/km4city/resource/iot/orion-1/Organization/akadimia", {
        params: { from: "2025-01-01", to: "2025-02-01" },
      });
      setData(data);
    })();
  }, []);

  return (
    <div>
      <h1>Πίνακας Δεδομένων</h1>
      {!data ? <p>Φόρτωση...</p> : <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
