import React from "react";

import CLIENTS from "../../DUMMYDATA/CLIENTS.json";

export const ClientsContext = React.createContext();

export const ClientsProvider = (props) => {

  // const getClients = () => CLIENTS;

  const getClients = () => new Promise((resolve) => {
    resolve(CLIENTS)
  })

  const getClientById =(clientId) => new Promise((resolve) => {
    resolve(CLIENTS.filter(client => client.id === clientId)[0])
  })

  return (
    <ClientsContext.Provider
      value={{
        getClients,getClientById
      }}
    >
      {props.children}
    </ClientsContext.Provider>
  );
};
