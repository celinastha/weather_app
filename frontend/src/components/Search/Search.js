import React, { useState } from 'react'
import './Search.css'
import { FiSearch } from "react-icons/fi";

const Search = () => {

    const [city, setCity] = useState("");
    const [metricUnit, setMetricUnit] = useState("°F");
    const [inputValue, setInputValue] = useState("");
    const [selectValue, setSelectValue] = useState("");


    const handleChangeFavCity = (e) => {
        setSelectValue(e.target.value);
        setCity(e.target.value);
    };


    const handleSearchEnter = (e) => {
        if(e.key === 'Enter'){
            setCity(inputValue);
            setSelectValue("");
            setInputValue("");
        }
    };
    const handleSearchChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleMetricChange = (e) => {
        setMetricUnit(e.target.value);
    };


    return (
        <div className='Search'>
            <form className='searchForm'>
                <div className='hamburg'>
                    <span className='bar'></span>
                    <span className='bar'></span>
                    <span className='bar'></span>
                </div>
                <select className='favCitySelect' value={selectValue} onChange={handleChangeFavCity}>
                    <option value="" disabled>Fav Cities ❤️</option>
                    <option value="City1">City1</option>
                    <option value="City2">City2</option>
                    <option value="City3">City3</option>
                </select>
            

                <div className='searchInputContainer'>
                    <input className='searchInput' id='searchInput' type='text' value={inputValue} placeholder="" onChange={handleSearchChange} onKeyDown={handleSearchEnter} />
                    <label className='searchLabel' for="searchInput"> Search any city </label>
                    <FiSearch className='searchIcon'/>
                </div>
                

                <select className='metricUnitSelect' value={metricUnit} onChange={handleMetricChange}>
                    <option value="°F">°F</option>
                    <option value="°C">°C</option>
                </select>
            </form>

            <div className='debugHelpers'>
                <p>Current city is: {city}</p>
                <p>Fav Dropdown value is: {selectValue}</p>
                <p>Input value is: {inputValue}</p>
                <p>Metric unit is: {metricUnit}</p>
            </div>
        </div>
    )
}

export default Search
