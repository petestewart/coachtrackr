import React from "react";

import SettingsSidebar from "../Settings/SettingsSidebar";

const Settings = (props) => {
  return (
    <>
      <SettingsSidebar />
      <div className="main-content">
        <div className="settings">
          <h1>Settings</h1>
        </div>
      </div>
    </>
  );
};

export default Settings;
