import React, {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Endpoints } from "../constants/endpoints";
import { useGetData } from "../Hooks/usefetchData";
import { debounce } from "../utils/debounce";
import { convertToArray } from "../utils/variables";
import Toggle from "./Toggle";
import ErrorNotification from "./ErrorNotification";

const WeatherCard = lazy(() => import("./WeatherCard"));
const ForecastCard = lazy(() => import("./ForecastCard"));
const OtherDataCards = lazy(() => import("./OtherDataCards"));

const Weather = () => {
  const [city, setCity] = useState("New Delhi");
  const [options, setOptions] = useState(null);
  const [unit, setUnit] = useState(false);
  const [showError, setShowError] = useState(false);
  const dropdownRef = useRef(null);
  const {
    data: currentWeather,
    error: weatherError,
    isError: isWeatherError,
    fetchData: fetchWeather,
  } = useGetData();
  const {
    data: searhcData,
    error: searchError,
    isError: isSearchError,
    fetchData: fetchSearch,
  } = useGetData();
  const {
    data: forecastData,
    error: forecastError,
    isError: isForecastError,
    fetchData: fetchForecast,
  } = useGetData();

  useEffect(() => {
    searhcData && setOptions(searhcData);
  }, [searhcData]);

  useEffect(() => {
    fetchWeather(Endpoints.current, city ?? "New Delhi");
    fetchForecast(Endpoints.forecast, city ?? "New Delhi", 6);
  }, []);

  useEffect(() => {
    (isWeatherError || isForecastError || isSearchError) && setShowError(true);
  },[isWeatherError, isForecastError, isSearchError]);

  const handleBtnClick = () => {
    setOptions(null);
    fetchWeather(Endpoints.current, city ?? "New Delhi");
    fetchForecast(Endpoints.forecast, city ?? "New Delhi", 6);
  };
  const debouncedFetchSearch = useCallback(
    debounce((value) => {
      value && fetchSearch(Endpoints.search, value);
    }, 700),
    []
  );
  const handleInputChange = (value) => {
    setCity(value);
    debouncedFetchSearch(value);
    value.length === 0 && setOptions(null);
  };
  const handleEnter = (e) => {
    if (e.key === "Enter" && options) {
      setCity(options?.[0]?.name);
      fetchWeather(Endpoints.current, options?.[0]?.name);
      fetchForecast(Endpoints.forecast, options?.[0]?.name, 6);
      setOptions(null);
    }
  };
  const handleClickOutside = useCallback((event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOptions(null);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className="h-[100svh] p-4 flex flex-col gap-4 relative">
      {showError && <ErrorNotification errorMessage={
          weatherError || forecastError || searchError || "Something went wrong!"
        }
        onClose={()=>setShowError(false)}
      />}
      <div className="flex justify-between items-start flex-wrap gap-4 sm:flex-nowrap">
        <div className="flex gap-3 flex-wrap w-full sm:flex-nowrap justify-between max-w-3xl mx-auto relative">
          <div
            className=" flex h-12 items-center justify-between shadow-md bg-[#2E2E38] rounded-3xl w-full border border-[#484950]"
            ref={dropdownRef}
          >
            <input
              className=" flex-1 border-none rounded-2xl w-3/4 px-3 focus-visible:outline-none bg-[#2E2E38] text-[#fff]"
              value={city}
              onKeyDown={handleEnter}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="Search for city"
            />
            <div className="flex items-center justify-center cursor-pointer h-full w-12 rounded-full hover:bg-[#4755698e]">
              <img
                className="w-6 h-6"
                onClick={handleBtnClick}
                src="https://img.icons8.com/?size=100&id=Y6AAeSVIcpWt&format=png&color=FFFFFF"
                alt="search-icon"
              />
            </div>
          </div>
          <div
            ref={dropdownRef}
            className={`absolute z-10 top-[3.25rem] border-[#696a71] rounded-xl ml-2 mx-4 bg-[#2E2E38] text-[#fff] w-[calc(100%-3%)] shadow-lg ${
              options && options?.length > 0 && "border"
            } max-w-[47rem] md:max-w-[47rem]`}
          >
            {options &&
              options?.map((item, index) => {
                return (
                  <p
                    className={`city-option text-base px-2 cursor-pointer hover:bg-[#4755698e] py-1 ${
                      item?.name === city && "bg-[#4755698e]"
                    }`}
                    key={item.id}
                    onClick={() => {
                      setCity(item?.name);
                      fetchWeather(Endpoints.current, item?.name);
                      fetchForecast(Endpoints.forecast, item?.name, 6);
                      setOptions(null);
                    }}
                  >
                    {item?.name}
                    <br />
                    <span className="text-xs">
                      {item?.region}, {item?.country}
                    </span>
                  </p>
                );
              })}
          </div>
        </div>
        <Toggle unit={unit} setUnit={setUnit} />
      </div>

      <div className="flex flex-col gap-4 justify-between sm:flex-row md:gap-6 lg:gap-8">
        <div className="flex flex-col gap-8 flex-[1.5] md:gap-8 lg:gap-8">
          {currentWeather && (
            <Suspense fallback={<div>Loading Weather...</div>}>
              <WeatherCard
                cityName={currentWeather?.location?.name}
                temperature={currentWeather?.current?.temp_c}
                weatherCondition={currentWeather?.current?.condition.text}
                icon={currentWeather?.current?.condition?.icon}
                country={currentWeather?.location?.country}
                date={currentWeather?.location?.localtime}
                unit={unit}
              />
            </Suspense>
          )}
          <div className="grid grid-cols-2 gap-8 md:gap-8 lg:grid-cols-3 lg:gap-8">
            {currentWeather &&
              convertToArray(currentWeather?.current)?.map((item) => (
                <Suspense fallback={<div>Loading data...</div>} key={item?.name}>
                  <OtherDataCards propertyName={item?.name} value={item?.value} />
                </Suspense>
              ))}
          </div>
        </div>
        {/* forecast  */}
        <div className="flex flex-col gap-4 bg-[#2E2E38] rounded-3xl border border-[#484950] p-4 flex-1">
          <h1 className="text-3xl text-white">Forecast</h1>
          {forecastData &&
            forecastData?.forecast?.forecastday?.map((item) => {
              const day = new Date(item.date).toLocaleString("en-us", {
                weekday: "short",
              });
              return (
                <Suspense
                  fallback={<div>Loading forecast...</div>}
                  key={item.date}
                >
                  <ForecastCard
                    dayOfWeek={day}
                    highTemp={item.day.maxtemp_c}
                    lowTemp={item.day.mintemp_c}
                    icon={item.day.condition.icon}
                    date={item.date}
                  />
                </Suspense>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Weather;
