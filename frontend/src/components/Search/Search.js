import React, { useEffect, useState } from 'react'
import './Search.css'
import { FiSearch } from "react-icons/fi"
import { MdClear } from "react-icons/md"
import { getFavoriteCities } from '../../utils/HandleApi'

const Search = ({ setCurrentCity, setCurrentMetricUnit, setFavCities, favCities }) => {
    const [city, setCity] = useState("Austin");
    const [metricUnit, setMetricUnit] = useState("°F");
    const [searchInputValue, setSearchInputValue] = useState("");
    const [favCityValue, setFavCityValue] = useState("");
    const [favBtnText, setFavBtnText] = useState("My Fav Cities ❤️");
    const [responsiveOptionOpen, setResponsiveOptionOpen] = useState(false);

    useEffect(() => {
        if(city){
            setCurrentCity(city);
        }
        if(metricUnit){
            setCurrentMetricUnit(metricUnit);
        }
        getFavoriteCities(setFavCities);
    }, [city, setCurrentCity, metricUnit, setCurrentMetricUnit, setFavCities])


    const toggleResponsiveOption = () => {
        setResponsiveOptionOpen(!responsiveOptionOpen);
        setFavBtnText(favBtnText === "My Fav Cities ❤️" ? "Go Back" : "My Fav Cities ❤️");
    };

    const clearInputs = () => {
        setSearchInputValue("");
    };

    const handleChangeFavCity = (e) => {
        setFavCityValue(e.target.value);
        setCity(e.target.value);
        console.log("Current city is: ", e.target.value);
        setResponsiveOptionOpen(!responsiveOptionOpen);
        setFavBtnText(favBtnText === "My Fav Cities ❤️" ? "Go Back" : "My Fav Cities ❤️");
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if(searchInputValue){
            setCity(searchInputValue);
            console.log("Current city is: ", searchInputValue);
            setFavCityValue("");
            setSearchInputValue("");
        } 
        else{
            return console.log("Need search city");
        }
    };

    const handleSearchChange = (e) => {
        setSearchInputValue(e.target.value);
    };

    const handleMetricChange = (e) => {
        setMetricUnit(e.target.value);
    };

    const firstLetterCapital = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };


    return (
        <div className='Search'>
            <div className='searchContainer'>
                <div className={`favMenuBtn ${responsiveOptionOpen ? 'close' : ''}`} onClick={toggleResponsiveOption}>
                    <span className='bar'></span>
                    <span className='bar'></span>
                    <span className='bar'></span>
                </div>


                <div className={`favMenu ${responsiveOptionOpen ? 'show' : ''}`}>
                    <div className='title_description'>
                        <h2>Fav Cities</h2>
                        <p className='favDescription'>Click on the heart next to cities to make it ur fav city!</p>
                    </div>
                        <ul className='favCitiesList'>
                            {favCities.map((favCity) => (
                                <li key={favCity.id}>
                                    <button className='favCity' value={favCity.city} onClick={handleChangeFavCity}>
                                        {firstLetterCapital(favCity.city)}
                                    </button>
                                </li>))}
                        </ul>
                </div>


                <button className='favCityButton' onClick={toggleResponsiveOption}>
                    {favBtnText}
                </button>
                

                <form className='searchInputContainer' onSubmit={handleSearch}>
                    <input className='searchInput' id='searchInput' type='text' value={searchInputValue} placeholder="" onChange={handleSearchChange}/>
                    <label className='searchLabel' htmlFor="searchInput"> Search any city </label>
                    <button className={`clearInput ${searchInputValue ? 'show' : ''}`} type="button" onClick={clearInputs}><MdClear className='clear'/></button>
                    <button className='searchIconContainer' type="submit"><FiSearch className='searchIcon'/></button>
                </form>
                    

                <select className='metricUnitSelect' value={metricUnit} onChange={handleMetricChange}>
                    <option value="°F">°F</option>
                    <option value="°C">°C</option>
                </select>


                

                <div className='debugHelpers'>
                    <p>Current city is: {city}</p>
                    <p>Fav City Current value is: {favCityValue}</p>
                    <p>Input value Current is: {searchInputValue}</p>
                    <p>Metric unit is: {metricUnit}</p>
                </div>
            </div>
        </div>
    )
}


export default Search
