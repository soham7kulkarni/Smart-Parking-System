import React from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login"); // Redirect to '/login' route
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="nv">
          <div className="navbar-nav mr-auto">
            {/* Use mr-auto to push the Login button to the left */}
            <div className="navbar-brand" href="http://localhost:3000/">
              SPS
            </div>
            <button className="btn btn-primary" onClick={handleClick}>
              Login
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
