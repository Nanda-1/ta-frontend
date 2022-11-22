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

var val = localStorage.getItem("dataPPAT");

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
    <UserProvider>
      <Switch>
        <PrivateRoute path="/admin" component={Admin} />
        <PrivateRoute path="/lengkapiDiri" component={lengkapiDiri} />
        <Route path="/" component={Auth} />
      </Switch>
    </UserProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
