import React from "react";
import { Route } from "react-router-dom";

import Home from "../Home";
import Clients from "../Clients";
import Sessions from "../Sessions";
import Sync from "../Sync";
import CCEU from "../CCEU";
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
        render={(props) => <Home history={props.history} {...props} />}
      />

      {/* Clients */}
      <ScrollToTop />
      <Route
        exact
        path="/clients"
        render={(props) => <Clients history={props.history} {...props} />}
      />

      {/* Sessions */}
      <ScrollToTop />
      <Route
        exact
        path="/sessions"
        render={(props) => <Sessions history={props.history} {...props} />}
      />

      {/* Sync */}
      <ScrollToTop />
      <Route
        exact
        path="/sync"
        render={(props) => <Sync history={props.history} {...props} />}
      />

      {/* CCEU */}
      <ScrollToTop />
      <Route
        exact
        path="/cceu"
        render={(props) => <CCEU history={props.history} {...props} />}
      />

      {/* Help */}
      <ScrollToTop />
      <Route
        exact
        path="/help"
        render={(props) => <Help history={props.history} {...props} />}
      />
    </>
  );
};

export default ApplicationViews;
