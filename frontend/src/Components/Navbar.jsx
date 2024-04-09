import React, { useEffect, useState } from "react";
import { Box, Flex, HStack, Button, useColorModeValue } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn")
  );
  const location = useLocation();

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn")); // Update isLoggedIn when localStorage changes
  }, [location, isLoggedIn]);

  const handleLogoutClick = () => {
    // debugger;
    localStorage.removeItem("token");
    localStorage.setItem("isLoggedIn", "false");
    setIsLoggedIn("false");
    // console.log("isLoggedIn:", isLoggedIn);
    navigate("/login");
  };

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4} py={1}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            <Box>SPS</Box>
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
