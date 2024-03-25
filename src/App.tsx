import {
  Container,
  Group,
  Grid,
  Text,
  Title,
  ActionIcon,
  Tooltip,
  Loader,
} from "@mantine/core";
import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";
import { useState, useEffect } from "react";
import "./App.css";
import SimpleGridLayout from "./components/Grid/SimpleGridLayout";
import NavBar from "./components/NavBar/NavBar";
import SearchInput from "./components/SearchInput/SearchInput";
import useWeatherData from "./hooks/useWeatherData";
import ShortForecast from "./components/Grid/Boxes/ShortForecast";
import LongForecast from "./components/Grid/Boxes/LongForecast";
import useForecastData from "./hooks/useForecastData";
import getCountryName from "./utils/getCountryName";
import { useSetUnitContext } from "./hooks/useUnits";
import { motion } from "framer-motion";
import {
  MdOutlineFavorite,
  MdRefresh,
  MdOutlineFavoriteBorder,
} from "react-icons/md";
import { useFavouritesContext } from "./hooks/useFavourites";
import { notifications } from "@mantine/notifications";

countries.registerLocale(en);

function App() {
  const [city, setCity] = useState<string>("");
  const [lastSearch, setLastSearch] = useState<string>("");
  const [pastIntro, setPastIntro] = useState<boolean>(false);
  const { weatherData, error, fetchData, loading } = useWeatherData();
  const setUnit = useSetUnitContext();

  const isFavourite = (cityCheck: string) =>
    favouritesList!.includes(cityCheck);

  const { favouritesList, removeFromList, addToList } = useFavouritesContext()!;

  const { forecastData, isError, fetchForecastData, noonData } =
    useForecastData();

  const handleCitySubmit = () => {
    fetchData(city);
    fetchForecastData(city);
    setLastSearch(city);
    setPastIntro(true);
  };

  const handleFavouriteClick = (location: string) => {
    if (isFavourite(location)) {
      removeFromList(location);
      notifications.show({
        title: "Success",
        message: "You have removed " + location + " from your favourites.",
        color: "green",
      });
    } else {
      addToList(location);
      notifications.show({
        title: "Success",
        message: "You have added " + location + " to your favourites.",
        color: "green",
      });
    }
  };

  useEffect(() => {
    const windUnit = localStorage.getItem("WIND_UNITS");
    const temperatureUnit = localStorage.getItem("TEMP_UNITS");
    const timeFormatUnit = localStorage.getItem("TIME_FORMAT");
    if (windUnit && temperatureUnit && timeFormatUnit) {
      setUnit({
        temperature: temperatureUnit,
        windSpeed: windUnit,
        timeFormat: timeFormatUnit,
      });
    } else {
      localStorage.setItem("TEMP_UNITS", "celcius");
      localStorage.setItem("WIND_UNITS", "mph");
      localStorage.setItem("TIME_FORMAT", "24h");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div>
      <NavBar fetchData={fetchData} fetchForecast={fetchForecastData} />
      <Container fluid>
        {pastIntro && (
          <div className="flex flex-row space-x-5">
            <SearchInput
              city={city}
              setCity={setCity}
              handleCitySubmit={handleCitySubmit}
              lastSearch={lastSearch}
              error={error}
              introPage={false}
            />
          </div>
        )}

        <div className="mb-10">
          {error && <Text c="red">{error}</Text>}

          {loading && (
            <div className="flex justify-center items-center h-96">
              <Loader size="lg" />
            </div>
          )}

          {weatherData && !error && !loading && (
            <Group justify="space-between">
              <Group align="flex-end" gap="xs">
                <Title order={1} style={{ lineHeight: "1.0" }}>
                  {weatherData.name.toUpperCase()},
                </Title>
                <Title order={4} style={{ lineHeight: "1.2" }}>
                  {getCountryName(weatherData.country)?.toUpperCase()}
                </Title>
              </Group>
              <Group>
                <Tooltip
                  position="left"
                  withArrow
                  arrowSize={8}
                  color="cyan"
                  transitionProps={{ transition: "slide-right", duration: 100 }}
                  label={
                    isFavourite(weatherData.name)
                      ? "Remove Favourite"
                      : "Add Favourite"
                  }
                >
                  <ActionIcon
                    className="flex justify-end"
                    variant={
                      isFavourite(weatherData.name) ? "filled" : "default"
                    }
                    size="lg"
                    onClick={() => handleFavouriteClick(weatherData.name)}
                    disabled={
                      !isFavourite(weatherData.name) &&
                      favouritesList!.length >= 10
                    }
                  >
                    {isFavourite(weatherData.name) ? (
                      <MdOutlineFavorite />
                    ) : (
                      <MdOutlineFavoriteBorder />
                    )}
                  </ActionIcon>
                </Tooltip>
                <ActionIcon
                  className="flex justify-end"
                  variant="default"
                  size="lg"
                  onClick={handleCitySubmit}
                >
                  <MdRefresh size={20} />
                </ActionIcon>
              </Group>
            </Group>
          )}
        </div>
        {weatherData && !error && !loading ? (
          <motion.div variants={container} initial="hidden" animate="show">
            <SimpleGridLayout weatherData={weatherData} />
            <div className="mt-2 h-full">
              <Grid align="stretch" grow>
                <Grid.Col span={{ xs: 12, md: 4 }}>
                  <ShortForecast
                    forecastData={forecastData}
                    isError={isError}
                  />
                </Grid.Col>
                <Grid.Col span={{ xs: 12, md: 8 }}>
                  <LongForecast noonData={noonData} isError={isError} />
                </Grid.Col>
              </Grid>
            </div>
          </motion.div>
        ) : (
          !loading &&
          !error && (
            <div className="flex flex-col justify-center items-center h-96 w-2/3 mx-auto">
              <SearchInput
                city={city}
                setCity={setCity}
                handleCitySubmit={handleCitySubmit}
                lastSearch={lastSearch}
                error={error}
                introPage
              />
              <Title order={1} fw="lighter" className="text-center">
                Search anywhere in the <span className="font-bold">world</span>{" "}
                for updated weather and forecast
              </Title>
            </div>
          )
        )}
      </Container>
    </div>
  );
}

export default App;
