import React from "react";
import { Switch, Route } from "react-router-dom";

// components
import { UserProvider } from "Context/UserContext";
import RegistNavbar from "components/Navbars/RegistNavbar";

// views
import Forgotpwd from "views/auth/Forgotpwd.js";
import Resetpwd from "views/auth/Resetpwd.js";
import Login from "views/auth/Login.js";
import Register from "views/auth/Register";
import SyaratKetentuan from "views/auth/SyaratKetentuan";
//go to verif email
import Modal from "views/auth/Modal";
//verif success
import ModalVerif from "views/auth/ModalVerif";
//terverifikasi
import VerifiyEmail from "views/auth/VerifyEmail";
//otp
import Modal2 from "views/auth/Modal2";
import ModalOtp from "views/auth/ModalOtp";
//import Pernyataan Uang Transaksi
import PernyataanTransaksi from "views/auth/PernyataanTransaksi";
//syarat lengkapi diri w/o stepper
import Syarat3 from "views/auth/Syarat3";

// import Face from "views/auth/Face";

import { RegistProvider } from "views/auth/RegistContext";
import * as serviceWorker from "./serviceWorker";
import Maps from "views/admin/WebRTC/Maps";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";


export default function Auth() {
  var val = localStorage.getItem("authentication");

  const LoginRoute = ({ ...props }) => {
    if (val === undefined) {
      return <Route {...props} />;
    } else {
      return <Redirect to="/admin/dashboard" />;
    }
  };

  return (
    <>
      <RegistNavbar transparent />
      <main>
        <section className="absolute w-full h-full">
          <Switch>
            <RegistProvider>
              <UserProvider>
                <Route path="/" exact component={Login} />
                <Route path="/login" exact component={Login} />
                <Route path="/login_otp" exact component={ModalOtp} />
              </UserProvider>
              <Route path="/forgotpwd" exact component={Forgotpwd} />
              <Route path="/resetpwd" exact component={Resetpwd} />
              <Route path="/verify-email" exact component={VerifiyEmail} />
              <Route path="/register" exact component={Register} />
              <Route path="/modal" exact component={Modal} />
              <Route
                path="/syaratKetentuan"
                exact
                component={SyaratKetentuan}
              />
              <Route path="/modalverif" exact component={ModalVerif} />
              <Route path="/modal2" exact component={Modal2} />
              <Route path="/pernyataan" exact component={PernyataanTransaksi} />
              {/* <Route path="/face" exact component={Face} /> */}
              <Route path="/syarat3" exact component={Syarat3} />
              <Route path="/cekAPI" exact component={Maps} />
            </RegistProvider>
          </Switch>
        </section>
      </main>
    </>
  );
}

serviceWorker.unregister();
