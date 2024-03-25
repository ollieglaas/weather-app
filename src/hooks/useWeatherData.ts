// useWeatherData.js
import { useState } from "react";
import axios from "axios";
import { notifications } from "@mantine/notifications";

export type WeatherData = {
  name: string;
  country: string;
  temperature: number;
  feelsLike: number;
  condition: string;
  icon: string;
  sunrise: string;
  sunset: string;
  windSpeed: number;
  windDeg: number;
  minTemp: number;
  maxTemp: number;
  timeZone: number;
  pressure: number;
  humidity: number;
  cloudiness: number;
};

const useWeatherData = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async (city: string) => {
    try {
      setError(null);
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const apiUrl = `http://localhost:3001/weather?city=${city}`;
      const response = await axios.get(apiUrl);

      console.log(response.data);

      const extractedData: WeatherData = {
        name: response.data?.name as string,
        country: response.data.sys.country,
        temperature: response.data.main.temp - 273.15,
        feelsLike: response.data.main.feels_like - 273.15,
        condition: response.data.weather[0].description,
        icon: response.data.weather[0].icon,
        sunrise: response.data.sys.sunrise,
        sunset: response.data.sys.sunset,
        windSpeed: response.data.wind.speed,
        windDeg: response.data.wind.deg,
        minTemp: response.data.main.temp_min - 273.15,
        maxTemp: response.data.main.temp_max - 273.15,
        timeZone: response.data.timezone,
        pressure: response.data.main.pressure,
        humidity: response.data.main.humidity,
        cloudiness: response.data.clouds.all,
      };

      setWeatherData(extractedData);
    } catch (error) {
      console.log(error);
      setError("Error searching. Please try again.");
      notifications.show({
        title: "Error.",
        message: "We couldn't find this location. Please try again.",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    weatherData,
    error,
    loading,
    fetchData,
  };
};

export default useWeatherData;
