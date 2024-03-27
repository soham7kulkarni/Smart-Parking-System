"use client";

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export default function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({email:"",password:"",first_name:"",last_name:""});

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
  };

  const handleSignUp = async () => {
    console.log(formData)

    try {
      await axios
        .post("http://localhost:5000/signup", formData)
        .then((response) => {
          console.log(response.data);
        });
      navigate("/Search");

      // Handle successful login
    } catch (error) {
      // Handle login error
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };


  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="first_name" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    name="first_name"
                    type="text"
                    value={formData.first_name}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="last_name">
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
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
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleSignUp}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link color={"blue.400"} onClick={handleLoginClick}>
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

// const Register = () => {
//   const [formData, setFormData] = useState({});

//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     e.preventDefault()
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleLogin = async () => {
//     try {
//       await axios.post('http://localhost:5000/register', formData).then(response=>{
//         console.log(response.data);
//       });
//       navigate("/Search");

//       // Handle successful login
//     } catch (error) {
//       // Handle login error
//     }
//   };
// console.log(formData)
//   return (
//     <div className='container'>
//         <div className='header'>
//             <div className='text'>Register</div>
//             <div className = "underlined"> </div>
//         </div>
//         <div className='inputs'>
//             <div className= 'input'>
//                 <img src={user_icon} alt=""/>
//                 <input type= "text"  name='first_name' placeholder='First Name' value={formData.first_name} onChange={handleInputChange}/>
//             </div>
//             <div className= 'input'>
//                 <img src={user_icon} alt=""/>
//                 <input type= "text"  name='last_name' placeholder='Last Name' value={formData.last_name} onChange={handleInputChange}/>
//             </div>
//             <div className= 'input'>
//                 <img src={email_icon} alt=""/>
//                 <input type= "email"  name='email' placeholder='Email' value={formData.email} onChange={handleInputChange}/>
//             </div>
//             <div className= 'input'>
//                 <img src={password_icon} alt=""/>
//                 <input type= "password" name="password" placeholder='Password' value={formData.password} onChange={handleInputChange}/>
//             </div>
//         </div>
//         {/* <div className="forgot-password">Can't remember password? <span>Click here!</span></div> */}
//         <div className="submit-container">
//             <div>
//                 <button onClick={handleLogin}>Register</button>
//             </div>
//         </div>
//     </div>
//   );
// };

// export default Register;
