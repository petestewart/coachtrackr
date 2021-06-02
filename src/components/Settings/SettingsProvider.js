import React, { useState, useEffect } from "react";

import SETTINGS from "../../DUMMYDATA/SETTINGS.json";

export const SettingsContext = React.createContext();

export const SettingsProvider = (props) => {
  const [allSettings, setAllSettings] = useState(SETTINGS);

  const getAccountSettings = () =>
    new Promise((resolve) => {
      resolve(allSettings);
    });

  

  const updateAccountSettings = (updatedSettings) =>
    new Promise((resolve) => {
      setAllSettings(updatedSettings);
      resolve(updatedSettings);
    });

  return (
    <SettingsContext.Provider
      value={{
        getAccountSettings,
        updateAccountSettings,
        allSettings,
      }}
    >
      {props.children}
    </SettingsContext.Provider>
  );
};
