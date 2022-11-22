import { useState } from "react";
import { Link } from "react-router-dom";
import cookies from "js-cookie";
// import preprocessImage from "./preprocess";
// import Tesseract from "tesseract.js";
// import { RegistContext } from "./RegistContext";

export default function Syarat1() {
  //Get KTP
  const [ktp, setKTP] = useState({ previewKTP: "", rawKTP: "" });
  const [getk, getKTP] = useState("");

  const uploadKTPPreview = (e) => {
    // let nameKTP = e.currentTarget.files[0].name;
    if (e.currentTarget.files.length) {
      getKTP(e.currentTarget.files[0].name);
      setKTP({
        previewKTP: URL.createObjectURL(e.currentTarget.files[0]),
        rawKTP: e.currentTarget.files[0],
      });
    }
    cookies.set("ktp", getk);
    console.log(getk);
  };

  //Get NPWP
  const [npwp, setNPWP] = useState({ previewNPWP: "", rawNPWP: "" });
  const [getn, getNPWP] = useState("");

  const uploadNPWPPreview = (e) => {
    if (e.currentTarget.files.length) {
      getNPWP(e.currentTarget.files[0].name);
      setNPWP({
        previewNPWP: URL.createObjectURL(e.currentTarget.files[0]),
        rawNPWP: e.currentTarget.files[0],
      });
    }
    cookies.set("npwp", getn);
    console.log(getn);
  };

  // const handleUploadNPWP = async (e) => {
  //   e.preventDefault();
  //   const formDataNPWP = new FormData();
  //   formDataNPWP.append("image", npwp.raw);

  //   await fetch("syarat1/YOUR_URL", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //     body: formDataNPWP,
  //   });
  // };

  // const simpanLocal = (masukin) => {
  //   let isian = masukin.target.files.length;
  //   let formIsian = masukin.target.name;
  //   setInputRegist({ ...inputRegist, [formIsian]: isian });
  // };

  // console.log(regist);

  /** Get OCR **/
  // const [image, setImage] = useState({ preview: "", raw: "" });
  // const [text, setText] = useState("");
  // const canvasRef = useRef(null);
  // const imageRef = useRef(null);

  // const handleChange = (event) => {
  //   // setImage(URL.createObjectURL(event.target.files[0]));
  //   if (event.target.files.length) {
  //     setImage({
  //       preview: URL.createObjectURL(event.target.files[0]),
  //       raw: event.target.files[0],
  //     });
  //   }
  // };

  // const handleClick = () => {
  //   const canvas = canvasRef.current;
  //   canvas.width = imageRef.current.width;
  //   canvas.height = imageRef.current.height;
  //   const ctx = canvas.getContext("2d");

  //   ctx.drawImage(imageRef.current, 0, 0);
  //   ctx.putImageData(preprocessImage(canvas), 0, 0);
  //   const dataUrl = canvas.toDataURL("image/jpeg");

  //   Tesseract.recognize(dataUrl, "eng", {
  //     logger: (m) => console.log(m),
  //   })
  //     .catch((err) => {
  //       console.error(err);
  //     })
  //     .then((result) => {
  //       let text = result.text;
  //       setText(text);
  //     });
  // };

  return (
    <>
      <div className="container mx-auto px-2 h-auto">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full md:w-6/12 px-4">
            <div className="relative flex-col break-words w-960 mb-6 mx-auto shadow-lg rounded-lg bg-white border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-2">
                  <h1 className="text-sky-600 text-xl font-bold">
                    Unggah KTP Anda
                  </h1>
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
                <span className="flex h-72 w-auto ml-12 mr-12 mx-auto border-2 border-blue-400 pt-2 border-dashed rounded">
                  <ul id="gallery" className="flex flex-1 flex-wrap mt-px">
                    <li
                      id="empty"
                      className="h-full w-full text-center flex flex-col items-center justify-center items-center"
                    >
                      <div className="mx-auto my-auto h-44 w-80">
                        <label htmlFor="upload-button" required>
                          {ktp.previewKTP ? (
                            <img
                              src={ktp.previewKTP}
                              alt="dummy1"
                              className="mx-auto my-auto h-44 w-80"
                              name="ktp"
                            />
                          ) : (
                            <>
                              <img
                                className="flex mx-auto align-middle h-36 w-auto pt-2"
                                src={require("assets/img/ktp.png").default}
                                alt="no data"
                              />
                              <p className="text-center text-sm pt-2">
                                Klik disini untuk upload foto KTP Asli di file.
                              </p>
                            </>
                          )}
                        </label>
                        <input
                          type="file"
                          id="upload-button"
                          style={{ display: "none" }}
                          onChange={uploadKTPPreview}
                        />
                        <br />
                        {/* <button onClick={handleUploadKTP} hidden>
                          Upload
                        </button> */}
                      </div>
                    </li>
                  </ul>
                </span>
              </div>
              <div className="text-coolGray-900 mx-auto pl-10 pt-2 text-left">
                <small>
                  Perhatian: <br />
                  1. Gambar identitas & pas foto harus terbaca jelas <br />
                  2. Foto identitas adalah dokumen asli, bukan dokumen fotokopi.{" "}
                  <br />
                  3. Identitas yang terdaftar adalah data yang masih berlaku
                </small>
              </div>
              <div className="rounded-t mt-8 px-6 py-6">
                <div className="text-center mb-2">
                  <h1 className="text-sky-600 text-xl font-bold">
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
                <span className="flex h-72 w-auto ml-12 mr-12 mx-auto border-2 border-blue-400 pt-2 border-dashed rounded">
                  <ul id="gallery" className="flex flex-1 flex-wrap mt-px">
                    <li
                      id="empty"
                      className="h-full w-full text-center flex flex-col items-center justify-center items-center"
                    >
                      <div className="mx-auto my-auto h-44 w-80">
                        <label htmlFor="upload-button2" required>
                          {npwp.previewNPWP ? (
                            <>
                              <img
                                src={npwp.previewNPWP}
                                alt="dummy2"
                                className="mx-auto my-auto h-44 w-80"
                                name="npwp"
                              />
                              {/* <div className="pin-box">
                                <canvas
                                  ref={canvasRef}
                                  width={400}
                                  height={100}
                                ></canvas>
                                <p> {text} </p>
                              </div> */}
                            </>
                          ) : (
                            <>
                              <img
                                className="flex mx-auto align-middle items-center h-36 w-auto pt-2"
                                src={require("assets/img/npwp.png").default}
                                alt="no data"
                              />
                              <p className="text-center text-sm pt-2">
                                Klik disini untuk upload foto NPWP Asli di file.
                              </p>
                            </>
                          )}
                        </label>
                        <input
                          type="file"
                          id="upload-button2"
                          style={{ display: "none" }}
                          onChange={uploadNPWPPreview}
                        />
                        <br />
                        {/* <button onClick={handleUploadNPWP} hidden>
                          Upload
                        </button> */}
                      </div>
                    </li>
                  </ul>
                </span>
              </div>
              <div className="text-coolGray-900  mx-auto pl-10 pt-2 text-left">
                <small>
                  Perhatian: <br />
                  1. Gambar identitas & pas foto harus terbaca jelas <br />
                  2. Foto identitas adalah dokumen asli, bukan dokumen fotokopi.{" "}
                  <br />
                  3. Identitas yang terdaftar adalah data yang masih berlaku
                </small>
              </div>
              <hr className="mt-6 border-0 mb-4" />
              {/* <div className="space-y-4">
                <span className="flex h-72 w-800 mx-auto border-2 border-blue-400 pt-2 border-dashed rounded">
                  <ul id="gallery" className="flex flex-1 flex-wrap mt-px">
                    <li
                      id="empty"
                      className="h-full w-full text-center flex flex-col items-center justify-center items-center"
                    >
                      <div className="mx-auto my-auto h-72 w-800">
                        <label htmlFor="upload-button3">
                          {image.preview ? (
                            <>
                              <img
                                className="mx-auto my-auto h-44 w-96"
                                alt="dummy3"
                                src={image.preview}
                                ref={imageRef}
                              />
                              <canvas
                                ref={canvasRef}
                                className="relative mx-auto my-auto text-xs h-44 w-96 object-fill"
                                width={1000}
                                height={700}
                                hidden="true"
                              ></canvas>
                              <div className="text-xs h-44 w-80">
                                <p> {text} </p>
                              </div>
                            </>
                          ) : (
                            <>
                              <img
                                className="mx-auto align-middle h-36 w-72 bg-fix"
                                src={require("assets/img/npwp.png").default}
                                alt="no data"
                              />
                              <p className="text-center text-sm pt-2">
                                Klik disini untuk upload foto NPWP Asli di file.
                              </p>
                            </>
                          )}
                        </label>
                        <input
                          type="file"
                          id="upload-button3"
                          style={{ display: "none" }}
                          onChange={handleChange}
                        />
                        <br />
                        <button onClick={handleClick}>Convert to text</button>
                      </div>
                    </li>
                  </ul>
                </span>
              </div> */}
            </div>

            <div className="relative flex flex-wrap my-6 w-auto">
              <div className="w-1/2">
                <Link to="/syaratPPAT">
                  <button className="get-started text-black px-6 py-3 rounded-lg outline-none focus:outline-none mr-1 mb-1 bg-white active:bg-blue-500 text-sm shadow hover:shadow-lg ease-linear transition-all duration-150">
                    Kembali
                  </button>
                </Link>
              </div>
              <div className="w-1/2 text-right">
                {getk === "" || getn === "" ? (
                  <Link to="/syarat2">
                    <button
                      disabled
                      className="get-started opacity-50 text-white font-bold px-6 py-3 rounded-lg outline-none focus:outline-none mr-1 mb-1 bg-blue-500 active:bg-blue-500 text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                    >
                      Lanjutkan
                    </button>
                  </Link>
                ) : (
                  <Link to="/syarat2">
                    <button className="get-started text-white font-bold px-6 py-3 rounded-lg outline-none focus:outline-none mr-1 mb-1 bg-blue-500 active:bg-blue-500 text-sm shadow hover:shadow-lg ease-linear transition-all duration-150">
                      Lanjutkan
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
