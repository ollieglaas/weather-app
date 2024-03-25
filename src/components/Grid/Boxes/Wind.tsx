import { Group, Title, Stack } from "@mantine/core";
import { IconContext } from "react-icons";
import { RiWindyFill } from "react-icons/ri";
import Compass from "../Compass";
import { WeatherData } from "../../../hooks/useWeatherData";
import { useWindConversion } from "../../../hooks/useConversion";
import { useUnitContext } from "../../../hooks/useUnits";
import BoxLayout from "../BoxLayout";

type WindProps = {
  weatherData: WeatherData;
};

const directionText = (windDeg: number) => {
  if (windDeg >= 0 && windDeg < 23) {
    return "NORTH";
  } else if (windDeg >= 23 && windDeg <= 113) {
    return "EAST";
  } else if (windDeg >= 114 && windDeg <= 203) {
    return "SOUTH";
  } else if (windDeg >= 204 && windDeg <= 293) {
    return "WEST";
  } else if (windDeg >= 294 && windDeg <= 360) {
    return "NORTH";
  } else {
    return "UNKNOWN";
  }
};

const Wind = ({ weatherData }: WindProps) => {
  const units = useUnitContext();
  const unit =
    units.windSpeed === "mps"
      ? "METRE / S"
      : units.windSpeed === "mph"
      ? "MPH"
      : units.windSpeed === "kmph"
      ? "KMPH"
      : "KNOTS";

  return (
    <BoxLayout>
      <Group justify="space-between">
        <Title order={4} c="dimmed" className="tracking-wide">
          WIND
        </Title>
        <IconContext.Provider value={{ className: "text-cyan-700" }}>
          <RiWindyFill size={35} />
        </IconContext.Provider>
      </Group>
      <Group justify="space-around" mt={20}>
        <Stack justify="space-between">
          <Group>
            <Title order={2}>
              {useWindConversion(weatherData.windSpeed).toFixed(0)}
            </Title>
            <Title order={6} c="dimmed">
              {unit}
            </Title>
          </Group>
          <Group>
            <Title order={2}>{weatherData.windDeg}°</Title>
            <Title order={6} c="dimmed">
              {directionText(weatherData.windDeg)}
            </Title>
          </Group>
        </Stack>
        <Compass degrees={weatherData.windDeg} />
      </Group>
    </BoxLayout>
  );
};

export default Wind;
