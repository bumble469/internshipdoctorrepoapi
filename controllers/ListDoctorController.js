const pool = require('../db/connection');

const getDoctorDetails = async (req, res) => {
  const {
    mode_of_consult,
    min_experience,
    max_experience,
    min_fees,
    max_fees,
    languages,
    faculty
  } = req.body;

  let client;

  try {
    client = await pool.connect();

    let queryStr = `SELECT * FROM doctors WHERE 1=1`;
    const params = [];
    let paramIndex = 1;

    if (Array.isArray(mode_of_consult) && mode_of_consult.length > 0) {
      queryStr += ` AND mode_of_consult::text[] && $${paramIndex}::text[]`;
      params.push(mode_of_consult);
      paramIndex++;
    }

    if (min_experience !== null && min_experience !== undefined) {
      queryStr += ` AND experience >= $${paramIndex}`;
      params.push(min_experience);
      paramIndex++;
    }

    if (max_experience !== null && max_experience !== undefined && max_experience !== Infinity) {
      queryStr += ` AND experience <= $${paramIndex}`;
      params.push(max_experience);
      paramIndex++;
    }

    if (min_fees !== null && min_fees !== undefined) {
      queryStr += ` AND price >= $${paramIndex}`;
      params.push(min_fees);
      paramIndex++;
    }

    if (max_fees !== null && max_fees !== undefined && max_fees !== Infinity) {
      queryStr += ` AND price <= $${paramIndex}`;
      params.push(max_fees);
      paramIndex++;
    }

    if (Array.isArray(languages) && languages.length > 0 && languages[0] !== "") {
      queryStr += ` AND languages::text[] && $${paramIndex}::text[]`;
      params.push(languages);
      paramIndex++;
    }

    if (Array.isArray(faculty) && faculty.length > 0 && faculty[0] !== "") {
      queryStr += ` AND faculty = ANY($${paramIndex}::varchar[])`;
      params.push(faculty);
      paramIndex++;
    }

    const result = await client.query(queryStr, params);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No doctors found with the given filters!" });
    }

    const docs = result.rows.map(doc => {
      if (doc.image) {
        const base64image = doc.image.toString('base64');
        doc.image = `data:image/jpeg;base64,${base64image}`;
      }
      return doc;
    });
    

    res.status(200).json({ docs });

  } catch (err) {
    console.error("Error fetching doctors", err);
    res.status(500).json({ message: "Server Error" });
  } finally {
    if (client) client.release();
  }
};

module.exports = getDoctorDetails;
