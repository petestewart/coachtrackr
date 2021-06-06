import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
// import { makeStyles } from "@material-ui/core/styles";

import { SettingsContext } from "./SettingsProvider";

import SettingsSidebar from "./SettingsSidebar";

import { makeStyles } from "@material-ui/core";

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

const About = ({ userId, ...props }) => {
  const { bookmark } = useContext(SettingsContext);

  return (
    <>
      <SettingsSidebar backButtonDest={bookmark} />
      <div className="main-content">
        <div className="settings">
          <div style={props.style} className={props.classes}>
            <h2>About</h2>
            {props.bookmark && props.bookmark.pathname}
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
