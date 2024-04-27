import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "./axiosConfig";
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";

const LotWithImage = (props) => {
  const { id } = useParams();
  const [numLevels, setNumLevels] = useState(null);
  const [availableSpots, setAvailableSpots] = useState(null);
  const [img, setImg] = useState(null);

  const navigate = useNavigate();

  const handleClickBook = (id) => {
    console.log(id);
    navigate(`/book/${id}`);
  };

  useEffect(() => {
    const getLot = async () => {
      try {
        await axios.get(`http://localhost:5000/lots/${id}`).then((response) => {
          const { numLevels, availableSpots, image } = response.data;
          console.log(response.data);
          setNumLevels(numLevels);
          setAvailableSpots(availableSpots);
          setImg(image); // Set the image URL received from the backend
        });
      } catch (error) {
        console.log(error);
      }
    };

    getLot();
  }, [id]); 

  return (
    <Center py={6}>
      <Box
        maxW={"445px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"md"}
        p={6}
        overflow={"hidden"}
      >
        <Box
          h={"210px"}
          bg={"gray.100"}
          mt={-6}
          mx={-6}
          mb={6}
          pos={"relative"}
        >
          {img && (
            <img
              src={img}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              alt="Example"
            />
          )}
        </Box>
        <Stack>
          <Text
            color={"green.500"}
            textTransform={"uppercase"}
            fontWeight={800}
            fontSize={"sm"}
            letterSpacing={1.1}
          >
            {id}
          </Text>
          <Heading
            color={useColorModeValue("gray.700", "white")}
            fontSize={"2xl"}
            fontFamily={"body"}
          >
            Available Spots on each level
          </Heading>
          <ul>
            {Array.from({ length: numLevels }, (_, index) => (
              <li key={index}>
                Level {index + 1} - {availableSpots[index]}
              </li>
            ))}
          </ul>
          <Button colorScheme="blue" onClick={() => handleClickBook(id)}>
            Book
          </Button>
        </Stack>
      </Box>
    </Center>
  );
};

export default LotWithImage;
