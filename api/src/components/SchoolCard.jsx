import React from "react";

export default function SchoolCard({ school }) {
  if (!school) return null;

  const { name, lat, lng, measuredTime, metrics = {} } = school;

  return (
    <div className="p-4 border rounded-xl shadow-sm bg-white max-w-md">
      <h3 className="text-lg font-semibold mb-2">{name}</h3>

      <p className="text-sm text-gray-600">
        Συντεταγμένες: {lat ?? "—"}, {lng ?? "—"}
      </p>

      <p className="text-xs text-gray-500 mt-1">
        Ώρα μέτρησης:{" "}
        {measuredTime
          ? new Date(measuredTime).toLocaleString("el-GR")
          : "—"}
      </p>

      <hr className="my-3" />

      <div className="grid grid-cols-2 gap-2">
        <Metric
          label="Θερμοκρασία"
          value={
            metrics.temperature
              ? metrics.temperature + " °C"
              : "—"
          }
        />

        <Metric
          label="Υγρασία"
          value={
            metrics.humidity
              ? metrics.humidity + " %"
              : "—"
          }
        />

        <Metric
          label="CO₂"
          value={
            metrics.co2
              ? metrics.co2 + " ppb"
              : "—"
          }
        />

        <Metric
          label="PM2.5"
          value={
            metrics.pm25
              ? metrics.pm25 + " mg/m³"
              : "—"
          }
        />
      </div>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="p-2 bg-gray-100 rounded-lg text-center">
      <div className="text-xs text-gray-600">{label}</div>
      <div className="text-sm font-medium">{value}</div>
    </div>
  );
}
