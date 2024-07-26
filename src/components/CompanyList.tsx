import React from "react";
import { Company } from "../types/Company";
import { useNavigate } from "react-router-dom";
import GeneralMap from "./GeneralMap";
import AllLocationsMap from "./AllLocationsMap";

interface CompanyListProps {
  companies: Company[];
  view: string;
}

const CompanyList: React.FC<CompanyListProps> = ({ companies, view }) => {
  const navigate = useNavigate();

  const renderView = () => {
    switch (view) {
      case "list":
      case "grid":
        return (
          <div
            className={`company-list justify-content-center ${
              view === "list" ? "list-group" : "row"
            }`}
          >
            {companies.map((company) => (
              <div
                key={company.company_id}
                className={`company-card m-1 ${
                  view === "list" ? "list-group-item list-group-item-action" : "col-md-4"
                }`}
                onClick={() => navigate(`/companies/${company.company_id}`)}
              >
                <div className="card p-1 h-100">
                  <div className="card-body">
                    <h5 className="card-title">
                      <i className="bi bi-briefcase"></i>&nbsp;{company.name}
                    </h5>
                    <p className="card-text">
                      <i className="bi bi-geo-alt-fill"></i>&nbsp;
                      {company.address}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      case "map":
        return (
          <div className="m-2">
            <GeneralMap companies={companies} />
          </div>
        );
      case "all-locations":
        return (
          <div className="m-2">
            <AllLocationsMap companies={companies} />
          </div>
        );
      default:
        return "Invalid view type";
    }
  };

  return <div>{renderView()}</div>;
};

export default CompanyList;
