import React from "react";

import Layout from "./components/Layout";

import { ClientsProvider } from "./components/Clients/ClientsProvider";

function App() {
  return (
    <div>
      <ClientsProvider>
        <Layout />
      </ClientsProvider>
    </div>
  );
}

export default App;
