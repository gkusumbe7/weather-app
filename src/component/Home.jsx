import { Input, Button } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";

const Home = () => {
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  // const ]\
  const [currentCityWeather, setCurrentCityWeather] = useState(null);
  const [cityOneweatherData, setCityOneweatherData] = useState(null);
  const [cityTwoweatherData, setCityTwoweatherData] = useState(null);
  const [cityThireeweatherData, setCityThireeWeatherData] = useState(null);

  const onChangeCityName = (e) => {
    setCityName(e.target.value);
  };

  const getWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=82479e0ec3651cdb5bd5867d071dbf71`
      );
      setWeatherData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getWeatherDataByCoordinates = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=82479e0ec3651cdb5bd5867d071dbf71`
      );
      setCurrentCityWeather(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const searchCityWeather = () => {
    getWeatherData();
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      getWeatherDataByCoordinates(latitude, longitude);
    });
  }, []);

  const getCityOneWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=82479e0ec3651cdb5bd5867d071dbf71`
      );
      setCityOneweatherData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCityTwoWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=mumbai&appid=82479e0ec3651cdb5bd5867d071dbf71`
      );
      setCityTwoweatherData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCityThireeWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=pune&appid=82479e0ec3651cdb5bd5867d071dbf71`
      );
      setCityThireeWeatherData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCityOneWeather();
    getCityTwoWeather();
    getCityThireeWeather();
  }, []);

  console.log(weatherData);
  return (
    <>
      <section className="flex flex-col gap-0">
        <section className="flex flex-col items-center">
          <div className="  ">
            <Input
              type="email"
              placeholder="Search City"
              className="mt-5 !border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-600 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
              labelProps={{
                className: "hidden",
              }}
              containerProps={{ className: "min-w-[100px]" }}
              value={cityName}
              onChange={onChangeCityName}
            />
          </div>
          <div className="mt-8 w-fit px-40">
            <Button onClick={searchCityWeather}>Get Search</Button>;
          </div>
        </section>
        <section>
          <div className="flex flex-col justify-center m-5 p-10  items-center shadow-xl bg-yellow-300  rounded-xl">
            {weatherData ? (
              <>
                <h1 className="flex gap-2 items-center mb-5 font-light text-blue-gray-50 text-xl">
                  <FaLocationDot /> {weatherData.name}
                </h1>
                <p className="mb-2 text-white font-bold text-4xl">
                  {Math.round(currentCityWeather.main.temp - 273.15)}°C
                </p>

                <img
                  src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
                  className="mb-3 w-18 bg-deep-orange-50 shadow-xl  rounded-xl p-2"
                  alt="weather icon"
                />
                <p className="font-semibold text-white text-xl">
                  {weatherData.weather[0].description}
                </p>
              </>
            ) : currentCityWeather ? (
              <>
                <h1 className="flex gap-2 items-center mb-5 font-light text-blue-gray-900 text-xl">
                  <FaLocationDot /> {currentCityWeather.name}
                </h1>
                <p className="mb-2 text-blue-gray-500 font-bold text-4xl">
                  {Math.round(currentCityWeather.main.temp - 273.15)}°C
                </p>

                <img
                  src={`http://openweathermap.org/img/w/${currentCityWeather.weather[0].icon}.png`}
                  className="mb-3 w-18 shadow-2xl  rounded-xl p-2"
                  alt="weather icon"
                />
                <p className="font-semibold text-white text-xl">
                  {currentCityWeather.weather[0].description}
                </p>
              </>
            ) : (
              <div>
                <h1>Loading your current city weather...</h1>
              </div>
            )}
          </div>
        </section>
        <section className="flex">
            {cityOneweatherData && (
              <div className="m-2 flex flex-col items-center gap-1 shadow-lg bg-blue-100 w-1/3 p-5 rounded-xl">
                <h1 className="flex gap-1 items-center font-bold text-blue-gray-800">
                <FaLocationDot/>{cityOneweatherData.name}
                </h1>
                <p className="font-semibold text-3xl">
                  {Math.round(cityOneweatherData.main.temp - 273.15)}°C
                </p>
                <img
                  src={`http://openweathermap.org/img/w/${cityOneweatherData.weather[0].icon}.png`}
                  alt="alt"
                />
              </div>
            )}

            {cityTwoweatherData && (
              <div className="m-2 flex flex-col items-center gap-1 shadow-lg bg-blue-100 w-1/3 p-5 rounded-xl">
                <h1 className="flex gap-1 items-center font-bold text-blue-gray-800">
                <FaLocationDot/>{cityTwoweatherData.name}
                </h1>
                <p className="font-semibold text-3xl">
                  {Math.round(cityTwoweatherData.main.temp - 273.15)}°C
                </p>
                <img
                  src={`http://openweathermap.org/img/w/${cityTwoweatherData.weather[0].icon}.png`}
                  alt="alt"
                />
              </div>
            )}

            {cityThireeweatherData && (
              <div className="m-2 flex flex-col items-center gap-1 shadow-lg bg-blue-100 w-1/3 p-5 rounded-xl">
                <h1 className="flex gap-1 items-center font-bold text-blue-gray-800">
                <FaLocationDot/>{cityThireeweatherData.name}
                </h1>
                <p className="font-semibold text-3xl">
                  {Math.round(cityThireeweatherData.main.temp - 273.15)}°C
                </p>
                <img
                  src={`http://openweathermap.org/img/w/${cityThireeweatherData.weather[0].icon}.png`}
                  alt="alt"
                />
              </div>
            )}
          </section>
      </section>
    </>
  );
};

export default Home;
