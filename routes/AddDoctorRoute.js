const express = require('express');
const router = express.Router();
const addDoctor = require("../controllers/AddDoctorController");

router.post("/add-doctor", addDoctor);

module.exports = router