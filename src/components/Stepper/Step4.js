import React, { useContext, useState } from "react";
import { FormGroup } from "reactstrap";
import cookies from "js-cookie";
import { RegistContext } from "views/auth/RegistContext";
import "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import swal from "sweetalert";
import ModalDokumen from "components/Modals/ModalDokumen";

//swavideo
const Step4 = (props) => {
  const { inputRegist, setInputRegist, ppatFile, setLoading, loading } =
    useContext(RegistContext);

  // const [load, setLoad] = useState(false);

  const [capturing, setCapturing] = React.useState(false);

  const handleStopCaptureClick = React.useCallback(() => {
    // setCapturing(false);
    // sendVideo();
    cookies.set("statues", true);
    // swal({
    //   title: "Berhasil",
    //   text: "Rekam Wajah Berhasil",
    //   icon: "success",
    // });
    // setLoading(true);
    // setTimeout(function () {
    //   sendVideo();
    // }, 5000);
  }, []);

  var val = localStorage.getItem("dataPPAT");
  var object = JSON.parse(val);

  const handleStartCaptureClick = async () => {
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        const video = document.getElementById("input");
        window.stream = stream;
        video.srcObject = stream;
        video.play();

        let options = { mimeType: "video/webm; codecs=h264" };
        let mediaRecorder = new MediaRecorder(stream, options);
        mediaRecorder.ondataavailable = handleDataAvailable;
        mediaRecorder.start();

        function handleDataAvailable(event) {
          var transcodedMp4 = new Blob([event.data], { type: "video/webm" });
          let uid = object.uid;
          var fileOfBlob = new File([transcodedMp4], "video_" + uid + ".webm");

          setInputRegist({ ...inputRegist, self_video: transcodedMp4 });

          downloadData(transcodedMp4, "rekamwajah_" + object.nama + ".mp4");
          setLoading(true);
          // console.log(event)
          setInputRegist({ ...inputRegist, self_video: fileOfBlob });
          setTimeout(() => {
            ppatFile("self_video", transcodedMp4);
            // console.log(fileOfBlob);
          }, 2000);
        }

        setTimeout(function () {
          mediaRecorder.stop();
        }, 15000);
      })
      .catch(function (err) {
        console.log("Ada kesalahan! " + err);
      });
  };

  var downloadData = (function () {
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
      // cookies.set(self_video, a.download);
      // setInputRegist({ ...inputRegist, [self_video]: a.download });
    };
  })();

  /** tensorflow v2 **/

  const NUM_KEYPOINTS = 468;
  const NUM_IRIS_KEYPOINTS = 5;
  // const TRIANGULATE_MESH = false;

  const go = async () => {
    setLoading(true);
    // setCapturing(true);
    console.clear();

    let model = null;
    let availableVideoDevices = null;
    let selectedVideoDevice = null;

    // eslint-disable-next-line no-unused-vars
    let animationFrame = null;

    const ctx = document.querySelector(".output").getContext("2d");
    // const ddm = document.querySelector("select");
    const colors = ["red", "blue", "green"];

    const triggerPermissionsPrompt = async () => {
      try {
        let stream = await navigator.mediaDevices.getUserMedia({ video: true });
        stream(null);
      } catch (e) {
        swal({
          title: "Perhatian!",
          text: "Anda harus mengizinkan akses kamera agar dapat berfungsi",
          icon: "warning",
        });
      }
    };

    const getVideoDevices = async () => {
      await triggerPermissionsPrompt();

      const availableDevices = await navigator.mediaDevices.enumerateDevices();
      // setLoading(false);
      // handleStartCaptureClick();
      return availableDevices.filter((device) => device.kind === "videoinput");
    };

    const setSelectecedVideoDevice = (availableVideoDevices, deviceId) => {
      if (!availableVideoDevices.length) {
        swal({
          title: "Perhatian!",
          text: "Kamera tidak terdeteksi",
          icon: "warning",
        });
      }

      // No deviceId given: fall back to the first one
      if (!deviceId) {
        return availableVideoDevices[0];
      }

      const filteredVideoDevices = availableVideoDevices.filter(
        (availableVideoDevice) => availableVideoDevice.deviceId === deviceId
      );

      // Wrong deviceId given: fall back to the first one
      if (!filteredVideoDevices.length) {
        return availableVideoDevices[0];
      }

      return filteredVideoDevices[0];
    };

    const drawBoundingBox = (ctx, box, color) => {
      ctx.lineWidth = 2;
      ctx.strokeStyle = color;
      ctx.strokeRect(
        box.topLeft[0],
        box.topLeft[1],
        box.bottomRight[0] - box.topLeft[0],
        box.bottomRight[1] - box.topLeft[1]
      );
    };

    const distance = (a, b) => {
      return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));
    };

    const drawMesh = (ctx, keypoints, color) => {
      ctx.fillStyle = color;

      for (let i = 0; i < NUM_KEYPOINTS; i++) {
        const x = keypoints[i][0];
        const y = keypoints[i][1];

        ctx.beginPath();
        ctx.arc(x, y, 1 /* radius */, 0, 2 * Math.PI);
        ctx.fill();
      }

      if (keypoints.length > NUM_KEYPOINTS) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;

        const leftCenter = keypoints[NUM_KEYPOINTS];
        const leftDiameterY = distance(
          keypoints[NUM_KEYPOINTS + 4],
          keypoints[NUM_KEYPOINTS + 2]
        );
        const leftDiameterX = distance(
          keypoints[NUM_KEYPOINTS + 3],
          keypoints[NUM_KEYPOINTS + 1]
        );

        ctx.beginPath();
        ctx.ellipse(
          leftCenter[0],
          leftCenter[1],
          leftDiameterX / 2,
          leftDiameterY / 2,
          0,
          0,
          2 * Math.PI
        );
        ctx.stroke();

        if (keypoints.length > NUM_KEYPOINTS + NUM_IRIS_KEYPOINTS) {
          const rightCenter = keypoints[NUM_KEYPOINTS + NUM_IRIS_KEYPOINTS];
          const rightDiameterY = distance(
            keypoints[NUM_KEYPOINTS + NUM_IRIS_KEYPOINTS + 2],
            keypoints[NUM_KEYPOINTS + NUM_IRIS_KEYPOINTS + 4]
          );
          const rightDiameterX = distance(
            keypoints[NUM_KEYPOINTS + NUM_IRIS_KEYPOINTS + 3],
            keypoints[NUM_KEYPOINTS + NUM_IRIS_KEYPOINTS + 1]
          );

          ctx.beginPath();
          ctx.ellipse(
            rightCenter[0],
            rightCenter[1],
            rightDiameterX / 2,
            rightDiameterY / 2,
            0,
            0,
            2 * Math.PI
          );
          ctx.stroke();
        }
      }
    };

    const fetchAndConnectCameraStream = async (
      selectedVideoDevice,
      videoEL
    ) => {
      // Get Stream
      const userMediaStream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          deviceId: {
            exact: selectedVideoDevice.deviceId,
          },
        },
      });

      // Connect it
      try {
        videoEL.srcObject = userMediaStream;
      } catch (error) {
        videoEL.src = URL.createObjectURL(userMediaStream);
      }
    };

    // MAIN CODE
    try {
      availableVideoDevices = await getVideoDevices();
      // updateVideoDevicesInUI(availableVideoDevices, ddm);
      selectedVideoDevice = setSelectecedVideoDevice(
        availableVideoDevices,
        null
      );
      setLoading(false);
      handleStartCaptureClick();
      setCapturing(true);
    } catch (e) {
      console.error(e);
      return;
    }

    // Set up Video Element
    let videoEL = document.querySelector("video");
    if (!videoEL) {
      // let videoEl = document.getElementsByTagName("video");
      document.body.appendChild(videoEL);
    }
    videoEL.setAttribute("autoplay", "1");
    videoEL.setAttribute("width", ctx.canvas.width);
    videoEL.setAttribute("height", ctx.canvas.height);

    // Load Face Detection Model
    model = await faceLandmarksDetection.load(
      faceLandmarksDetection.SupportedPackages.mediapipeFacemesh
    );

    // Fetch and Connect Camera Stream
    await fetchAndConnectCameraStream(selectedVideoDevice, videoEL);

    // Run Logic
    const detectAndPaint = async () => {
      // Detect faces
      const predictions = await model.estimateFaces({
        input: videoEL,
      });

      // Clear Canvas
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      // Draw Video onto Canvas
      ctx.drawImage(videoEL, 0, 0);

      // Draw Faces onto canvas
      if (predictions.length > 0) {
        for (let i = 0; i < predictions.length; i++) {
          drawBoundingBox(
            ctx,
            predictions[i].boundingBox,
            colors[i] ?? "hotpink"
          );
          drawMesh(ctx, predictions[i].scaledMesh, colors[i] ?? "hotpink");
        }
      }

      animationFrame = requestAnimationFrame(detectAndPaint);
    };

    videoEL.addEventListener("loadeddata", () => {
      console.log("loaded data");
      animationFrame = requestAnimationFrame(detectAndPaint);
    });
  };
  /** sampe sini tensorflow**/

  if (props.currentStep !== 6) {
    return null;
  }

  return (
    <>
      <p className="pt-10"></p>
      {loading ? <ModalDokumen /> : null}
      <FormGroup>
        <div className="relative flex-col break-words w-800-d mb-6 mx-auto shadow-lg rounded-lg bg-white border-0">
          <div className="rounded-t mt-8 px-6 py-6">
            <div className="text-center mb-2">
              <h1 className="text-blue text-xl font-bold">Rekam Wajah</h1>
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
            <span className="flex h-face-d w-customs-d mx-auto border-2 border-blue-400 border-dashed rounded">
              <ul id="gallery" className="flex flex-1 flex-wrap mt-px">
                <li
                  id="empty"
                  className="h-full w-full text-center flex flex-col justify-center items-center"
                ></li>
              </ul>
              <div className="canvases">
                <div>
                  <video id="input" width="473" height="355"></video>
                </div>
                <div>
                  <canvas className="output" width="473" height="355"></canvas>
                </div>
              </div>
            </span>
            <div className="text-center w-auto ml-12 mr-12 mx-auto">
              {capturing ? (
                <>
                  <button
                    type="button"
                    className="bg-blue text-white active:bg-sky text-sm px-4 py-2 rounded-xl shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
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
                  className="bg-blue text-white active:bg-sky text-sm px-4 py-2 rounded-xl shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  onClick={go}
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
