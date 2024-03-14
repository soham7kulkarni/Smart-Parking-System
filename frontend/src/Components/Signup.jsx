import React, { useState } from 'react'
import './Signup.css'
import axios from 'axios';
import user_icon from './Assets/person.png'
import email_icon from './Assets/email.png'
import password_icon from './Assets/password.png'
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({});

  const navigate = useNavigate();
  

  const handleInputChange = (e) => {
    e.preventDefault()
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      await axios.post('http://localhost:5000/register', formData).then(response=>{
        console.log(response.data);
      });
      navigate("/Search");
      
      // Handle successful login
    } catch (error) {
      // Handle login error
    }
  };
console.log(formData)
  return (
    <div className='container'>
        <div className='header'>
            <div className='text'>Register</div>
            <div className = "underlined"> </div>
        </div>
        <div className='inputs'>
            <div className= 'input'>
                <img src={user_icon} alt=""/>
                <input type= "text"  name='first_name' placeholder='First Name' value={formData.first_name} onChange={handleInputChange}/>
            </div>
            <div className= 'input'>
                <img src={user_icon} alt=""/>
                <input type= "text"  name='last_name' placeholder='Last Name' value={formData.last_name} onChange={handleInputChange}/>
            </div>
            <div className= 'input'>
                <img src={email_icon} alt=""/>
                <input type= "email"  name='email' placeholder='Email' value={formData.email} onChange={handleInputChange}/>
            </div>
            <div className= 'input'>
                <img src={password_icon} alt=""/>
                <input type= "password" name="password" placeholder='Password' value={formData.password} onChange={handleInputChange}/>
            </div>
        </div>
        {/* <div className="forgot-password">Can't remember password? <span>Click here!</span></div> */}
        <div className="submit-container">
            <div>
                <button onClick={handleLogin}>Register</button>
            </div>
        </div>
    </div>
  );
};

export default Register;