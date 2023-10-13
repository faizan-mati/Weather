const API_KEY = "26de5a77e7f073b34e4541095ea86035";

const makeIconURL = (iconId) => `https://openweathermap.org/img/wn/${iconId}@2x.png`

const getFormettedWeatherData = async (city, units = "metric") => {

    const URL = `https://api.openweathermap.org/data/2.5/weather?q=
    ${city}&appid=${API_KEY}&units=${units}`

    const data = await fetch(URL)
        .then((res) => res.json())
        .then((data) => data);

        const {
            weather,
            main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
            wind: { speed },
            sys: { country },
            name,
          } = data;
          
          const { description, icon } = weather[0]

          const extractedData = {
            description,
            iconURL : makeIconURL(icon) ,
            weather,
            temperature: temp,
            feelsLike: feels_like,
            minTemperature: temp_min,
            maxTemperature: temp_max,
            pressure,
            humidity,
            windSpeed: speed,
            country,
            cityName: name,
          };
        
    return extractedData;

};

export {
    getFormettedWeatherData
};