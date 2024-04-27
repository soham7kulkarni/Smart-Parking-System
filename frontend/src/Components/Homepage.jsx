import React from "react";
import { motion } from "framer-motion";
import {
  Container,
  Flex,
  Heading,
  Link,
  Spacer,
  Stack,
  useBreakpointValue,
  Box,
} from "@chakra-ui/react";
import logo from "./Assets/logo.png";

const Homepage = () => {
  const direction = useBreakpointValue({ base: "column", md: "row" });

  return (
    <Container
      maxW="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      marginTop={8}
    >
      <Stack direction={direction} spacing={16} alignItems="center">
        <img src={logo} alt="Logo" />
        <Flex direction="column" alignItems="center">
          <Heading
            as="h3"
            textAlign="center"
            mt={4}
            fontSize="3xl"
            fontWeight="bold"
            color="#313B72"
          >
            Parking Lots & Structures
          </Heading>
          <Link
            href="https://parking.fullerton.edu/documents/maps/CSUF%20Campus%20Map%201.23.pdf"
            isExternal
            mt={4}
            fontSize="lg"
            color="blue.500"
            _hover={{ textDecoration: "underline" }}
          >
            Downloadable Parking Map
          </Link>
          <Link
            href="https://parking.fullerton.edu/documents/CampusMapGridLines.pdf"
            isExternal
            mt={2}
            fontSize="lg"
            color="blue.500"
            _hover={{ textDecoration: "underline" }}
          >
            Downloadable Campus Map
          </Link>
          <motion.div
            animate={{
              y: [-10, 10],
              transition: {
                repeat: Infinity,
                duration: 1,
                repeatType: "reverse",
              },
            }}
          >
            <Box mt={6} p={4} bg="#7EE081" borderRadius="md" textAlign="center">
              <p>Login to book a spot!</p>
              <p>Parking is free on Friday nights and weekends.</p>
            </Box>
          </motion.div>
          <Spacer mt={6} />
        </Flex>
      </Stack>
    </Container>
  );
};

export default Homepage;
