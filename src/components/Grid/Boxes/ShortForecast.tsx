import { Group, Text, Title, ActionIcon, Tooltip } from "@mantine/core";
import { AreaChart } from "@mantine/charts";
import { HourlyForecast } from "../../../hooks/useForecastData";
import { RiWindyFill } from "react-icons/ri";
import { PiThermometerDuotone } from "react-icons/pi";
import { WiHumidity } from "react-icons/wi";
import { useState } from "react";
import BoxLayout from "../BoxLayout";

type ForecastProps = {
  forecastData: HourlyForecast[];
  isError: string | null;
};

const ShortForecast = ({ forecastData, isError }: ForecastProps) => {
  const [chartSelection, setChartSelection] = useState<number>(0);

  const Tabs = [
    { label: "Temperature", icon: <PiThermometerDuotone /> },
    { label: "Wind Speed", icon: <RiWindyFill /> },
    { label: "Humidity", icon: <WiHumidity /> },
  ];

  const chartInfo = () => {
    let chartUnit;
    let chartY;

    switch (chartSelection) {
      case 0:
        chartUnit = "°C";
        chartY = "value";
        break;
      case 1:
        chartUnit = " MPS";
        chartY = "windSpeed";
        break;
      case 2:
        chartUnit = "%";
        chartY = "humidity";
        break;
      default:
        chartUnit = "°C";
        chartY = "value";
    }

    return { chartUnit, chartY };
  };

  const { chartUnit, chartY } = chartInfo();

  return (
    <BoxLayout>
      <Group justify="space-between">
        <Title order={4} c="dimmed" className="tracking-wide">
          NEXT 24 HOURS
        </Title>

        <Group>
          {Tabs.map((tab, index) => {
            return (
              <Tooltip
                label={tab.label}
                key={index}
                color="cyan"
                transitionProps={{ transition: "scale-y", duration: 200 }}
              >
                <ActionIcon
                  variant={chartSelection === index ? "filled" : "light"}
                  onClick={() => setChartSelection(index)}
                >
                  {tab.icon}
                </ActionIcon>
              </Tooltip>
            );
          })}
        </Group>
      </Group>
      {isError && <Text c="red">{isError}</Text>}
      <AreaChart
        h={200}
        data={forecastData}
        dataKey="time"
        series={[{ name: chartY, color: "cyan" }]}
        withGradient
        curveType="natural"
        unit={chartUnit}
        tickLine="xy"
        gridAxis="xy"
        mt={20}
      />
    </BoxLayout>
  );
};

export default ShortForecast;
