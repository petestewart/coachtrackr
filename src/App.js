import React from "react";
import { ThemeProvider } from '@material-ui/core';
import theme from './theme'

import Layout from "./components/Layout";

import { ClientsProvider } from "./components/Clients/ClientsProvider";

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <ClientsProvider>
          <Layout />
        </ClientsProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
