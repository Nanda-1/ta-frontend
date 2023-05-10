import React from "react";
import { Switch, Route } from "react-router-dom";

// Context
// import { UserProvider } from "../Context/UserContext";

// views
// import Dashboard from "views/admin/Dashboard.js";

// Pexip
// import SidebarV2 from "components/Sidebar/SidebarV2";

export default function Admin() {
  return (
    <>
      {/* <SidebarV2 /> */}
      {/* <Dashboard /> */}
      {/* <AdminNavbar /> */}
      <div className="relative min-h-screen sidebar-transition  md:ml-53">
        <div className="px-4 md:px-8 mt-8 w-full -m-24 mx-auto">
          <Switch>
            {/* <UserProvider> */}
              {/* <Route path="/admin/dashboard" exact component={Dashboard} /> */}
            {/* </UserProvider> */}
          </Switch>
        </div>
      </div>
    </>
  );
}
