require('dotenv').config();
const { Pool } = require("pg");

const pool = new Pool({
    host : process.env.DB_SERVER,
    user : process.env.DB_USERNAME,
    port : process.env.PORT,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE,
    ssl : {
        rejectUnauthorized: false
    }
});

pool.connect().then(client => {
    console.log(`Connected!`);
    client.release();
}).catch(err => {
    console.log(`Error connecting`, err)
});

module.exports = pool;