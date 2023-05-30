import React from "react";
import { Switch, Route } from "react-router-dom";

// components
import { UserProvider } from "Context/UserContext";

// views
import * as serviceWorker from "./serviceWorker";
import Login from "views/auth/Login";

export default function Auth() {
  return (
    <>
      <main>
        <section className="absolute w-full h-full">
          <Switch>
              <UserProvider>
                <Route path="/" exact component={Login} />
                <Route path="/login" exact component={Login} />
              </UserProvider>
          </Switch>
        </section>
      </main>
    </>
  );
}

serviceWorker.unregister();
