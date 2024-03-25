import { Badge, Slider, Indicator } from "@mantine/core";
import { WeatherData } from "../../hooks/useWeatherData";
import { IconContext } from "react-icons";
import { LuThermometerSnowflake, LuThermometerSun } from "react-icons/lu";
import useConversion from "../../hooks/useConversion";
import { useUnitContext } from "../../hooks/useUnits";

type SliderProps = {
  weatherData: WeatherData;
};

const TempSlider = ({ weatherData }: SliderProps) => {
  const { minTemp, maxTemp, temperature } = weatherData;
  const units = useUnitContext();

  const minTempIcon = (
    <div className="flex flex-row space-x-2 ml-5">
      <IconContext.Provider value={{ color: "cyan" }}>
        <LuThermometerSnowflake size={20} />
      </IconContext.Provider>
      <span>
        {useConversion(minTemp).toFixed(0)}{" "}
        {units.temperature === "celcius" ? "°C" : "°F"}
      </span>
    </div>
  );

  const maxTempIcon = (
    <div className="flex flex-row space-x-1 mr-6">
      <span>
        {useConversion(maxTemp).toFixed(0)}{" "}
        {units.temperature === "celcius" ? "°C" : "°F"}
      </span>
      <IconContext.Provider value={{ color: "#ff3300" }}>
        <LuThermometerSun size={20} />
      </IconContext.Provider>
    </div>
  );

  const icon = (
    <Indicator
      color="red"
      position="middle-end"
      processing
      className="ml-1"
      size={8}
    />
  );

  return (
    <Slider
      min={useConversion(minTemp)}
      max={useConversion(maxTemp)}
      disabled
      color="red"
      value={temperature}
      marks={[
        {
          value: useConversion(minTemp),
          label: minTempIcon,
        },
        {
          value: useConversion(maxTemp),
          label: maxTempIcon,
        },
        {
          value: useConversion(temperature),
          label: (
            <Indicator
              color="red"
              position="middle-end"
              processing
              withBorder
              disabled
            >
              <Badge rightSection={icon} size="lg">
                {useConversion(temperature).toFixed(1)}{" "}
                {units.temperature === "celcius" ? "°C" : "°F"}
              </Badge>
            </Indicator>
          ),
        },
      ]}
      className="mt-10"
    />
  );
};

export default TempSlider;
