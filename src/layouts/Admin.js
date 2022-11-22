import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
// import { useNavigate } from "react-router";

// import { io } from "socket.io-client"

// Context
import { UserProvider } from "../Context/UserContext";
import { AjbProvider } from "../Context/AjbContext";
import { AphtProvider } from "Context/AphtContext";
import { DokumenProvider } from "Context/DokumenContext";
import { TopUpProvider } from "Context/TopUpContext";
import { NotifikasiProvider } from "Context/NotifikasiContext";
import { PexipProvider } from "Context/PexipContect";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import SidebarLive from "components/Sidebar/SidebarLive";
import HeaderStats from "components/Headers/HeaderStats.js";

// views

import Dashboard from "views/admin/Dashboard.js";
import DashboardBpn from "views/admin/DashboardBpn";
import RecordView from "views/admin/Tables.js";
import OtpModal from "components/Modals/OTP";
import OtpModalConfirm from "components/Modals/OtpConfirm";
import OtpModalApht from "components/Modals/Apht/OTP";
import OtpModalConfirmApht from "components/Modals/Apht/OtpConfirm";
import DokumenDetails from "views/admin/DokumenDetails";
import DokumenDetailsBpn from "views/admin/DokumenDetailsBpn";
import PilihDokumen from "views/admin/PilihDokumen";
import TopUp from "views/admin/TopUp/TopUp";
import Checkout from "views/admin/TopUp/Checkout";
import Dokumen from "views/admin/Dokumen";
import LengkapiDiriCard from "components/Cards/LengkapiDiriCard";
import Payment from "components/Modals/Payment";

// AJB
import StepperIndexAjb from "views/admin/AktaJualBeli/index";
import stepperIndexApht from "views/admin/APHT";
import PreviewDokumen from "views/admin/AktaJualBeli/PreviewDokumen";

import { UserContext } from "../Context/UserContext";
// import NotFound from "./NotFound";
// import swal from "sweetalert";

// Pexip
import Preflight from "components/Pexip/Preflight/Preflight";
import Call from "components/Pexip/Call/Call";
import Maps from "views/admin/WebRTC/Maps";
import MeteraiConfirm from "components/Modals/MeteraiConfirm";
import Cookies from "js-cookie";

export default function Admin() {
  const { sidebar } = useContext(UserContext);
  return (
    <>
      {window.location.pathname === "/admin/BuatDokumen" ? (
        <UserProvider>
          <Route path="/admin/BuatDokumen" exact component={PilihDokumen} />
        </UserProvider>
      ) : (
        <>
          {window.location.pathname === "/admin/step6/call" ||
          (window.location.pathname === "/admin/AktaJualBeli" &&
            Cookies.get("step") === "8") ||
          (window.location.pathname === "/admin/AktaPemberianHakTanggungan" &&
            Cookies.get("step") === "8") ? (
            <PexipProvider>
              <SidebarLive />
            </PexipProvider>
          ) : window.location.pathname === "/admin/step6/call_mobile" ? null : (
            <Sidebar />
          )}

          <div
            className={`relative bg-white min-h-screen sidebar-transition ${
              sidebar && window.location.pathname !== "/admin/step6/call"
                ? " md:ml-30"
                : "md:ml-50"
            } ${sidebar ? null : "ml-0"}`}
          >
            <NotifikasiProvider>
              <AdminNavbar />
            </NotifikasiProvider>
            {/* Header */}
            <HeaderStats />
            <div className="px-4 md:px-10 mx-auto w-full -m-24">
              <Switch>
                <UserProvider>
                  <LengkapiDiriCard />
                  <Route path="/admin/dashboard" exact component={Dashboard} />
                  <Route path="/admin/tables" exact component={RecordView} />

                  <PexipProvider>
                    <Route path="/admin/step6" exact component={Preflight} />
                  </PexipProvider>

                  <TopUpProvider>
                    <Payment />
                    <Route path="/admin/topup" exact component={TopUp} />
                    <Route
                      path="/admin/checkout=:id"
                      exact
                      component={Checkout}
                    />
                    <Route
                      path="/admin/detail_pesanan=:id"
                      exact
                      component={Checkout}
                    />
                  </TopUpProvider>

                  <DokumenProvider>
                    <MeteraiConfirm />
                    <Route
                      path="/admin/dashboardBpn"
                      exact
                      component={DashboardBpn}
                    />
                    <Route path="/admin/dokumen" exact component={Dokumen} />
                    <Route
                      path="/admin/preview_dokumen/transaction_id=:id"
                      exact
                      component={DokumenDetails}
                    />
                    <Route
                      path="/admin/detailBpn/transaction_id=:id"
                      exact
                      component={DokumenDetailsBpn}
                    />
                    <Route path="/admin/step6/call" exact component={Maps} />
                    <PexipProvider>
                      <Route
                        path="/admin/step6/call_mobile"
                        exact
                        component={Call}
                      />
                    </PexipProvider>
                  </DokumenProvider>
                  {/* <Redirect from="/admin" to="/admin/dashboard" /> */}

                  {/* AJB */}
                  <AjbProvider>
                    <OtpModal />
                    <OtpModalConfirm />
                    <Route
                      exact
                      path="/admin/AktaJualBeli"
                      component={StepperIndexAjb}
                    />
                    <Route
                      path="/admin/preview_dokumen"
                      exact
                      component={PreviewDokumen}
                    />
                  </AjbProvider>

                  {/* APHT */}
                  <AphtProvider>
                    <OtpModalApht />
                    <OtpModalConfirmApht />
                    <Route
                      exact
                      path="/admin/AktaPemberianHakTanggungan"
                      component={stepperIndexApht}
                    />
                  </AphtProvider>
                </UserProvider>
                {/* <Route path="error/*" component={NotFound} /> */}
              </Switch>
            </div>
          </div>
        </>
      )}
    </>
  );
}
