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

const port = process.env.DB_PORT;
app.listen(port || 5000, () => {
    console.log(`App running at port ${port}`);
})