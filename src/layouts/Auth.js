import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components
import { UserProvider } from "Context/UserContext";
import RegistNavbar from "components/Navbars/RegistNavbar";

// views
import Forgotpwd from "views/auth/Forgotpwd.js";
import Resetpwd from "views/auth/Resetpwd.js";
import Login from "views/auth/Login.js";
import Register from "views/auth/Register";
import PilihTipeUser from "views/auth/PilihTipeUser";
import SyaratKetentuan from "views/auth/SyaratKetentuan";
//stepper tipe UMUM
import stepperIndex from "views/auth/stepperIndex";
//stepper tipe PPAT
import stepperPPAT from "views/auth/stepperPPAT";
//go to verif email
import Modal from "views/auth/Modal";
//verif success
import ModalVerif from "views/auth/ModalVerif";
//otp
import Modal2 from "views/auth/Modal2";
import ModalOtp from "views/auth/ModalOtp";
//verifCA
import Modal3 from "views/auth/Modal3";
//To TTD alone
import Sign from "views/auth/Sign";
//To CA
import Ca from "views/auth/Ca";
//import Pernyataan Uang Transaksi
import PernyataanTransaksi from "views/auth/PernyataanTransaksi";
//syarat lengkapi diri w/o stepper
import SyaratPPAT from "views/auth/SyaratPPAT";
import Syarat1 from "views/auth/Syarat1";
import Syarat2 from "views/auth/Syarat2";
import Syarat3 from "views/auth/Syarat3";
import Syarat4 from "views/auth/Syarat4";

// import Face from "views/auth/Face";

import { RegistProvider } from "views/auth/RegistContext";
import * as serviceWorker from "./serviceWorker";
import Maps from "views/admin/WebRTC/Maps";
import { PexipProvider } from "Context/PexipContect";
import Call from "components/Pexip/Call/Call";

export default function Auth() {
  var val = localStorage.getItem("dataPPAT");

  // const LoginRoute = ({ ...props }) => {
  //   if (val) {
  //     return <Redirect to="/admin/dashboard" />;
  //   } else {
  //     return <Route {...props} />;
  //   }
  // };

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
              <Route path="/register" exact component={Register} />
              <Route path="/stepper" exact component={stepperIndex} />
              <Route path="/stepperPAT" exact component={stepperPPAT} />
              <Route path="/modal" exact component={Modal} />
              <Route path="/tipe" exact component={PilihTipeUser} />
              <Route
                path="/syaratKetentuan"
                exact
                component={SyaratKetentuan}
              />
              <Route path="/syaratPPAT" exact component={SyaratPPAT} />
              <Route path="/syarat1" exact component={Syarat1} />
              <Route path="/syarat2" exact component={Syarat2} />
              <Route path="/modalverif" exact component={ModalVerif} />
              <Route path="/modal2" exact component={Modal2} />
              <Route path="/modal3" exact component={Modal3} />
              <Route path="/sign" exact component={Sign} />
              <Route path="/ca" exact component={Ca} />
              <PexipProvider>
                <Route path="/call_mobile" exact component={Call} />
              </PexipProvider>
              <Route path="/pernyataan" exact component={PernyataanTransaksi} />
              {/* <Route path="/face" exact component={Face} /> */}
              <Route path="/syarat3" exact component={Syarat3} />
              <Route path="/syarat4" exact component={Syarat4} />
              <Route path="/cekAPI" exact component={Maps} />
              {/* <Route path='*' render={() => {
                return <NotFound />
              }} /> */}
            </RegistProvider>
          </Switch>
        </section>
      </main>
    </>
  );
}

serviceWorker.unregister();
