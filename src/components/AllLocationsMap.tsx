import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Location } from "../types/Location";
import { Company } from "../types/Company";
import { companyApi } from "../services";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";

const AllLocationsMap: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    const fetchAllLocations = async () => {
      try {
        // Fetch all companies
        const companies: Company[] = await companyApi.getCompanies();

        // Fetch locations for each company
        const allLocations: Location[] = [];
        for (const company of companies) {
          const companyLocations = await companyApi.getLocationsByCompanyId(company.company_id);
          allLocations.push(...companyLocations);
        }

        setLocations(allLocations);
        setCompanies(companies);
      } catch (error) {
        console.error("Failed to fetch locations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllLocations();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Center of the map
  const center = { lat: 0, lng: 0 };

  return (
    <div className="m-2">
      <MapContainer center={center} zoom={2} style={{ height: "600px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((location) => {
          const company = companies.find((company) => company.company_id === location.company_id);
          const companyName = company?.name;
          const companyId = company?.company_id;
          return (
            <Marker
              key={location.location_id}
              position={[location.latitude, location.longitude]}
              icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}
            >
              <Popup>
                <Link to={`/companies/${companyId}`} className="text-decoration-none">
                  <b>{companyName}</b>
                </Link>
                <br />
                {location.name} - {location.address}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default AllLocationsMap;
