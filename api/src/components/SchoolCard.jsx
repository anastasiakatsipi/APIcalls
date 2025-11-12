// src/components/SchoolCard.jsx
import React from "react";

export default function SchoolCard({ school }) {
  if (!school) return null;

  const { name, lat, lng, measuredTime, metrics = {} } = school;

  // helper για όμορφη εμφάνιση
  const fmt = (val, unit = "") =>
    val === null || val === undefined || val === "" ? "—" : `${val}${unit}`;

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: 12,
        padding: 16,
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        background: "#fff",
        maxWidth: 500,
      }}
    >
      <h3 style={{ margin: "0 0 8px 0", color: "#333" }}>{name}</h3>

      <p style={{ fontSize: 14, margin: "4px 0", color: "#666" }}>
        Συντεταγμένες: {lat ?? "—"}, {lng ?? "—"}
      </p>

      <p style={{ fontSize: 13, margin: "4px 0", color: "#777" }}>
        Ώρα μέτρησης:{" "}
        {measuredTime
          ? new Date(measuredTime).toLocaleString("el-GR")
          : "—"}
      </p>

      <hr style={{ margin: "8px 0" }} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 8,
          fontSize: 15,
        }}
      >
        <Metric label="Θερμοκρασία" value={fmt(metrics.temperature, " °C")} />
        <Metric label="Υγρασία" value={fmt(metrics.humidity, " %")} />
        <Metric label="CO₂" value={fmt(metrics.co2, " ppb")} />
        <Metric label="PM2.5" value={fmt(metrics.pm25, " mg/m³")} />
      </div>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div
      style={{
        background: "#f9f9f9",
        borderRadius: 10,
        padding: "10px 12px",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 12, color: "#555" }}>{label}</div>
      <div style={{ fontWeight: 500, fontSize: 16 }}>{value}</div>
    </div>
  );
}
