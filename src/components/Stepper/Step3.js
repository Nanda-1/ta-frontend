import React, { useContext, useRef } from "react";
import Webcam from "react-webcam";
import { FormGroup } from "reactstrap";
import cookies from "js-cookie";
import { RegistContext } from "views/auth/RegistContext";
import swal from "sweetalert";

//swafoto + get api for KTP and Face
const Step3 = (props) => {
  const { inputRegist, setInputRegist } = useContext(RegistContext);
  const [capturing, setCapturing] = React.useState(false);
  const [imagess, setImagess] = React.useState(null);

  // const imgSrc = useRef(null);
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
    cookies.set("statues", false);

    //capture with base64
    const imageSrc = webcamRef.current.getScreenshot();
    setImagess(imageSrc);

    //convert base64 to image/jpg
    let self_photo = "self_photo";
    const contentType = "image/jpg";
    var base64result = imageSrc.substring(imageSrc.indexOf(",") + 1);
    var str = Buffer.from(base64result);
    const blob = b64toBlob(str, contentType);
    const blobUrl = URL.createObjectURL(blob);
    var blobs = new Blob([blob], {
      type: "application/json",
    });
    let name = cookies.get("nama");
    var fileOfBlob = new File([blobs], "swafoto_" + name + ".jpg");
    // var URL = window.URL.createObjectURL(blob);
    setInputRegist({ ...inputRegist, [self_photo]: fileOfBlob });
    cookies.set(self_photo, fileOfBlob);
    console.log(fileOfBlob);
    console.log(blobUrl);
  }, [inputRegist, setInputRegist]);

  const handleStopCaptureClick = () => {
    setCapturing(false);
    setImagess(null);
    testFaceAPI();
  };

  const testFaceAPI = async () => {
    // event.preventDefault();
    let myHeaders = new Headers();
    myHeaders.append("Cookie", "REVEL_FLASH=");
    myHeaders.append("Authorization", "Bearer " + cookies.get("token"));
    // myHeaders.append("Content-Type", "multipart/form-data");

    let uid = cookies.get("uid");
    // let selfie = cookies.get("self_photo");
    // form.append("upload", fileOfBlob);

    let formdata = new FormData();
    formdata.append("uid", uid);
    formdata.append("nama", cookies.get("nama"));
    formdata.append("tempat_lahir", cookies.get("tempat_lahir"));
    formdata.append("tanggal_lahir", cookies.get("tanggal_lahir"));
    formdata.append("gender", cookies.get("gender"));
    formdata.append("status_nikah", cookies.get("status_nikah"));
    formdata.append("alamat", cookies.get("alamat"));
    formdata.append("prov", cookies.get("prov"));
    formdata.append("kotkab", cookies.get("kotkab"));
    formdata.append("kecamatan", cookies.get("kecamatan"));
    formdata.append("kodepos", cookies.get("kodepos"));
    formdata.append("no_nik", cookies.get("no_nik"));
    formdata.append("no_npwp", cookies.get("no_npwp"));
    // formdata.append("prov", inputRegist.prov);
    // formdata.append("kotkab", inputRegist.kotkab);
    // formdata.append("kecamatan", inputRegist.kecamatan);
    // formdata.append("nik_photo", inputRegist.nik_photo);
    // formdata.append("npwp_photo", inputRegist.npwp_photo);
    // formdata.append("bpjs_photo", inputRegist.bpjs_photo);
    formdata.append("self_photo", inputRegist.self_photo);
    formdata.append("bypass_ekyc", "true");
    formdata.append("roles", "umum");

    console.log(uid);
    // console.log(fileOfBlob);

    let requestOptions = {
      method: "POST",
      credentials: "same-origin",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    try {
      await fetch(
        process.env.REACT_APP_BACKEND_HOST + "api/lengkapidiri/update",
        requestOptions
      )
        .then((res) => res.json())
        .then((res) => {
          let data = res.data;
          let sukses = res.success;

          if (data === null && sukses === false) {
            if (res.error === "user not found") {
              swal({
                title: "Gagal!",
                text: "User tidak ditemukan",
                icon: "warning",
              });
              // setLoad(false);
            } else {
              swal({
                title: "Gagal!",
                text: res.error,
                icon: "error",
              });
            }
          } else if (sukses === true) {
            if (res.data.selfie_value === "<nil>") {
              swal({
                title: "Gagal!",
                text: "Foto selfie tidak valid atau tidak sesuai dengan pemilik KTP",
                icon: "error",
              });
              // setLoad(false);
            } else if (res.data.selfie_value < "85.0") {
              swal({
                title: "Gagal!",
                text:
                  "Foto selfie tidak valid atau tidak sesuai dengan pemilik KTP. Tingkat kemiripan" +
                  res.data.selfie_value,
                icon: "error",
              });
            } else if (res.data.selfie_value >= "85.0") {
              swal({
                title: "Berhasil!",
                text: "Tingkat kemiripan " + res.data.selfie_value + "%",
                icon: "success",
              });
              // setLoad(false);
              // setShowModal(true);
              console.log(false);
            }
            console.log(res);
            // console.log(formdata);
            console.log(true);
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

  if (props.currentStep !== 5) {
    return null;
  }

  return (
    <>
      <p className="pt-10"></p>
      <FormGroup>
        <div className="relative flex-col break-words w-800-d mb-6 mx-auto shadow-lg rounded-lg bg-white border-0">
          <div className="rounded-t mt-8 px-6 py-6">
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
            <div className="text-center w-auto ml-12 mr-12 mt-4 mx-auto">
              {capturing ? (
                <>
                  <button
                    type="button"
                    className="bg-blue-500 text-white active:bg-sky-500 text-sm px-4 py-2 rounded-xl shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                    onClick={handleStopCaptureClick}
                  >
                    Selesai
                  </button>
                  <p className="text-sm">
                    Klik tombol "Selesai" untuk memproses
                  </p>
                </>
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
          </div>
          <hr className="mt-8 border-0 mb-8" />
        </div>
      </FormGroup>
    </>
  );
};

export default Step3;
