import React, { useState, useEffect } from "react";
import { companyApi } from "../services";
import CompanyList from "../components/CompanyList";
import { Company } from "../types/Company";
import { useNavigate } from "react-router-dom";

const CompanyListPage: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [search, setSearch] = useState<string>("");
  const [view, setView] = useState<string>("list");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const queryParams: { [key: string]: string } = {};
      if (search) {
        queryParams["name"] = search;
      }

      const queryString = new URLSearchParams(queryParams).toString();
      const result = await companyApi.getCompanies(queryString);
      setCompanies(result);
    };
    fetchData();
  }, [search]);

  const handleCompanyClick = (companyId: number) => {
    navigate(`/companies/${companyId}`);
  };

  return (
    <div className="container my-4">
      <div className="search-bar input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="d-flex justify-content-end mb-3 view-toggle">
        <button
          className={`btn btn-outline-primary ${view === "list" ? "active" : ""}`}
          onClick={() => setView("list")}
        >
          <i className="bi bi-list"></i> List View
        </button>
        &nbsp;
        <button
          className={`btn btn-outline-primary ml-2 ${view === "grid" ? "active" : ""}`}
          onClick={() => setView("grid")}
        >
          <i className="bi bi-grid"></i> Grid View
        </button>
      </div>
      <CompanyList companies={companies} onCompanyClick={handleCompanyClick} view={view} />
    </div>
  );
};

export default CompanyListPage;
