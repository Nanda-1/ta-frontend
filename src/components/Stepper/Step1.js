import React, { useState, useContext } from "react";
import { RegistContext } from "views/auth/RegistContext";
import cookies from "js-cookie";

//react-pdf
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import { FormGroup } from "reactstrap";
// import Cookies from "js-cookie";

const Step1 = (props) => {
  const { inputRegist, setInputRegist } = useContext(RegistContext);

  //Preview PDF
  const [show, setShow] = useState(true);
  const [file, setFile] = useState("");
  const [numPages, setNumPages] = useState(null);

  function onFileChange(event) {
    if (event.target.files.length) {
      setFile(event.currentTarget.files[0]);
      let name = event.currentTarget.name;
      let isian = event.currentTarget.files[0].name;
      let getuid = "uid";
      let uid = cookies.get("uid");
      let getRole = "roles";
      let role = cookies.get("roles");
      // console.log(isian);
      setInputRegist({
        ...inputRegist,
        [name]: isian,
        [getuid]: uid,
        [getRole]: role,
      });
      cookies.set(name, isian);
      setShow(false);
    }
  }

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

  if (props.currentStep !== 1) {
    return null;
  }

  return (
    <>
      <p className="pt-10"></p>
      <FormGroup>
        <div className="relative flex-col break-words w-800-d mx-auto shadow-lg rounded-lg bg-white border-0">
          <div className="rounded-t mb-0 px-6 py-6">
            <div className="text-center mb-2">
              <h1 className="text-blue-500 text-xl font-bold">
                Unggah <br />
                SK Pengangkatan PPAT
              </h1>
            </div>
            <div className="text-coolGray-900 text-center">
              <small>
                Dokumen ini diperlukan untuk memverifikasi identitas Anda.
                <br />
                Gunakan <b> SK Pengangkatan PPAT asli</b>
              </small>
            </div>
          </div>
          <div className="space-y-4">
            <span className="flex h-full w-auto ml-12 mr-12 mx-auto border-2 border-blue-400 pt-2 border-dashed rounded px-4">
              <ul id="gallery" className="flex flex-1 flex-wrap mt-px">
                <li
                  id="empty"
                  className="h-full w-full text-center flex flex-col justify-center items-center"
                >
                  <div className="mx-auto my-auto h-auto w-auto">
                    <label htmlFor="upload-button" className="w-auto">
                      {show ? (
                        <div>
                          <>
                            <img
                              className="mx-auto my-4 align-middle h-36 w-36 bg-fix"
                              src={
                                require("assets/img/skppat_icon.png").default
                              }
                              alt="no data"
                            />
                            <p className="text-center text-xs pt-1">
                              Klik untuk upload scan SK Pengangkatan PPAT Asli
                              di file.
                            </p>
                          </>
                        </div>
                      ) : (
                        <>
                          <div className="py-4 my-auto pb-0">
                            <div className="Example__container">
                              <div className="Example__container__document overflow-y-auto-d h-pdf">
                                <Document
                                  className="react-pdf__Page__canvas"
                                  file={file}
                                  onLoadSuccess={onDocumentLoadSuccess}
                                >
                                  {Array.from(
                                    new Array(numPages),
                                    (el, index) => (
                                      <Page
                                        key={`page_${index + 1}`}
                                        pageNumber={index + 1}
                                      />
                                    )
                                  )}
                                </Document>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </label>
                    <input
                      type="file"
                      id="upload-button"
                      name="sk_pengangkatan"
                      style={{ display: "none" }}
                      onChange={onFileChange}
                      // value={inputRegist.sk_pengangkatan}
                      required
                    />
                    <br />
                    <button hidden>Upload</button>
                  </div>
                </li>
              </ul>
            </span>
          </div>
          <div className="text-coolGray-900 pl-12 pt-2 text-left w-auto">
            <small>
              Perhatian: <br />
              1. File SK Pengangkatan PPAT harus terbaca jelas <br />
              2. File adalah dokumen asli, bukan dokumen fotokopi <br />
              3. File yang terdaftar adalah data yang masih berlaku <br />
              4. File yang di unggah harus berformat .pdf
            </small>
          </div>
          <hr className="mt-6 border-0 mb-4" />
        </div>

        {/* <div className="rounded-t mb-12 px-6 py-6">
          <button onClick={startDraw}>Pencil</button>
          <button onClick={startErase}>Eraser</button>
          <button onClick={clearCanvas}>Clean</button>
          <button onClick={saveCanvas}>Save</button>
          <button onClick={loadCanvas}>Load</button>
          <canvas
            id="a"
            name="a"
            width="50"
            height="50"
            className="border-2"
          ></canvas>
        </div> */}

        {/* <div className="relative flex flex-wrap my-6 w-auto">
          <div className="w-1/2">
            <Link to="/syarat">
              <button className="get-started text-black px-6 py-3 rounded-lg outline-none focus:outline-none mr-1 mb-1 bg-white active:bg-blue-500 text-sm shadow hover:shadow-lg ease-linear transition-all duration-150">
                Kembali
              </button>
            </Link>
          </div>
          <div className="w-1/2 text-right">
            {file === "" ? (
              // <Link to="/syarat2">
              <button
                disabled
                className="get-started opacity-50 text-white font-bold px-6 py-3 rounded-lg outline-none focus:outline-none mr-1 mb-1 bg-blue-500 active:bg-blue-500 text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
              >
                Lanjutkan
              </button>
            ) : (
              // </Link>
              // <Link to="/syarat1">
              <button
                // type="submit"
                className="get-started text-white font-bold px-6 py-3 rounded-lg outline-none focus:outline-none mr-1 mb-1 bg-blue-500 active:bg-blue-500 text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
              >
                Simpan
              </button>
              // </Link>
            )}
          </div>
        </div> */}
      </FormGroup>
    </>
  );
};

export default Step1;
