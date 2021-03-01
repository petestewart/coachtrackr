import React from "react";

import MenuIcon from '@material-ui/icons/Menu';

import HomeIcon from "@material-ui/icons/Home";
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import DateRangeIcon from '@material-ui/icons/DateRange';
import SyncIcon from '@material-ui/icons/Sync';
import TimelineIcon from '@material-ui/icons/Timeline';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

import AddCircleSharpIcon from '@material-ui/icons/AddCircleSharp';
import EditIcon from '@material-ui/icons/Edit';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

import SettingsIcon from "@material-ui/icons/Settings";

import Sidebar from "../UI/Sidebar";

const onClick = (e, item) => {
  window.alert(JSON.stringify(item, null, 2));
}

const items = [
  { name: "home", label: "Home", Icon: HomeIcon },
  "divider",
  {
    name: "clients",
    label: "Clients",
    Icon: PeopleAltIcon,
    items: [
      { name: "addClient", label: "Add new client", onClick, 
      Icon: AddCircleSharpIcon,},
      { name: "manageClients", label: "Manage client list", onClick, 
      Icon: EditIcon},
      { name: "importClients", label: "Import client(s)", onClick, 
      Icon: CloudDownloadIcon},
    ]
  },
  {
    name: "sessions",
    label: "Sessions",
    Icon: DateRangeIcon,
    items: [
      { name: "addSession", label: "Add new session", onClick, 
      Icon: AddCircleSharpIcon,},
      { name: "manageSessions", label: "Manage sessions", onClick, 
      Icon: EditIcon},
      { name: "importSessions", label: "Import session(s)", onClick, 
      Icon: CloudDownloadIcon},
    ]
  },
  { name: "sync", label: "Sync", Icon: SyncIcon },
  { name: "cceu", label: "CCEU", Icon: TimelineIcon },
  "divider",
  { name: "settings", label: "Settings", Icon: SettingsIcon },
  { name: "help", label: "Help", Icon: HelpOutlineIcon },
  
];

function App() {
  return (
    <div>
      <div className="sidebar-expander">

      <MenuIcon fontSize='large' />
      </div>
      <Sidebar items={items} />
    </div>
  );
}

export default App;
