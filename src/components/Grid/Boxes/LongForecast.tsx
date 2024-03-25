import { SimpleGrid, Title } from "@mantine/core";
import DayForecast from "../DayForecast";
import { HourlyForecast } from "../../../hooks/useForecastData";
import BoxLayout from "../BoxLayout";

interface LongForecastProps {
  noonData: HourlyForecast[];
  isError: string | null;
}

const LongForecast = ({ noonData, isError }: LongForecastProps) => {
  return (
    <>
      <BoxLayout>
        <Title order={4} c="dimmed" className="tracking-wide">
          NEXT 5 DAYS
        </Title>
        <SimpleGrid cols={{ xs: 3, sm: 5 }}>
          {isError && <div>Error: {isError}</div>}
          {noonData.length === 0 && !isError && (
            <div>No forecast data available.</div>
          )}
          {noonData.map((forecast) => (
            <DayForecast key={forecast.time} {...forecast} />
          ))}
        </SimpleGrid>
      </BoxLayout>
    </>
  );
};

export default LongForecast;
