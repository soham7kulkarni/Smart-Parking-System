import React, { useState } from "react";

const Book = () => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [typeOfVehicle, setTypeOfVehicle] = useState("");
  const [license, setLicense] = useState("");

  const handlePay = () => {
    // Handle payment logic here
    console.log("Payment processing...");
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
          <button type="button" className="btn btn-primary" onClick={handlePay}>
            Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default Book;
