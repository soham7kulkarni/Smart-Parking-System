"use client";
import React, { useState } from "react";
import axios from "./axiosConfig";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  Link,
  useColorModeValue,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";


export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState();
  const [showPassword, setShowPassword] = useState();

  const handleSignUpClick = () => {
    navigate("/Signup");
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleLogin = async () => {
  try {
    const response = await axios.post("http://localhost:5000/login", formData);

    const token = response.data.token;
    localStorage.setItem("token", token);
    localStorage.setItem("isLoggedIn", true); // Set isLoggedIn to true upon successful login
    navigate("/Search");
  } catch (error) {
    // If the error response status is 401, it indicates wrong password
    if (error.response && error.response.status === 401) {
      alert("Wrong password. Please try again."); // Display alert for wrong password
    } else {
      console.error("Login failed:", error);
    }
  }
};

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={5}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Log in to your account</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" name="email" onChange={handleInputChange} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={handleInputChange}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={5}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Text color={"blue.400"}>Forgot password?</Text>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                px={20}
                py={2}
                onClick={handleLogin}
              >
                Log in
              </Button>
              <Text align={"center"}>
                Not an existing user?{" "}
                <Link color={"blue.400"} onClick={handleSignUpClick}>
                  Sign up
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}