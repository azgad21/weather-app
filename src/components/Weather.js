import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Weather = () => {

    const [weather, setWeather] = useState({})
    const [temp, setTemp] = useState(0)
    const [isKevlin , setIsKelvin] = useState(true)

    useEffect(() => {

    function success(pos) {
        var crd = pos.coords;
      
        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=8fd032397e6427f9d4d838f1d84b8391`)
            .then(res => { setWeather(res.data)
                            setTemp(res.data.temp)
        })
      }

      console.log(setTemp)

      
      function error(err) {
        console.log("el usuario no permitio el acceso");
      }
      
      navigator.geolocation.getCurrentPosition(success, error);
    }, [])

    console.log(weather)

    // const changeUnit = () => {

    //     if (isKelvin)
    // }

    return (
        <div className='card-weather'>
            <h2>Weather App</h2>
            <p><b>City: </b> {weather.name}</p>
            <p><b>Country: </b> {weather.sys?.country} </p>
            <p><b>Temperature: </b> {weather.main?.temp-273.15}{"°C"} </p>
            <button>Change temperatures</button>
            <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" />
        </div>
    );
};

export default Weather;