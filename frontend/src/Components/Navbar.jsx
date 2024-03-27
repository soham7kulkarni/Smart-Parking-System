"use client";

import { Box, Flex, HStack, Button, useColorModeValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
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
            <Button
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"blue.400"}
              onClick={handleLoginClick}
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
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
