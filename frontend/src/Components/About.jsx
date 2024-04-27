import React from "react";
import {
  Box,
  Flex,
  Text,
  Heading,
  SimpleGrid,
  Container,
  Stack,
} from "@chakra-ui/react";

const StatsText = ({ children }) => (
  <Text as="span" fontWeight={700} color="white">
    {children}
  </Text>
);

const stats = [
  {
    title: "99.9%",
    content: (
      <>
        <StatsText>Uptime Guarantee</StatsText> ensuring continuous availability
        for your parking lot management needs
      </>
    ),
  },
  {
    title: "$1000+",
    content: (
      <>
        <StatsText>Hours</StatsText> would be saved anually by 
        Students & Faculties
      </>
    ),
  },
  {
    title: "24/7",
    content: (
      <>
        <StatsText>Analytics</StatsText> enabled right in your dashboard without
        history limitations
      </>
    ),
  },
  {
    title: "15",
    content: (
      <>
        <StatsText>Parking lots</StatsText> currently connected and monitored by
        the SPS
      </>
    ),
  },
];


const About = () => {
  return (
    <Box bg="gray.800" position="relative">
      <Flex
        flex={1}
        zIndex={0}
        display={{ base: "none", lg: "flex" }}
        backgroundImage="url('/templates/stats-grid-with-image.png')"
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        position="absolute"
        width="50%"
        insetY={0}
        right={0}
      >
        <Flex
          bgGradient="linear(to-r, gray.800 10%, transparent)"
          w="full"
          h="full"
        />
      </Flex>
      <Container maxW="7xl" zIndex={10} position="relative">
        <Stack direction={{ base: "column", lg: "row" }}>
          <Stack
            flex={1}
            color="gray.400"
            justify={{ lg: "center" }}
            py={{ base: 4, md: 20, xl: 60 }}
          >
            <Box mb={{ base: 8, md: 20 }}>
              <Text
                fontFamily="heading"
                fontWeight={700}
                textTransform="uppercase"
                mb={3}
                fontSize="xl"
                color="gray.500"
              >
                Welcome to SPS
              </Text>
              <Heading
                color="white"
                mb={5}
                fontSize={{ base: "3xl", md: "5xl" }}
              >
                Your Go-To Parking Solution Across the University Campus
              </Heading>
              <Text fontSize="xl" color="gray.400">
                Navigating crowded university parking lots can be a daunting
                task. With limited parking spaces and complex parking rules,
                finding a spot can often feel like finding a needle in a
                haystack.
              </Text>
            </Box>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
              {stats.map((stat) => (
                <Box key={stat.title}>
                  <Text
                    fontFamily="heading"
                    fontSize="3xl"
                    color="white"
                    mb={3}
                  >
                    {stat.title}
                  </Text>
                  <Text fontSize="xl" color="gray.400">
                    {stat.content}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </Stack>
          <Flex flex={1} />
        </Stack>
      </Container>
    </Box>
  );
};

export default About;
