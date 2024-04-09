import React from "react";
import MapComponent from "./Map";


const Search = ({ google }) => {

  return (
    <div style={{ height: "70vh", width: "70%", position: "relative" }}>
      <MapComponent />
    </div>
  );
};

export default Search;