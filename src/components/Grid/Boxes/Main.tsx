import { Group, Image, Stack, Text, Title } from "@mantine/core";
import { IconContext } from "react-icons";
import { FiSunrise, FiSunset } from "react-icons/fi";
import { WeatherData } from "../../../hooks/useWeatherData";
import TempSlider from "../TempSlider";
import icons from "../../../utils/getIcons";
import { useUnitContext } from "../../../hooks/useUnits";
import useConversion from "../../../hooks/useConversion";
import getUnixToHourMinute from "../../../utils/getUnixToHourMinute";
import BoxLayout from "../BoxLayout";

type MainProps = {
  weatherData: WeatherData;
};

const Main = ({ weatherData }: MainProps) => {
  const { temperature, sunrise, sunset, timeZone, icon, condition } =
    weatherData;
  const units = useUnitContext();

  return (
    <BoxLayout pt={-1}>
      <Group justify="space-around" align="flex-end">
        <Stack>
          <Title order={1}>
            {useConversion(temperature).toFixed(1)}{" "}
            {units.temperature === "celcius" ? "°C" : "°F"}
          </Title>
          <div>
            <Text size="lg" c="dimmed">
              <Group justify="space-around">
                <IconContext.Provider value={{ color: "darkorange" }}>
                  <FiSunrise />
                </IconContext.Provider>
                {getUnixToHourMinute(sunrise, timeZone, units.timeFormat)}
              </Group>
            </Text>
            <Text size="lg" c="dimmed">
              <Group justify="space-around">
                <IconContext.Provider value={{ color: "darkcyan" }}>
                  <FiSunset />
                </IconContext.Provider>
                {getUnixToHourMinute(sunset, timeZone, units.timeFormat)}
              </Group>
            </Text>
          </div>
        </Stack>

        <Stack justify="center" align="center">
          <Image src={icons[icon]} h={100} w={100} />
          <Text c="dimmed" size="lg" fs="italic">
            {condition.charAt(0).toUpperCase() + condition.slice(1)}
          </Text>
        </Stack>
      </Group>

      <TempSlider weatherData={weatherData} />
    </BoxLayout>
  );
};

export default Main;
