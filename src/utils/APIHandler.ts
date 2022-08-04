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
        url: "https://timezone.abstractapi.com/v1/current_time",
        params: {
            api_key: "b0207e6d5ff748888372edf9adfa92d6",
            location: location
        }
    })



    return {
        weather: data,
        location: reverseLocation
    }
}