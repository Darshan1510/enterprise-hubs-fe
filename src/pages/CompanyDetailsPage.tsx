import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { companyApi } from "../services";
import CompanyDetails from "../components/CompanyDetails";
import { Company } from "../types/Company";
import { Location } from "../types/Location";
import Map from "../components/Map";

const CompanyDetailsPage: React.FC = () => {
  const { companyId } = useParams<{ companyId: string }>();
  const [company, setCompany] = useState<Company | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const companyData = await companyApi.getCompanyById(Number(companyId));
      setCompany(companyData);
      const locationData = await companyApi.getLocationsByCompanyId(Number(companyId));
      setLocations(locationData);
    };
    fetchData();
  }, [companyId]);

  if (!company) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container my-4">
      <button className="btn btn-secondary mb-3" onClick={() => navigate("/")}>
        Back to List
      </button>
      <CompanyDetails company={company} locations={locations} />
      <div className="m-2">
        <Map latitude={company.latitude} longitude={company.longitude} locations={locations} />
      </div>
    </div>
  );
};

export default CompanyDetailsPage;
