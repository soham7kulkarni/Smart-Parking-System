import React, { useState, useEffect } from "react";
import axios from "axios";

import "./History.css";

const formatTime = (timeString) => {
  const date = new Date(timeString);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // Handling midnight (0 AM)
  minutes = minutes < 10 ? "0" + minutes : minutes; // Adding leading zero to minutes if needed
  const formattedTime = `${hours}:${minutes} ${ampm}`;
  return formattedTime;
};

const History = () => {
  const [previousBookings, setPreviousBookings] = useState([]);
  const userID = localStorage.getItem("userID");

  useEffect(() => {
    const fetchPreviousBookings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/previous-bookings/${userID}`
        );
        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }
        const data = response.data.map((booking) => ({
          ...booking,
          start_time: formatTime(booking.start_time),
          end_time: formatTime(booking.end_time),
        }));
        setPreviousBookings(data);
      } catch (error) {
        console.error("Error fetching previous bookings:", error.message);
      }
    };

    if (userID) {
      fetchPreviousBookings();
    }
  }, [userID]);

  return (
    <div>
      <h1>Previous Bookings</h1>
      <div className="card-container">
        {previousBookings.map((booking) => (
          <div className="card" key={booking.reservation_id}>
            <div className="card-header">
              <strong>Lot:</strong> {booking.lot_id}
            </div>
            <div className="card-body">
              <p><strong>Parking Spot:</strong> {booking.spot_id}</p>
              <p><strong>Start Time:</strong> {booking.start_time}</p>
              <p><strong>End Time:</strong> {booking.end_time}</p>
              <p><strong>Total Amount:</strong> {booking.total_amount}</p>
            </div>
            {/* Add button here if needed */}
            {/* <button className="card-button">Action</button> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
