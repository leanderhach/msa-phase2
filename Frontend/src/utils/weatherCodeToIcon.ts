import {IconProp} from "@fortawesome/fontawesome-svg-core";

const weatherCodeToIcon = (weatherCondition: number): IconProp => {
    let weatherIcon: IconProp;

    if(weatherCondition === 1000 || weatherCondition === 1100) {
        weatherIcon = "sun";
    }
    else if (weatherCondition === 1101 || weatherCondition === 1102) {
        weatherIcon = "cloud-sun";
    }
    else if (weatherCondition === 1001) {
        weatherIcon = "cloud";
    }
    else if (weatherCondition === 2000 || weatherCondition === 2001) {
        weatherIcon = "smog";
    }
    else if (weatherCondition === 4000 || weatherCondition === 4001 || weatherCondition === 4200) {
        weatherIcon = "cloud-rain";
    }
    else if (weatherCondition > 5000 && weatherCondition < 6000) {
        weatherIcon = "snowflake";
    } else {
        weatherIcon = "sun";
    }

    return weatherIcon;
};

export default weatherCodeToIcon;