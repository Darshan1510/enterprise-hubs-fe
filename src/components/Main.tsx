import React from "react";
import { Route, Routes } from "react-router-dom";
import CompanyListPage from "../pages/CompanyListPage";
import CompanyDetailsPage from "../pages/CompanyDetailsPage";

const Main: React.FC = () => {
  return (
    <main className="container flex-grow-1">
      <Routes>
        <Route path="/" element={<CompanyListPage />} />
        <Route path="/companies/:companyId" element={<CompanyDetailsPage />} />
      </Routes>
    </main>
  );
};

export default Main;
