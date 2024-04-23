import React, { useEffect } from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Cancel = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 4000);

    // Clearing  timeout if the component is unmounted
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div>
      <Alert status="error">
        <AlertIcon />
        Sorry! There was an error processing your request
      </Alert>
    </div>
  );
};

export default Cancel;
