import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [weather, setWeather] = useState({})

  const [isFahrenheit, setIsFahrenheit] = useState(true)

  useEffect(() => {

    navigator.geolocation.getCurrentPosition(success);


    function success(pos) {
      const crd = pos.coords;
    
      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=8fd032397e6427f9d4d838f1d84b8391`)
      .then(res => setWeather(res.data))
  }
    },[])

    console.log(weather)

  return (
    <div className="App">
      <div className="card">
        <h1>Weather App</h1>
        <h2>{weather.name}, {weather.sys?.country}</h2>
        <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}.png`} style={{width: "80px"}} alt="" /> 
        <p><b>{weather.weather?.[0].description}</b></p>
        <p><b>Temperature: </b>{isFahrenheit ? weather.main?.temp : (weather.main?.temp-32)*0.5556}</p>
        <p><b>Temp. max: </b>{isFahrenheit ? weather.main?.temp_min : (weather.main?.temp_min-32)*0.5556} <b>Temp. min: </b>{isFahrenheit ? weather.main?.temp_max : (weather.main?.temp_max-32)*0.5556}</p>
        <button onClick={ () => setIsFahrenheit(!isFahrenheit)}>
          Change temperature to {isFahrenheit ? 'centigrade' : 'fahrenheit'}
        </button>

      </div>

    </div>
  )
}

export default App

// https://amazing-williams-f62284.netlify.app/ 