import React, { useState, useEffect } from "react";

import CLIENTS from "../../DUMMYDATA/CLIENTS.json";

export const ClientsContext = React.createContext();

export const ClientsProvider = (props) => {

  const [allClients, setAllClients] = useState(CLIENTS)


  // const getClients = () => CLIENTS;

  const getClients = () => new Promise((resolve) => {
    resolve(allClients)
  })

  const getClientById =(clientId) => new Promise((resolve) => {
    resolve(allClients.filter(client => client.id === clientId)[0])
  })

  const createClient = (client) => {
    setAllClients((prevState) => [...prevState, client])
  }

  return (
    <ClientsContext.Provider
      value={{
        getClients,getClientById, createClient
      }}
    >
      {props.children}
    </ClientsContext.Provider>
  );
};
