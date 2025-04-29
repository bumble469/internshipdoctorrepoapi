const express = require('express');
const router = express.Router();
const getDoctorDetails = require('../controllers/ListDoctorController'); 

router.post("/get-doctors", getDoctorDetails);

module.exports = router;