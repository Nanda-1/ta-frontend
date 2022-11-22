import React, { useContext, useRef } from "react";
import Webcam from "react-webcam";
import { FormGroup } from "reactstrap";
import cookies from "js-cookie";
import { RegistContext } from "views/auth/RegistContext";
import swal from "sweetalert";

const Step2a = (props) => {
  const { inputRegist, setInputRegist } = useContext(RegistContext);
  const [capturing, setCapturing] = React.useState(false);
  const [imagess, setImagess] = React.useState(null);

  const webcamRef = useRef(null);

  const videoConstraints = {
    width: 1500,
    height: 720,
    facingMode: "user",
  };

  function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || "";
    sliceSize = sliceSize || 512;
    var byteCharacters = atob(b64Data);
    var byteArrays = [];
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);
      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  const handleStartCaptureClick = React.useCallback(() => {
    setCapturing(true);

    //capture with base64
    const imageSrc = webcamRef.current.getScreenshot();
    setImagess(imageSrc);

    //convert base64 to image/jpg
    let npwp_photo = "npwp_photo";
    const contentType = "image/jpg";
    var base64result = imageSrc.substring(imageSrc.indexOf(",") + 1);
    var str = Buffer.from(base64result);
    const blob = b64toBlob(str, contentType);
    // const blobUrl = URL.createObjectURL(blob);
    var blobs = new Blob([blob], {
      type: "application/json",
    });
    let nama = cookies.get("nama");
    var fileOfBlob = new File([blobs], "npwp_" + nama + ".jpg");
    // var URL = window.URL.createObjectURL(blob);
    setInputRegist({ ...inputRegist, [npwp_photo]: fileOfBlob });
    cookies.set(npwp_photo, fileOfBlob);
    console.log(fileOfBlob);
    sending(fileOfBlob);
  }, [inputRegist, setInputRegist]);

  const sending = async (fileOfBlob) => {
    // setLoad(true);
    // event.preventDefault();
    let myHeaders = new Headers();
    myHeaders.append("Cookie", "REVEL_FLASH=");
    // myHeaders.append("Content-Type", "multipart/form-data");

    let formdata = new FormData();
    formdata.append("uid", cookies.get("uid"));
    formdata.append("npwp_photo", fileOfBlob);
    // formdata.append("bypass_ekyc", "true")

    let requestOptions = {
      method: "POST",
      credentials: "same-origin",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    try {
      // setLoad(true);

      await fetch(
        process.env.REACT_APP_BACKEND_HOST + "api/lengkapidiri/update",
        requestOptions
      )
        .then((res) => res.json())
        .then((res) => {
          let data = res.data;
          let sukses = res.success;

          if (data === null && sukses === false) {
            swal({
              title: "Gagal!",
              text: res.error,
              icon: "error",
            });
            // setLoad(false);
          } else if (sukses === true) {
            console.log(res);
            swal({
              title: "Berhasil",
              text: "Foto NPWP Tersimpan",
              icon: "success",
            });
            // setLoad(false);
            // console.log(formdata);
            // console.log(true);
            // setShowModal(true);
          }
        })
        .catch((error) => {
          // setLoad(false);
          console.log("error", error);
        });
    } catch (err) {
      // error handling code
    }
  };

  const handleStopCaptureClick = () => {
    setCapturing(false);
    setImagess(null);
    // testFaceAPI();
  };

  if (props.currentStep !== 2) {
    return null;
  }

  return (
    <>
      <p className="pt-10"></p>
      <FormGroup>
        <div className="relative flex-col break-words w-800-d mx-auto shadow-lg rounded-lg bg-white border-0">
          <div className="rounded-t mt-8 px-6 py-6">
            <div className="text-center mb-2">
              <h1 className="text-blue-500 text-xl font-bold">
                Unggah NPWP Anda
              </h1>
            </div>
            <div className="text-coolGray-900 text-center">
              <small>
                Dokumen ini diperlukan untuk memverifikasi identitas Anda.
                <br />
                Gunakan NPWP asli
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
          <div className="text-center w-auto ml-12 mr-12 mt-4 mx-auto">
            {capturing ? (
              <button
                type="button"
                className="bg-blue-500 text-white active:bg-sky-500 text-sm px-4 py-2 rounded-xl shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                onClick={handleStopCaptureClick}
              >
                Ganti
              </button>
            ) : (
              <button
                type="button"
                className="bg-blue-500 text-white active:bg-sky-500 text-sm px-4 py-2 rounded-xl shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                onClick={handleStartCaptureClick}
              >
                Ambil Foto
              </button>
            )}
          </div>
          <div className="text-coolGray-900 mx-auto pl-12 pt-2 pb-4 text-left w-auto">
            <small>
              Perhatian: <br />
              1. Gambar identitas harus terbaca jelas <br />
              2. Foto identitas adalah dokumen asli, bukan dokumen fotokopi.{" "}
              <br />
              3. Identitas yang terdaftar adalah data yang masih berlaku
            </small>
          </div>
          <hr className="mt-6 border-0 mb-4" />
        </div>
      </FormGroup>
    </>
  );
};

export default Step2a;
