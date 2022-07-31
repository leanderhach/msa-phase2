import React, {useCallback} from 'react';
import {hourlyData} from "./testData";
import './DayOverview.css';
import weatherCodeToIcon from "./utils/weatherCodeToIcon";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import convertTemperature from "./utils/ConvertTemperature";

// The smoothing ratio
const smoothing = 0.15

const currentDate = new Date(hourlyData.data.timelines[0].startTime);
const weatherData = hourlyData.data.timelines[0].intervals;

const dayDataPoints = weatherData.filter(
    item => new Date(item.startTime).toLocaleString().split(',')[0] ===
        new Date().toLocaleString().split(',')[0]
)

let dayBreakdown = [];
type Point = [number, number];
type dayBreakdownItem = {
    temperature: number,
    time: string,
    weatherCode: number
};

let points: Array<Point>;
let dayBreakdownItems: Array<dayBreakdownItem>;

dayBreakdownItems = [];
points = [];

function createDayBreakdown () {
    const itemWidth = 60;

    // @ts-ignore
    for(const [index, day] of dayDataPoints.entries()) {

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
            points.push([(itemWidth / 2), 60 - (day.values.temperature * 5)])
        } else {
            console.log([((itemWidth / 2) + (itemWidth * index)), 60 - (day.values.temperature * 5)])
            points.push([((itemWidth / 2) + (itemWidth * index)), 60 - (day.values.temperature * 5)])
        }
    }
}

createDayBreakdown();
console.log(points)

const line = (pointA: Point, pointB: Point) => {
    const lengthX = pointB[0] - pointA[0]
    const lengthY = pointB[1] - pointA[1]
    return {
        length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
        angle: Math.atan2(lengthY, lengthX)
    }
}

const controlPoint = (current: Point, previous: Point, next: Point, reverse: boolean) => {
    const p = previous || current
    const n = next || current
    const o = line(p, n)

    const angle = o.angle + (reverse ? Math.PI : 0)
    const length = o.length * smoothing

    const x = current[0] + Math.cos(angle) * length
    const y = current[1] + Math.sin(angle) * length
    return [x, y]
}

const bezierCommand = (point: Point, i: number, a: Array<Point>) => {
    const cps = controlPoint(a[i - 1], a[i - 2], point, false)
    const cpe = controlPoint(point, a[i - 1], a[i + 1], true)
    return `C ${cps[0]},${cps[1]} ${cpe[0]},${cpe[1]} ${point[0]},${point[1]}`
}

const svgPath = (points: Array<Point>, command: Function) => {
    const d = points.reduce((acc, point, i, a) => i === 0
            ? `M ${point[0]},${point[1]}`
            : `${acc} ${command(point, i, a)}`
        , '')
    return `<path d="${d}" fill="none" stroke="grey" />`
}

function createLine() {
    return {__html: svgPath(points, bezierCommand)}
}


function DayOverview () {

    const overviewItems = dayBreakdownItems.map((item, index) =>
        <div className="overview__item" key={index}>
            <div className="item__time">{item.time}</div>
            <FontAwesomeIcon className="item__icon" icon={weatherCodeToIcon(item.weatherCode)}></FontAwesomeIcon>
            <div className="item__temperature container">
                <p>{convertTemperature('celsius', item.temperature)}</p>
                {/*<FontAwesomeIcon id="degree-icon" icon="circle-dot"></FontAwesomeIcon>*/}
            </div>
        </div>
    )

    return (
        <div className="day-overview">
            <div className="line">
                <svg id={"temperature-line"} dangerouslySetInnerHTML={createLine()}></svg>
            </div>
            <div className="overview">
                {overviewItems}
            </div>
        </div>
    );
}

export default DayOverview;