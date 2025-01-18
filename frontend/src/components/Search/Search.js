import React, { useState } from 'react'
import './Search.css'
import { FiSearch } from "react-icons/fi"

const Search = () => {

    const [city, setCity] = useState("");
    const [metricUnit, setMetricUnit] = useState("°F");
    const [searchInputValue, setSearchInputValue] = useState("");
    const [favCityValue, setFavCityValue] = useState("");
    const [favBtnText, setFavBtnText] = useState("Fav City ❤️");
    const [responsiveOptionOpen, setResponsiveOptionOpen] = useState(false);

    const toggleResponsiveOption = () => {
        setResponsiveOptionOpen(!responsiveOptionOpen);
        setFavBtnText(favBtnText === "Fav City ❤️" ? "Go Back" : "Fav City ❤️");
    };


    const handleChangeFavCity = (e) => {
        setFavCityValue(e.target.value);
        setCity(e.target.value);
        console.log("Current city is: ", e.target.value);
        setResponsiveOptionOpen(!responsiveOptionOpen);
        setFavBtnText(favBtnText === "Fav City ❤️" ? "Go Back" : "Fav City ❤️");
    };


    const handleSearchEnter = (e) => {
        if(e.key === 'Enter'){
            setCity(searchInputValue);
            console.log("Current city is: ", searchInputValue);
            setFavCityValue("");
            setSearchInputValue("");
            
        }
    };
    const handleSearchChange = (e) => {
        setSearchInputValue(e.target.value);
    };

    const handleMetricChange = (e) => {
        setMetricUnit(e.target.value);
    };


    return (
        <div className='Search'>

            <div className={`favMenuBtn ${responsiveOptionOpen ? 'close' : ''}`} onClick={toggleResponsiveOption}>
                <span className='bar'></span>
                <span className='bar'></span>
                <span className='bar'></span>
            </div>


            <div className={`favMenu ${responsiveOptionOpen ? 'show' : ''}`}>
                <h2>Fav Cities</h2>
                    <ul className='favCitiesList'>
                        <li><button className='favCity' value="City1" onClick={handleChangeFavCity}>City1</button></li>
                        <li><button className='favCity' value="City2" onClick={handleChangeFavCity}>City2</button></li>
                        <li><button className='favCity' value="City3" onClick={handleChangeFavCity}>City3</button></li>
                    </ul>
            </div>


            <button className='favCityButton' onClick={toggleResponsiveOption}>
                {favBtnText}
            </button>
            

            <div className='searchInputContainer'>
                <input className='searchInput' id='searchInput' type='text' value={searchInputValue} placeholder="" onChange={handleSearchChange} onKeyDown={handleSearchEnter} />
                <label className='searchLabel' htmlFor="searchInput"> Search any city </label>
                <FiSearch className='searchIcon'/>
            </div>
                

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
    )
}

export default Search
