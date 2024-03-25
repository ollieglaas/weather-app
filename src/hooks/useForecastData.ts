import { useState } from "react";
import axios from "axios";

export interface HourlyForecast {
  time: string;
  value: number;
  icon?: string;
  temp_min?: number;
  temp_max?: number;
  windSpeed?: number;
  humidity?: number;
}

interface ListItem {
  dt_txt: string;
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
}

const useForecastData = () => {
  const [forecastData, setForecastData] = useState<HourlyForecast[]>([]);
  const [noonData, setNoonData] = useState<HourlyForecast[]>([]);
  const [isError, setIsError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchForecastData = async (city: string) => {
    try {
      setIsError(null);
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const apiUrl = `http://localhost:3001/longforecast?city=${city}`;
      const response = await axios.get(apiUrl);

      const extractedData: HourlyForecast[] = (response.data.list as ListItem[])
        .filter((_, index) => index % 2 === 0 && index <= 8) // collects each even numbered index from 0 to 8
        .map((item) => ({
          time: item.dt_txt.slice(11),
          value: item.main.temp - 273.15,
          windSpeed: item.wind.speed,
          humidity: item.main.humidity,
        }));

      setForecastData(extractedData);

      // search for each occurences where time is '12:00:00' startign at next day
      const middayData: HourlyForecast[] = [];
      let occurrences = 0;

      for (const item of response.data.list) {
        if (item.dt_txt.slice(11) === "12:00:00") {
          middayData.push({
            time: item.dt,
            value: item.main.temp - 273.15,
            icon: item.weather[0].icon,
            temp_max: item.main.temp_max - 273.15,
            temp_min: item.main.temp_min - 273.15,
          });

          occurrences++;

          if (occurrences >= 5) {
            break; // exits loop after first 5 are found
          }
        }
      }

      setNoonData(middayData);
    } catch (error) {
      setIsError("error fetching hourly forecast.");
    } finally {
      setIsLoading(false);
    }
  };

  return { forecastData, noonData, isError, isLoading, fetchForecastData };
};

export default useForecastData;
