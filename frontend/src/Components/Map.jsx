import React from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback, useRef } from "react";

const libraries = ["places"];

const MapComponent = () => {
  const [clickedPlace, setClickedPlace] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
  const sessionValue = sessionStorage.getItem("isLoggedIn");
  const localValue = localStorage.getItem("isLoggedIn");

  if (sessionValue === null && localValue === null) {
    alert("Please log in first.");
    navigate("/");
  }
}, []);
  
  useEffect(() => {
    if (clickedPlace) {
      setSearchInput(clickedPlace);
    }
  }, [clickedPlace]);

  const handleMarkerClick = (parkingName) => {
    setClickedPlace(parkingName);
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

  const mapRef = useRef();

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
    const autoComplete = new window.google.maps.places.Autocomplete(
      document.getElementById("searchInput")
    );
    autoComplete.addListener("place_changed", onPlaceChanged);
  }, []);

  const onPlaceChanged = () => {
    const selectedPlace = document.getElementById("searchInput").value;
    setClickedPlace(selectedPlace);
    handleSearch(selectedPlace);
  };

  const handleSearch = (temp) => {
    axios
      .get(`https://maps.googleapis.com/maps/api/geocode/json`, {
        params: {
          address: temp,
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

      const topThreeParking = sortedParking.slice(0, 3);
      setParkingResults(topThreeParking);
    } catch (error) {
      console.error("Error fetching nearby parking:", error);
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  if (loadError) return "Error";
  if (!isLoaded) return "Maps";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <div
        style={{
          marginTop: "30px",
          marginBottom: "30px",
          textAlign: "center",
          width: "100%",
        }}
      >
        <input
          id="searchInput"
          type="text"
          value={searchInput}
          onChange={handleSearchInputChange}
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
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 120px)",
          width: "100%",
        }}
      >
        <GoogleMap
          mapContainerStyle={{
            height: "90vh",
            width: "100vw",
          }}
          center={center}
          zoom={16}
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