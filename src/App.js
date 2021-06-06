import React from "react";
import { ThemeProvider } from "@material-ui/core";
import theme from "./theme";

import Layout from "./components/Layout";

import { ClientsProvider } from "./components/Clients/ClientsProvider";
import { SessionsProvider } from "./components/Sessions/SessionsProvider";
import { SettingsProvider } from "./components/Settings/SettingsProvider";

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <ClientsProvider>
          <SessionsProvider>
            <SettingsProvider>
              <Layout />
            </SettingsProvider>
          </SessionsProvider>
        </ClientsProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
