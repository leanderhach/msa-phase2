import {createGlobalState} from "react-hooks-global-state";


export type dataPoint = {
    startTime: string,
    values: {
        humidity: number,
        precipitationIntensity: number,
        precipitationProbability: number,
        temperature: number,
        temperatureApparent: number,
        weatherCode: number,
        windDirection: number,
        windSpeed: number,
    }
}

type location = {
    requested_location: string,
    longitude: number,
    latitude: number,
    datetime: string,
    timezone_name: string,
    timezone_location: string,
    timezone_abbreviation: string,
    gmt_offset: string,
    is_dst: boolean
}

export interface state {
    hourlyData: Array<dataPoint>,
    dailyData: Array<dataPoint>,
    location: location,
}
const simpleState: state = {
    hourlyData: [
        {
            startTime: '',
            values: {
                humidity: 0,
                precipitationIntensity: 0,
                precipitationProbability: 0,
                temperature: 0,
                temperatureApparent: 0,
                weatherCode: 0,
                windDirection: 0,
                windSpeed: 0,
            }
        }
    ],
    dailyData: [
        {
            startTime: '',
            values: {
                humidity: 0,
                precipitationIntensity: 0,
                precipitationProbability: 0,
                temperature: 0,
                temperatureApparent: 0,
                weatherCode: 0,
                windDirection: 0,
                windSpeed: 0,
            }
        }
    ],
    location: {
        requested_location: "",
        longitude: 0,
        latitude: 0,
        datetime: "",
        timezone_name: "",
        timezone_location: "",
        timezone_abbreviation: "",
        gmt_offset: "",
        is_dst: true
    }
}

const { useGlobalState } = createGlobalState(simpleState);

export default useGlobalState;