// src/pages/ManagerDashboard.jsx
import React, { useState } from "react";
import 'leaflet/dist/leaflet.css';
import Sidebar from "../components/main/Sidebar";
import LogoutButton from "../components/main/LogoutButton";
import Energy from "./Energy";
import Environment from "./Environment";

export default function ManagerDashboard() {
  const [activeSection, setActiveSection] = useState("environment");

  let content = null;

  if (activeSection === "environment") {
    content = <Environment />;
  } else if (activeSection === "energy") {
    content = (
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">Energy</h2>
        <p className="text-gray-600">
          Σελίδα Energy – προς το παρόν δεν υπάρχουν διαθέσιμα δεδομένα.
        </p>
      </div>
    );
  } else if (activeSection === "mobility") {
    content = (
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">Mobility</h2>
        <p className="text-gray-600">
          Σελίδα Mobility – προς το παρόν δεν υπάρχουν διαθέσιμα δεδομένα.
        </p>
      </div>
    );
  }

  return (
<div className="flex min-h-screen bg-gray-900/20 ">
      {/* Sidebar αριστερά */}
      <Sidebar activeItem={activeSection} onSelect={setActiveSection} />

      {/* Περιεχόμενο δεξιά */}
      <div className="flex-1 flex flex-col">
        <div className="flex justify-end p-4">
          <LogoutButton />
        </div>

        <div className="flex-1 p-4">{content}</div>
      </div>
    </div>

  );
}
