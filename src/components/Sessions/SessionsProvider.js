import React, { useState, useEffect } from "react";

import SESSIONS from "../../DUMMYDATA/SESSIONS.json";
import CLIENTS from "../../DUMMYDATA/CLIENTS.json";

export const SessionsContext = React.createContext();

export const SessionsProvider = (props) => {
  const [allSessions, setAllSessions] = useState(SESSIONS);

  // const getSessions = () => SESSIONS;

  const getSessions = () =>
    new Promise((resolve) => {
      resolve(
        allSessions.map((session) => {
          if (session) {
            const client = CLIENTS.filter(
              (client) => client.id === session.clientId
            )[0];
            session.clientName = `${client.first_name} ${client.last_name}`;
            return session;
          }
        })
      );
    });

  const createSession = (newSession) =>
    new Promise((resolve) => {
      const session = {
        ...newSession,
        id: allSessions[allSessions.length - 1].id + 1,
      };
      // const newSessionList = [...sessions, session];
      setAllSessions((prevState) => [...prevState, session]);
      // resolve(newSessionList);
      getSessions().then((res) => {
        resolve(res);
      });
    });

  const getSessionById = (sessionId) =>
    new Promise((resolve) => {
      resolve(allSessions.filter((session) => session.id === sessionId)[0]);
    });

  const removeSessions = (sessions) => {
    let newSessionList = [...allSessions];
    sessions.forEach((sessionId) => {
      newSessionList = [...newSessionList].filter((session) =>
        session.id !== sessionId
      );
    });
    setAllSessions(newSessionList);
    return newSessionList;
  };

  return (
    <SessionsContext.Provider
      value={{
        getSessions,
        getSessionById,
        createSession,
        allSessions,
        removeSessions,
      }}
    >
      {props.children}
    </SessionsContext.Provider>
  );
};
