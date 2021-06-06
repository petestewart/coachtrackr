import React from "react";
import { useHistory } from "react-router-dom";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SyncIcon from "@material-ui/icons/Sync";
import TimelineIcon from "@material-ui/icons/Timeline";
import InfoIcon from "@material-ui/icons/Info";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import ShareRoundedIcon from "@material-ui/icons/ShareRounded";

import Sidebar from "../UI/Sidebar";

const items = [
  {
    name: "account",
    label: "Account",
    Icon: AccountCircleIcon,
    route: "settings-account",
  },
  {
    name: "notifications",
    label: "Notifications",
    Icon: NotificationsIcon,
    route: "settings-notifications",
  },
  {
    name: "external",
    label: "External Apps",
    Icon: SyncIcon,
    route: "settings-external",
  },
  {
    name: "cceu",
    label: "CCEU",
    Icon: TimelineIcon,
    route: "settings-cceu",
  },
  {
    name: "about",
    label: "About",
    Icon: InfoIcon,
    route: "settings-about",
  },
  {
    name: "help",
    label: "Help",
    Icon: HelpOutlineIcon,
    route: "settings-help",
  },
  {
    name: "share",
    label: "Share CoachTrackr!",
    Icon: ShareRoundedIcon,
    route: "settings-share",
  },
];

const SettingsSidebar = (props) => {
  const history = useHistory();

  return (
    <div>
      <Sidebar items={items} backButton={true} />
    </div>
  );
};

export default SettingsSidebar;
