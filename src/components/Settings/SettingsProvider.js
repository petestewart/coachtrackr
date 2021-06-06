import React, { useState, useEffect } from "react";

import { useHistory, useLocation } from "react-router-dom";


import SETTINGS from "../../DUMMYDATA/SETTINGS.json";

export const SettingsContext = React.createContext();

export const SettingsProvider = (props) => {
  const [allSettings, setAllSettings] = useState(SETTINGS);

  const [bookmark, setBookmark] = useState("");

  const location = useLocation();


  useEffect(() => {
    if (location.pathname.substring(0, 9) !== "/settings") {
      setBookmark(location.pathname);
    }
  }, [location]);


  const getAccountSettings = () =>
    new Promise((resolve) => {
      const accountSettings = {
        name: allSettings.name,
        email: allSettings.email,
        location: allSettings.location,
        currentCertification: allSettings.currentCertification,
      };
      resolve(accountSettings);
    });

  const getNotificationSettings = () =>
    new Promise((resolve) => {
      const notifications = {...allSettings.notifications}
      const notificationSettings = {
        sessionReminderHoursBefore: notifications.sessionReminderHoursBefore,
        clientMilestonesMonth: notifications.clientMilestonesMonth,
        clientMilestonesYear: notifications.clientMilestonesYear,
        topClient: notifications.topClient,
        certificationRequirements: notifications.certificationRequirements,
        certificationAccomplishments: notifications.certificationAccomplishments,
      };
      resolve(notificationSettings);
    });

  const updateAccountSettings = (updatedSettings) =>
    new Promise((resolve) => {
      setAllSettings(...allSettings, updatedSettings);
      resolve(updatedSettings);
    });

  const updateNotificationSettings = (updatedSettings) =>
    new Promise((resolve) => {
      setAllSettings(...allSettings, updatedSettings);
      resolve(updatedSettings);
    });

  return (
    <SettingsContext.Provider
      value={{
        getAccountSettings,
        updateAccountSettings,
        getNotificationSettings,
        updateNotificationSettings,
        allSettings,
        bookmark
      }}
    >
      {props.children}
    </SettingsContext.Provider>
  );
};
