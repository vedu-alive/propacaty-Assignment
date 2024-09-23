import React from 'react'

const ForecastCard = ({ dayOfWeek, highTemp, lowTemp, date, icon = null }) => {
  const month = new Date(date).toLocaleString('en-us', { month: 'short' });
  const day = new Date(date).getDate();
  return (
    <div className="flex m-auto text-[#fff] items-center shadow-md gap-3 p-2 justify-evenly bg-[#1E1F24] rounded-3xl w-full">
      <div className="flex items-center">
        {icon && <img src={icon} alt="weather icon" />}
        <div className="flex flex-col">
          <span className="text-[red] text-nowrap"> ↑ {highTemp}</span>
          <span className="text-[skyblue] text-nowrap"> ↓ {lowTemp}</span>
        </div>
      </div>
      <p className=" text-xs tracking-wide">
        <span className="text-[1.5rem]">{day}</span> {" "}
        {month},{" "}{dayOfWeek}
      </p>
    </div>
  );
}

export default ForecastCard