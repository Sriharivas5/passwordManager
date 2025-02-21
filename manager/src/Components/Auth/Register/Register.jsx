import React, { useState, useEffect } from 'react';
import './Register.css';
import { useNavigate, Link } from 'react-router';
import axios from "axios"

import { LuEye } from "react-icons/lu";
import { LuEyeClosed } from "react-icons/lu";

const Register = () => {
  const navigate = useNavigate()

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPosted, setIsPosted] = useState(false)
  const [inputOtp, setInputOtp] = useState(null)
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setName(value);
    } else if (name === 'password') {
      setPassword(value);
    }
    else if (name === 'email') {
      setEmail(value);
    }
  };


  let data = {
    fullname: name,
    email: email,
    password: password
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await axios.post("https://passwordmanager-d81l.onrender.com/api/register", data);
      if (response.status === 201) {
        setIsPosted(true); // Show "Verify OTP" button
        // Fetch OTP data from backend
        const usersData = await axios.get("https://passwordmanager-d81l.onrender.com/api/get-users");
        // console.log("Users Data:", usersData.data); // Handle OTP data as needed

        let registeredUser = await usersData.data.filter((item) => {
          return item.email == email
        })
        localStorage.setItem("userId", registeredUser[0]._id)
        localStorage.setItem("userEmail", registeredUser[0].email)
        sessionStorage.setItem("isUserLoddedIn", true)
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error || "An error occurred. Please try again.");
      }

    }


  };





  const validateOtp = async () => {

    let userEmail = localStorage.getItem("userEmail")


    const otps = await axios.get("https://passwordmanager-d81l.onrender.com/api/getotps")
    let otp = otps.data.filter((item) => {
      return item.email == userEmail
    })

    if (inputOtp == otp[0].otp) {
      navigate("/manager")
    } else {
      alert("otp is incorrect please enter valid otp")
    }
  }

  return (
    <div className='register'>
      <h2 className="register-title">Register</h2>
      {error && <p className="error-message">{error}</p>}
      <div className='sub-register'>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={name}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <div style={{ position: "relative" ,width:"80%"}} >
          <input
            type="text"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
            id="registerPassword"
          />
          {showPassword ?
            <LuEye id="eyeIcon" onClick={() => setShowPassword(!showPassword)} />
            :
            <LuEyeClosed id="eyeIcon" onClick={() => setShowPassword(!showPassword)} />
          }
        </div>

        {isPosted && <input type="text" placeholder='Enter OTP' onChange={(e) => setInputOtp(e.target.value)} />}
        {
          isPosted ?
            <button onClick={validateOtp}>Verify Otp</button>
            : <button onClick={handleSubmit} id='submit' >Submit</button>
        }
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};

export default Register;
