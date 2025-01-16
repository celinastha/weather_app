const database = require('../database');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
require('dotenv').config();


module.exports.search = async (req, res) => {
    const { city } = req.body;

    if (!city) { 
        return res.status(400).send({message: "City not provided"}); 
    }

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.APIKEY}`;
        const response = await fetch(url);

        if(!response.ok){
            throw new Error(`failed to fetch data: ${response.statusText}`);
        }

        const weatherData = await response.json();
        res.status(200).send(weatherData);

    } catch(err){
        res.status(500).send(err.message);
    }
};


module.exports.getFavCities = async (req, res) => {
    database.query(`SELECT * FROM favorite_cities`, (err, result, field) => {
        if(err){
            res.status(500).send("Error fetching fav cities");
        }
        console.log("Fav cities: \n", result);
        res.status(200).send(result);

    });
};

module.exports.saveFavCity = async (req, res) => {
    const { city } = req.body;
    try{
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.APIKEY}`;
        const response = await fetch(url);

        if(!response.ok){
            throw new Error(`failed to fetch data: ${response.statusText}`);
        }

        const weatherData = await response.json();
        console.log(weatherData);
        

        const weatherJsonData = JSON.stringify(weatherData);
        database.query(`INSERT INTO favorite_cities (city, weather_data) VALUES (?, ?)`, [city, weatherJsonData], (err, result) => {
            if(err){
                return res.status(500).send(err);
            }
            res.status(200).send(`${city} city SAVED to your fav cities ❤️!`);
        });
    } catch(err){
        res.status(500).send(`Error fetching weather info for ${city}`);
    }
};

module.exports.deleteFavCity = async (req, res) => {
    const { city } = req.body;
    database.query(`DELETE FROM favorite_cities WHERE city= ?`, [city], (err, result) => {
        if(err){
            return res.status(500).send(err);
        }
        res.status(200).send(`${city} city DELETED from your fav cities!`);
    });
};