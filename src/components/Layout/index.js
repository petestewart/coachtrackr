import React from "react";

import SideNav from '../SideNav'
import ApplicationViews from '../ApplicationViews'

const Layout = () =>  (
    <div className="layout">
      <SideNav />
      <div className="main-content">
      <ApplicationViews />
      </div>        
    </div>
  )

export default Layout;
