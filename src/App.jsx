import { useEffect, useState } from 'react'
import './App.css'
import './index.css'



function App() {

  const [city, setcity] = useState("Delhi")
  const [WeatherData, setWeatherData] = useState(null)
  const currentDate = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "Octuber",
    "Nobember",
    "December"
  ];

  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const formattedDate = `${month} ${day}, ${year}`

  const API_KEY = "0b74667df71b790be51822eddb51e6e7"

  const fetchWeatcherData = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
      const data = await response.json();
      console.log(data);
      setWeatherData(data);

    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    fetchWeatcherData()
  }, [])

  const handleInputChange = (event) => {
    setcity(event.target.value)

  }
  const heandleSubmit = (event) => {
    event.preventDefault();
    fetchWeatcherData();

  }
  const getWeatherIconUrl = (main)=>{

  switch (main) {
    case "Clouds":
      return "/thunder.png";
  
    case "Rain":
      return "/rain_with_cloud.png";
  
    case "Mist":
      return "/Tornado.png";
  
    case "Haze":
      return "sun.png";
  
    default:
      return null;
  }

  }

  return (
    <>
      <div className='container'>
        {WeatherData && (
          <>
            <h1 className="container_date">{formattedDate}</h1>
            <div className="weather_data">
              <h2 className="container_city">{WeatherData.name}</h2>

              <img className='container_img' src={getWeatherIconUrl(WeatherData.weather[0].main)} 
              width='180px' alt="Weather Icon" />


              <h2 className="container_degree">{WeatherData.main.temp}</h2>
              <h2 className="country_per">{WeatherData.weather[0].main}</h2>
              <form className="form" onSubmit={heandleSubmit}>
                <input type="text" className='input' placeholder='Enter City Name ' onChange={handleInputChange} />
                <button type='submit'>Get</button>
              </form>
            </div>

          </>

        )}


      </div>
    </>
  )
}

export default App
