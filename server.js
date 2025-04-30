const express = require("express");
const app = express();
require('dotenv').config();

const cors = require("cors");

// ✅ Use environment variable
const FRONTEND_URL = process.env.FRONTEND_URL

// ✅ Apply CORS before routes
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true // if you need cookies or auth headers
}));

app.use(express.json());

// ✅ Register routes
const getDoctorDetails = require('./routes/ListDoctorRoute');
const addDoctor = require("./routes/AddDoctorRoute");
app.use("/api", getDoctorDetails);
app.use("/api", addDoctor);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
