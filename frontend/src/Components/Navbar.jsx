import React, { useEffect, useState } from "react";
import { Box, Flex, HStack, Button, useColorModeValue } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {

  const navigate = useNavigate();
  const location = useLocation();


  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (sessionStorage.getItem("isLoggedIn") !== null) {
      return sessionStorage.getItem("isLoggedIn");
    } else if (localStorage.getItem("isLoggedIn") !== null) {
      return localStorage.getItem("isLoggedIn");
    }
  });


useEffect(() => {
  const sessionValue = sessionStorage.getItem("isLoggedIn");
  const localValue = localStorage.getItem("isLoggedIn");

  if (sessionValue !== null) {
    setIsLoggedIn(sessionValue);
  } else if (localValue !== null) {
    setIsLoggedIn(localValue);
  }
}, [location, isLoggedIn]);

const handleLogoutClick = () => {
  
  if (sessionStorage.getItem("isLoggedIn") !== null) {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userID");
    sessionStorage.removeItem("isLoggedIn");
    setIsLoggedIn("false");
  } else {
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn("false");
  }
  navigate("/login");
};

  const handleSPSClick = () => {
    navigate("/");
  };

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4} py={1}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            <Button
              fontSize={"sm"}
              fontWeight={600}
              color={"black"}
              bg={"transparent"}
              onClick={handleSPSClick}
              _hover={{
                bg: "transparent",
              }}
              rounded={"md"}
              _focus={{
                outline: "none",
              }}
            >
              SPS
            </Button>
          </HStack>
          <Flex alignItems={"center"}>
            {isLoggedIn === "true" ? (
              <Button
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"red.400"}
                onClick={handleLogoutClick}
                _hover={{
                  bg: "red.300",
                }}
                rounded={"md"}
                _focus={{
                  outline: "none",
                }}
              >
                Logout
              </Button>
            ) : (
              <Button
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"blue.400"}
                onClick={() => navigate("/login")}
                _hover={{
                  bg: "blue.300",
                }}
                rounded={"md"}
                _focus={{
                  outline: "none",
                }}
              >
                Login
              </Button>
            )}
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
