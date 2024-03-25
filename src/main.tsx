import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import "@mantine/notifications/styles.css";
import { MantineProvider, createTheme } from "@mantine/core";
import { UnitContextProvider } from "./hooks/useUnits.tsx";
import { Notifications } from "@mantine/notifications";
import FavouritesContextProvider from "./hooks/useFavourites.tsx";

export const theme = createTheme({
  primaryColor: "cyan",
  breakpoints: {
    xs: "30em",
    sm: "48em",
    md: "64em",
    lg: "74em",
    xl: "90em",
  },
  cursorType: "pointer",
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FavouritesContextProvider>
      <UnitContextProvider>
        <MantineProvider defaultColorScheme="dark" theme={theme}>
          <Notifications />
          <App />
        </MantineProvider>
      </UnitContextProvider>
    </FavouritesContextProvider>
  </React.StrictMode>
);
