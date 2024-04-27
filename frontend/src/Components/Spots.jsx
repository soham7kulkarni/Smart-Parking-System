import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "./axiosConfig";

const Spots = (props) => {
    const {id} = useParams()
    console.log(id);
    const [numLevels, setNumLevels] = useState(null);
    const [availableSpots, setAvailableSpots] = useState(null);

  console.log(numLevels);
  console.log(`http://localhost:5000/Spots/${id}`);
  console.log(availableSpots);

  const navigate = useNavigate();

  useEffect(()=>{
    const getLot = async () => {
    try {
      await axios.get(`http://localhost:5000/Spots/${id}`).then((response) => {

        const { numLevels, availableSpots } = response.data;
        console.log(numLevels);
        setNumLevels(numLevels);
        setAvailableSpots(availableSpots);
      });
    } catch (error) {
      console.log(error);
    }
    }

    getLot()
  },[])

  return (
    <div>
      <h2>List of Levels</h2>
      <ul>
        {Array.from({ length: numLevels }, (_, index) => (
          <li key={index}>
            Level {index + 1} - {availableSpots[index]}
          </li>
        ))}
      </ul>
      <button onClick={() => navigate("/Book")}>Book</button>
    </div>
  );
};

export default Spots;
