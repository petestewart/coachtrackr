import React from "react";
import { ThemeProvider } from "@material-ui/core";
import theme from "./theme";

import Layout from "./components/Layout";

import { ClientsProvider } from "./components/Clients/ClientsProvider";
import { SessionsProvider } from "./components/Sessions/SessionsProvider";

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <ClientsProvider>
          <SessionsProvider>
            <Layout />
          </SessionsProvider>
        </ClientsProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
