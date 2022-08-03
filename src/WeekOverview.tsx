import React, {useEffect} from "react";
import {Stack} from "@mui/material";
import useGlobalState from "./utils/State";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import weatherCodeToIcon from "./utils/weatherCodeToIcon";

function WeekOverview () {

    const [dailyData] = useGlobalState("dailyData");


    const generateWeekForecast = () => {
        let nextWeek = [];

        let weekDays = [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
        ]

        if(dailyData) {
            // get the next 7 days on the forecast
            for(let i = 0; i < 7; i++) {

                let today = new Date();
                let date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i).getTime();
                let dayItem = dailyData.find((item) => new Date(item.startTime).setHours(0,0,0,0) === date)

                if(dayItem) {
                    nextWeek.push(
                        {
                            ...dayItem,
                            weekDay: weekDays[new Date(date).getDay()]
                        }
                    )
                }
            }

            return nextWeek.map((item, index) =>
                <Stack direction={"row"} justifyContent={"space-between"}  key={index}>
                    <p className="text">{item.weekDay}</p>
                    <Stack direction={"row"} alignItems={"center"}>
                        <FontAwesomeIcon icon={weatherCodeToIcon(item.values!.weatherCode)}></FontAwesomeIcon>
                        <Stack direction={"row"} >
                            <p className="text">{Math.round(item.values!.temperature)}</p>
                            <FontAwesomeIcon className={"text"} icon="circle-dot"></FontAwesomeIcon>
                        </Stack>
                    </Stack>
                </Stack>
            )
        }
    }

    useEffect(() => {
        generateWeekForecast();

    }, [dailyData])
    return (
        <div className="week-overview">
            <Stack spacing={4} mt={4}>
                {generateWeekForecast()}
            </Stack>
        </div>
    )

}

export default WeekOverview;