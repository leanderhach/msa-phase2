import React from 'react';
import testData from './testData';
import './CurrentConditions.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import Chip from '@mui/material/Chip';

const currentLocation = "Times Square, New York";
const weatherData = testData.data.timelines[0].intervals;
const currentTemperature = weatherData[0].values.temperature;

const currentWeatherIcon = (): IconProp => {
    let weatherCondition = weatherData[0].values.weatherCode
    let weatherIcon: IconProp;

    if(weatherCondition === 1000 || weatherCondition === 1100) {
        weatherIcon = "sun";
    }
    else if (weatherCondition === 1101 || weatherCondition === 1102) {
        weatherIcon = "cloud-sun";
    }
    else if (weatherCondition === 1001) {
        weatherIcon = "cloud";
    }
    else if (weatherCondition === 2000 || weatherCondition === 2001) {
        weatherIcon = "smog";
    }
    else if (weatherCondition === 4000 || weatherCondition === 4001 || weatherCondition === 4200) {
        weatherIcon = "cloud-rain";
    }
    else if (weatherCondition > 5000 && weatherCondition < 6000) {
        weatherIcon = "snowflake";
    } else {
        weatherIcon = "sun";
    }

    return weatherIcon;
};

function convertTemperature(convertTo: string, value: number) {
    if(convertTo === "celsius") {
        return Math.round(((value - 32) / 1.8));
    }

    return Math.round(value);
}


function CurrentConditions() {
    return (
        <div className="current-conditions">
            <div className="container">
                <FontAwesomeIcon icon="location-dot"></FontAwesomeIcon>
                {currentLocation}
            </div>
            <div className="container">
                <div className="condition-details">
                    <div className="container" id="temperature">
                        <h1 className="title">{convertTemperature('celsius', currentTemperature)}</h1>
                        <FontAwesomeIcon id="degree-icon" icon="circle-dot"></FontAwesomeIcon>
                    </div>
                    <Chip label="Cloudy"/>
                </div>
                <FontAwesomeIcon id="condition-icon" icon={currentWeatherIcon()}></FontAwesomeIcon>
            </div>
        </div>
    );
}

export default CurrentConditions;
