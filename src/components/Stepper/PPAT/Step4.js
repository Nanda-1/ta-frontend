import React, { useContext, useState, useRef } from "react";
import { FormGroup } from "reactstrap";
import cookies from "js-cookie";
import { RegistContext } from "views/auth/RegistContext";
import "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import swal from "sweetalert";
import Webcam from "react-webcam";
import ModalDokumen from "components/Modals/ModalDokumen";

//swavideo
const Step4 = (props) => {
  const { inputRegist, setInputRegist, refreshToken } =
    useContext(RegistContext);

  const [load, setLoad] = useState(false);

  const [capturing, setCapturing] = React.useState(false);

  const webcamRef = useRef(null);

  const videoConstraints = {
    width: 1500,
    height: 720,
    facingMode: "user",
  };

  const handleStopCaptureClick = React.useCallback(() => {
    cookies.set("statues", true);
  }, []);

  const handleStartCaptureClick = async () => {
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        // const video = document.getElementById("input");
        const video = document.getElementById("Webcam");
        // const video = document.querySelector("video");
        window.stream = stream;
        video.srcObject = stream;
        video.play();

        let options = { mimeType: "video/webm; codecs=h264" };
        let mediaRecorder = new MediaRecorder(stream, options);
        mediaRecorder.ondataavailable = handleDataAvailable;
        mediaRecorder.start();

        function handleDataAvailable(event) {
          console.log("original: ", event.data);
          // downloadData(event.data, "video.original.webm");
          let self_video = "self_video";
          var transcodedMp4 = new Blob([event.data], { type: "video/webm" });
          let uid = cookies.get("uid");
          var fileOfBlob = new File([transcodedMp4], "video_" + uid + ".webm");

          setInputRegist({ ...inputRegist, [self_video]: fileOfBlob });

          downloadData(
            transcodedMp4,
            "rekamwajah_" +
              cookies.get("uid") +
              "_" +
              cookies.get("nama") +
              ".webm"
          );
          setLoad(true);
          setTimeout(() => {
            sendVideo(fileOfBlob);
            // console.log(fileOfBlob);
          }, 3000);
          setLoad(false);
          cookies.set(self_video, fileOfBlob);
        }

        setTimeout(function () {
          mediaRecorder.stop();
        }, 7000);
        setCapturing(true);
        setLoad(false);
      })
      .catch(function (err) {
        console.log("Ada kesalahan! " + err);
      });
  };

  const downloadData = () => {
    // let self_video = "self_video";
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function (blob, fileName) {
      var url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    };
  };

  const sendVideo = (fileOfBlob) => {
    setLoad(true);
    // event.preventDefault();
    let myHeaders = new Headers();
    myHeaders.append("Cookie", "REVEL_FLASH=");
    myHeaders.append("Authorization", "Bearer " + cookies.get("token"));
    
    let formdata = new FormData();
    formdata.append("uid", cookies.get("uid"));
    formdata.append("self_video", fileOfBlob);

    let requestOptions = {
      method: "POST",
      credentials: "same-origin",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };
    fetch(
      process.env.REACT_APP_BACKEND_HOST + "api/lengkapidiri/update",
      requestOptions
    )
      .then((res) => {
        if (res.status === 401) {
          refreshToken();
        } else {
          return res.json();
        }
      })
      .then((res) => {
        let sukses = res.success;
        setLoad(false);

        if (sukses === false) {
          if (res.error === "user not found") {
            swal({
              title: "Gagal!",
              text: "User tidak ditemukan",
              icon: "warning",
            });
          } else {
            swal({
              title: "Gagal!",
              text: res.error,
              icon: "error",
            });
          }
        } else {
          swal({
            title: "Lengkapi Diri Selesai",
            text: "Pengisian data diri Anda berhasil. Silahkan lanjutkan Submit untuk menunggu proses verifikasi Certificates of Authentication (CA)",
            icon: "success",
          })
        }
      })
      .catch((error) => {
        setLoad(false);
        console.log(error);
      });
  };

  if (props.currentStep !== 7) {
    return null;
  }

  return (
    <>
      {load === true ? <ModalDokumen /> : null}
      <FormGroup>
        <div className="relative flex-col break-words w-800-d mb-6 mx-auto shadow-lg mt-12 rounded-lg bg-white border-0">
          <div className="rounded-t mt-8 px-6 py-6">
            <div className="text-center mb-2">
              <h1 className="texts-green text-xl font-bold">Rekam Wajah</h1>
            </div>
            <div className="text-coolGray-900 text-center">
              <small>
                Rekam wajah dilakukan untuk verifikasi data biometric <br />{" "}
                dengan proses analisa dan perbandingan data referensi. <br />{" "}
                Mohon untuk tidak menggunakan aksesoris di wajah, misal
                Kacamata/Masker.
              </small>
            </div>
          </div>
          <div className="space-y-4">
            <span className="flex h-face-d w-customs-d mx-auto border-2 border-green-500 border-dashed rounded">
              <ul id="gallery" className="flex flex-1 flex-wrap mt-px">
                <li
                  id="empty"
                  className="h-full w-full text-center flex flex-col justify-center items-center"
                ></li>
              </ul>
              <div className="canvases">
                <Webcam
                  ref={webcamRef}
                  videoConstraints={videoConstraints}
                  name="Webcam"
                  id="Webcam"
                  className="mb-2 ml-0-d"
                />
              </div>
            </span>
            <div className="text-center w-auto ml-12 mr-12 mx-auto">
              <button
                type="button"
                className="bg-blue-500 text-white active:bg-sky-500 text-sm px-4 py-2 rounded-xl shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                onClick={
                  capturing ? handleStopCaptureClick : handleStartCaptureClick
                }
              >
                Rekam Wajah Anda
              </button>
            </div>
          </div>
          <hr className="mt-8 border-0 mb-8" />
        </div>
      </FormGroup>
    </>
  );
};

export default Step4;
