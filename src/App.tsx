/* eslint-disable @typescript-eslint/no-unused-vars */
/*eslint-disable react-hooks/exhaustive-deps*/
import React, {useEffect} from 'react';
import './App.css';
import CurrentConditions from "./CurrentConditions";
import DayOverview from './DayOverview';
import WeekOverview from "./WeekOverview";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import {FetchWeather} from "./utils/APIHandler";
import useGlobalState from "./utils/State";
import {Backdrop, CircularProgress, Stack, TextField} from "@mui/material";
import {cities} from './cities';


library.add(fas);

function App() {
    const [hourlyData, setHourlyData] = useGlobalState('hourlyData');
    const [dailyData, setDailyData] = useGlobalState('dailyData');
    const [location, setLocation] = useGlobalState('location');

    const [searchValue, setSearchValue] = React.useState("");
    const [isFocused, setIsFocused] = React.useState(false);
    const [loadState, setLoadState] = React.useState("firstOpen");

    useEffect(() => {
        mainContent();
    }, [])


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const toggleIsFocused = () => {
        setIsFocused(!isFocused);
    }

    async function setCity(lat: number, lng: number, city: string, country: string) {

        console.log("loading city");
        let coordinates = `${lat},${lng}`;

        setLoadState("loadingCity");

        let { weather, location } = await FetchWeather(coordinates);

        location.data.requested_location = `${city}, ${country}`;

        // send data from axios to the state
        setHourlyData(v => v = weather.data.data.timelines[1].intervals);
        setDailyData(v => v = weather.data.data.timelines[0].intervals);
        setLocation(v => v = location.data);

        setLoadState("loaded");
    }

    const selectableCities = cities.filter(
        (city) =>
            city.city.toLowerCase().includes(searchValue.toLowerCase()) ||
            city.country.toLowerCase().includes(searchValue.toLowerCase()))
        .map((city, index) =>
            <div key={index} className={"clickable text semi-bold"} onClick={() => {
                return setCity(city.lat, city.lng, city.city, city.country);
            }}>{city.city}</div>
        );

    const mainContent = () => {

       if (loadState === "loadingCity") {
            return (
                <Backdrop open={true}>
                    <CircularProgress></CircularProgress>
                </Backdrop>
            )
        } else if (loadState === "loaded") {
            return (
                <div>
                    <CurrentConditions></CurrentConditions>
                    <DayOverview></DayOverview>
                    <WeekOverview></WeekOverview>
                </div>
            )
        }

        return (
            <h1>Please Select a City</h1>
        )
    }


    return (
        <div className="App">
            <header>
                <Stack direction={"row"} justifyContent={"space-between"}>
                    <TextField
                        id="filled-basic"
                        label="Search cities or countries..."
                        variant="filled"
                        value={searchValue}
                        onChange={handleChange}
                        fullWidth
                        sx={{
                            input: {
                                color: 'white',
                                fontFamily: "Montserrat"
                            },
                            label: {
                                color: 'white',
                                fontFamily: "Montserrat"
                            }
                        }}

                        onFocus={toggleIsFocused}
                        onBlur={() => setTimeout(() => toggleIsFocused(), 100)}
                    />
                </Stack>
            </header>
            <main>
                {mainContent()}
                <div id="location-search" className={`${isFocused ? "active" : ""}`}>
                    <Stack>
                        {selectableCities}
                    </Stack>
                </div>
            </main>
        </div>
    );
};


export default App;
