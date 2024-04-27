import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

export default function Error() {
    const navigate = useNavigate();

    useEffect(() => {
      const timer = setTimeout(() => {
        navigate("/");
      }, 4000);

      return () => clearTimeout(timer);
    }, [navigate]);

  return (
    <Box textAlign="center" py={10} px={6}>
      <Box display="inline-block">
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          bg={"red.500"}
          rounded={"50px"}
          w={"55px"}
          h={"55px"}
          textAlign="center"
        >
          <CloseIcon boxSize={"20px"} color={"white"} />
        </Flex>
      </Box>
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Sorry
      </Heading>
      <Text color={"gray.500"}>
        There was en error processing your request. Please try again
      </Text>
    </Box>
  );
}
