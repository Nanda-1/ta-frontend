import React from "react";
import { Switch, Route } from "react-router-dom";

// Context
import { UserProvider } from "../Context/UserContext";

// views
import Dashboard from "views/admin/Dashboard.js";

// Pexip
import Sidebar from "components/Sidebar/Sidebar";
import Navbar from "components/Navbars/AdminNavbar";
import TeamsPage from "views/admin/TeamsPage";
import BorrowPage from "views/admin/BorrowPage";
import CollectionList from "components/Collection/CollectionList";

export default function Admin() {
  return (
    <>
      <Sidebar />
      {/* <Dashboard /> */}
      <Navbar />
      <div className="relative min-h-screen sidebar-transition md:ml-55 md:mr-15">
        <div className="px-4 md:px-8 mt-20 w-full -m-24 mx-auto">
          <Switch>
            <UserProvider>
              <Route path="/admin/dashboard" exact component={Dashboard} />
              <Route path="/admin/team" exact component={TeamsPage} />
              <Route path="/admin/borrower" exact component={BorrowPage} />
              <Route
                path="/admin/collection"
                exact
                component={CollectionList}
              />
            </UserProvider>
          </Switch>
        </div>
      </div>
    </>
  );
}
