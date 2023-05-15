import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts
import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";

import { UserProvider } from "Context/UserContext";
import lengkapiDiri from "layouts/LengkapiDiri";
import { TopUpProvider } from "Context/TopUpContext";
import TopUp from "views/admin/TopUp/TopUp";
import { AjbProvider } from "Context/AjbContext";
import { AgoraProvider } from "Context/AgoraContext";
import AgoraRtc from "components/Agora/AgoraRtc";
import swal from "sweetalert";
import Dashboard from "views/admin/Dashboard";

var val = localStorage.getItem("authentication");
var dataUser = localStorage.getItem("dataPPAT");
console.log(val);

const PrivateRoute = ({ ...props }) => {
  if (dataUser !== null) {
    return <Route {...props} />;
  } else {
    return <Redirect to="/" />;
  }
};

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <UserProvider>
        <TopUpProvider>
          <Route path="/" component={Auth} />
          <PrivateRoute path="/admin" component={Admin} />
          <PrivateRoute path="/lengkapiDiri" component={lengkapiDiri} />
          {/* <Payment /> */}
          <PrivateRoute path="/topup" component={TopUp} />
          <AjbProvider>
            <AgoraProvider>
              <PrivateRoute
                path="/ruang_virtual=:channelName&&id=:id"
                component={AgoraRtc}
              />
            </AgoraProvider>
          </AjbProvider>
        </TopUpProvider>
      </UserProvider>
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
