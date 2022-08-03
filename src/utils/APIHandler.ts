import axios from "axios";

export async function FetchWeather (location: string) {

    let params = new URLSearchParams();

    params.append("location", location);
    params.append("timesteps", "1d,1h");
    params.append("units","metric");
    params.append("apikey", "hxFqqSgHP8yDGmnUlGlxkNGvs2uWKPfq");

    // append the fields to collect
    params.append("fields", "precipitationIntensity");
    params.append("fields", "weatherCode");
    params.append("fields", "windSpeed");
    params.append("fields", "humidity");
    params.append("fields", "windDirection");
    params.append("fields", "temperatureApparent");
    params.append("fields", "temperature");
    params.append("fields", "precipitationProbability");

    const data = await axios({
        method: "get",
        url: "https://api.tomorrow.io/v4/timelines",
        params: params
    })
    // make setters for our state


    // since location is coordinates, reverse geocode them

    const reverseLocation = await axios({
        method: "get",
        url: "http://api.positionstack.com/v1/reverse",
        params: {
            access_key: "c4ca181c413808163e69b356ddc5415f",
            query: location,
            limit: 3
        }
    })

    return {
        weather: data,
        location: reverseLocation
    }
}