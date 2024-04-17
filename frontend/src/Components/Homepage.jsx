import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const login = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(login);
  }, []);

  const handleNewBookingClick = () => {
    console.log(isLoggedIn);
    if (isLoggedIn === "true") {
      navigate("/Search");
    } else {
      navigate("/login");
    }
  };

  const handlePreviousBookingClick = () => {
    if (isLoggedIn === "true") {
      navigate("/previous-bookigs");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="abs">
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
