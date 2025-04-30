const pool = require("../db/connection"); 
const multer = require("multer"); 

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, 
}).single("image");

const addDoctor = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: "Error uploading image", error: err.message });
    }

    const { name, type, qualifications, hospital, location, price, mode_of_consult, experience, languages, faculty } = req.body;
    if (!name || !type || !qualifications || !hospital || !location || !price || !mode_of_consult || !experience || !languages || !faculty) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const image = req.file ? req.file.buffer : null; 
    const modeOfConsultArray = `{${JSON.parse(mode_of_consult).join(',')}}`;
    const languagesArray = `{${JSON.parse(languages).join(',')}}`;

    if (!image) {
      return res.status(400).json({ message: "Image is required" });
    }

    let client;
    try {
      client = await pool.connect();
      
      const query = `
        INSERT INTO doctors (
          image, name, type, qualifications, hospital, location, price,
          mode_of_consult, experience, languages, faculty
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
        )
      `;

      const params = [
        image,
        name,
        type,
        qualifications,
        hospital,
        location,
        price,
        modeOfConsultArray,
        experience,
        languagesArray,
        faculty,
      ];

      const result = await client.query(query, params);

      if (result.rowCount > 0) {
        res.status(200).json({ message: "Doctor added successfully!" });
      } else {
        res.status(400).json({ message: "Doctor not added" });
      }
    } catch (err) {
      console.error("Error during doctor insertion:", err);
      res.status(500).json({ message: "Internal Server Error!" });
    } finally {
      if (client) client.release();
    }
  });
};

module.exports = addDoctor;
