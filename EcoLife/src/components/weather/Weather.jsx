import React, { useState, useEffect } from "react";
import { getWeather } from "../../services/weatherService";

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async (lat, lon) => {
      try {
        const data = await getWeather(lat, lon);
        setWeather(data);
      } catch {
        setError("Could not fetch weather data.");
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude);
        },
        () => {
          setError(
            "Geolocation is not enabled. Please enable it to see the weather."
          );
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!weather) {
    return <div>Loading weather...</div>;
  }

  return (
    <div className="p-4 bg-blue-100 rounded-lg">
      <h3 className="text-lg font-bold">{weather.name}</h3>
      <p>{weather.weather[0].description}</p>
      <p>{Math.round(weather.main.temp)}°C</p>
    </div>
  );
};

export default Weather;
