import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
// import { makeStyles } from "@material-ui/core/styles";

import { SettingsContext } from "./SettingsProvider";

import SettingsSidebar from "../Settings/SettingsSidebar";





import {
  makeStyles,

} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));


const ExternalAppSettings = ({ userId, ...props }) => {
  const { getExternalAppSettings, updateExternalAppSettings } =
    useContext(SettingsContext);

  const [externalAppSettings, setExternalAppSettings] = useState({
  });

  const classes = useStyles();

  const history = useHistory();

  const handleChange = (e) => {
    setExternalAppSettings({
      ...externalAppSettings,
      [e.target.name]: e.target.value,
    });
  };

  // useEffect(() => {
  //   getExternalAppSettings().then((res) => {
  //     setExternalAppSettings(res);
  //   });
  // }, []);


  return (
    <>
      <SettingsSidebar />
      <div className="main-content">
        <div className="settings">
          <div style={props.style} className={props.classes}>
            
            <h2>External Apps</h2>
              
          </div>
        </div>
      </div>
    </>
  );
};

export default ExternalAppSettings;
