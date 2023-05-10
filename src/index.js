import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
// import "assert/styles/tailwind.css"

import Admin from "./layouts/Admin";
import Auth from "./layouts/Auth";

// layouts

ReactDOM.render(
  <BrowserRouter>
    {/* <UserProvider> */}
      <Switch>
        <Route path="/admin" component={Admin} />
        <Route path="/" component={Auth} />
      </Switch>
    {/* </UserProvider> */}
  </BrowserRouter>,
  document.getElementById("root")
);