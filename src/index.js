import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts
import Admin from "layouts/Admin";
import { UserProvider } from "Context/UserContext";
import swal from "sweetalert";

// views
import LandingPage from "views/landingPage/LandingPage";
import NavbarLanding from "views/landingPage/IndexNavbar";
import Form from "views/landingPage/Form";
import ForestMountain from "views/landingPage/ForestMountain";
import Login from "views/auth/Login";
import RockClimb from "views/landingPage/RockClimb";
import Diving from "views/landingPage/Diving";
import FooterAdmin from "components/Footers/FooterAdmin";

var val = localStorage.getItem("token");

const PrivateRoute = ({ component: Component, ...props }) => {
  if (val) {
    return <Component {...props} />
  } else {
    return (
      swal(
        "Anda Tidak Dapat Mengakses Halaman Ini!",
        "Silahkan Login Terlebih Dahulu",
        "error"
      ),
      (<Redirect to="/login" />)
    );
  }
};

ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <Switch>
        {/* <Route path="/admin" component={Admin} /> */}
        <PrivateRoute path="/admin" component={Admin}/>
        <Route path="/login" exact component={Login} />
        <div className="relative min-h-screen sidebar-transition landing-bg">
          {window.location.pathname.includes("/admin") ||
          window.location.pathname.includes("/login") ? null : (
            <NavbarLanding />
          )}
          <Route path="/" exact component={LandingPage} />
          <Route path="/landing_page" exact component={LandingPage} />
          <Route path="/form" exact component={Form} />
          <Route path="/forest_mountain" exact component={ForestMountain} />
          <Route path="/rock_climbing" exact component={RockClimb} />
          <Route path="/diving" exact component={Diving} />
          {window.location.pathname.includes("/admin") ||
          window.location.pathname.includes("/login") ? null : (
            <FooterAdmin />
          )}
        </div>
      </Switch>
    </UserProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
