import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Default icon FIX για React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function SchoolMap({ schools }) {
  return (
    <div className="w-full h-[500px] rounded-xl overflow-hidden shadow-lg">
      <MapContainer
        center={[36.44, 28.22]} // Ρόδος
        zoom={11}
        scrollWheelZoom={true}
        className="w-full h-full z-0"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {schools
          .filter((s) => s.lat && s.lng)
          .map((s, i) => (
            <Marker key={i} position={[s.lat, s.lng]}>
              <Popup>
                <strong>{s.name}</strong> <br />
                CO₂: {s.co2 ?? "N/A"} ppm <br />
                Temperature: {s.temperature ?? "N/A"} ppm
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}
