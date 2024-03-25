import { Grid } from "@mantine/core";
import { WeatherData } from "../../hooks/useWeatherData";
import Main from "./Boxes/Main";
import Wind from "./Boxes/Wind";
import PressureHumidity from "./Boxes/PressureHumidity";

type GridProps = {
  weatherData: WeatherData;
};

// cols={{ md: 3, sm: 2, xs: 1 }}

const SimpleGridLayout = ({ weatherData }: GridProps) => {
  return (
    <Grid grow>
      <Grid.Col span={{ md: 4, sm: 6 }}>
        <Main weatherData={weatherData} />
      </Grid.Col>
      <Grid.Col span={{ md: 4, sm: 6 }}>
        <Wind weatherData={weatherData} />
      </Grid.Col>
      <Grid.Col span={{ md: 4, sm: 12 }}>
        <PressureHumidity weatherData={weatherData} />
      </Grid.Col>
    </Grid>
  );
};

export default SimpleGridLayout;
