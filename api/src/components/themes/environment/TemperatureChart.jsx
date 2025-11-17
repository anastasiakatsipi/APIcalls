// src/components/themes/environment/TemperatureChart.jsx
import React from "react";
import MetricBarChart from "../../main/MetricBarChart"; 

export default function TemperatureChart({ data, height = 250 }) {
  return (
    <MetricBarChart
      data={data}
      height={height}
      valueKey="temperature"
      yLabel="Θερμοκρασία (°C)"
      title="Θερμοκρασία ανά σχολείο"
      description="Άξονας Χ = σχολεία, άξονας Υ = θερμοκρασία σε °C."
    />
  );
}
