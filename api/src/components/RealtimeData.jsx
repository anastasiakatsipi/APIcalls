// src/components/RealtimeData.jsx
import React from "react";

export default function RealtimeData({ data }) {
  console.log("RealtimeData props.data =", data); // ← δες στο DevTools

  if (!data) return <p>⏳ Δεν έχει φορτώσει ακόμη δεδομένα…</p>;

  // δείξε ωμό JSON για να επιβεβαιώσεις τη δομή
  // (αφαίρεσέ το όταν τελειώσουμε)
  return (
    <div>
      <h3>Raw JSON preview</h3>
      <pre style={{ maxHeight: 280, overflow: "auto", background: "#111", color: "#0f0", padding: 8 }}>
        {JSON.stringify(data, null, 2)}
      </pre>

      <hr />

      {(() => {
        const rt = data?.realtime?.results?.bindings?.[0] ?? null;
        if (!rt) return <p>⚠️ Δεν υπάρχουν δεδομένα realtime (bindings[0] λείπει).</p>;

        const get = (k) => rt?.[k]?.value ?? "—";
        const time = get("measuredTime") !== "—" ? get("measuredTime") : get("dateObserved");

        return (
          <div>
            <h3>Μετρήσεις Realtime</h3>
            <p>Ώρα: {time}</p>
            <p>Θερμοκρασία: {get("temperature")} °C</p>
            <p>Υγρασία: {get("humidity")} %</p>
            <p>CO₂: {get("co2")} ppb</p>
            <p>PM2.5: {get("PM25")} mg/m³</p>
          </div>
        );
      })()}
    </div>
  );
}
