import React from "react";
import axios from "axios";
import Spots from "./Spots";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import image1 from "./Assets/Lot1.jpg";
import image2 from "./Assets/Lot2.jpg";
import image3 from "./Assets/Lot3.jpg";

const Lots = () => {
  const [selectedLot, setSelectedLot] = useState(null);

  const navigate = useNavigate();

  const handleLotClick = async (lot) => {
    navigate(`/Spots/${lot}`);
    // Handle navigation to the spot
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <img
              src={image1}
              className="card-img-top"
              alt="Lot 1"
              style={{ objectFit: "cover", height: "200px" }}
            />
            <div className="card-body" style={{ minHeight: "100px" }}>
              <h5 className="card-title">Lot 1</h5>
              <p className="card-text">Count of Lot 1</p>
              <button
                className="btn btn-primary"
                onClick={() => handleLotClick("LOT001")}
              >
                View Details
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <img
              src={image2}
              className="card-img-top"
              alt="Lot 2"
              style={{ objectFit: "cover", height: "200px" }}
            />
            <div className="card-body" style={{ minHeight: "100px" }}>
              <h5 className="card-title">Lot 2</h5>
              <p className="card-text">Count of Lot 2</p>
              <button
                className="btn btn-primary"
                onClick={() => handleLotClick("LOT002")}
              >
                View Details
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <img
              src={image3}
              className="card-img-top"
              alt="Lot 3"
              style={{ objectFit: "cover", height: "200px" }}
            />
            <div className="card-body" style={{ minHeight: "100px" }}>
              <h5 className="card-title">Lot 3</h5>
              <p className="card-text">Count of Lot 3</p>
              <button
                className="btn btn-primary"
                onClick={() => handleLotClick("LOT003")}
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lots;
