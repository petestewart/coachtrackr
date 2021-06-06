import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

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
      setAllSessions((prevState) => [...prevState, session]);
      getSessions().then((res) => {
        resolve(res);
      });
    });

  const updateSession = (updatedSession) =>
    new Promise((resolve) => {
      const index = allSessions.findIndex(
        (session) => session.id === updatedSession.id
      );
      const sessionList = [...allSessions]
      sessionList[index] = updatedSession
      setAllSessions(sessionList);
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
      newSessionList = [...newSessionList].filter(
        (session) => session.id !== sessionId
      );
    });
    setAllSessions(newSessionList);
    return newSessionList;
  };

  const removeSession = (sessionId) =>
    new Promise((resolve) => {
      const updatedSessions = [...allSessions].filter(
        (session) => session.id !== sessionId
      );
      setAllSessions(updatedSessions);
      resolve("");
    });

  return (
    <SessionsContext.Provider
      value={{
        getSessions,
        getSessionById,
        createSession,
        allSessions,
        removeSession,
        removeSessions,
        updateSession
      }}
    >
      {props.children}
    </SessionsContext.Provider>
  );
};
