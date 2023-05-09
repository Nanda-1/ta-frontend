import React from "react";
import { Switch, Route } from "react-router-dom";

// components
import RegistNavbar from "components/Navbars/RegistNavbar";

// views
import PilihTipeUser from "views/auth/PilihTipeUser";
//stepper tipe UMUM
import stepperIndex from "views/auth/stepperIndex";
//stepper tipe PPAT
import stepperPPAT from "views/auth/stepperPPAT";
//go to verif email
import Modal from "views/auth/Modal";
//otp
import Modal2 from "views/auth/Modal2";
//verifCA
import Modal3 from "views/auth/Modal3";
//To TTD alone
import Sign from "views/auth/Sign";
//To CA
import Ca from "views/auth/Ca";
//syarat lengkapi diri w/o stepper
import SyaratPPAT from "views/auth/SyaratPPAT";
import Syarat1 from "views/auth/Syarat1";
import Syarat2 from "views/auth/Syarat2";
import Syarat4 from "views/auth/Syarat4";

// import Face from "views/auth/Face";

import { RegistProvider } from "views/auth/RegistContext";
import * as serviceWorker from "./serviceWorker";

export default function lengkapiDiri() {
  return (
    <>
      <RegistNavbar transparent />
      <main>
        <section
          className={`absolute w-full ${
            !window.location.pathname.includes("/topup") && "h-full"
          }`}
        >
          <Switch>
            <RegistProvider>
              <Route
                path="/lengkapiDiri/stepper"
                exact
                component={stepperIndex}
              />
              <Route
                path="/lengkapiDiri/stepperPPAT"
                exact
                component={stepperPPAT}
              />
              <Route path="/lengkapiDiri/modal" exact component={Modal} />
              <Route
                path="/lengkapiDiri/tipe"
                exact
                component={PilihTipeUser}
              />
              <Route
                path="/lengkapiDiri/syaratPPAT"
                exact
                component={SyaratPPAT}
              />
              <Route path="/lengkapiDiri/syarat1" exact component={Syarat1} />
              <Route path="/lengkapiDiri/syarat2" exact component={Syarat2} />
              <Route path="/lengkapiDiri/modal2" exact component={Modal2} />
              <Route path="/lengkapiDiri/modal3" exact component={Modal3} />
              <Route path="/lengkapiDiri/sign" exact component={Sign} />
              <Route path="/lengkapiDiri/ca" exact component={Ca} />
              <Route path="/lengkapiDiri/syarat4" exact component={Syarat4} />
            </RegistProvider>
          </Switch>
        </section>
      </main>
    </>
  );
}

serviceWorker.unregister();
