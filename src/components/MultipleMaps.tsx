import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Location } from "../types/Location";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

interface MultipleMapsProps {
  locations: Location[];
}

const MultipleMaps: React.FC<MultipleMapsProps> = ({ locations }) => {
  useEffect(() => {
    // Additional map setup if needed
  }, []);

  return (
    <div className="row justify-content-center">
      {locations.map((location) => (
        <div className="col-md-5 border p-2 m-2" key={location.location_id}>
          <h6>{location.address}</h6>
          <MapContainer
            center={[location.latitude, location.longitude]}
            zoom={13}
            style={{ height: "400px", width: "100%" }}
            className="multiple-leaflet-container"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker
              position={[location.latitude, location.longitude]}
              icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}
            >
              <Popup>{location.address}</Popup>
            </Marker>
          </MapContainer>
        </div>
      ))}
    </div>
  );
};

export default MultipleMaps;
