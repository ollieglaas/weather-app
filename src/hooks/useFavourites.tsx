/* eslint-disable react-refresh/only-export-components */
import { ReactNode, useContext, createContext, useState } from "react";

interface FavouritesContextProviderProps {
  children: ReactNode;
}

interface FavouritesListType {
  favouritesList?: string[];
  addToList: (item: string) => void;
  removeFromList: (data: string) => void;
}

export const FavouritesContext = createContext<FavouritesListType | undefined>(
  undefined
);

export const useFavouritesContext = () => {
  return useContext(FavouritesContext);
};

export function FavouritesContextProvider({
  children,
}: FavouritesContextProviderProps) {
  const [favouritesList, setFavouritesList] = useState<string[]>([]);

  const addToList = (data: string) => {
    if (favouritesList.length >= 10) return; // max 10 favourites
    setFavouritesList((prev) => [...prev, data]);
  };

  const removeFromList = (data: string) => {
    setFavouritesList((prev) => {
      const updatedList = prev.filter((item) => item !== data);
      return updatedList;
    });
  };

  const contextValue = {
    favouritesList,
    addToList,
    removeFromList,
  };

  return (
    <FavouritesContext.Provider value={contextValue}>
      {children}
    </FavouritesContext.Provider>
  );
}

export default FavouritesContextProvider;
