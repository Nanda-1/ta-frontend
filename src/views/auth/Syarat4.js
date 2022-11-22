import React, { useState } from "react";
import { Link } from "react-router-dom";
import { fabric } from "fabric";

export default function Syarat4() {
  const [showModal, setShowModal] = React.useState(false);

  const [image, setImage] = useState({ preview: "", raw: "" });

  const uploadPreview = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
    // setRegist({ ...inputRegist });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image.raw);

    await fetch("syarat1/YOUR_URL", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });
  };

  const canvas = new fabric.Canvas(document.getElementById("canvasId"));
  canvas.isDrawingMode = true;
  canvas.freeDrawingBrush.width = 5;
  canvas.freeDrawingBrush.color = "#00aeff";

  canvas.on("path:created", function (e) {
    e.path.set();
    canvas.renderAll();
    console.log(
      canvas.toDataURL("image/png").replace("img/png", "image/octet-string")
    );
  });
  return (
    <>
      <div className="container mx-auto px-2 h-auto">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full md:w-6/12 px-4">
            <div className="relative flex-col break-words w-960 mb-6 mx-auto shadow-lg rounded-lg bg-white border-0">
              <div className="rounded-t mt-8 px-6 py-6">
                <div className="text-center mb-2">
                  <h1 className="text-sky-600 text-xl font-bold">
                    Gambar Tanda Tangan
                  </h1>
                </div>
                <div className="text-coolGray-900 text-center text-xs">
                  Spesimen Tanda Tangan diperlukan <br />
                  untuk memverifikasi identitas Anda.
                </div>
              </div>
              <div className="space-y-4">
                <span className="flex w-auto ml-12 mx-auto mb-2">
                  <input
                    type="file"
                    id="upload-button"
                    onChange={uploadPreview}
                    className="text-sm text-sky-500"
                  />
                  <canvas id="canvasId"></canvas>
                </span>
                <span className="flex h-72 w-auto ml-12 mr-12 mx-auto border-2 border-blue-400 border-dashed rounded">
                  <ul id="gallery" className="flex flex-1 flex-wrap mt-px">
                    <li
                      id="empty"
                      className="h-full w-full text-center flex flex-col items-center justify-center items-center"
                    >
                      <div className="mx-auto my-auto h-36 w-72">
                        <label>
                          {image.preview ? (
                            <img
                              src={image.preview}
                              alt="dummy1"
                              className="mx-auto my-auto h-36 w-72"
                              name="ktp"
                              require
                            />
                          ) : (
                            <>
                              <img
                                className="mx-auto my-auto h-36 w-72 bg-fix"
                                src={require("assets/img/ttd.png").default}
                                alt="no data"
                              />
                            </>
                          )}
                        </label>
                        {/* <input
                          type="file"
                          id="upload-button"
                          style={{ display: "none" }}
                          onChange={uploadPreview}
                        /> */}
                        <br />
                        <button onClick={handleUpload} hidden>
                          Upload
                        </button>
                      </div>
                      {/* <div className="mx-auto my-auto h-36 w-72">
                        <canvas id="canvasId" width="400" height="400"></canvas>
                      </div> */}
                    </li>
                  </ul>
                </span>
                <p className="text-center text-xs pt-2">
                  Gambar tanda tangan Anda pada kotak diatas atau klik unggah
                  untuk upload tanda tangan
                </p>
              </div>
              <div className="text-center mt-6 w-auto ml-12 mr-12 mx-auto">
                <button
                  className="bg-blue-500 text-white active:bg-sky-500 text-sm font-bold px-6 py-2 rounded-xl shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(true)}
                >
                  Simpan
                </button>
                {showModal ? (
                  <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                      <div className="relative w-800-d my-6 mx-auto max-w-3xl">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                          {/*header*/}
                          <div className="flex items-start justify-center rounded-t">
                            <h3 className="text-2xl font-semibold text-sky-600 pt-7">
                              Menunggu Verifikasi
                            </h3>
                          </div>
                          <img
                            className="mx-auto my-4 align-middle h-24 w-24 bg-fix"
                            src={require("assets/img/wait.png").default}
                            alt="no data"
                          />
                          <p className="mb-8 text-blueGray-500 text-sm text-center">
                            Anda telah selesai melakukan registrasi.
                            <br />
                            Kami akan memproses verifikasi data Anda selama
                            60-120 menit. <br />
                            informasi akan dikirim melalui e-mail Anda.
                          </p>
                        </div>
                        <div className="relative flex flex-wrap my-6 w-auto mx-auto">
                          <div className="w-1/2">
                            {/* <Link to="/syarat2">
                              <button className="get-started text-black px-6 py-3 rounded-xl outline-none focus:outline-none mr-1 mb-1 bg-white active:bg-blue-500 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150">
                                Kembali
                              </button>
                            </Link> */}
                          </div>
                          <div className="w-1/2 text-right">
                            <Link to="/">
                              <button
                                onClick={() => setShowModal(false)}
                                className="get-started text-white font-bold px-6 py-3 rounded-xl outline-none focus:outline-none mr-1 mb-1 bg-blue-500 active:bg-blue-500 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                              >
                                Lanjutkan
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                  </>
                ) : null}
              </div>
              <hr className="mt-8 border-0 pt-2" />
            </div>

            {/* <div className="relative flex flex-wrap my-6 w-auto">
              <div className="w-1/2">
                <Link to="/syarat3">
                  <button className="get-started text-black px-6 py-3 rounded-xl outline-none focus:outline-none mr-1 mb-1 bg-white active:bg-blue-500 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150">
                    Kembali
                  </button>
                </Link>
              </div>
              <div className="w-1/2 text-right">
                <Link to="/">
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
