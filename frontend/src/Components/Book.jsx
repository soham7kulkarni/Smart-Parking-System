import React, { useState } from "react";
import { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "./UserContext";
import axios from "axios";

const Book = (props) => {
  const { id } = useParams();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [typeOfVehicle, setTypeOfVehicle] = useState("");
  const [license, setLicense] = useState("");
  const [spotId, setSpotId] = useState(null);

    useEffect(() => {
      const getSpot = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/spots/${id}`);
          console.log(response.data);
          const spotID = response.data.spotID;
          setSpotId(spotID); // Set the spotId state
        } catch (error) {
          console.log(error);
        }
      };

      getSpot();
    }, [id]);

    console.log(spotId);

    const userId = parseInt(localStorage.getItem("userID"), 10);

  const lotRates = {
    "2701 Nutwood Avenue Parking": 5.5,
    "Cal State Fullerton Parking Lot I": 5,
    "CSUF - Lot C West": 5.25,
    "Eastside Parking Structure": 3.5,
    "LOT A": 2.75,
    "LOT A & G": 4,
    "LOT A South": 5,
    "LOT E": 1.5,
    "LOT F": 1.75,
    "LOT G": 3.5,
    "LOT S": 2,
    "Nutwood Parking Structure": 3.75,
    "Parking D": 3,
    "State College Parking Structure": 4.25,
  };

  const calculateDuration = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const durationInMillis = end - start;
    const durationInHours = durationInMillis / (1000 * 60 * 60); // Converting milliseconds to hours
    return durationInHours;
  };

  // Function to calculate total price based on lot id and total duration
  const calculateTotalPrice = (lotId, totalDuration) => {
    const rate = lotRates[lotId];
    if (rate) {
      return rate * totalDuration;
    } else {
      return 0;
    }
  };

  const makePayment = async () => {
    console.log(startTime);
    console.log(endTime);

    console.log("Payment processing...");
    
    const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

    const totalDuration = calculateDuration(startTime, endTime);
    console.log(totalDuration);


    const totalPrice = calculateTotalPrice(id, totalDuration);

const bodyData = {
  products: [{ id: id, totalPrice: totalPrice }],
  reservation: [
    {
      lot_id: id,
      spot_id: spotId,
      user_id: userId,
      start_time: startTime,
      end_time: endTime,
      total_price: totalPrice,
      type_of_vehicle: typeOfVehicle,
      license: license,
    },
  ],
};

    console.log(bodyData);

    const headers = {
      "Content-Type": "application/json",
    };

    const response = await fetch(
      "http://localhost:5000/create-checkout-session",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(bodyData),
      }
    );

    const session = await response.json();

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <label htmlFor="startTime" className="form-label">
            Start Time
          </label>
          <input
            type="datetime-local"
            className="form-control"
            id="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="endTime" className="form-label">
            End Time
          </label>
          <input
            type="datetime-local"
            className="form-control"
            id="endTime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <label htmlFor="typeOfVehicle" className="form-label">
            Type of Vehicle
          </label>
          <select
            className="form-select"
            id="typeOfVehicle"
            value={typeOfVehicle}
            onChange={(e) => setTypeOfVehicle(e.target.value)}
          >
            <option value="">Select Type</option>
            <option value="Large">Large</option>
            <option value="Compact">Compact</option>
          </select>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <label htmlFor="license" className="form-label">
            License
          </label>
          <input
            type="text"
            className="form-control"
            id="license"
            value={license}
            onChange={(e) => setLicense(e.target.value)}
          />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-12">
          <button
            type="button"
            className="btn btn-primary"
            onClick={makePayment}
          >
            Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default Book;
