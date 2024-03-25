import { Container, Title, Radio, Group, SimpleGrid } from "@mantine/core";
import { useSetUnitContext, useUnitContext } from "../../../hooks/useUnits";
import { notifications } from "@mantine/notifications";

const Units = () => {
  const units = useUnitContext();
  const setUnits = useSetUnitContext();

  const handleTemperatureChange = (selectedUnit: string) => {
    setUnits({ temperature: selectedUnit });
    localStorage.setItem("TEMP_UNITS", selectedUnit);
    notifications.show({
      title: "Success",
      message:
        "Your temperature is now in " +
        selectedUnit.charAt(0).toUpperCase() +
        selectedUnit.slice(1) +
        ".",
      color: "green",
    });
  };

  const handleWindSpeedChange = (selectedUnit: string) => {
    setUnits({ windSpeed: selectedUnit });
    localStorage.setItem("WIND_UNITS", selectedUnit);
    notifications.show({
      title: "Success",
      message: "Your wind speed is now in " + selectedUnit.toUpperCase() + ".",
      color: "green",
    });
  };

  const handleTimeFormatChange = (selectedUnit: string) => {
    setUnits({ timeFormat: selectedUnit });
    localStorage.setItem("TIME_FORMAT", selectedUnit);
    notifications.show({
      title: "Success",
      message:
        "You changed your time format to use the " +
        selectedUnit.toUpperCase() +
        " clock.",
      color: "green",
    });
  };

  return (
    <Container>
      <Title order={4} mb={20}>
        Units
      </Title>
      <Radio.Group
        name="temperatureUnitSelect"
        description="Change beween degrees celcius or fahrenheit."
        label="Temperature"
        value={units.temperature}
        onChange={(value) => handleTemperatureChange(value)}
      >
        <Group mt="md" mb="xl">
          <Radio value="celcius" label="Celcius" />
          <Radio value="fahrenheit" label="Fahrenheit" />
        </Group>
      </Radio.Group>
      <Radio.Group
        name="windSpeedUnitSelect"
        description="Change your preferred units for wind speed."
        label="Wind Speed"
        value={units.windSpeed}
        onChange={(value) => handleWindSpeedChange(value)}
      >
        <SimpleGrid mt="md" mb="xl" cols={2}>
          <Radio value="mps" label="Metres / Sec" />
          <Radio value="mph" label="Miles / Hour" />
          <Radio value="kmph" label="KM / Hour" />
          <Radio value="knots" label="Knots" />
        </SimpleGrid>
      </Radio.Group>
      <Radio.Group
        name="timeFormatSelect"
        description="Change between 12 hour clock or 24 hour clock (eg 18:00 or 6:00 PM)."
        label="Time Format"
        value={units.timeFormat}
        onChange={(value) => handleTimeFormatChange(value)}
      >
        <Group mt="md" mb="xl">
          <Radio value="24h" label="24 Hour" />
          <Radio value="12h" label="12 Hour" />
        </Group>
      </Radio.Group>
    </Container>
  );
};

export default Units;
