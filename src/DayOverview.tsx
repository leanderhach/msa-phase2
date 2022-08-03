import React, {useEffect} from 'react';
import './DayOverview.css';
import weatherCodeToIcon from "./utils/weatherCodeToIcon";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import convertTemperature from "./utils/ConvertTemperature";
import useGlobalState, {dataPoint} from "./utils/State";
import {Box, Stack} from "@mui/material";
import createLine, {Point} from "./utils/drawLine";

type dayBreakdownItem = {
    temperature: number,
    time: string,
    weatherCode: number
};

let points: Array<Point>;
let dayBreakdownItems: Array<dayBreakdownItem>;

dayBreakdownItems = [];
points = [];


function DayOverview () {

    const [hourlyData] = useGlobalState("hourlyData");

    const dayDataPoints = (): dataPoint[] => {
        return hourlyData.filter(
            item => new Date(item.startTime).toLocaleString().split(',')[0] ===
                new Date().toLocaleString().split(',')[0]
        )
    }

    const createDayBreakdown = () => {
        const itemWidth = 60;

        dayBreakdownItems = [];
        points = [];

        // @ts-ignore
        for(const [index, day] of dayDataPoints().entries()) {

            let time = new Date(day.startTime)
                .toLocaleString('en-US', { hour: 'numeric', hour12: true })
                .replace(" ", '')
                .toLowerCase();

            dayBreakdownItems.push({
                temperature: day.values.temperature,
                time: time,
                weatherCode: day.values.weatherCode
            })

            if(index === 0) {
                points.push([(itemWidth / 2), 60 - (day.values.temperature)])
            } else {
                points.push([((itemWidth / 2) + (itemWidth * index)), 60 - (day.values.temperature)])
            }
        }

        return dayBreakdownItems.map((item, index) =>
            <Box
                key={index}
                sx={{
                    minWidth:60
                }}
            >
                <Stack alignItems={"center"} spacing={2}>
                    <p className="text">{item.time}</p>
                    <FontAwesomeIcon className="item__icon" icon={weatherCodeToIcon(item.weatherCode)}></FontAwesomeIcon>
                    <Stack direction={"row"} justifyContent={"center"}>
                        <p className={"text"}>{convertTemperature('celsius', item.temperature)}</p>
                        <FontAwesomeIcon className={"text"} icon="circle-dot"></FontAwesomeIcon>
                    </Stack>
                </Stack>
            </Box>
        )
    }

    useEffect(() => {
        dayDataPoints();
        createDayBreakdown();
    });

    return (
        <div className="day-overview">
            <div className="line">
                <svg id={"temperature-line"} dangerouslySetInnerHTML={createLine(points)}></svg>
            </div>
            <Stack direction={"row"} pb={4}>
                {createDayBreakdown()}
            </Stack>
        </div>
    );
}

export default DayOverview;