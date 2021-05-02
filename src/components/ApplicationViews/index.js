import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";

import Home from "../Home";
import Clients from "../Clients";
import Sessions from "../Sessions";
import Sync from "../Sync";
import CCEU from "../CCEU";
import Settings from "../Settings";
import Help from "../Help";

import ScrollToTop from "../UI/ScrollToTop";

import SideNavDrawer from "../SideNav/SideNavDrawer"

const ApplicationViews = (props) => {
  const [clientsModal, setClientsModal] = useState('')
  const [sessionsModal, setSessionsModal] = useState('')

  useEffect(() => {
    switch (props.openModal) {
      case 'addClient':
      case 'manageClients':
      case 'importClients':
        setClientsModal(props.openModal)
        setSessionsModal('')
        break;
      case 'addSession':
      case 'manageSessions':
      case 'importSessions':
        setSessionsModal(props.openModal)
        setClientsModal('')
        break;
      default:
        setSessionsModal('')
        setClientsModal('')
    }
  }, [props.openModal])


  const handleCloseModal = () => {
    props.setOpenModal('')
  }

  return (
    <>
      {/* Test */}
      <ScrollToTop />
      <Route
        exact
        path="/drawer"
        render={(props) => <div className="main-content"><SideNavDrawer history={props.history} {...props} /></div>}
      />

      {/* Home */}
      <ScrollToTop />
      <Route
        exact
        path="/"
        render={(props) => <div className="main-content"><Home history={props.history} {...props} /></div>}
      />

      {/* Clients */}
      <ScrollToTop />
      <Route
        exact
        path="/clients"
        render={(props) => <div className="main-content"><Clients history={props.history} openModal={clientsModal} handleCloseModal={handleCloseModal} {...props}  /></div>}
      />

      {/* Sessions */}
      <ScrollToTop />
      <Route
        exact
        path="/sessions"
        render={(props) => <div className="main-content"><Sessions history={props.history} openModal={sessionsModal} handleCloseModal={handleCloseModal} {...props} /></div>}
      />

      {/* Sync */}
      <ScrollToTop />
      <Route
        exact
        path="/sync"
        render={(props) => <div className="main-content"><Sync history={props.history} {...props} /></div>}
      />

      {/* CCEU */}
      <ScrollToTop />
      <Route
        exact
        path="/cceu"
        render={(props) => <div className="main-content"><CCEU history={props.history} {...props} /></div>}
      />

      {/* Settings */}
      <ScrollToTop />
      <Route
        exact
        path="/settings"
        render={(props) => <Settings history={props.history} {...props} />}
      />

      {/* Help */}
      <ScrollToTop />
      <Route
        exact
        path="/help"
        render={(props) => <div className="main-content"><Help history={props.history} {...props} /></div>}
      />
    </>
  );
};

export default ApplicationViews;
