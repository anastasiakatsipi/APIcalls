// src/pages/EnvironmentPage.jsx
import React, { useEffect, useState, useCallback } from "react";
import { api } from "../services/apiClient";
import schools from "../data/schools.json";
import Co2Chart from "../components/themes/environment/Co2Chart";
import TemperatureChart from "../components/themes/environment/TemperatureChart";


const from = "2025-01-01";
const to = "2025-02-01";

export default function EnvironmentPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOne = async (s) => {
  try {
    const { data } = await api.get("/ServiceMap/api/v1/", {
      params: { serviceUri: s.serviceUri, from, to },
    });

    const feat = data?.Service?.features?.[0];
    const rt = data?.realtime?.results?.bindings?.[0];

    return {
      ok: true,
      name: s.name || feat?.properties?.name,
      co2: rt?.co2?.value ?? null,
      temperature: rt?.temperature?.value ?? null,   // 👈 ΠΡΟΣΘΗΚΗ
    };
  } catch (err) {
    const status = err?.response?.status;
    console.warn(
      `Δεν υπάρχουν δεδομένα / δεν έχει access για σχολείο: ${s.name} (status: ${status})`
    );
    return { ok: false, name: s.name };
  }
};


  const fetchAll = useCallback(async () => {
    setLoading(true);

    const results = await Promise.all(schools.map(fetchOne));

    const success = results.filter((r) => r.ok);
    const failed = results.filter((r) => !r.ok);

    if (failed.length > 0) {
      console.warn(
        "Τα παρακάτω σχολεία δεν εμφανίστηκαν:",
        failed.map((f) => f.name)
      );
    }

    setRows(success);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const chartData = rows
    .filter((r) => r.co2 != null)
    .map((r) => ({
      name: r.name,
      co2: Number(r.co2),
    }));

    const tempChartData = rows
  .filter((r) => r.temperature != null)
  .map((r) => ({
    name: r.name,
    temperature: Number(r.temperature),
  }));


  return (
    
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Environment – CO₂ Levels</h2>
        <button
          onClick={fetchAll}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
        >
          {loading ? "Φόρτωση..." : "Ανανέωση"}
        </button>
      </div>

      <div className="grid grid-cols-2 space-x-4">
        {/* C02 */}
        <div className="grid-1"><Co2Chart data={chartData} /></div>
        
        {/* Θερμοκρασία */}
        <div className="grid-1"><TemperatureChart data={tempChartData} /></div>
      </div>
      

    </div>
  );
}
