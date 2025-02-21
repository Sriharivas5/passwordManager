// require("dotenv").config({ path: "./.env" });

// const jwt = require("jsonwebtoken"); // For generating JSON Web Tokens (JWTs)
// const bcrypt = require("bcryptjs"); // For hashing and comparing passwords

// const User = require("../Model/auth");

// const secretKey = "process.env.SECRET_KEY";
// const { sendOtp } = require("./otpController");

// exports.registerUser = async (req, res) => {
//   try {
//     // Extract user data from request body
//     const { fullname, email, password } = req.body;

//     // Check if a user with the same email already exists
//     const existingUser = await User.findOne({ fullname });
//     if (existingUser) {
//       return res
//         .status(400)
//         .json({ error: "User already exists with this usrname" });
//     }

//     // Generate a JWT token for the user with an expiration time of 1 hour
//     const token = jwt.sign({ email }, secretKey, { expiresIn: "1h" });

//     // Hash the user's password
//     const hashedPassword = await bcrypt.hash(password.toString(), 10);

//     const newUser = new User({
//       fullname,
//       email,
//       password: hashedPassword,
//     });

//     const savedUser = await newUser.save();

//     let date = new Date();
//     let otpData = await sendOtp(fullname, email, date);
//     console.log(otpData);

//     // Save the updated user document

//     res.status(201).json({ user: savedUser, token, otpData });
//   } catch (error) {
//     res.status(500).send("Error registering user", error);
//     // res.sendStatus(500)
//     // res.send(error)

//   }
// };

// exports.getUsers = async (req, res) => {
//   try {
//     const users = await User.find();

//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to retrieve  users",
//       error: error.message,
//     });
//   }
// }

// exports.loginUser = async (req, res) => {
//   try {
//     // Extract user data from request body
//     const { fullname, password } = req.body;

//     // Find the user in the database by fullname
//     const user = await User.findOne({ fullname });

//     if (!user) {
//       // If no user is found, respond with an error message
//       return res.status(401).send("Invalid credentials");
//     }

//     // Compare the provided password with the stored hashed password
//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     if (isPasswordValid) {
//       const token = jwt.sign({ fullname: fullname }, process.env.SECRET_KEY, {
//         expiresIn: "1h",
//       });

//       // If the password is valid, respond with user details (you might want to include a JWT token here)
//       res.status(200).json({ token: token, user: user });
//     } else {
//       // If the password is incorrect, respond with an error message
//       res.status(401).send("Enter correct password");
//     }
//   } catch (error) {
//     // Handle any errors that occur during user login
//     res.status(500).send(error);
//     console.log(error);
//   }
// };



require("dotenv").config({ path: "./.env" });

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../Model/auth");
const { sendOtp } = require("./otpController");

const secretKey = process.env.SECRET_KEY; // Ensure SECRET_KEY is correctly loaded

exports.registerUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    // Validate input
    if (!fullname || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ fullname }).exec();
    const existingEmail = await User.findOne({ email }).exec();

    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }
    if (existingEmail) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password.toString(), 10);

    const newUser = new User({ fullname, email, password: hashedPassword });
    const savedUser = await newUser.save();

    // Send OTP (error handling included)
    try {
      let date = new Date();
      let otpData = await sendOtp(fullname, email, date);
      res.status(201).json({ user: savedUser, otpData });
    } catch (otpError) {
      console.error("OTP Error:", otpError);
      res.status(500).json({ error: "User registered, but OTP sending failed" });
    }
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { fullname, password } = req.body;

    if (!fullname || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    const user = await User.findOne({ fullname }).exec();

    if (!user) {
      return res.status(401).json({ error: "Invalid username" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    // Generate JWT Token
    const token = jwt.sign({ fullname: user.fullname }, secretKey, { expiresIn: "1h" });

    res.status(200).json({ token, user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve  users",
      error: error.message,
    });
  }
}
