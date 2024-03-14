import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import user_icon from "./Assets/person.png";
import email_icon from "./Assets/email.png";
import password_icon from "./Assets/password.png";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      await axios
        .post("http://localhost:5000/login", formData)
        .then((response) => {
          console.log(response);
        });
        navigate("/Search");
      // Handle successful login
    } catch (error) {
      // Handle login error
    }
  };

  const handleRegister = () => {
    navigate("/Signup");
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Login</div>
        <div className="underlined"> </div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={email_icon} alt="" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="forgot-password">
        Can't remember password? <span>Click here!</span>
      </div>
      <div className="submit-container">
        <div>
          <button onClick={handleLogin}>Login</button>
        </div>
        <div>
          <div>
            Don't have an account?{" "}
            <button onClick={handleRegister}>Register</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
