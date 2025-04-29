const express = require("express");
const app = express();
require('dotenv').config();
const cors = require('cors');
const getDoctorDetails = require('./routes/ListDoctorRoute');

const allowedorigins = process.env.FRONTEND_URL.split(',');

app.use(cors({
    origin:"*",
    // origin : (origin, callback) => {
    //     if(allowedorigins.includes(origin)){
    //         callback(null, true);
    //     }else{
    //         callback(new Error("Not allowed by cors!"))
    //     }
    // },
    credentials: true,
}));

app.use(express.json());
app.use("/api", getDoctorDetails);

const port = process.env.DB_PORT;
app.listen(port || 5000, () => {
    console.log(`App running at port ${port}`);
})