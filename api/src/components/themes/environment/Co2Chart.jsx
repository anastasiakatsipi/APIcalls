// src/components/themes/environment/Co2Chart.jsx
import React from "react";
import MetricBarChart from "../../main/MetricBarChart"; 

export default function Co2Chart({ data, height = 250 }) {
  return (
    <MetricBarChart
      data={data}
      height={height}
      valueKey="co2"                       
      yLabel="CO₂ (ppm)"
      title="Διάγραμμα CO₂ ανά σχολείο"
      description="Άξονας Χ = σχολεία, άξονας Υ = CO₂ σε ppm."
    />
  );
}
