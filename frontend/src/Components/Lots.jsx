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
import D from "./Assets/D.jpeg"; // Import the image using a relative path

// const LotWithImage = (props) => {
//   const { id } = useParams();
//   console.log(id);
//   const [numLevels, setNumLevels] = useState(null);
//   const [availableSpots, setAvailableSpots] = useState(null);
//   const [img, setImg] = useState();

//   const navigate = useNavigate();

//   console.log(numLevels);
//   console.log(`http://localhost:5000/Spots/${id}`);
//   console.log(availableSpots);

//   useEffect(() => {
//     const getLot = async () => {
//       try {
//         await axios.get(`http://localhost:5000/lots/${id}`).then((response) => {
//           const { numLevels, availableSpots } = response.data;
//           console.log(response.data);
//           setNumLevels(numLevels);
//           setAvailableSpots(availableSpots);
//           setImg(response.data.image);
//         });
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     getLot();
//   }, []);

//   return (
//     <Center py={6}>
//       <Box
//         maxW={"445px"}
//         w={"full"}
//         bg={useColorModeValue("white", "gray.900")}
//         boxShadow={"2xl"}
//         rounded={"md"}
//         p={6}
//         overflow={"hidden"}
//       >
//         <Box
//           h={"210px"} // Adjusted the height to fit the image
//           bg={"gray.100"}
//           mt={-6}
//           mx={-6}
//           mb={6}
//           pos={"relative"}
//         >
//           <img
//             src={img}
//             style={{ width: "100%", height: "100%", objectFit: "cover" }} // Ensure the image fits within its container
//             alt="Example"
//           />
//         </Box>
//         <Stack>
//           <Text
//             color={"green.500"}
//             textTransform={"uppercase"}
//             fontWeight={800}
//             fontSize={"sm"}
//             letterSpacing={1.1}
//           >
//             {id}
//           </Text>
//           <Heading
//             color={useColorModeValue("gray.700", "white")}
//             fontSize={"2xl"}
//             fontFamily={"body"}
//           >
//             Available Spots on each level
//           </Heading>
//           <ul>
//             {Array.from({ length: numLevels }, (_, index) => (
//               <li key={index}>
//                 Level {index + 1} - {availableSpots[index]}
//               </li>
//             ))}
//           </ul>
//           <Button colorScheme="blue" onClick={() => navigate("/Book")}>
//             Book
//           </Button>
//         </Stack>
//       </Box>
//     </Center>
//   );
// };

// export default LotWithImage;

const LotWithImage = (props) => {
  const { id } = useParams();
  const [numLevels, setNumLevels] = useState(null);
  const [availableSpots, setAvailableSpots] = useState(null);
  const [img, setImg] = useState(null); // Changed initial value to null

  const navigate = useNavigate();

  const handleClickBook = (id) => {
    console.log(id);
    // navigate(`/spots/${encodeURIComponent(parkingName)}`);
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
  }, [id]); // Added id to the dependency array

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
          h={"210px"} // Adjusted the height to fit the image
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
