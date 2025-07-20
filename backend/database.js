const mysql = require('mysql2');
const dotenv = require('dotenv');

require('dotenv').config();

const database = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

database.connect((err) => {
    if(err){
        console.log('Error connecting to database - ', err);
        return;
    }
    console.log('Connected to MySQl database!'); 
});

module.exports = database;