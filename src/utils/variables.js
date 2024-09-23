import dewpoint from '../assets/dewPoint.svg';
import humidity from '../assets/humidity.svg';
import pressure from '../assets/pressure.svg';
import uvIndex from '../assets/uvIndex.svg';
import visibility from '../assets/visibility.svg';
import windSpeed from '../assets/windSpeed.svg';


export const dataName = {
    dewpoint_c: "Dew Point",
    humidity: "Humidity",
    pressure_mb: "Pressure",
    uv: "UV Index",
    vis_km: "Visibility",
    wind_kph: "Wind Speed",
}

export const cardIcons = {
    "Dew Point": dewpoint,
    "Humidity": humidity,
    "Pressure": pressure,
    "UV Index": uvIndex,
    "Visibility": visibility,
    "Wind Speed": windSpeed,
}
export const units = {
    "Dew Point": "°",
    "Humidity": "%",
    "Pressure": "mb",
    "UV Index": "",
    "Visibility": "km",
    "Wind Speed": "km/h",
}

export const convertToArray = (data) => {
    return data && Object.keys(data)?.map((key) => {
        return { name: dataName[key], value: data[key] };
    }).filter((item) => item.name);
}

export const convertToFahrenheit = (celsius) => {
    return Math.round(((Number(celsius) * 9/5) + 32)*10)/10;
    // return ((Number(celsius) * 9/5) + 32);
}
