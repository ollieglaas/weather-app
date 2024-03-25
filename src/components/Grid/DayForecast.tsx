import { Title, Image, Text, Breadcrumbs, Center } from "@mantine/core";
import { HourlyForecast } from "../../hooks/useForecastData";
import getDayOfWeek from "../../utils/getDayOfWeek";
import icons from "../../utils/getIcons";
import useConversion from "../../hooks/useConversion";
import { useUnitContext } from "../../hooks/useUnits";
import BoxLayout from "./BoxLayout";

const DayForecast = ({
  time,
  value,
  icon = "",
  temp_max,
  temp_min,
}: HourlyForecast) => {
  const IconComponent = icons[icon];
  const units = useUnitContext();

  return (
    <BoxLayout p="md" withBorder={false}>
      <Title order={5} className="text-center" mb={10} c={"dimmed"}>
        {getDayOfWeek(time)}
      </Title>
      <Title order={2} className="text-center" mb={10}>
        {useConversion(value).toFixed(0)}{" "}
        {units.temperature === "celcius" ? "°C" : "°F"}
      </Title>
      <Center>
        <Image src={IconComponent} w={200} />
      </Center>
      <div className="flex justify-center mt-5">
        <Breadcrumbs separator="|">
          <Text>{useConversion(temp_max!).toFixed(0)}</Text>
          <Text c="dimmed">{useConversion(temp_min!).toFixed(0)}</Text>
        </Breadcrumbs>
      </div>
    </BoxLayout>
  );
};

export default DayForecast;
