import React from "react";

import CLIENTS from "../../DUMMYDATA/CLIENTS.json";

export const ClientsContext = React.createContext();

export const ClientsProvider = (props) => {

  // const getClients = () => CLIENTS;

  const getClients = () => new Promise((resolve) => {
    resolve(CLIENTS)
  })

  return (
    <ClientsContext.Provider
      value={{
        getClients,
      }}
    >
      {props.children}
    </ClientsContext.Provider>
  );
};
