import {
  Container,
  Title,
  Grid,
  Input,
  ActionIcon,
  InputBase,
  Pill,
  Paper,
  Text,
  Center,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useFavouritesContext } from "../../../hooks/useFavourites";
import useWeatherData from "../../../hooks/useWeatherData";

const Favourites = () => {
  const { favouritesList, addToList, removeFromList } =
    useFavouritesContext() || {
      favouritesList: [] as string[],
    };
  const [location, setLocation] = useState<string>("");

  const { weatherData, fetchData, error } = useWeatherData();

  const handleRemove = (favourite: string) => {
    removeFromList!(favourite);
    notifications.show({
      title: "Success",
      message: "You have removed " + favourite + " from your favourites.",
      color: "green",
    });
  };

  const handleAdd = async () => {
    localStorage.setItem("FAVOURITES", JSON.stringify(favouritesList));
    await fetchData(location!);
  };

  useEffect(() => {
    if (!weatherData) return;
    if (favouritesList!.includes(weatherData.name)) return;
    addToList!(weatherData.name!);

    notifications.show({
      title: "Success",
      message: "You have added " + weatherData.name! + " from your favourites.",
      color: "green",
    });
    setLocation("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weatherData]);

  return (
    <Container>
      <Title order={4} mb={5}>
        Favourite Locations
      </Title>
      <Text c="dimmed" size="sm" mb={40}>
        Add locations to your favourites to access them easily.
      </Text>
      <Grid mb={20}>
        <Grid.Col span={10}>
          <Input
            placeholder="Add a location"
            leftSection={<CiSearch />}
            value={location}
            onChange={(e) => setLocation(e.currentTarget.value)}
            error={error}
          />
        </Grid.Col>
        <Grid.Col span={2}>
          <ActionIcon size="lg" onClick={handleAdd} disabled={!location.trim()}>
            <CiSearch />
          </ActionIcon>
        </Grid.Col>
      </Grid>
      {favouritesList!.length > 0 ? (
        <InputBase component="div" multiline>
          <Pill.Group size="md">
            {favouritesList?.map((favourite, index) => (
              <Pill
                key={index}
                withRemoveButton
                onRemove={() => handleRemove(favourite)}
              >
                {favourite}
              </Pill>
            ))}
          </Pill.Group>
        </InputBase>
      ) : (
        <Paper withBorder className="p-3">
          <Center>
            <Text size="sm">
              Currently no favourites yet! Why not add some? Type in a location
              above or select the favourite button on a location page.
            </Text>
          </Center>
        </Paper>
      )}
    </Container>
  );
};

export default Favourites;
