import React, { useEffect } from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.history.replaceState(null, "", "/");
    const timer = setTimeout(() => {
      navigate("/");
    }, 4000);

    // Clearing timeout if the component is unmounted
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div>
      <Alert status="success">
        <AlertIcon />
        Woohoo! spot has been booked !!
      </Alert>
    </div>
  );
};

export default Success;
