import React from "react";

import SESSIONS from "../../DUMMYDATA/SESSIONS.json";
import CLIENTS from "../../DUMMYDATA/CLIENTS.json";

export const SessionsContext = React.createContext();

export const SessionsProvider = (props) => {

  // const getSessions = () => SESSIONS;

  const getSessions = () => new Promise((resolve) => {
    resolve(SESSIONS.map((session) => {
      const client = CLIENTS.filter(client => client.id === session.clientId)[0]
      session.clientName = `${client.first_name} ${client.last_name}`
      return session
    }))
  })

  const getSessionById =(sessionId) => new Promise((resolve) => {
    resolve(SESSIONS.filter(session => session.id === sessionId)[0])
  })

  return (
    <SessionsContext.Provider
      value={{
        getSessions, getSessionById
      }}
    >
      {props.children}
    </SessionsContext.Provider>
  );
};
