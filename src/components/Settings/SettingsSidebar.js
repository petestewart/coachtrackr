import React from "react";

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SyncIcon from "@material-ui/icons/Sync";
import TimelineIcon from "@material-ui/icons/Timeline";
import InfoIcon from '@material-ui/icons/Info';
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import ShareRoundedIcon from '@material-ui/icons/ShareRounded';



import Sidebar from "../UI/Sidebar";

const items = [
  { name: "account", label: "Account", Icon: AccountCircleIcon, route: "/account" },
  { name: "notifications", label: "Notifications", Icon: NotificationsIcon, route: "/notifications" },
  { name: "external", label: "External Apps", Icon: SyncIcon, route: "/external" },
  { name: "cceu", label: "CCEU", Icon: TimelineIcon, route:"cceu" },
  { name: "about", label: "About", Icon: InfoIcon, route:"about" },
  { name: "help", label: "Help", Icon: HelpOutlineIcon, route:"help" },
  { name: "share", label: "Share CoachTrackr!", Icon: ShareRoundedIcon, route: "/share" },
];

const SettingsSidebar = () => {
  return (
    <div>

      <Sidebar items={items} backButton={true} />
    </div>
  );
};

export default SettingsSidebar;
