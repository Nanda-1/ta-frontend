import React from "react";
import { Switch, Route } from "react-router-dom";

// components
// import { UserProvider } from "Context/UserContext";
// import RegistNavbar from "components/Navbars/RegistNavbar";
import Login from "../views/auth/login";

// views
// import Login from "views/auth/Login.js";
// import * as serviceWorker from "./serviceWorker";

export default function Auth() {
  return (
    <>
      {/* <RegistNavbar transparent /> */}
      <main>
        <section className="absolute w-full h-full">
          <Switch>
              {/* <UserProvider> */}
                <Route path="/" exact component={Login} />
                <Route path="/login" exact component={Login} />
              {/* </UserProvider> */}
          </Switch>
        </section>
      </main>
    </>
  );
}

