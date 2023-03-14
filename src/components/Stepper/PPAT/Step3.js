import React, { useContext, useRef } from "react";
import Webcam from "react-webcam";
import { FormGroup } from "reactstrap";
import { RegistContext } from "views/auth/RegistContext";
import ModalDokumen from "components/Modals/ModalDokumen";

//swafoto + get api for KTP and Face
const Step3 = (props) => {
  const { inputRegist, setInputRegist, ppatFile, loading, b64toBlob } =
    useContext(RegistContext);
  const [capturing, setCapturing] = React.useState(false);
  const [imagess, setImagess] = React.useState(null);

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

    //convert base64 to image/jpg
    // let self_photo = "self_photo";
    const contentType = "image/jpg";
    var base64result = imageSrc.substring(imageSrc.indexOf(",") + 1);
    var str = Buffer.from(base64result);
    const blob = b64toBlob(str, contentType);
    // var blobs = new Blob([blob], {
    //   type: "application/json",
    // });
    var blobs = new Blob([blob], { type: "image/png" });
    setInputRegist({ ...inputRegist, selfie_photo: imageSrc });
    ppatFile("selfie_photo", blobs)
  };

  const handleStopCaptureClick = () => {
    setCapturing(false);
    setImagess(null);
    // setLoad(true);
    // testFaceAPI();
  };

  // function b64toBlob(b64Data, contentType, sliceSize) {
  //   contentType = contentType || "";
  //   sliceSize = sliceSize || 512;
  //   var byteCharacters = atob(b64Data);
  //   var byteArrays = [];
  //   for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
  //     var slice = byteCharacters.slice(offset, offset + sliceSize);
  //     var byteNumbers = new Array(slice.length);
  //     for (var i = 0; i < slice.length; i++) {
  //       byteNumbers[i] = slice.charCodeAt(i);
  //     }
  //     var byteArray = new Uint8Array(byteNumbers);
  //     byteArrays.push(byteArray);
  //   }
  //   var blob = new Blob(byteArrays, { type: contentType });
  //   return blob;
  // }

  // const testFaceAPI = () => {
  //   // event.preventDefault();
  //   let myHeaders = new Headers();
  //   myHeaders.append("Cookie", "REVEL_FLASH=");
  //   myHeaders.append("Authorization", "Bearer " + cookies.get("token"));

  //   let uid = cookies.get("uid");

  //   let formdata = new FormData();
  //   formdata.append("uid", uid);
  //   formdata.append("self_photo", inputRegist.self_photo);
  //   formdata.append("bypass_ekyc", "true");
  //   formdata.append("roles", "ppat");

  //   let requestOptions = {
  //     method: "POST",
  //     credentials: "same-origin",
  //     headers: myHeaders,
  //     body: formdata,
  //     redirect: "follow",
  //   };

  //   fetch(
  //     process.env.REACT_APP_BACKEND_HOST + "api/lengkapidiri/update",
  //     requestOptions
  //   )
  //     .then((res) => {
  //       if (res.status === 401) {
  //         refreshToken();
  //       } else {
  //         return res.json();
  //       }
  //     })
  //     .then((res) => {
  //       let data = res.data;
  //       let sukses = res.success;

  //       setLoad(false);
  //       if (data === null && sukses === false) {
  //         if (res.error === "user not found") {
  //           swal({
  //             title: "Gagal!",
  //             text: "User tidak ditemukan",
  //             icon: "warning",
  //           });
  //         } else {
  //           swal({
  //             title: "Gagal!",
  //             text: res.error,
  //             icon: "error",
  //           });
  //         }
  //       } else if (sukses === true) {
  //         if (res.data.selfie_value === "<nil>") {
  //           swal({
  //             title: "Gagal!",
  //             text: "Foto selfie tidak valid atau tidak sesuai dengan pemilik KTP",
  //             icon: "error",
  //           });
  //           // setLoad(false);
  //         } else if (res.data.selfie_value < "85.0") {
  //           swal({
  //             title: "Gagal!",
  //             text:
  //               "Foto selfie tidak valid atau tidak sesuai dengan pemilik KTP. Tingkat kemiripan" +
  //               res.data.selfie_value +
  //               "%",
  //             icon: "error",
  //           });
  //         } else if (res.data.selfie_value >= "85.0") {
  //           swal({
  //             title: "Berhasil!",
  //             text: "Tingkat kemiripan " + res.data.selfie_value + "%",
  //             icon: "success",
  //           });
  //         }
  //       }
  //     })
  //     .catch((error) => {
  //       console.log("error", error);
  //     });
  // };

  if (props.currentStep !== 5) {
    return null;
  }

  return (
    <>
      {loading ? <ModalDokumen /> : null}
      <FormGroup>
        <div className="relative flex-col break-words w-900-d mx-auto shadow-lg rounded-lg mt-12 bg-white border-0">
          <div className="rounded-t px-6 py-10">
            <div className="text-center mb-2">
              <h1 className="text-blue-500 text-xl font-bold">Swafoto</h1>
            </div>
            <div className="text-coolGray-900 text-center">
              <small>
                Swafoto dilakukan untuk verifikasi data biometric <br /> dengan
                proses analisa dan perbandingan data referensi. <br /> Mohon
                untuk tidak menggunakan aksesoris di wajah, misal
                Kacamata/Masker.
              </small>
            </div>
          </div>
          <div className="space-y-4">
            <span className="flex h-custom-d w-customs-d mx-auto border-2 border-blue-400 pt-2 border-dashed rounded">
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
          <div className="text-center w-customs-d mt-4 mx-auto">
              <button
              type="button"
              className="bg-blue mb-12-d text-white active:bg-sky text-sm px-4 py-2 rounded-xl shadow hover:shadow-lg outline-none focus:outline-none mr-1 w-full ease-linear transition-all duration-150"
              onClick={
                capturing ? handleStopCaptureClick : handleStartCaptureClick
              }
            >
              {capturing ? "Ganti" : "Ambil Foto"}
            </button>
          </div>
        </div>
      </FormGroup>
    </>
  );
};

export default Step3;
