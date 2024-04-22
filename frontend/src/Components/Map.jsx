import React from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const libraries = ["places"];

const MapComponent = () => {

      const navigate = useNavigate();

      const handleMarkerClick = (parkingName) => {
        console.log(parkingName);
        navigate(`/lots/${encodeURIComponent(parkingName)}`);

      };
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });

  const defaultLocation = {
    lat: 33.8823476,
    lng: -117.8851033,
  };

  const [searchInput, setSearchInput] = useState("");
  const [center, setCenter] = useState(defaultLocation);
  const [parkingResults, setParkingResults] = useState([]);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
    const autoComplete = new window.google.maps.places.Autocomplete(
      document.getElementById("searchInput")
    );
    autoComplete.addListener("place_changed", onPlaceChanged);
  }, []);

  const onPlaceChanged = () => {
    handleSearch(document.getElementById("searchInput").value);
  };

  const handleSearch = (temp) => {
    // debugger;
    axios
      .get(`https://maps.googleapis.com/maps/api/geocode/json`, {
        params: {
          address: temp === null ? searchInput : temp,
          key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        },
      })
      .then((response) => {
        if (response.data.results.length > 0) {
          const { lat, lng } = response.data.results[0].geometry.location;
          console.log("lat and long", lat, lng);
          setCenter({ lat, lng });
          fetchNearbyParking(lat, lng);
        } else {
          console.log("Location not found");
        }
      })
      .catch((error) => {
        console.error("Error fetching location:", error);
      });
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  };

  const fetchNearbyParking = async (lat, lng) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/fetchNearbyParking",
        {
          lat,
          lng,
        }
      );

      console.log(response.data);
      response.data.results.forEach((parkingLot) => {
        console.log(parkingLot.name);
      });

      const sortedParking = response.data.results.sort((a, b) => {
        const distanceA = calculateDistance(
          a.geometry.location.lat,
          a.geometry.location.lng,
          lat,
          lng
        );
        const distanceB = calculateDistance(
          b.geometry.location.lat,
          b.geometry.location.lng,
          lat,
          lng
        );
        return distanceA - distanceB;
      });
      // Select the top 3 parkings
      console.log(sortedParking)
      const topThreeParking = sortedParking.slice(0, 3);
      setParkingResults(topThreeParking);
      // Handle response.data as needed
    } catch (error) {
      console.error("Error fetching nearby parking:", error);
      // Handle error
    }
  };

  const handleSearchInputChange = (e) => {
    console.log(e.target.value);
    setSearchInput(e.target.value);
  };

  //   console.log(parkingResults)

  if (loadError) return "Error";
  if (!isLoaded) return "Maps";
  return (
    <div
    // style={{ marginTop: "30px", marginBottom: "30px", textAlign: "center" }}
    >
      <div
        style={{ marginTop: "30px", marginBottom: "20px", textAlign: "center" }}
      >
        <input
          id="searchInput"
          type="text"
          value={searchInput}
          onChange={handleSearchInputChange}
          onFocus={(e) => (e.target.style.border = "2px solid #3498db")}
          onBlur={(e) =>
            (e.target.style.border = `2px solid ${
              searchInput ? "#3498db" : "#ccc"
            }`)
          }
          placeholder="Enter location"
          style={{
            padding: "10px",
            border: `2px solid ${searchInput ? "#3498db" : "#ccc"}`,
            borderRadius: "20px",
            outline: "none",
            marginRight: "10px",
            marginBottom: "10px",
            width: "300px",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "10px 20px",
            border: "2px solid #3498db",
            borderRadius: "20px",
            backgroundColor: "#3498db",
            color: "white",
            cursor: "pointer",
            marginBottom: "10px",
          }}
        >
          Search
        </button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "500px",
          marginLeft: "300px"
        }}
      >
        <GoogleMap
          mapContainerStyle={{
            height: "100%",
            width: "100%",
          }}
          center={center}
          zoom={14}
          onLoad={onMapLoad}
        >
          {parkingResults.map((parking, index) => (
            <MarkerF
              key={index}
              position={{
                lat: parking.geometry.location.lat,
                lng: parking.geometry.location.lng,
              }}
              label={{
                text: parking.name,
                color: "black",
                fontSize: "14px",
                fontWeight: "bold",
              }}
              onClick={() => handleMarkerClick(parking.name)}
            />
          ))}
        </GoogleMap>
      </div>
    </div>
  );
};

export default MapComponent;
