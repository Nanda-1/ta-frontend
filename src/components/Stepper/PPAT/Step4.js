import React, { useContext, useState, useRef } from "react";
import { FormGroup } from "reactstrap";
import { RegistContext } from "views/auth/RegistContext";
import "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import Webcam from "react-webcam";
import ModalDokumen from "components/Modals/ModalDokumen";

//swavideo
const Step4 = (props) => {
  const [newName, setnewName] = useState("");
  const names = [
    "Kedipkan Mata Anda",
    "Buka Mulut Anda",
    "Tengok ke kanan",
    "Tengok ke kiri",
  ];
  const webcamRef = useRef(null);

  const { inputRegist, setInputRegist, verifVideo, setLoading, loading } =
    useContext(RegistContext);

  const [defaults, setDefaults] = React.useState(true);
  const [capturing, setCapturing] = React.useState(false);
  // const [done, setDone] = React.useState(false);

  // const handleStopCaptureClick = React.useCallback(() => {
  //   cookies.set("statues", true);
  // }, []);

  var val = localStorage.getItem("dataPPAT");
  var object = JSON.parse(val);
  var val1 = localStorage.getItem("user-info");
  var object1 = JSON.parse(val1);

  const handleStartCaptureClick = async () => {
    setCapturing(true);
    setDefaults(false)
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
        textcounter();
        function handleDataAvailable(event) {
          var transcodedMp4 = new Blob([event.data], { type: "video/webm" });
          var fileOfBlob = new File(
            [transcodedMp4],
            "video_" + object1.user_id + ".webm"
          );

          downloadData(
            transcodedMp4,
            "rekamwajah_" + object1.user_id + ".webm"
          );

          setInputRegist({ ...inputRegist, self_video: fileOfBlob });

          setLoading(true);

          setTimeout(() => {
            verifVideo("self_video", fileOfBlob);
          }, 7000);

          // setDone(true);
          setCapturing(false);
          setDefaults(true)
        }

        setTimeout(function () {
          mediaRecorder.stop();
        }, 7000);
      })
      .catch(function (err) {
        console.log("Ada kesalahan!!! " + err);
      });
  };

  var textcounter = function () {
    const timeoutIds = [];

    names.forEach((text, i) => {
      const timeoutId = setTimeout(() => {
        // const index = currentIndex + 1;
        // setCurrentIndex(index);
        // setCurrentIndex((prev) => [...prev, updatedData]);
        const index = Math.floor(Math.random() * names.length);
        setnewName(names[index]);
      }, 2000 * i);

      timeoutIds.push(timeoutId);
    });

    return () => {
      timeoutIds.forEach((id) => clearTimeout(id));
    };
  };

  const downloadData = (function () {
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
  })();

  const videoConstraints = {
    width: 1500,
    height: 720,
    facingMode: "user",
  };

  if (props.currentStep !== 7) {
    return null;
  }

  return (
    <>
      {loading ? <ModalDokumen /> : null}
      <FormGroup>
        <div className="relative flex-col break-words w-900-d mx-auto shadow-lg rounded-lg mt-12 bg-white border-0">
          <div className="rounded-t px-6 py-10">
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
            <span className="flex pt-2 h-face-d w-customs-d mx-auto border-2 border-blue-400 border-dashed rounded">
              {/* <ul id="gallery" className="flex flex-1 flex-wrap mt-px">
                <li
                  id="empty"
                  className="h-full w-full text-center flex flex-col justify-center items-center"
                ></li>
              </ul> */}
              <div className="canvases">
                <Webcam
                  ref={webcamRef}
                  screenshotFormat="image/jpg"
                  videoConstraints={videoConstraints}
                  // width={1280}
                  name="Webcam"
                  id="Webcam"
                  className="mb-2 ml-0-d"
                />
              </div>
            </span>
            {/* <div className="text-center w-customs-d mt-4 mx-auto justify-content-between">
              <button
                type="button"
                className="bg-blue-500 text-white active:bg-sky-500 text-sm px-4 py-2 rounded-xl shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                onClick={capturing ? <p>{newName}</p> : handleStartCaptureClick}
              >
                Rekam Wajah Anda
              </button>
            </div> */}
            <div className="text-center w-customs-d mt-4 mb-12-d mx-auto">
              {/* {done && (
                <div>
                  <p>Selesai</p>
                </div>
              )} */}
              {capturing && (
                <div>
                  <p>{newName}</p>
                </div>
              )}
              {defaults && (
              <button
                type="button"
                className="bg-blue text-white active:bg-sky text-sm px-4 py-2 rounded-xl shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                onClick={handleStartCaptureClick}
              >
                Aktifkan kamera dan Rekam Wajah Anda
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

export default Step4;
