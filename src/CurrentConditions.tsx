import React from 'react';
import { hourlyData } from './testData';
import './CurrentConditions.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import Chip from '@mui/material/Chip';
import weatherCodeToIcon from "./utils/weatherCodeToIcon";
import convertTemperature from "./utils/ConvertTemperature";

const currentLocation = "Christchurch, New Zealand";
const weatherData = hourlyData.data.timelines[0].intervals;
const currentTemperature = weatherData[0].values.temperature;
const currentFeelsLike = weatherData[0].values.temperatureApparent;
const weatherCode = weatherData[0].values.weatherCode;

function CurrentConditions() {
    return (
        <div className="current-conditions">
            <div className="container v-centered">
                <FontAwesomeIcon icon="location-dot"></FontAwesomeIcon>
                {currentLocation}
            </div>
            <div className="container container--space-between v-centered">
                <div className="condition-details">
                    <div className="container" id="temperature">
                        <h1 className="title">{convertTemperature('celsius', currentTemperature)}</h1>
                        <FontAwesomeIcon id="degree-icon" icon="circle-dot"></FontAwesomeIcon>
                    </div>
                </div>
                <FontAwesomeIcon id="condition-icon" icon={weatherCodeToIcon(weatherCode)}></FontAwesomeIcon>
            </div>
            <div className="container container--space-between">
                <div className="container v-centered">
                    <FontAwesomeIcon icon={"droplet"}></FontAwesomeIcon>
                    {weatherData[0].values.humidity}%
                </div>
                <div className="container v-centered">
                    <FontAwesomeIcon icon={"wind"}></FontAwesomeIcon>
                    {weatherData[0].values.windSpeed} km/h
                </div>
                <div className="container v-centered">
                    <FontAwesomeIcon icon={"umbrella"}></FontAwesomeIcon>
                    {weatherData[0].values.precipitationProbability}%
                </div>
            </div>
        </div>
    );
}

export default CurrentConditions;
