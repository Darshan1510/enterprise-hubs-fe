import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="bg-primary text-white p-3">
      <nav className="container d-flex">
        <h3 className="d-flex flex-grow-1">
          <i className="bi bi-building"></i>&nbsp;&nbsp;
          <Link className="nav-link text-white" to="/">
            Enterprise Hubs
          </Link>
        </h3>
        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/">
              Home
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
