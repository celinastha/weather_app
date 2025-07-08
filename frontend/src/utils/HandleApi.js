import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const baseUrl = "https://weather-app-o232.onrender.com";

const getCurrentWeather = async (city, metricUnit, setWeather, setError) => {
    var unitUsed = "imperial";
    if(metricUnit === "°F"){
        unitUsed = "imperial";
    } else if(metricUnit === "°C"){
        unitUsed = "metric";
    }
    try {
        const response = await fetch(`${baseUrl}/search/${city}?unit=${encodeURIComponent(unitUsed)}`);
        if(response){
            setError('');
        }
        const weatherData = await response.json();
        console.log("Current city weather - ", weatherData);
        setWeather({
            city: weatherData.name,
            iconCode: weatherData.weather[0].icon,
            temperature: Math.floor(weatherData.main.temp),
            description: weatherData.weather[0].main,
            feelsLike: Math.floor(weatherData.main.feels_like),
            windSpeed: weatherData.wind.speed,
            humidity: weatherData.main.humidity,
            visibility: weatherData.visibility,
            pressure: weatherData.main.pressure,
            tempMax: Math.floor(weatherData.main.temp_max),
            tempMin: Math.floor(weatherData.main.temp_min),
            clouds: weatherData.clouds.all
        });
    } catch(err){
        console.log(err);
        setError(`Can't find Weather info for ${city}`);
    }
}


const getFavoriteCities = async (setFavCities) => {
    try {
        const response = await fetch(`${baseUrl}/getFavCities`);
        const favData = await response.json();
        console.log("fav Data: ", favData);
        setFavCities(favData);
    } catch(err){
        console.log(err);
    }
}

const savFavCities = async (currentCity, setFavCities) => {
    try{
        const response = await fetch(`${baseUrl}/saveFavCity`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({city: `${currentCity}`})
        });
        const responseTxt = await response.text();
        console.log('Response: ', responseTxt);
        toast.success(responseTxt);
        getFavoriteCities(setFavCities);
    }
    catch(err){
        console.error('Error: ', err);
    }
}

const removeFavCities = async (currentCity, setFavCities) => {
    try{
        const response = await fetch(`${baseUrl}/deleteFavCity`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({city: `${currentCity}`})
        });
        const responseTxt = await response.text();
        console.log('Response: ', responseTxt);
        toast.warn(responseTxt);
        getFavoriteCities(setFavCities);
    }
    catch(err){
        console.error('Error: ', err);
    }
}

export {getCurrentWeather, getFavoriteCities, savFavCities, removeFavCities}

/*axios
    .get(`${baseUrl}/search/${city}`)
    .then(({data}) => {
        console.log("data -> ", data);
    })
    .catch((err) => console.log("Error: ", err))*/
