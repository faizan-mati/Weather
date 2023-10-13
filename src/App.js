import hot2 from './assets/hot2.jpg'
import cold3 from './assets/cold3.jpg'
import './App.css';
import './index.css';
import Description from './components/Description';
import { useEffect, useState } from 'react';
import { getFormettedWeatherData } from './weatherService';


function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [units, setUnit] = useState("metric");
  const [bg, setBg] = useState(cold3);
  const [error, setError] = useState(null);

  const fetchWeatherData = async () => {
    try {
      const data = await getFormettedWeatherData(city, units);
      setWeather(data);

      const threshold = units === "metric" ? 20 : 80;
      if (data.temperature <= threshold) setBg(cold3);
      else setBg(hot2);

      // Clear any previous error if a new request is successful
      setError(null);
    } catch (error) {
      alert("Please check the city name.");
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, [city, units]);

  const handleBtn = (e) => {
    const button = e.currentTarget;
    const currentUnits = button.innerText.slice(1);
    button.innerText = currentUnits === "C" ? "°F" : "°C";
    setUnit(currentUnits === "C" ? "metric" : "imperial");
  };

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  return (
    <div className="App" style={{ backgroundImage: `url(${bg})` }}>
      <div className='overlay'>
        {weather && (
          <div className='container'>
            {/* Search Bar */}
            <div className='section section__input'>
              <input className='inputCity' onKeyDown={enterKeyPressed} type='text' name='city' placeholder='City...' />
              <button className='inputBtn' onClick={(e) => handleBtn(e)}>°F</button>
            </div>

            {/* Middle temperature */}
            {city ? (
              <div className='section section__temperature'>
                <div className='icon'>
                  <h3>{`${weather.cityName},${weather.country}`}</h3>
                  <img src={weather.iconURL} alt='weatherIcon' />
                  <h3>{weather.description}</h3>
                </div>
                <div className='temperature'>
                  <h1>{`${weather.temperature.toFixed()}°${units === "metric" ? "C" : "F"}`}</h1>
                </div>
              </div>
            ) : (
              <div className='section section__temperature'>
                <div className='icon'>
                  <h3>{`${weather.cityName},${weather.country}`}</h3>
                  <img src={weather.iconURL} alt='weatherIcon' />
                  <h3>{weather.description}</h3>
                </div>
                <div className='temperature'>
                  <h1>{`${weather.temperature.toFixed()}°${units === "metric" ? "C" : "F"}`}</h1>
                </div>
              </div>
            )}

            {/* Display error message in a pop-up */}
            {error && (
              <div className="error-popup">
                <p>{error}</p>
              </div>
            )}

            {/* Bottom Description */}
            <Description weather={weather} units={units} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
