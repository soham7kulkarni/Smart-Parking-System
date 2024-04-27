import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "./Carousel";

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const navigate = useNavigate();

    useEffect(() => {
      const login = localStorage.getItem("isLoggedIn");
      setIsLoggedIn(login);
    }, []);

  const handleNewBookingClick = () => {
    if (isLoggedIn === "true") {
      navigate("/Search");
    } else {
      navigate("/login");
    }
  };

  const handlePreviousBookingClick = () => {
    if (isLoggedIn === "true") {
      navigate("/history");
    } else {
      navigate("/login");
    }
  };
  return (
    <>
      <div className="center-screen">
        <div className="inputs">
          <div className="row">
            <div className="col text-center" style={{ padding: "30px" }}>
              <button
                className="btn btn-primary"
                style={{
                  marginRight: "20px",
                  backgroundColor: "#3498db",
                  border: "none",
                }}
                onClick={handleNewBookingClick}
              >
                New Booking
              </button>
              <button
                className="btn btn-secondary"
                style={{ backgroundColor: "#2ecc71", border: "none" }}
                onClick={handlePreviousBookingClick}
              >
                Previous Booking
              </button>
            </div>
          </div>
          <Carousel />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
