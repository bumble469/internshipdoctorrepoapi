const express = require("express");
const app = express();
require('dotenv').config();
const cors = require('cors');
const getDoctorDetails = require('./routes/ListDoctorRoute');
const addDoctor = require("./routes/AddDoctorRoute");
const allowedorigins = process.env.FRONTEND_URL.split(',');

app.use(cors({
    origin : allowedorigins,
    credentials: true,
}));

app.use(express.json());
app.use("/api", getDoctorDetails, addDoctor);

const PORT = process.env.PORT || 5000;
;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});