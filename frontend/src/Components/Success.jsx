import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Heading, Text } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";

export default function Success() {
    const navigate = useNavigate();

    useEffect(() => {
      window.history.replaceState(null, "", "/");
      const timer = setTimeout(() => {
        navigate("/");
      }, 4000);

      return () => clearTimeout(timer);
    }, [navigate]);


  return (
    <Box textAlign="center" py={10} px={6}>
      <CheckCircleIcon boxSize={"50px"} color={"green.500"} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Woohoo
      </Heading>
      <Text color={"gray.500"}>
        The spot has been booked for you Successfully! Rest Assured
      </Text>
    </Box>
  );
}
