const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/user");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if user exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Error registering user" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ user_id: user.user_id, name:user.name, email:user.email }, process.env.JWT_SECRET, { expiresIn: "5m" });
    res.json({ token, userid:user.user_id, name:user.name});
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Error logging in" });
  }
};

exports.dashboard = (req, res) => {
  res.json({ message: "Protected route, Hello I'm Dashboard!" });
};

exports.logout = (req, res)=> {
  res.json({message:"Logout successful!"});
};
