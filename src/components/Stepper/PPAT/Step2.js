import React, { useContext, useRef, useState } from "react";
import Webcam from "react-webcam";
import { FormGroup } from "reactstrap";
import { RegistContext } from "views/auth/RegistContext";
import ModalDokumen from "components/Modals/ModalDokumen";
import KeteranganPhoto from "components/RegistPPAT/KeteranganPhoto";

const Step2 = (props) => {
  const {
    inputRegist,
    setInputRegist,
    ppatFile,
    loading,
    b64toBlob,
    // fileLengkapiDiri,
    // setFileLengkapiDiri,
    // getUserFile,
  } = useContext(RegistContext);

  const [capturing, setCapturing] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [imagess, setImagess] = useState(null);
  const webcamRef = useRef(null);

  const videoConstraints = {
    width: 1500,
    height: 720,
    facingMode: "user",
  };

  const handleStartCaptureClick = () => {
    setCapturing(true);

    //capture with base64
    const imageSrc = webcamRef.current.getScreenshot();
    setImagess(imageSrc);
    // setFileLengkapiDiri(imageSrc);
   
    //convert base64 to image/jpg
    const contentType = "image/jpg";
    var base64result = imageSrc.substring(imageSrc.indexOf(",") + 1);
    var str = Buffer.from(base64result);
    const blob = b64toBlob(str, contentType);
    var blobs = new Blob([blob], { type: "image/png" });
    setInputRegist({ ...inputRegist, nik_photo: blobs });
    ppatFile("ktp", blobs);

  };

  const handleStopCaptureClick = () => {
    setCapturing(false);
    setImagess(null);
    // setFileLengkapiDiri("");
  };

  // useEffect(() => {
  //   if (props.currentStep === 2) {
  //     getUserFile("ktp");
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // console.log(fileLengkapiDiri);

  if (props.currentStep !== 2) {
    return null;
  }

  return (
    <>
      {loading ? <ModalDokumen /> : null}
      <FormGroup>
        <div className="relative flex-col break-words w-900-d mx-auto shadow-lg rounded-lg mt-12 bg-white border-0">
          <div className="rounded-t px-6 py-10">
            <div className="text-center">
              <h1 className="text-blue text-xl font-bold">Unggah KTP Anda</h1>
            </div>
            <div className="text-coolGray-900 text-center">
              <small>
                Dokumen ini diperlukan untuk memverifikasi identitas Anda.
                <br />
                Gunakan KTP asli atau Surat Keterangan Kependudukan
              </small>
            </div>
          </div>
          <div className="space-y-4">
            <span className="flex h-custom-d w-customs-d mx-auto border-2 border-blue-400 pt-2 border-dashed rounded">
              {/* {fileLengkapiDiri.length !== 0 ? (
                <img src={fileLengkapiDiri} alt="" className="mb-2 ml-2" /> */}
              {imagess ? (
                <img src={imagess} alt="" className="mb-2 ml-2" />
              ) : (
                <Webcam
                  ref={webcamRef}
                  screenshotFormat="image/jpg"
                  videoConstraints={videoConstraints}
                  // width={1280}
                  name="Webcam"
                  id="Webcam"
                  className="mb-2 ml-0-d"
                />
              )}
            </span>
          </div>
          <div className="text-center w-customs-d mt-4 mx-auto justify-content-between">
            <button
              type="button"
              className="bg-blue text-white active:bg-sky text-sm px-4 py-2 rounded-xl shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
              onClick={
                capturing ? handleStopCaptureClick : handleStartCaptureClick
              }
            >
              {capturing ? "Ganti" : "Ambil Foto"}
            </button>
          </div>
          <KeteranganPhoto />
        </div>
      </FormGroup>
    </>
  );
};

export default Step2;
