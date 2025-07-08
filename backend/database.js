const mysql = require('mysql2');
const dotenv = require('dotenv');

require('dotenv').config();

const database = mysql.createConnection({
    host: import.meta.env.DB_HOST,
    user: import.meta.env.DB_USER,
    password: import.meta.env.DB_PASS,
    database: import.meta.env.DB_NAME
});

database.connect((err) => {
    if(err){
        console.log('Error connecting to database - ', err);
        return;
    }
    console.log('Connected to MySQl database!'); 
});

module.exports = database;
