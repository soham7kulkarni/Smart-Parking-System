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
    navigate(`/Spots/${lot}`)
    // try {
    //   await axios.get(`http://localhost:5000/lots/${lot}`).then((response) => {
    //     const { numLevels, availableSpots } = response.data;
    //     console.log(numLevels)
    //     setNumLevels(numLevels);
    //     setAvailableSpots(availableSpots);
    //     navigate('/Spots', { state: { numLevels, availableSpots } });
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <div className="container" style={{ maxWidth: "100%", padding: "0 15px" }}>
      <div className="row">
        <div className="col-md-4 mb-4">
          <div
            className="card h-100"
            onClick={() => handleLotClick("LOT001")}
            style={{ width: "100%" }}
          >
            <img src={image1} className="card-img-top" alt="Lot 1" />
            <div className="card-body">
              <h5 className="card-title">Lot 1</h5>
              <p className="card-text">Count of Lot 1</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div
            className="card h-100"
            onClick={() => handleLotClick("LOT002")}
            style={{ width: "100%" }}
          >
            <img src={image2} className="card-img-top" alt="Lot 2" />
            <div className="card-body">
              <h5 className="card-title">Lot 2</h5>
              <p className="card-text">Count of Lot 2</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div
            className="card h-100"
            onClick={() => handleLotClick("LOT003")}
            style={{ width: "100%" }}
          >
            <img src={image3} className="card-img-top" alt="Lot 3" />
            <div className="card-body">
              <h5 className="card-title">Lot 3</h5>
              <p className="card-text">Count of Lot 3</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lots;
