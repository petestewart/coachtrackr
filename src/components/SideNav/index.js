import React, { useState } from "react";

import HomeIcon from "@material-ui/icons/Home";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import DateRangeIcon from "@material-ui/icons/DateRange";
import SyncIcon from "@material-ui/icons/Sync";
import TimelineIcon from "@material-ui/icons/Timeline";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

import AddCircleSharpIcon from "@material-ui/icons/AddCircleSharp";
import EditIcon from "@material-ui/icons/Edit";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";

import SettingsIcon from "@material-ui/icons/Settings";

import Sidebar from "../UI/Sidebar";

const onClick = (e, item) => {
  window.alert(JSON.stringify(item, null, 2));
};

const items = [
  { name: "home", label: "Home", Icon: HomeIcon, route: "/home" },
  {
    name: "clients",
    label: "Clients",
    Icon: PeopleAltIcon,
    route: "clients",
    items: [
      {
        name: "addClient",
        label: "Add new client",
        onClick,
        static: true,
        Icon: AddCircleSharpIcon,
      },
      {
        name: "manageClients",
        label: "Manage client list",
        onClick,
        static: true,
        Icon: EditIcon,
      },
      {
        name: "importClients",
        label: "Import client(s)",
        onClick,
        static: true,
        Icon: CloudDownloadIcon,
      },
    ],
  },
  {
    name: "sessions",
    label: "Sessions",
    Icon: DateRangeIcon,
    route: "sessions",
    items: [
      {
        name: "addSession",
        label: "Add new session",
        onClick,
        static: true,
        Icon: AddCircleSharpIcon,
      },
      {
        name: "manageSessions",
        label: "Manage sessions",
        onClick,
        static: true,
        Icon: EditIcon,
      },
      {
        name: "importSessions",
        label: "Import session(s)",
        onClick,
        static: true,
        Icon: CloudDownloadIcon,
      },
    ],
  },
  { name: "sync", label: "Sync", Icon: SyncIcon, route:"sync" },
  { name: "cceu", label: "CCEU", Icon: TimelineIcon, route:"cceu" },
  { name: "settings", label: "Settings", Icon: SettingsIcon, route:"settings" },
  { name: "help", label: "Help", Icon: HelpOutlineIcon, route:"help" },
  "divider"
];

const SideNav = () => {
  const [showLabels, setShowLabels] = useState(true)

  const toggleLabels = () => {
    setShowLabels((prevState) => !prevState)
  }

  return (
    <div>

      <Sidebar items={items} hideLabels={!showLabels} toggleLabels={toggleLabels} />
    </div>
  );
};

export default SideNav;
