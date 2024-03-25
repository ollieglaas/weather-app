import { Group, Title, SimpleGrid, Stack } from "@mantine/core";
import { WeatherData } from "../../../hooks/useWeatherData";
import { IconContext } from "react-icons";
import { WiHumidity } from "react-icons/wi";
import { PiThermometerDuotone } from "react-icons/pi";
import { CgCompressV } from "react-icons/cg";
import { BsClouds } from "react-icons/bs";
import useConversion from "../../../hooks/useConversion";
import { useUnitContext } from "../../../hooks/useUnits";
import BoxLayout from "../BoxLayout";

type PressureHumidityProps = {
  weatherData: WeatherData;
};

const PressureHumidity = ({ weatherData }: PressureHumidityProps) => {
  const { pressure, humidity, feelsLike, cloudiness } = weatherData;
  const units = useUnitContext();

  return (
    <BoxLayout>
      <Group justify="space-between">
        <Title order={4} c="dimmed" className="tracking-wide">
          PRESSURE & HUMIDITY
        </Title>
        <IconContext.Provider value={{ className: "text-cyan-700" }}>
          <WiHumidity size={45} />
        </IconContext.Provider>
      </Group>
      <SimpleGrid cols={2} mt={20} ml={10}>
        <div>
          <Stack gap="xs">
            <Title order={6} c="dimmed">
              PRESSURE
            </Title>
            <Group>
              <Group>
                <Title order={2}>{pressure}</Title>
                <Title order={4} c="dimmed">
                  {" "}
                  hPa
                </Title>
              </Group>
              <CgCompressV size={25} />
            </Group>
          </Stack>
        </div>
        <div>
          <Stack gap="xs">
            <Title order={6} c="dimmed">
              FEELS LIKE
            </Title>
            <Group>
              <Group gap="xs">
                <Title order={2}>{useConversion(feelsLike).toFixed(1)}</Title>
                <Title order={4} c="dimmed">
                  {units.temperature === "celcius" ? "°C" : "°F"}
                </Title>
              </Group>

              <PiThermometerDuotone size={30} />
            </Group>
          </Stack>
        </div>
        <div>
          <Stack gap="xs">
            <Title order={6} c="dimmed">
              HUMIDITY
            </Title>
            <Group>
              <Group>
                <Title order={2}>{humidity}</Title>
                <Title order={4} c="dimmed">
                  {" "}
                  %
                </Title>
              </Group>
              <WiHumidity size={30} />
            </Group>
          </Stack>
        </div>
        <div>
          <Stack gap="xs">
            <Title order={6} c="dimmed">
              CLOUDINESS
            </Title>
            <Group>
              <Group>
                <Title order={2}>{cloudiness}</Title>
                <Title order={4} c="dimmed">
                  {" "}
                  %
                </Title>
              </Group>
              <BsClouds size={30} />
            </Group>
          </Stack>
        </div>
        {/* <Text>PRESSURE: {pressure} hPa</Text>
        <Text>FEELS LIKE: {feelsLike.toFixed(1)} C°</Text>
        <Text>HUMIDITY: {humidity}%</Text>
        <Text>4</Text> */}
      </SimpleGrid>
    </BoxLayout>
  );
};

export default PressureHumidity;
