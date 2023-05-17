import React, { useContext, useEffect, useState } from "react";
import { MyAjbContext } from "Context/AjbContext";
import DocumentReady from "./DocumentReady";
import AgoraVideoCall from "./AgoraVideoCall";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { io } from "socket.io-client";
import FaceVer from "components/Modals/FaceVer";
import swal from "sweetalert";
import Cookies from "js-cookie";
import Socketio from "components/SocketIO/Socketio";

const AgoraRtc = () => {
  const {
    functions,
    setLoadingFile,
    ajbDoc,
    ttdImage,
    setBtnConfirm,
    btnConfirm,
    inputAjb,
    setInputAjb,
    loadingFile,
    dataDetailAjb,
    otpModal,
  } = useContext(MyAjbContext);

  const { inviteTtd } = functions;

  const val = localStorage.getItem("dataPPAT");
  const object = JSON.parse(val);

  const { getDokumenAjb, getTtdImage, addTandaTangan, detailAjb } = functions;

  let { id } = useParams();

  useEffect(() => {
    getDokumenAjb(id);
    getTtdImage();
    setLoadingFile(true);
    detailAjb(id);
  }, []);

  return (
    <div className="Example__container_pdf text-sm w-full h-screen">
      {/* {faceVerifikasi && <FaceVer />} */}
      <Socketio id={id} email={object.email} />
      <div className="flex w-full py-4" style={{ overflow: "hidden" }}>
        {/* <div className="grid grid-cols-3 p-4"> */}
        <DocumentReady
          ajbDoc={ajbDoc}
          ttdImage={ttdImage}
          setBtnConfirm={setBtnConfirm}
          btnConfirm={btnConfirm}
          inputAjb={inputAjb}
          setInputAjb={setInputAjb}
          addTandaTangan={addTandaTangan}
          loadingFile={loadingFile}
          setLoadingFile={setLoadingFile}
          otpModal={otpModal}
          getDokumenAjb={getDokumenAjb}
        />
        <AgoraVideoCall
          dataDetailAjb={dataDetailAjb}
          inviteTtd={inviteTtd}
          id={id}
        />
      </div>
    </div>
  );
};

export default AgoraRtc;
