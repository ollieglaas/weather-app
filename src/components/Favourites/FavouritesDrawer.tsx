import { List, Divider, Title } from "@mantine/core";
import { useFavouritesContext } from "../../hooks/useFavourites";

interface DrawerProps {
  closeDrawer: () => void;
  fetchData: (city: string) => void;
  fetchForecast: (city: string) => void;
}

const FavouritesDrawer = ({
  closeDrawer,
  fetchData,
  fetchForecast,
}: DrawerProps) => {
  return (
    <List size="xl" spacing="xl">
      <ListItem
        closeDrawer={closeDrawer}
        fetchData={fetchData}
        fetchForecast={fetchForecast}
      />
    </List>
  );
};

const ListItem = ({ closeDrawer, fetchData, fetchForecast }: DrawerProps) => {
  const favourites = useFavouritesContext()?.favouritesList;

  const handleClick = (favourite: string) => {
    fetchData(favourite);
    fetchForecast(favourite);
    closeDrawer();
  };

  return (
    <>
      {favourites && favourites.length > 0 ? (
        favourites.map((favourite, index) => (
          <div
            key={index}
            className="hover:cursor-pointer hover:scale-95 transition-all text-center pt-6"
          >
            <Title order={3} onClick={() => handleClick(favourite)}>
              {favourite}
            </Title>
            <Divider my="md" />
          </div>
        ))
      ) : (
        <p>No favourites found</p>
      )}
    </>
  );
};

export default FavouritesDrawer;
