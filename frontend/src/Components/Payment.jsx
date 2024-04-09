import React from "react";
// import { ParkingCheckoutForm } from "./ParkingCheckoutForm";

const Payment = () => {
  // Calculate total amount based on selected parking lot and duration
  const calculateTotalAmount = () => {
    // Logic to calculate total amount
    // For example, multiply hours by rate
    const hours = 3; // Example duration
    const rate = 10; // Example rate per hour
    return hours * rate;
  };

  const totalAmount = calculateTotalAmount();

  return (
    <div>
      <h1>Parking Booking</h1>
      {/* <ParkingCheckoutForm totalAmount={totalAmount} /> */}
    </div>
  );
};

export default Payment;
