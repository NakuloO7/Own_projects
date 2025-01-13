import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import "./Weather.css";

const api = {
  key: "43de2c501b83f8dcc9ff674d1970b3e5",
  base: "https://api.openweathermap.org/data/2.5/",
};

const Weather = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [weatherType, setWeatherType] = useState("");
  const [background, setBackground] = useState({ color: "#6A5ACD", background: "url('default-background.jpg')" }); // Default background
  
  const weatherColors = {
    Clear: {
        color: "#FFF59D", // Soft sunny yellow
        background: "url('https://images.unsplash.com/photo-1506748686217-8f6b3eb94f02')" // Sunny sky
    },
    Rain: {
        color: "#B3E5FC", // Light sky blue
        background: "url('https://images.unsplash.com/photo-1475486121272-c71b8ab977c7')" // Rainy sky
    },
    Clouds: {
        color: "#B0BEC5", // Soft grey-blue
        background: "url('https://images.unsplash.com/photo-1533250458253-c61cf33e97b3')" // Cloudy sky
    },
    Snow: {
        color: "#BBDEFB", // Soft snowflake blue
        background: "url('https://images.unsplash.com/photo-1492113660049-052fbbde63b9')" // Snowy background
    },
    Drizzle: {
        color: "#80DEEA", // Light aqua
        background: "url('https://images.unsplash.com/photo-1602782432269-03ad9f2f3b67')" // Light rain
    },
    Thunderstorm: {
        color: "#607D8B", // Soft muted blue
        background: "url('https://images.unsplash.com/photo-1491449266120-cc4296c17fbb')" // Stormy background
    },
    Mist: {
        color: "#E0E0E0", // Misty grey
        background: "url('https://images.unsplash.com/photo-1523202111909-b5fd6a441f6b')" // Misty background
    },
    Default: {
        color: "#B3E5FC", // Default light blue
        background: "url('https://images.unsplash.com/photo-1475486121272-c71b8ab977c7')" // Default rainy sky
    }
    };
  
  const search = (evt) =>{
      if(evt.key === "Enter"){
          axios
          .get(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
          .then((response) => {
              setWeather(response.data)
              setQuery('')
              console.log(response.data)
              const weatherMain = response.data.weather[0].main; // Main weather condition
            //   setBackground(weatherColors[weatherMain] || weatherColors.Default); // Update background
            //   setWeatherType(weatherMain);
          })
          .catch((err) => {
              console.error(err);
              alert("City not found. Please try again.");
          });

      }
  };

  const dateBuilder = (d) => {
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
      "October",
      "November",
      "December",
    ];

    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const day = days[d.getDay()];
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div className={`weather-app weather-${weatherType.toLowerCase()}`} style={{
        backgroundColor: background.color,
        backgroundImage: background.background,
        backgroundSize: 'cover', // Ensures the image covers the full background
        backgroundPosition: 'center', // Center the background image
        backgroundAttachment: 'fixed' // Keeps the background image fixed while scrolling
    }}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={search}
          />
        </div>

        {typeof weather.main !== "undefined" ? (
          <div className="location-box">
            <div className="location">
              {weather.name} {weather.sys.country}
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
};

export default Weather;
