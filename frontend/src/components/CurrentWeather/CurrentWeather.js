import React, { useEffect, useState } from 'react'
import './CurrentWeather.css'
import { getCurrentWeather, removeFavCities, savFavCities } from '../../utils/HandleApi'
import { FaHeart } from "react-icons/fa6";

const CurrentWeather = ({ currentCity, currentMetricUnit, setFavCities, favCities }) => {
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCityAndWeatherData = async () => {
      if(currentCity){
        setLoading(true);
        try{
          console.log("Current city - ", currentCity);
          getCurrentWeather(currentCity, currentMetricUnit, setWeather, setError);
        } 
        catch(err){
          console.log("Error fetching data: ", err);
        }
        finally{
          setLoading(false);
        }
      }
      else{
        console.error("No current city");
      }
    };

    fetchCityAndWeatherData();
  }, [currentCity, favCities, currentMetricUnit])

  const iconUrl = `https://openweathermap.org/img/wn/${weather.iconCode}@2x.png`;

  const handleSavFav = (e) => {
    e.preventDefault();
    savFavCities(currentCity, setFavCities);
  }

  const handleRemoveFav = (e) => {
    e.preventDefault();
    removeFavCities(currentCity, setFavCities);
  }

  const firstLetterCapital = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const isFavCity = favCities.some(favCity => favCity.city.toLowerCase() === currentCity.trim().toLowerCase());

  return (
    <div className='CurrentWeather'>
      {error ? (
        <p className='errorDisplay'>Error: {error}</p>
      ) : (
        <>
          <div className='container'>

            <div className="currentWeatherHeading">
              <h1 className='currentCity'>{firstLetterCapital(currentCity)}</h1>
              {!isFavCity ? 
                (
                  <button className="favIconBtn" onClick={handleSavFav}><FaHeart className="favIcon" color="#DCDCDC"/></button>
                ) : (
                  <button className="favIconBtn" onClick={handleRemoveFav}><FaHeart className="favIcon" color="#DA0505"/></button>
                )
              }
            </div>
            
            <div className='currentWeatherContainer'>
              <h5>Current Weather</h5>
              <div className='currentWeatherInfo'>

                <div className='leftside'>
                  <div className='weatherTemp'>
                    <img src={iconUrl} alt='weather_icon' className='weatherIcon'/>
                    <span className='temp'>{weather.temperature}{currentMetricUnit}</span>
                  </div>
                  <div className='description'>
                    <span className='weatherDescription'>{weather.description}</span>
                    <span className='feelsLike'>Feels Like {weather.feelsLike}{currentMetricUnit}</span>
                  </div>
                </div>

                <div className='rightside'>
                  <div className='tempMaxMinContainer'>
                    <span className='label'>Max/ Min Temp</span>
                    <span className='value maxMin'>{weather.tempMax}{currentMetricUnit} / {weather.tempMin}{currentMetricUnit}</span>
                  </div>
                  <div className='windSpeedContainer'>
                    <span className='label'>Wind Speed</span>
                    <span className='value windSpeed'>{weather.windSpeed} {currentMetricUnit==="°F" ? "mph" : "m/s"}</span>
                  </div>
                  <div className='humidityContainer'>
                    <span className='label'>Humidity</span>
                    <span className='value humidity'>{weather.humidity}%</span>
                  </div>
                  <div className='visibilityContainer'>
                    <span className='label'>Visibility</span>
                    <span className='value visibility'>{weather.visibility} m</span>
                  </div>
                  <div className='pressureContainer'>
                    <span className='label'>Pressure</span>
                    <span className='value pressure'>{weather.pressure} hPa</span>
                  </div>
                  <div className='cloudsContainer'>
                    <span className='label'>Cloudiness</span>
                    <span className='value clouds'>{weather.clouds}%</span>
                  </div>
                </div>

              </div>
              
            </div>

            
          </div>
        </>
      )}
    </div>
  )
}

export default CurrentWeather
