import React, { useState, useEffect } from "react";
import { Route, useLocation } from "react-router-dom";

import SideNav from "../SideNav";
import ApplicationViews from "../ApplicationViews";

const Layout = () => {
  const [hideMainNav, setHideMainNav] = useState(false);
  const [hideNavLabels, setHideNavLabels] = useState(false);


  const [openModal, setOpenModal] = useState("");

  const location = useLocation();

  useEffect(() => {
    setHideMainNav(location.pathname.substring(0,9) === "/settings");
  }, [location]);



  return (
    <Route
      render={(props) => {
        return (
          <div className="layout">
            {!hideMainNav ? (
              <SideNav
                hideNavLabels={hideNavLabels}
                setHideNavLabels={setHideNavLabels}
                activePath={location.pathname}
                setOpenModal={setOpenModal}
              />
            ) : (
              ""
            )}
            {/* <div className={!hideMainNav ? "main-content" : ""}> */}
            <ApplicationViews
              setHideMainNav={setHideMainNav}
              openModal={openModal}
              setOpenModal={setOpenModal}
            />
            {/* </div> */}
          </div>
        );
      }}
    />
  );
};

export default Layout;
