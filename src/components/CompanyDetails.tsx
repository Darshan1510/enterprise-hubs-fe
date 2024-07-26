import React from "react";
import { Company } from "../types/Company";
import { Location } from "../types/Location";

interface CompanyDetailsProps {
  company: Company;
  locations: Location[];
}

const CompanyDetails: React.FC<CompanyDetailsProps> = ({ company, locations }) => {
  return (
    <div className="company-details">
      <span className="d-flex">
        <i className="bi bi-briefcase" style={{ fontSize: "20px" }}></i>&nbsp;
        <h2>{company.name}</h2>
      </span>
      <span className="d-flex">
        <i className="bi bi-geo-alt-fill"></i> &nbsp;&nbsp;
        <p>{company.address}</p>
      </span>
      <h3>Locations:</h3>
      <ul className="list-group">
        {locations.map((location) => (
          <li key={location.location_id} className="list-group-item">
            {location.name} - {location.address} (Lat: {location.latitude}, Lng:{" "}
            {location.longitude})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyDetails;
