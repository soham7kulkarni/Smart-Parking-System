import React from "react";
import { useNavigate } from "react-router-dom";

const Spots = () => {
  const lotNumbers = Array.from({ length: 5 }, (_, index) => `Level ${index}`);

  const navigate = useNavigate();

  const handleBook = () => {
    navigate("/Book");
  };

  return (
    <div>
      <h2>Levels in lot</h2>
      <ul className="list-group">
        {lotNumbers.map((lot, index) => (
          <li key={index}>{lot}</li>
        ))}
      </ul>
      <button type="button" className="btn btn-info" onClick={handleBook}>
        Book
      </button>
    </div>
  );
};

export default Spots;
