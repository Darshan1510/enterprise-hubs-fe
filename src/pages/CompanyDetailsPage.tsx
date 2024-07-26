import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { companyApi } from "../services";
import CompanyDetails from "../components/CompanyDetails";
import { Company } from "../types/Company";
import { Location } from "../types/Location";
import Map from "../components/Map";
import MultipleMaps from "../components/MultipleMaps";
import RevenueChart from "../components/RevenueChart";

const CompanyDetailsPage: React.FC = () => {
  const { companyId } = useParams<{ companyId: string }>();
  const [company, setCompany] = useState<Company | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const [activeTab, setActiveTab] = useState<string>("map-view");
  const navigate = useNavigate();

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

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
      <ul className="nav nav-tabs mt-2 text-center" id="mapTab" role="tablist">
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === "map-view" ? "active" : ""}`}
            id="map-view-tab"
            data-toggle="tab"
            href="#map-view"
            role="tab"
            aria-controls="map-view"
            aria-selected="true"
            onClick={() => handleTabChange("map-view")}
          >
            Map View
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === "multiple-maps-view" ? "active" : ""}`}
            id="multiple-maps-view-tab"
            data-toggle="tab"
            href="#multiple-maps-view"
            role="tab"
            aria-controls="multiple-maps-view"
            aria-selected="false"
            onClick={() => handleTabChange("multiple-maps-view")}
          >
            Multiple Map View
          </a>
        </li>
      </ul>
      <div className="tab-content" id="mapTabContent">
        <div
          className={`tab-pane fade ${activeTab === "map-view" ? "show active" : ""}`}
          id="map-view"
          role="tabpanel"
          aria-labelledby="map-view-tab"
        >
          <div className="m-2">
            <Map latitude={company.latitude} longitude={company.longitude} locations={locations} />
          </div>
        </div>
        <div
          className={`tab-pane fade ${activeTab === "multiple-maps-view" ? "show active" : ""}`}
          id="multiple-maps-view"
          role="tabpanel"
          aria-labelledby="multiple-maps-view-tab"
        >
          <div className="m-2">
            <MultipleMaps locations={locations} />
          </div>
        </div>
      </div>
      <div className="border p-2 m-2">
        <h3 className="text-center">Company Revenue:</h3>
        <hr/>
        <RevenueChart companyId={Number(companyId)} />
      </div>
    </div>
  );
};

export default CompanyDetailsPage;
