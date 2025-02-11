import React, { useState } from 'react'
import Search from './components/Search/Search'
import CurrentWeather from './components/CurrentWeather/CurrentWeather'
import { ToastContainer } from 'react-toastify';

const App = () => {
  const [city, setCity] = useState('');
  const [favCities, setFavCities] = useState([]);
  const [metricUnit, setMetricUnit] = useState("°F");

  return (
    <div className='App'>
      <Search setCurrentCity={setCity} setCurrentMetricUnit={setMetricUnit} setFavCities={setFavCities} favCities={favCities}/>
      <CurrentWeather currentCity={city} currentMetricUnit={metricUnit} setFavCities={setFavCities} favCities={favCities}/>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        theme='dark'
      />
    </div>
  )
}

export default App
