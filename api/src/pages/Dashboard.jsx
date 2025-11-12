// src/pages/Dashboard.jsx
import React, { useEffect, useState, useCallback } from "react";
import { api } from "../services/apiClient";
import schools from "../data/schools.json"; // <— Η λίστα σου
import SchoolCard from "../components/SchoolCard"; // ή RealtimeData για κάθε ένα

const from = "2025-01-01";
const to = "2025-02-01";

export default function Dashboard() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOne = async (s) => {
    const { data } = await api.get("/ServiceMap/api/v1/", {
      params: { serviceUri: s.serviceUri, from, to },
    });
    const feat = data?.Service?.features?.[0];
    const rt = data?.realtime?.results?.bindings?.[0];

    return {
      name: s.name || feat?.properties?.name,
      lat: feat?.geometry?.coordinates?.[1] ?? null,
      lng: feat?.geometry?.coordinates?.[0] ?? null,
      time: rt?.measuredTime?.value ?? rt?.dateObserved?.value ?? null,
      temperature: rt?.temperature?.value ?? null,
      humidity: rt?.humidity?.value ?? null,
      co2: rt?.co2?.value ?? null,
      pm25: rt?.PM25?.value ?? null,
      raw: data,
    };
  };

  const fetchAll = useCallback(async () => {
    setLoading(true);
    const results = await Promise.allSettled(schools.map(fetchOne));
    setRows(results.filter(r => r.status==="fulfilled").map(r => r.value));
    setLoading(false);
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  return (
    <div style={{display:"grid", gap:12}}>
      <div>
        <button onClick={fetchAll} disabled={loading}>
          {loading ? "Φόρτωση..." : "Ανανέωση όλων"}
        </button>
      </div>
      {rows.map((s, i) => (
        <SchoolCard key={i} school={{
          name: s.name,
          typeLabel: "School",
          lat: s.lat, lng: s.lng,
          measuredTime: s.time,
          metrics: {
            temperature: s.temperature && Number(s.temperature),
            humidity: s.humidity && Number(s.humidity),
            co2: s.co2 && Number(s.co2),
            pm25: s.pm25 && Number(s.pm25),
          }
        }}/>
      ))}
    </div>
  );
}
