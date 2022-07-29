import React from 'react';
import testData from './testData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const currentLocation = "Auckland";

const weatherData = testData.data.timelines[0].intervals;

const currentWeatherCondition = weatherData[0].values.weatherCode

const currentWeatherIcon = (): string => {
    let weatherCondition = weatherData[0].values.weatherCode
    let weatherIcon: string;

    if(weatherCondition == 1000 || weatherCondition == 1100) {
        weatherIcon = "sun";
    }
    else if (weatherCondition == 1101 || weatherCondition == 1102) {
        weatherIcon = "cloud-sun";
    }
    else if (weatherCondition == 1001) {
        weatherIcon = "cloud";
    }
    else if (weatherCondition == 2000 || weatherCondition == 2001) {
        weatherIcon = "smog";
    }
    else if (weatherCondition == 4000 || weatherCondition == 4001 || weatherCondition == 4200) {
        weatherIcon = "cloud-rain";
    }
    else if (weatherCondition > 5000 && weatherCondition < 6000) {
        weatherIcon = "snowflake";
    } else {
        weatherIcon = "sun";
    }

    return weatherIcon;
};


function CurrentConditions() {
    return (
        <div className="current-conditions">
            <div className="container">
                <div className="condition-details">
                    <div className="container">
                        <FontAwesomeIcon icon="location-dot"></FontAwesomeIcon>
                        {currentLocation}
                    </div>
                </div>
            </div>
            <FontAwesomeIcon icon={currentWeatherIcon}></FontAwesomeIcon>
        </div>
    );
}

export default CurrentConditions;
