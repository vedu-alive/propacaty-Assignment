import React from "react";
import { convertToFahrenheit } from "../utils/variables";

const WeatherCard = ({
  cityName,
  temperature,
  weatherCondition,
  country,
  date,
  unit,
  icon = null,
}) => {
    const today =
      new Date(date).getDate().toString() +
      " " +
      new Date(date).toLocaleString("en-us", { month: "short" }) +
      ", " +
      new Date(date).getFullYear() ;
  return (
    <div className="p-4 flex flex-col items-center justify-evenly border border-[#484950] rounded-3xl gap-2 bg-[#2E2E38]">
      <div className="felx flex-col gap-1 items-center justify-center text-center">
        <h1 className="text-2xl text-[#fff] font-medium">
          {cityName},<span className="text-[#fff] text-lg font-normal">{country}</span>
        </h1>
        <span className="text-[#ADB5BD] font-medium text-sm">
          {today}
        </span>
      </div>
      {icon && <img src={icon} alt="weather icon" className="h-20 w-20" />}
      <div className="felx flex-col gap-1 items-center justify-center text-center">
        <p className="text-[#fff] text-[4rem]">
          {unit ? convertToFahrenheit(temperature) : temperature}
          <span className="relative text-[#fff] text-[3rem] top-[-0.75rem]">
            °
          </span>
        </p>
        <p className="text-[#9da9b5] font-medium text-base">{weatherCondition}</p>
      </div>
    </div>
  );
};

export default WeatherCard;
