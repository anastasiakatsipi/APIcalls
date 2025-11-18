// src/pages/Environment.jsx
import React, { useEffect, useState } from "react";
import { apiSuper } from "../services/apiClient";
import Co2Chart from "../components/themes/environment/Co2Chart";
import TemperatureChart from "../components/themes/environment/TemperatureChart";
import SchoolMap from "../components/main/SchoolMap";
import schoolsData from "../data/schools.json";
import { apiSnap } from "../services/apiClient";

export default function Environment() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAll = async () => {
    try {
      setLoading(true);

      // 1️⃣ Φτιάχνουμε όλα τα serviceUri σε ένα string
      const uriList = schoolsData.map(s => s.serviceUri).join(";");

      console.log("URI LIST:", uriList);
      
      // ---------------------------------------------------
      // 1️⃣ ΚΑΝΕ ΜΙΑ ΚΑΘΑΡΗ ΚΛΗΣΗ ΣΤΟ EXACT URI ΠΟΥ ΘΕΛΕΙΣ
      // ---------------------------------------------------
      const { data } = await apiSnap.get("/ServiceMap/api/v1//iot-search/", {
        params: {
          selection: "36.0;27.7;36.6;28.3",
          type: "RhodesBuildingProfile",
          serviceUri: uriList,
          format: "json",
        },
      });

       
      console.log("RESPONSE DATA:", data);

      const features = data?.features ?? [];
      if (features.length === 0) {
        console.warn("No devices found.");
        setRows([]);
        setLoading(false);
        return;
      }

      // 2. Μετατροπή feature → row
      const rows = features.map((f) => {
        const props = f.properties;
        const values = props.values || {};

        return {
          name: props.deviceName || props.name,
          lat: f.geometry.coordinates[1],
          lng: f.geometry.coordinates[0],
          co2: Number(values.co2 ?? null),
          temperature: Number(values.outdoor_temperature ?? null),
        };
      });

      setRows(rows);
      setLoading(false);

    } catch (err) {
      console.error("FETCH ERROR:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const chartData = rows.map((r) => ({ name: r.name, co2: r.co2 }));
  const tempData = rows.map((r) => ({ name: r.name, temperature: r.temperature }));

  return (
    <div className="p-8 space-y-6 w-full mx-auto max-w-6xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        📊 Environment – CO₂ & Temperature Levels
      </h2>

      <button
        onClick={fetchAll}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Φόρτωση..." : "Ανανέωση Δεδομένων"}
      </button>

      <div className="grid grid-cols-2 gap-6">
        <div className="p-4 bg-white rounded-xl shadow-md">
          <Co2Chart data={chartData} />
        </div>

        <div className="p-4 bg-white rounded-xl shadow-md">
          <TemperatureChart data={tempData} />
        </div>
      </div>

      <div className="p-4 bg-white rounded-xl shadow-md">
        <SchoolMap schools={rows} />
      </div>
    </div>
  );
}