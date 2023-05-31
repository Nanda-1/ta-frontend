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
import LandingPage from "views/landingPage/LandingPage";
import FooterAdmin from "components/Footers/FooterAdmin";
import NavbarLanding from "views/landingPage/IndexNavbar";
import Form from "views/landingPage/Form";
import ForestMountain from "views/landingPage/ForestMountain";
import Login from "views/auth/Login";

var val = localStorage.getItem("token");

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
        <Route path="/admin" component={Admin} />
        <Route path="/login" exact component={Login} />
        <div className="relative min-h-screen sidebar-transition landing-bg">
          {window.location.pathname.includes("/admin") ||
          window.location.pathname.includes("/login") ? null : (
            <NavbarLanding />
          )}
          {/* <Route path="/" component={LandingPage} /> */}
          <Route path="/landing_page" exact component={LandingPage} />
          <Route path="/form" exact component={Form} />
          <Route path="/forest_mountain" exact component={ForestMountain} />
          <Route path="/rock_climbing" exact component={Form} />
          <Route path="/diving" exact component={Form} />
          {window.location.pathname.includes("/admin") ||
          window.location.pathname.includes("/login") ? null : (
            <FooterAdmin />
          )}
        </div>
        {/* <Route path="/form" component={LandingPage} /> */}
      </Switch>
    </UserProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
