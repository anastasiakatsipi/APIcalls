// src/pages/ManagerDashboard.jsx
import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import Sidebar from "../components/main/Sidebar";
import LogoutButton from "../components/main/LogoutButton";
import Environment from "./Environment";
import Energy from "./Energy";

export default function ManagerDashboard() {
  const [activeSection, setActiveSection] = useState("environment");

  const renderSection = () => {
    switch (activeSection) {
      case "environment":
        return <Environment />;

      case "energy":
        return (
          <div className="card">
            <h2 className="text-xl font-semibold mb-2">Energy</h2>
            <p className="text-gray-600">
              Σελίδα Energy – προς το παρόν δεν υπάρχουν διαθέσιμα δεδομένα.
            </p>
          </div>
        );

      case "mobility":
        return (
          <div className="card">
            <h2 className="text-xl font-semibold mb-2">Mobility</h2>
            <p className="text-gray-600">
              Σελίδα Mobility – προς το παρόν δεν υπάρχουν διαθέσιμα δεδομένα.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex overflow-hidden">

      {/* Sidebar */}
      <Sidebar
        activeItem={activeSection}
        onSelect={setActiveSection}
      />

      {/* Content */}
      <div className="flex-1 flex flex-col bg-gray-100 min-h-screen">

        {/* Top bar */}
        <div className="flex justify-end p-4 bg-white shadow-sm border-b">
          <LogoutButton />
        </div>

        {/* Main content */}
        <div className="p-8 w-full max-w-6xl mx-auto">
          {renderSection()}
        </div>

      </div>
    </div>
  );
}
