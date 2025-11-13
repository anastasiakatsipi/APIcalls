// src/pages/Dashboard.jsx
import React, { useEffect, useState, useCallback } from "react";
import { api } from "../services/apiClient";
import schools from "../data/schools.json";

// imports για τα διαγράμματα
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";

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
  //<pre>{JSON.stringify(rows, null, 2)}</pre>
  const fetchAll = useCallback(async () => {
    setLoading(true);
    const results = await Promise.allSettled(schools.map(fetchOne));
    setRows(
      results
        .filter((r) => r.status === "fulfilled")
        .map((r) => r.value)
    );
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // 🔹 Προετοιμασία δεδομένων για το διάγραμμα
  const chartData = rows
    .filter((r) => r.co2 != null) // μόνο όσα έχουν τιμή CO2
    .map((r) => ({
      name: r.name,
      co2: Number(r.co2),
    }));

  return (
    <div className="p-10 mx-10 space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={fetchAll}
          disabled={loading}
          className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg disabled:opacity-60"
        >
          {loading ? "Φόρτωση..." : "Ανανέωση όλων"}
        </button>

        <span className="text-sm text-gray-600">
          Διάγραμμα CO₂ ανά σχολείο (άξονας Χ = σχολεία, άξονας Υ = CO₂ σε ppm).
        </span>
      </div>

      <div className="w-full h-[500px] rounded-xl bg-white shadow p-4">
        {chartData.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            Δεν υπάρχουν διαθέσιμα δεδομένα CO₂ για εμφάνιση.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 10, bottom: 80 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                interval={0}
                height={80}
              />
              <YAxis
                label={{
                  value: "CO₂ (ppm)",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip />
              <Legend />
              <Bar dataKey="co2" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>


    </div>
  );
}
