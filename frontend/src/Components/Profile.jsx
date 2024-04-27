import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Input,
  FormControl,
  FormLabel,
  Avatar,
  Stack,
} from "@chakra-ui/react";

const Profile = () => {
  const userID = localStorage.getItem("userID");
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    first_name: "John",
    last_name: "Doe",
    email: "johndoe@example.com",
    birth_date: "01/01/1990",
    password: "********",
    phone: "+1234567890",
    address: "123 Main St, Fullerton, USA",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/fetch-user-data/${userID}`
        );
        const userDataFromServer = response.data.user; // Access user object directly
        // Convert ISO date format to the desired format
        userDataFromServer.birth_date = new Date(
          userDataFromServer.birth_date
        ).toLocaleDateString();
        setUserData(userDataFromServer);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      fetchUserData();
    }
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Box bg="gray.100" minH="100vh" p={8}>
      <Flex
        direction="column"
        align="center"
        maxW={{ base: "100%", md: "3xl" }}
        mx="auto"
      >
        <Heading mb={4}>Profile</Heading>
        <Stack spacing={4} w="100%">
          <Box>
            <Text fontSize="xl" fontWeight="bold" mb={2}>
              Name
            </Text>
            {isEditing ? (
              <Input
                name="first_name"
                value={userData.first_name}
                onChange={handleChange}
                placeholder="First Name"
                mb={2}
                w="100%"
              />
            ) : (
              <Text>{`${userData.first_name} ${userData.last_name}`}</Text>
            )}
          </Box>
          <Box>
            <Text fontSize="xl" fontWeight="bold" mb={2}>
              Email
            </Text>
            {isEditing ? (
              <Input
                name="email"
                value={userData.email}
                onChange={handleChange}
                placeholder="Email"
                mb={2}
                w="100%"
              />
            ) : (
              <Text>{userData.email}</Text>
            )}
          </Box>
          <Box>
            <Text fontSize="xl" fontWeight="bold" mb={2}>
              Date of Birth
            </Text>
            {isEditing ? (
              <Input
                name="birth_date"
                value={userData.birth_date}
                onChange={handleChange}
                placeholder="Date of Birth"
                mb={2}
                w="100%"
              />
            ) : (
              <Text>{userData.birth_date}</Text>
            )}
          </Box>
          <Box>
            <Text fontSize="xl" fontWeight="bold" mb={2}>
              Password
            </Text>
            {isEditing ? (
              <Input
                name="password"
                type="password"
                value={userData.password}
                onChange={handleChange}
                placeholder="Password"
                mb={2}
                w="100%"
              />
            ) : (
              <Text>{userData.password}</Text>
            )}
          </Box>
          <Box>
            <Text fontSize="xl" fontWeight="bold" mb={2}>
              Phone Number
            </Text>
            {isEditing ? (
              <Input
                name="phone"
                value={userData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                mb={2}
                w="100%"
              />
            ) : (
              <Text>{userData.phone}</Text>
            )}
          </Box>
          <Box>
            <Text fontSize="xl" fontWeight="bold" mb={2}>
              Address
            </Text>
            {isEditing ? (
              <Input
                name="address"
                value={userData.address}
                onChange={handleChange}
                placeholder="Address"
                mb={2}
                w="100%"
              />
            ) : (
              <Text>{userData.address}</Text>
            )}
          </Box>
        </Stack>
        <Flex mt={6} direction={{ base: "column", md: "row" }} w="100%">
          {isEditing ? (
            <Button
              onClick={handleSaveClick}
              mb={{ base: 4, md: 0 }}
              mr={{ base: 0, md: 4 }}
              colorScheme="blue"
              w="100%"
            >
              Save
            </Button>
          ) : (
            <Button
              onClick={handleEditClick}
              mb={{ base: 4, md: 0 }}
              mr={{ base: 0, md: 4 }}
              colorScheme="green"
              w="100%"
            >
              Edit
            </Button>
          )}
          <Button colorScheme="red" w="100%">
            Delete Account
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Profile;

