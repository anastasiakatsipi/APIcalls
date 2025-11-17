// src/components/MetricBarChart.jsx
import React from "react";
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

export default function MetricBarChart({
  data,
  title,
  description,
  height = 300,
  valueKey,       // π.χ. "co2", "temperature", "humidity"
  yLabel,         // π.χ. "CO₂ (ppm)", "°C", "% υγρασία"
}) {
  const hasData = Array.isArray(data) && data.length > 0;

  return (
    <div className="space-y-4">
      <div className="w-full rounded-xl bg-slate-800 p-6 shadow space-y-4">
        <div className="max-w-md">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <p className="text-sm text-slate-300">{description}</p>
        </div>

        {hasData ? (
          <div style={{ width: "100%", height }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 20, right: 30, left: 10, bottom: 1 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#64748B" />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  interval={0}
                  height={115}
                  tick={{ fill: "#CBD5E1" }}
                />
                <YAxis
                  tick={{ fill: "#CBD5E1" }}
                  label={{
                    value: yLabel,
                    angle: -90,
                    position: "insideLeft",
                    style: { fill: "#CBD5E1" },
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    borderColor: "#334155",
                    color: "white",
                  }}
                  itemStyle={{ color: "white" }}
                  labelStyle={{ color: "#cbd5e1" }}
                />
                <Legend wrapperStyle={{ color: "#CBD5E1" }} />

                <Bar
                  dataKey={valueKey}
                  fill="#0ea5e9"
                  stroke="#0284c7"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="text-center text-slate-300 mt-10">
            Δεν υπάρχουν διαθέσιμα δεδομένα για εμφάνιση.
          </div>
        )}
      </div>
    </div>
  );
}
