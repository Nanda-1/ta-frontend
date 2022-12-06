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
import { PexipProvider } from "Context/PexipContect";

// components

import SidebarLive from "components/Sidebar/SidebarLive";

// views

import Dashboard from "views/admin/Dashboard.js";
import DashboardBpn from "views/admin/DashboardBpn";
// import RecordView from "views/admin/Tables.js";
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

// Pexip
import Preflight from "components/Pexip/Preflight/Preflight";
import Call from "components/Pexip/Call/Call";
import Maps from "views/admin/WebRTC/Maps";
import MeteraiConfirm from "components/Modals/MeteraiConfirm";
import Cookies from "js-cookie";
import AgoraRtc from "components/Agora/AgoraRtc";
import { AgoraProvider } from "Context/AgoraContext";
import Sidebar_v2 from "components/Sidebar/Sidebar_v2";
import { SuratKuasaProvider } from "Context/SuratKuasaContext";
import UploadAjb from "views/admin/PTSL/UploadAjb";
import UploadPbb from "views/admin/PTSL/UploadPbb";
import UploadBphtb from "views/admin/PTSL/UploadBphtb";
import UploadPh from "views/admin/PTSL/UploadPph";
import DokumenPtsl from "views/admin/PTSL/DokumenPtsl";
import Stamping from "views/admin/PTSL/Stamping";
import UploadSertipikat from "views/admin/SuratKuasa/UploadSertipikat";
import DokumenSuratKuasa from "views/admin/SuratKuasa/DokumenSuratKuasa";
import StampingSuratKuasa from "views/admin/SuratKuasa/StampingSuratKuasa";

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
            Cookies.get("step") === "8") ||
          window.location.pathname === "/admin/agoraRTC" ? (
            <PexipProvider>
              <SidebarLive />
            </PexipProvider>
          ) : window.location.pathname === "/admin/topUp" ? null : (
            <Sidebar_v2 />
          )}

          <div
            className={`relative min-h-screen sidebar-transition md:ml-53 ${
              sidebar ? null : "ml-0"
            }`}
          >
            {/* <NotifikasiProvider>
              <AdminNavbar />
            </NotifikasiProvider> */}
            {/* Header */}
            {/* <HeaderStats /> */}
            <div
              className={`px-4 md:px-8 mt-12 w-full -m-24 ${
                window.location.pathname === "/admin/topUp"
                  ? "bg-white"
                  : "mx-auto"
              }`}
            >
              <Switch>
                <UserProvider>
                  <LengkapiDiriCard />
                  <Route path="/admin/dashboard" exact component={Dashboard} />
                  {/* <Route path="/admin/tables" exact component={RecordView} /> */}

                  <PexipProvider>
                    <Route path="/admin/step6" exact component={Preflight} />
                  </PexipProvider>
                  <SuratKuasaProvider>
                    {/* <FormDokumen />
                    <FormDokumenSuratKuasa /> */}
                    <Route
                      path="/admin/pendaftaran_tanah_sistematis_lengkap/uploadAjb"
                      exact
                      component={UploadAjb}
                    />
                    <Route
                      path="/admin/pendaftaran_tanah_sistematis_lengkap/uploadPbb"
                      exact
                      component={UploadPbb}
                    />
                    <Route
                      path="/admin/pendaftaran_tanah_sistematis_lengkap/uploadBphtb"
                      exact
                      component={UploadBphtb}
                    />
                    <Route
                      path="/admin/pendaftaran_tanah_sistematis_lengkap/uploadPph"
                      exact
                      component={UploadPh}
                    />
                    <Route
                      path="/admin/pendaftaran_tanah_sistematis_lengkap/inputDataForm"
                      exact
                      component={DokumenPtsl}
                    />
                    <Route
                      path="/admin/pendaftaran_tanah_sistematis_lengkap/pembubuhan"
                      exact
                      component={Stamping}
                    />
                    <Route
                      path="/admin/surat_kuasa/uploadSertipikat"
                      exact
                      component={UploadSertipikat}
                    />
                    <Route
                      path="/admin/surat_kuasa/inputDataForm"
                      exact
                      component={DokumenSuratKuasa}
                    />
                    <Route
                      path="/admin/surat_kuasa/pembubuhan"
                      exact
                      component={StampingSuratKuasa}
                    />
                  </SuratKuasaProvider>

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
                    <AgoraProvider>
                      <Route
                        path="/admin/agoraRTC"
                        exact
                        component={AgoraRtc}
                      />
                    </AgoraProvider>
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
