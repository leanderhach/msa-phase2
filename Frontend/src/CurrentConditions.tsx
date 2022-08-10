import React, {useEffect} from 'react';
import './CurrentConditions.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import weatherCodeToIcon from "./utils/weatherCodeToIcon";
import convertTemperature from "./utils/ConvertTemperature";
import useGlobalState from "./utils/State";
import {Stack} from "@mui/material";

function CurrentConditions() {

    let [currentLocation] = useGlobalState('location');
    let [hourlyData] = useGlobalState('hourlyData');
    let currentTime = new Date(new Date().setMinutes(0, 0, 0)).getTime();

    let currentData = () => {
        if(hourlyData) {
            let data = hourlyData.find((item) => new Date(item.startTime).getTime() === currentTime);

            if(data) {
                return data;
            }
        }
        return {
            values: {
                precipitationProbability: 0,
                windSpeed: 0,
                humidity: 0,
                weatherCode: 0,
                temperature: 0,
            }
        }
    }

    let formattedLocation = () => {
        return `${currentLocation.requested_location}`;
    }

    useEffect (()  => {
        currentData();
        formattedLocation();
    })

    return (
        <div className="current-conditions">
            <Stack direction={"row"} justifyContent={"flex-start"} alignItems={"center"} mt={2} mb={4}>
                <FontAwesomeIcon icon="location-dot"></FontAwesomeIcon>
                <p className="text semi-bold">{formattedLocation()}</p>
            </Stack>
            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                <div className="condition-details">
                    <Stack spacing={1} direction={"row"}>
                        <h1 className="text light">{convertTemperature('celsius', currentData().values.temperature)}</h1>
                        <FontAwesomeIcon id="degree-icon" icon="circle-dot"></FontAwesomeIcon>
                    </Stack>
                </div>
                <FontAwesomeIcon id="condition-icon" icon={weatherCodeToIcon(currentData().values.weatherCode)}></FontAwesomeIcon>
            </Stack>
            <Stack direction={"row"} justifyContent={"space-between"} mt={4} mb={4}>
                <Stack direction={"row"} spacing={0} alignItems={"center"}>
                    <FontAwesomeIcon icon={"droplet"}></FontAwesomeIcon>
                    <p className="text light">{currentData().values.humidity}%</p>
                </Stack>
                <Stack direction={"row"} spacing={0} alignItems={"center"}>
                    <FontAwesomeIcon icon={"wind"}></FontAwesomeIcon>
                    <p className="text light">{currentData()!.values.windSpeed} km/h</p>
                </Stack>
                <Stack direction={"row"} spacing={0} alignItems={"center"}>
                    <FontAwesomeIcon icon={"umbrella"}></FontAwesomeIcon>
                    <p className="text light">{currentData()!.values.precipitationProbability}%</p>
                </Stack>
            </Stack>
        </div>
    );
}

export default CurrentConditions;
