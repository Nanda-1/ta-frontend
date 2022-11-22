import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { RegistContext } from "views/auth/RegistContext";
import cookies from "js-cookie";
import swal from "sweetalert";

//react-pdf
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";

export default function SyaratPPAT() {
  const { inputRegist, setInputRegist } = useContext(RegistContext);
  // const regist = useContext(RegistContext);

  console.log(inputRegist);
  //Preview PDF
  const [show, setShow] = useState(true);
  const [file, setFile] = useState("");
  const [numPages, setNumPages] = useState(null);

  function onFileChange(event) {
    if (event.target.files.length) {
      setFile(event.currentTarget.files[0]);
      let name = event.currentTarget.name;
      let isian = event.currentTarget.files[0];

      setInputRegist({
        ...inputRegist,
        [name]: isian,
        // [getuid]: uid,
        // [getRole]: role,
      });
      cookies.set(name, isian);
      // regist.setSk_pengangkatan(isian);
      console.log(inputRegist);
      setShow(false);
      // Cookies.set(...inputRegist);
    }
  }

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

  const uploadSK = async () => {
    // event.preventDefault();
    let myHeaders = new Headers();
    myHeaders.append("Cookie", "REVEL_FLASH=");
    // myHeaders.append("Content-Type", "multipart/form-data");

    let formdata = new FormData();
    formdata.append("uid", cookies.get("uid"));
    formdata.append("sk_pengangkatan", inputRegist.sk_pengangkatan);

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    // try {
    // setLoad(true);

    fetch(
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
        } else if (sukses === true) {
          swal({
            title: "Berhasil!",
            text: "Pilih Tipe PPAT Berhasil",
            icon: "error",
          });
          console.log(res);
          // console.log(formdata);
          // console.log(true);
          // setLoad(false);
          // setShowModal(true);
        }
      })
      .catch((error) => {
        // setLoad(false);
        console.log("error", error);
      });
    // } catch (err) {
    //   // error handling code
    // }
  };

  return (
    <>
      <p className="pt-12"></p>
      <div className="container mx-auto px-2 h-auto">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full md:w-6/12">
            <div className="relative flex-col break-words w-960-d mb-6 mx-auto shadow-lg rounded-lg bg-white border-0">
              <div className="rounded-t mt-8 mb-0 px-6 py-6">
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
                      className="h-full w-full text-center flex flex-col items-center justify-center items-center"
                    >
                      <div className="mx-auto my-auto h-auto w-auto">
                        <label htmlFor="upload-button" className="w-auto">
                          {show ? (
                            <div>
                              <>
                                <img
                                  className="mx-auto my-4 align-middle h-36 w-36 bg-fix"
                                  src={
                                    require("assets/img/skppat_icon.png")
                                      .default
                                  }
                                  alt="no data"
                                />
                                <p className="text-center text-xs pt-1">
                                  Klik untuk upload scan SK Pengangkatan PPAT
                                  Asli di file.
                                </p>
                              </>
                            </div>
                          ) : (
                            <>
                              <div className="Example__container">
                                <div className="Example__container__document overflow-y-auto-d h-auto-d">
                                  <Document
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
                            </>
                          )}
                        </label>
                        <input
                          type="file"
                          id="upload-button"
                          style={{ display: "none" }}
                          onChange={onFileChange}
                          required
                        />
                        <br />
                        <button hidden>Upload</button>
                      </div>
                    </li>
                  </ul>
                </span>
              </div>
              <div className="text-coolGray-900 pl-16 pt-2 text-left">
                <small>
                  Perhatian: <br />
                  1. File SK Pengangkatan PPAT harus terbaca jelas <br />
                  2. File SK Pengangkatan PPAT adalah dokumen asli, bukan
                  dokumen fotokopi <br />
                  3. File yang terdaftar adalah data yang masih berlaku <br />
                  4. File harus format PDF
                </small>
              </div>
              <hr className="mt-6 border-0 mb-4 py-2" />
            </div>

            <div className="relative flex flex-wrap my-6 w-auto">
              <div className="w-1/2">
                <Link to="/lengkapiDiri/tipe">
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
                  <Link to="/admin/dashboard">
                    <button
                      onClick={uploadSK}
                      className="get-started text-white font-bold px-6 py-3 rounded-lg outline-none focus:outline-none mr-1 mb-1 bg-blue-500 active:bg-blue-500 text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                    >
                      Lanjutkan
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="pb-16"></p>
    </>
  );
}
