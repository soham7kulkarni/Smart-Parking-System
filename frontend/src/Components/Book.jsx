import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate, useParams } from "react-router-dom";

const Book = (props) => {
  const { id } = useParams();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [typeOfVehicle, setTypeOfVehicle] = useState("");
  const [license, setLicense] = useState("");

  const lotRates = {
    "Parking D": 10.25,
    LOT002: 9.25,
    LOT003: 12.5,
    LOT004: 9.25,
    LOT005: 11.75,
    LOT006: 10.5,
  };

  const calculateDuration = (startTime, endTime) => {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const durationInMillis = end - start;
  const durationInHours = durationInMillis / (1000 * 60 * 60); // Convert milliseconds to hours
  return durationInHours;
};

  // Function to calculate total price based on lot id and total duration
  const calculateTotalPrice = (lotId, totalDuration) => {
    const rate = lotRates[lotId];
    if (rate) {
      return rate * totalDuration;
    } else {
      // Handle case where lotId is not found in lotRates dictionary
      return 0;
    }
}

  const makePayment = async () => {

    console.log(startTime)
    console.log(endTime)
  // Handle payment logic here
  console.log("Payment processing...");

  const stripe = await loadStripe(
    "pk_test_51Ou6guP5QhqipUFQTwjBn3ZFTIYgUnNnWuov6M3JvTMnUxXDdrsnE00qjM2SZN2yiZre40w7xGbDx5LAdbWFgNMI00C0JGF1cW"
  );

  // Calculate total duration
  const totalDuration = calculateDuration(startTime, endTime);
  console.log(totalDuration)

  // Calculate total price
  const totalPrice = calculateTotalPrice(id, totalDuration);

  const body = {
    products: [{ id: id, totalPrice: totalPrice }] // Pass id and totalPrice in the body
  };

  const headers = {
    "Content-Type": "application/json",
  };

  const response = await fetch(
    "http://localhost:5000/create-checkout-session",
    {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
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
