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

// const onClick = (e, item) => {
//   window.alert(JSON.stringify(item, null, 2));
// };

const SideNav = (props) => {
  // const [showLabels, setShowLabels] = useState(true)

  const resetModal = () => {
    props.setOpenModal("");
  };

  const items = [
    {
      name: "home",
      label: "Home",
      Icon: HomeIcon,
      route: "/home",
      onClick: resetModal,
    },
    {
      name: "clients",
      label: "Clients",
      Icon: PeopleAltIcon,
      route: "/clients",
      onClick: resetModal,
      items: [
        {
          name: "addClient",
          label: "Add new client",
          onClick: () => props.setOpenModal("addClient"),
          static: true,
          Icon: AddCircleSharpIcon,
        },
        {
          name: "manageClients",
          label: "Manage client list",
          onClick: () => props.setOpenModal("manageClients"),
          static: true,
          Icon: EditIcon,
        },
        {
          name: "importClients",
          label: "Import client(s)",
          onClick: () => props.setOpenModal("importClients"),
          static: true,
          Icon: CloudDownloadIcon,
        },
      ],
    },
    {
      name: "sessions",
      label: "Sessions",
      Icon: DateRangeIcon,
      route: "/sessions",
      onClick: resetModal,
      items: [
        {
          name: "addSession",
          label: "Add new session",
          onClick: () => props.setOpenModal("addSession"),
          static: true,
          Icon: AddCircleSharpIcon,
        },
        {
          name: "manageSessions",
          label: "Manage sessions",
          onClick: () => props.setOpenModal("manageSessions"),
          static: true,
          Icon: EditIcon,
        },
        {
          name: "importSessions",
          label: "Import session(s)",
          onClick: () => props.setOpenModal("importSessions"),
          static: true,
          Icon: CloudDownloadIcon,
        },
      ],
    },
    {
      name: "sync",
      label: "Sync",
      Icon: SyncIcon,
      route: "/sync",
      onClick: resetModal,
    },
    {
      name: "cceu",
      label: "CCEU",
      Icon: TimelineIcon,
      route: "/cceu",
      onClick: resetModal,
    },
    {
      name: "settings",
      label: "Settings",
      Icon: SettingsIcon,
      route: "/settings",
      onClick: resetModal,
    },
    {
      name: "help",
      label: "Help",
      Icon: HelpOutlineIcon,
      route: "/help",
      onClick: resetModal,
    },
    "divider",
  ];

  const toggleLabels = () => {
    props.setHideNavLabels((prevState) => !prevState);
  };

  return (
    <div>
      <Sidebar
        items={items}
        activePath={props.activePath}
        hideLabels={props.hideNavLabels}
        toggleLabels={toggleLabels}
      />
    </div>
  );
};

export default SideNav;
