import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Company } from "../types/Company";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapProps {
  companies: Company[];
}

const GeneralMap: React.FC<MapProps> = ({ companies }) => {
  useEffect(() => {
    // Additional map setup if needed
  }, []);

  return (
    <div className="general-map-container border p-2">
      <MapContainer
        zoom={4}
        center={[companies[0].latitude, companies[0].longitude]}
        style={{ height: "500px", width: "100%" }}
        className="general-leaflet-container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {companies.map((company) => (
          <Marker
            key={company.company_id}
            position={[company.latitude, company.longitude]}
            icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}
          >
            <Popup>
              {company.name} - {company.address}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default GeneralMap;
