import React from "react";
import { Route } from "react-router-dom";

import Home from "../Home";
import Clients from "../Clients";
import Sessions from "../Sessions";
import Sync from "../Sync";
import CCEU from "../CCEU";
import Settings from "../Settings";
import Help from "../Help";

import ScrollToTop from "../UI/ScrollToTop";

const ApplicationViews = (props) => {
  return (
    <>
      {/* Home */}
      <ScrollToTop />
      <Route
        exact
        path="/home"
        render={(props) => <div className="main-content"><Home history={props.history} {...props} /></div>}
      />

      {/* Clients */}
      <ScrollToTop />
      <Route
        exact
        path="/clients"
        render={(props) => <div className="main-content"><Clients history={props.history} {...props} /></div>}
      />

      {/* Sessions */}
      <ScrollToTop />
      <Route
        exact
        path="/sessions"
        render={(props) => <div className="main-content"><Sessions history={props.history} {...props} /></div>}
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
