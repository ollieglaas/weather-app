/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useState, ReactNode } from "react";

interface UnitContextProps {
  units: {
    temperature: string;
    windSpeed: string;
    timeFormat: string;
  };
  setData: (data: {
    temperature?: string;
    windSpeed?: string;
    timeFormat?: string;
  }) => void;
}

const UnitContext = createContext<UnitContextProps>({
  units: {
    temperature: "celcius",
    windSpeed: "mps",
    timeFormat: "24h",
  },
  setData: () => {},
});

export const useUnitContext = () => {
  return useContext(UnitContext).units;
};

export const useSetUnitContext = () => {
  return useContext(UnitContext).setData;
};

interface UnitContextProviderProps {
  children: ReactNode;
}

export function UnitContextProvider({ children }: UnitContextProviderProps) {
  const [units, setUnits] = useState({
    temperature: "celcius",
    windSpeed: "mps",
    timeFormat: "24h",
  });

  const setData = (data: {
    temperature?: string;
    windSpeed?: string;
    timeFormat?: string;
  }) => setUnits({ ...units, ...data });

  const contextValue = {
    units,
    setData,
  };

  return (
    <UnitContext.Provider value={contextValue}>{children}</UnitContext.Provider>
  );
}
