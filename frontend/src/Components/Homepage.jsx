import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Homepage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  const handleNewBookingClick = () => {
    navigate("/lots");
  };

  const handlePreviousBookingClick = () => {
    navigate("/previous-bookigs");
  };

  return (
    <div className="abs">
      <Navbar />
      <div className="inputs">
        <div className="row">
          <div className="col text-center">
            <button className="btn btn-primary" onClick={handleNewBookingClick}>
              New Booking
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col text-center">
            <button
              className="btn btn-secondary"
              onClick={handlePreviousBookingClick}
            >
              Previous Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
