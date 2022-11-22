import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Syarat3() {
  // eslint-disable-next-line no-undef
  const videoRef = useRef(null);

  useEffect(() => {
    const getUserMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        videoRef.current.srcObject = stream;
      } catch (err) {
        console.log(err);
      }
    };
    getUserMedia();
  }, []);

  const constraints = {
    facingMode: "environment",
    video: { width: { exact: 400 } },
    advanced: [{ focusMode: "continuous" }],
  };
  var videoTag = document.getElementById("video-tag");
  var imageTag = document.getElementById("image-tag");

  var imageCapturer;

  function start() {
    navigator.mediaDevices
      .getUserMedia({ video: constraints })
      .then(gotMedia)
      .catch((e) => {
        console.error("getUserMedia() failed: ", e);
      });
  }

  function gotMedia(mediastream) {
    videoTag.srcObject = mediastream;
    document.getElementById("start").disabled = true;
    var videoTrack = mediastream.getVideoTracks()[0];
    imageCapturer = new imageCapturer(videoTrack);
  }

  function takePhoto() {
    imageCapturer
      .takePhoto()
      .then((blob) => {
        console.log("Photo taken: " + blob.type + ", " + blob.size + "B");

        imageTag.src = URL.createObjectURL(blob);
      })
      .catch((err) => {
        console.error("takePhoto() failed: ", err);
      });
  }

  return (
    <>
      <div className="container mx-auto px-2 h-auto">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full md:w-6/12 px-4">
            <div className="relative flex-col break-words w-960 mb-6 mx-auto shadow-lg rounded-lg bg-white border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-2">
                  <h1 className="text-sky-600 text-xl font-bold">
                    Rekam Wajah
                  </h1>
                </div>
                <div className="text-coolGray-900 text-center">
                  <small>
                    Rekam wajah dilakukan untuk verifikasi data biometric <br />{" "}
                    dengan proses analisa dan perbandingan data referensi.{" "}
                    <br /> Mohon untuk tidak menggunakan aksesoris di wajah,
                    misal Kacamata/Masker.
                  </small>
                </div>
              </div>
              {/* px-4 md:px-10 py-10 pt-0 */}
              <div className="space-y-4">
                <span className="flex h-72 w-auto ml-12 mr-12 mx-auto border-2 border-blue-400 pt-2 border-dashed rounded">
                  <ul id="gallery" className="flex flex-1 flex-wrap mt-px">
                    <li
                      id="empty"
                      className="h-full w-full text-center flex flex-col items-center justify-center items-center"
                    >
                      <img
                        className="align-middle h-36 w-36"
                        src={require("assets/img/swa.png").default}
                        alt="no data"
                      />
                      <span className="text-small text-gray-500">
                        <small>Aktifkan kamera Anda dan Foto.</small>
                      </span>
                    </li>
                  </ul>
                </span>
              </div>
              <div className="text-center mt-6 w-auto ml-12 mr-12 mx-auto">
                <Link to="/syarat4">
                  <button className="bg-blue-500 text-white active:bg-sky-500 text-sm font-bold px-6 py-2 rounded-xl shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150">
                    Aktifkan Kamera Anda
                  </button>
                </Link>
                <p>
                  <button id="start" onClick={start}>
                    start camera!
                  </button>
                </p>

                <div>
                  <div style={{ float: "left", marginRight: "5px" }}>
                    <p>
                      <video
                        id="video-tag"
                        width="400"
                        height="400"
                        autoplay="true"
                        ref={videoRef}
                      />
                    </p>
                  </div>
                  <div style={{ float: "left" }}>
                    <p>
                      <img id="image-tag" width="400" alt="no data" />{" "}
                      {/* </img> */}
                    </p>
                  </div>
                </div>

                <div style={{ width: "240px" }}>
                  <p>
                    <button onclick={takePhoto}>take photo</button>
                  </p>
                </div>
              </div>
              <hr className="mt-8 border-0 mb-8" />
            </div>

            {/* <div className="relative flex flex-wrap my-6 w-auto">
              <div className="w-1/2">
                <Link to="/syarat2">
                  <button className="get-started text-black px-6 py-3 rounded-xl outline-none focus:outline-none mr-1 mb-1 bg-white active:bg-blue-500 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150">
                    Kembali
                  </button>
                </Link>
              </div>
              <div className="w-1/2 text-right">
                <Link to="/syarat4">
                  <button className="get-started text-white font-bold px-6 py-3 rounded-xl outline-none focus:outline-none mr-1 mb-1 bg-blue-500 active:bg-blue-500 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150">
                    Lanjutkan
                  </button>
                </Link>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
