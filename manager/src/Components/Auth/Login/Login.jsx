// import React, { useState } from 'react';
// import './Login.css';
// import { useNavigate,Link } from 'react-router';
// import axios from 'axios';
// const Login = () => {
//   const navigate = useNavigate()

//   const [name, setName] = useState('');
//   const [password, setPassword] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === 'username') {
//       setName(value);
//     } else if (name === 'password') {
//       setPassword(value);
//     }
//   };

//   let data = {
//     fullname: name,
//     password: password
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("http://localhost:3001/api/login", data);
//       const usersData = await axios.get("http://localhost:3001/api/get-users");

//       if (response.status === 200) {
//         let registeredUser = await usersData.data.filter((item) => {
//           return item.fullname == name
//         })
//         localStorage.setItem("userId", registeredUser[0]._id)
//         localStorage.setItem("userEmail", registeredUser[0].email)
//         navigate("/manager")
//       }
//     } catch (error) {
//       if (error.response) {
//         alert(error.response.data);
//       } else if (error.request) {
//         alert("No response from server. Please try again.");
//       } else {
//         alert("An error occurred. Please try again.");
//       }
//       console.error("Login error:", error);
//     }
//   }
//   return (
//     <div className='login'>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Username"
//           name="username"
//           value={name}
//           onChange={handleChange}
//         />
//         <input
//           type="text"
//           placeholder="Password"
//           name="password"
//           value={password}
//           onChange={handleChange}
//         />
//         <input type="submit" id='submit' value="Login" />
//         <p>Don't have an account? <Link to="/">Register</Link></p>

//       </form>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css"
import { LuEye } from "react-icons/lu";
import { LuEyeClosed } from "react-icons/lu";

const Login = () => {
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");




    if (!fullname || !password) {
      setError("Username and password are required");
      return;
    }

    try {
      const response = await axios.post("https://passwordmanager-d81l.onrender.com/api/login", {
        fullname,
        password,
      });

      if (response.status === 200) {
        const usersData = await axios.get("https://passwordmanager-d81l.onrender.com/api/get-users");

        let registeredUser = usersData.data.find((user) => user.fullname === fullname);

        if (!registeredUser) {
          setError("User not found.");
          return;
        }

        localStorage.setItem("userId", registeredUser._id);
        localStorage.setItem("userEmail", registeredUser.email);
        sessionStorage.setItem("isUserLoddedIn", true)
        alert("Login successful!");
        navigate("/manager");
      }
    } catch (error) {
      setError(error.response?.data?.error || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="login">
      <h2 className="login-title">Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form className="login" onSubmit={handleLogin}>
        <input
          type="text"
          className="login-input"
          placeholder="Full Name"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />
        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            className="login-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {showPassword ?
            <LuEye id="eyeIcon" onClick={() => setShowPassword(!showPassword)} />
            :
            <LuEyeClosed id="eyeIcon" onClick={() => setShowPassword(!showPassword)} />
          }
        </div>

        <input type="submit" id='submit' value="Login" />
        <p>Don't have an account? <Link to="/">Register</Link></p>
      </form>
    </div>
  );
};

export default Login;
