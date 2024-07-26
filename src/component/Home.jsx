import { Input , Button } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
const Home = () => {
    const [cityName , setCityName ] = useState('')
    const [weatherData , setWeatherData ] = useState(null);
    // const ]\
    const [currentCityWeather ,setCurrentCityWeather ] = useState('');
    
    const onChangeCityName =(e)=>{
        setCityName(e.target.value);
    }

    const getWeatherDataByCoordinates  = async(lat , lon) =>{
        try{
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=82479e0ec3651cdb5bd5867d071dbf71`);
            setCurrentCityWeather(response.data);
            console.log(response.data);
        }catch (error){
            console.log(error);
        }
    } 
    useEffect(()=>{
        navigator.geolocation.getCurrentPosition((position)=>{
                const {latitude , longitude } = position.coords;
                getWeatherDataByCoordinates ();
        })
    },[])

    const getWeatherData = async ()=>{
        try{
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=82479e0ec3651cdb5bd5867d071dbf71`);
            setWeatherData(response.data);
            console.log(response.data);
        }catch(error){
            console.log(error);
        }
    }

    const searchCityWeather =()=>{
        getWeatherData();
    }
    console.log(weatherData)
    return (
    <>
      <section>
        <section>
        <div className="">
                        {weatherData ? (
                            <>
                                <h1>{weatherData.name}</h1>
                                <img src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt="weather icon" />
                                <p>{Math.round(weatherData.main.temp - 273.15)}°C</p>
                                <p>{weatherData.weather[0].description}</p>
                            </>
                        ) : currentCityWeather ? (
                            <>
                                <h1>{currentCityWeather.name}</h1>
                                <img src={`http://openweathermap.org/img/w/${currentCityWeather.weather[0].icon}.png`} alt="weather icon" />
                                <p>{Math.round(currentCityWeather.main.temp - 273.15)}°C</p>
                                <p>{currentCityWeather.weather[0].description}</p>
                            </>
                        ) : (
                            <div>
                                <h1>Loading your current city weather...</h1>
                            </div>
                        )}
                    </div>
       
          <div className="w-72">
            <Input
              type="email"
              placeholder="Search City"
              className="mx-20 mt-5 !border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-600 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
              labelProps={{
                className: "hidden",
              }}
              containerProps={{ className: "min-w-[100px]" }}
              value={cityName} onChange={onChangeCityName}
            />
          </div>
              <div className="mt-10 w-fit px-40">  
              <Button onClick={searchCityWeather}>Get Search</Button>;
          </div>
        
        </section>
      </section>
    </>
  );
};

export default Home;
