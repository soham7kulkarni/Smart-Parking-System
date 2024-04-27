import React from "react";
import {
  Box,
  Button,
  Divider,
  Heading,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";

const packages = [
  {
    id: 1,
    title: "Nutwood Parking Structure",
    typePlan: "$3.75",
    options: [
      { id: 1, desc: "Prime Roadside Location" },
      { id: 2, desc: "Top Notch Safety Features" },
      { id: 3, desc: "24/7 Accessibility" },
    ],
  },
  {
    id: 2,
    title: "State College Parking Structure",
    typePlan: "$4.25",
    options: [
      { id: 1, desc: "Near to Titan Student Union" },
      { id: 2, desc: "Ample Space, Seamless Parking!" },
      { id: 3, desc: "Panoramic City Views" },
    ],
  },
  {
    id: 3,
    title: "Eastside Parking Structure",
    typePlan: "$3.50",
    options: [
      { id: 1, desc: "Electric Vehicle Charging" },
      { id: 2, desc: "Close to Business college" },
      { id: 3, desc: "Quick exit route to Freeway" },
    ],
  },
  {
    id: 4,
    title: "Parking Lot A and G",
    typePlan: "$4.00",
    options: [
      { id: 1, desc: "Top location for athletes and fans" },
      { id: 2, desc: "Quick exit towards Brea" },
      { id: 3, desc: "Best for concerts and NCAA matches" },
    ],
  },
];

const PackageTier = ({ title, options, typePlan, checked = false }) => {
  const colorTextLight = checked ? "white" : "purple.600";
  const bgColorLight = checked ? "purple.400" : "gray.300";

  const colorTextDark = checked ? "white" : "purple.500";
  const bgColorDark = checked ? "purple.400" : "gray.300";

  return (
    <Stack
      p={3}
      py={3}
      justifyContent={{
        base: "flex-start",
        md: "space-around",
      }}
      direction={{
        base: "column",
        md: "row",
      }}
      alignItems={{ md: "center" }}
    >
      <Box
        width={{ base: "100%", md: "auto" }}
        textAlign={{ base: "center", md: "start" }}
        wordWrap="break-word"
        maxWidth="200px" // Set a maximum width for the title
      >
        <Heading size={"md"}>{title}</Heading>
      </Box>
      <List spacing={3} textAlign="start">
        {options.map((desc) => (
          <ListItem key={desc.id}>
            <ListIcon as={FaCheckCircle} color="green.500" />
            {desc.desc}
          </ListItem>
        ))}
      </List>
      <Heading size={"xl"}>{typePlan}</Heading>
      <Stack>
        <Button
          size="md"
          color={useColorModeValue(colorTextLight, colorTextDark)}
          bgColor={useColorModeValue(bgColorLight, bgColorDark)}
        >
          Get Started
        </Button>
      </Stack>
    </Stack>
  );
};

const Pricing = () => {
  return (
    <Box py={6} px={5} width="full">
      <Stack spacing={4} width={"100%"} direction={"column"}>
        <Stack
          p={5}
          alignItems={"center"}
          justifyContent={{
            base: "flex-start",
            md: "space-around",
          }}
          direction={{
            base: "column",
            md: "row",
          }}
        >
          <Stack
            width={{
              base: "100%",
              md: "40%",
            }}
            textAlign={"center"}
          >
            <Heading size={"lg"}>
              The Right Spot <Text color="purple.400"> for You </Text>
            </Heading>
          </Stack>
          <Stack
            width={{
              base: "100%",
              md: "60%",
            }}
          >
            <Text textAlign={"center"}>
              Find Your Perfect Spot, Right Around the Corner!
            </Text>
          </Stack>
        </Stack>
        <Divider />
        {packages.map((pkg) => (
          <div key={pkg.id}>
            <PackageTier
              title={pkg.title}
              typePlan={pkg.typePlan}
              options={pkg.options}
            />
            <Divider />
          </div>
        ))}
      </Stack>
    </Box>
  );
};

export default Pricing;
