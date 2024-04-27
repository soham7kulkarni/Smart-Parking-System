import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Stack,
  Image,
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const Links = [
  { name: "Dashboard", href: "/Dashboard" },
  { name: "Pricing", href: "/Pricing" },
  { name: "About", href: "/About" },
];

const NavLink = ({ children, to, onClose }) => (
  <Link to={to} style={{ textDecoration: "none" }} onClick={onClose}>
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      color={"white"}
      _hover={{
        textDecoration: "none",
        bg: "#5d3e6a",
      }}
    >
      {children}
    </Box>
  </Link>
);

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const login = localStorage.getItem("isLoggedIn");
    if (login) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [location]);

  const handleLogoutClick = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userID");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUsername("");
    navigate("/");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };
  

  const handleProfileClick = () => {
    if (isLoggedIn) {
      navigate("/Profile");
    } else {
      setShowAlert(true);
    }
  };

  const closeAlert = () => {
    setShowAlert(false); 
  };

    useEffect(() => {
      const storedUsername = localStorage.getItem("username");
      if (storedUsername) {
        setUsername(storedUsername);
      }
    }, [location]);

    const getInitials = (name) => {
      if (!name) return "";
      const names = name.split(" ");
      return names.map((n) => n[0].toUpperCase()).join("");
    };

  return (
    <>
      <Box bg="#462255" px={4}>
        <Flex h={59} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Link to="/" style={{ textDecoration: "none" }} onClick={onClose}>
              <Image src="/SPS_LOGO.png" alt="SPS Logo" boxSize="75px" />
            </Link>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link.name} to={link.href} onClose={onClose}>
                  {link.name}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar
                  size={"sm"}
                  name={getInitials(username)}
                />
              </MenuButton>
              <MenuList>
                <MenuItem>
                  <Button
                    fontSize={"sm"}
                    fontWeight={600}
                    color={"black"}
                    bg={"transparent"}
                    onClick={handleProfileClick}
                    _hover={{
                      bg: "transparent",
                    }}
                    rounded={"md"}
                    _focus={{
                      outline: "none",
                    }}
                  >
                    Profile
                  </Button>
                </MenuItem>
                <MenuItem>
                  {isLoggedIn ? (
                    <Button
                      fontSize={"sm"}
                      fontWeight={600}
                      color={"black"}
                      bg={"transparent"}
                      onClick={handleLogoutClick}
                      _hover={{
                        bg: "transparent",
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
                      color={"black"}
                      bg={"transparent"}
                      onClick={handleLoginClick}
                      _hover={{
                        bg: "transparent",
                      }}
                      rounded={"md"}
                      _focus={{
                        outline: "none",
                      }}
                    >
                      Login
                    </Button>
                  )}
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link.name} to={link.href} onClose={onClose}>
                  {link.name}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
      {showAlert && (
        <Alert status="warning" variant="subtle" mt={4} mx={4} mb={0}>
          <AlertIcon />
          <AlertTitle mr={2}>Please log in first!</AlertTitle>
          <CloseButton
            onClick={closeAlert}
            position="absolute"
            right="8px"
            top="8px"
          />
        </Alert>
      )}
    </>
  );
};

export default Navbar;