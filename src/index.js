import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";
// import NotFound from "layouts/NotFound";

import { UserProvider } from "Context/UserContext";
import swal from "sweetalert";
import lengkapiDiri from "layouts/LengkapiDiri";
import { TopUpProvider } from "Context/TopUpContext";
import TopUp from "views/admin/TopUp/TopUp";

var val = localStorage.getItem("authentication");

const PrivateRoute = ({ ...props }) => {
  if (val) {
    return <Route {...props} />;
  } else {
    return (
      swal(
        "Anda Tidak Dapat Mengakses Halaman Ini!",
        "Silahkan Login Terlebih Dahulu",
        "error"
      ),
      (<Redirect to="/" />)
    );
  }
};

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <UserProvider>
        <TopUpProvider>
          <Route path="/" component={Auth} />
          <Route path="/admin" component={Admin} />
          <Route path="/lengkapiDiri" component={lengkapiDiri} />
          {/* <Payment /> */}
          <Route path="/topup" component={TopUp} />
        </TopUpProvider>
      </UserProvider>
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
