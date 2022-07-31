

const convertTemperature = (convertTo: string, value: number) => {
    if(convertTo === "fahrenheit") {
        return Math.round(((value + 32) * 1.8));
    }

    return Math.round(value);
}

export default convertTemperature;
