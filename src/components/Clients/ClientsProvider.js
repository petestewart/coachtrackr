import React, { useState, useEffect } from "react";

import CLIENTS from "../../DUMMYDATA/CLIENTS.json";

export const ClientsContext = React.createContext();

export const ClientsProvider = (props) => {
  const [allClients, setAllClients] = useState(CLIENTS);

  // const getClients = () => CLIENTS;

  const getClients = () =>
    new Promise((resolve) => {
      resolve(allClients);
    });

  const getClientById = (clientId) =>
    new Promise((resolve) => {
      resolve(allClients.filter((client) => client.id === clientId)[0]);
    });

  const createClient = (newClient) =>
    new Promise((resolve) => {
      const client = { ...newClient, id: allClients.length + 1, pastSessions: 0, upcomingSessions: [] };
      const newClientList = [...allClients, client];
      setAllClients((prevState) => [...prevState, client]);
      resolve(newClientList);
    });

  const updateClient = (updatedClient) =>
    new Promise((resolve) => {
      const newClientList = [...allClients].filter(
        (client) => client.id !== updatedClient.id
      );
      newClientList.push(updatedClient);

      setAllClients(newClientList);
      resolve(newClientList);
    });

  const removeClient = (clientId) => {
    new Promise((resolve) => {
      console.log('about to remove client #', clientId)
      const updatedClients = [...allClients].map((client) =>
        client.id === clientId ? { ...client, isActive: false } : client
      );
      setAllClients(updatedClients);
      resolve("");
    });
  };

  const removeClients = (clients) => {
    const promises = clients.map((clientId) => removeClient(clientId));
    Promise.all(promises).then(() => {
      return allClients;
    });
  };

  // const createClient = (client) => {
  //   setAllClients((prevState) => [...prevState, client]);
  // };

  return (
    <ClientsContext.Provider
      value={{
        createClient,
        getClients,
        getClientById,
        removeClient,
        removeClients,
        updateClient,
        allClients,
      }}
    >
      {props.children}
    </ClientsContext.Provider>
  );
};
