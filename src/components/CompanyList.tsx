// src/components/CompanyList.tsx
import React from "react";
import { Company } from "../types/Company";

interface CompanyListProps {
  companies: Company[];
  onCompanyClick: (companyId: number) => void;
  view: string;
}

const CompanyList: React.FC<CompanyListProps> = ({ companies, onCompanyClick, view }) => {
  return (
    <div className={`company-list ${view === "list" ? "list-group" : "row"}`}>
      {companies.map((company) => (
        <div
          key={company.company_id}
          className={`company-card ${
            view === "list" ? "list-group-item list-group-item-action" : "col-md-4"
          }`}
          onClick={() => onCompanyClick(company.company_id)}
        >
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">{company.name}</h5>
              <p className="card-text">{company.address}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompanyList;
