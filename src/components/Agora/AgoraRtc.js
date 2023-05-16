import React, { useContext, useEffect, useState } from "react";
import { MyAjbContext } from "Context/AjbContext";
import DocumentReady from "./DocumentReady";
import AgoraVideoCall from "./AgoraVideoCall";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { io } from "socket.io-client";
import FaceVer from "components/Modals/FaceVer";
import swal from "sweetalert";
import Cookies from "js-cookie";

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

  useEffect(() => {
    const socket = io("https://be-ppat-transaction.infinids.id");
    // console.log(socket)

    socket.on("connect", () => {
      console.log(`Connected with ID: ${socket.id}`);
    });

    socket.on(`update document ${id}`, (data) => {
      swal({
        title: "Berhasil",
        text: data.message,
        icon: "success",
      });
    });

    socket.on(`ttd ${id} ${object.email}`, (data) => {
      swal({
        // title: "Berhasil",
        text:'Silahkan Melakukan Tanda Tangan',
        icon: "warning",
      });
    });
  }, []);

  const { getDokumenAjb, getTtdImage, addTandaTangan, detailAjb } = functions;

  let { id } = useParams();

  Cookies.set("roomId", id);

  useEffect(() => {
    getDokumenAjb(id);
    getTtdImage();
    setLoadingFile(true);
    detailAjb(id);
  }, []);

  return (
    <div className="Example__container_pdf text-sm w-full h-screen">
      {/* {faceVerifikasi && <FaceVer />} */}
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
