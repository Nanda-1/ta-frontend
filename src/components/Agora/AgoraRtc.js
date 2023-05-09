import React, { useContext, useEffect } from "react";
import { MyAjbContext } from "Context/AjbContext";
import DocumentReady from "./DocumentReady";
import AgoraVideoCall from "./AgoraVideoCall";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

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
    otpModal
  } = useContext(MyAjbContext);

  const { getDokumenAjb, getTtdImage, addTandaTangan } = functions;

  
  let { id } = useParams();

  useEffect(() => {
    getDokumenAjb(id);
    getTtdImage();
    setLoadingFile(true);
  }, []);

  return (
    <div className="Example__container_pdf text-sm w-full h-screen">
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
        />
        <AgoraVideoCall />
      </div>
    </div>
  );
};

export default AgoraRtc;
