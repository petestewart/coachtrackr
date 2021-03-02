import React, { useState, useEffect } from "react";
import { Route, useLocation } from "react-router-dom";

import SideNav from "../SideNav";
import ApplicationViews from "../ApplicationViews";

const Layout = () => {
  const [hideMainNav, setHideMainNav] = useState(false);

  const location = useLocation()

  useEffect(() => {
    setHideMainNav(location.pathname === '/settings')
  }, [location])


  return (


      <Route
        render={(props) => {
          return (
            <div className="layout">
              {!hideMainNav ? <SideNav /> : ""}
              {/* <div className={!hideMainNav ? "main-content" : ""}> */}
                <ApplicationViews setHideMainNav={setHideMainNav} />
              {/* </div> */}
            </div>
          );
        }}
      />
  );
};

export default Layout;
