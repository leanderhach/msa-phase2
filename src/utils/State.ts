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

export interface state {
    hourlyData: Array<dataPoint>,
    dailyData: Array<dataPoint>,
    textLocation: string,
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
    textLocation: ""
}

const { useGlobalState } = createGlobalState(simpleState);

export default useGlobalState;