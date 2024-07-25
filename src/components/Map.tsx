import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Location } from "../types/Location";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapProps {
  latitude: number;
  longitude: number;
  locations: Location[];
}

const Map: React.FC<MapProps> = ({ latitude, longitude, locations }) => {
  useEffect(() => {
    // Additional map setup if needed
  }, []);

  return (
    <div className="map-container border p-2">
      <MapContainer
        center={[latitude, longitude]}
        zoom={3}
        scrollWheelZoom={false}
        style={{ height: "500px", width: "100%" }}
        className="leaflet-container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((location) => (
          <Marker
            key={location.location_id}
            position={[location.latitude, location.longitude]}
            icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}
          >
            <Popup>{location.address}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
