require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
require("./config/db");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors()); // Enable CORS to allow frontend requests
// app.use(bodyParser.json());
app.use(express.json());
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/task", taskRoutes);

// Start Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
