import React, { useContext, useState } from "react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import { MyAjbContext } from "Context/AjbContext";
import { FormGroup } from "reactstrap";
import swal from "sweetalert";
// import { connect } from "socket.io-client";

const Step5 = (props) => {
  const { setAjb, inputAjb, setInputAjb } =
    useContext(MyAjbContext);

  const [file, setFile] = useState("");
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  // function firstPage() {
  //   setPageNumber(1);
  // }

  // function lastPage() {
  //   setPageNumber(numPages);
  // }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  function onFileChange(event) {
    // setFile(event.target.files[0]);
    if (event.target.files.length) {
      const fileSize = event.currentTarget.files[0].size / 1024;
      const fileType = event.currentTarget.files[0].type;
      if (fileType === "application/pdf") {
        if (fileSize <= 2048) {
          setFile(event.target.files[0]);
          const formInput = event.target.name;
          var files = event.currentTarget.files[0];
          // var filesArray = [].slice.call(files);
          // filesArray.forEach(e => {
          setInputAjb({ ...inputAjb, [formInput]: files });
          // });
          setAjb({ ...inputAjb });
        } else {
          swal("Error", "File tidak boleh lebih dari 2Mb", "error");
        }
        setAjb({ ...inputAjb });
      } else {
        swal("Error", "Format Tidak Sesuai", "error");
      }
    }
  }
  
  var val = localStorage.getItem("dataPPAT");
  var object = JSON.parse(val);

  if(inputAjb.ppat_name === undefined){
    setInputAjb({ ...inputAjb, ppat_name:  object.nama});
  }

  const handleChange = (event) => {
    let inputValue = event.target.value;
    let formInput = event.target.name;
    setInputAjb({ ...inputAjb, [formInput]: inputValue });
  };

  const stepNum = () => {
    if (inputAjb.tipe_pembeli === "personal") {
      if (inputAjb.status_pembeli !== "menikah") {
        if (inputAjb.tipe_penjual === "personal") {
          if (inputAjb.status_penjual !== "menikah") {
            return 10;
          } else {
            return 11;
          }
        } else {
          return 7;
        }
      } else {
        if (inputAjb.tipe_penjual === "personal") {
          if (inputAjb.status_penjual !== "menikah") {
            return 11;
          } else {
            return 12;
          }
        } else {
          return 8;
        }
      }
    } else {
      if (inputAjb.tipe_penjual === "personal") {
        if (inputAjb.status_penjual !== "menikah") {
          return 10;
        } else {
          return 11;
        }
      } else {
        return 7;
      }
    }
  };

  if (props.currentStep !== stepNum()) {
    return null;
  }

  return (
    <>
      <FormGroup>
        <div className="flex content-center items-center justify-center h-full mt-20">
          <div className="w-full lg:w-10/12 px-1">
            {/* <form onSubmit={addDokumen}> */}
            <div className="relative bg-white flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg border-0">
              <div className="rounded-t mb-0 px-6 text-grey py-6">
                <div className="relative w-full mb-3">
                  <label
                    className="block text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Nama Dokumen
                  </label>
                  <input
                    className="border-0 px-3 py-2 border-grey rounded text-sm shadow-md focus:outline-none w-full ease-linear transition-all duration-150"
                    name="nama_dokumen"
                    value={inputAjb.nama_dokumen}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="relative w-full mb-3">
                  <label
                    className="block text-xs pt-6 font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Nomor Dokumen
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-2 border-grey rounded text-sm shadow-md focus:outline-none w-full ease-linear transition-all duration-150"
                    name="nomor_dokumen"
                    value={inputAjb.nomor_dokumen}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="relative w-full mb-3">
                  <label
                    className="block text-xs pt-6 font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Nama Notaris
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-2 bg-gray border-grey rounded text-sm shadow-md focus:outline-none w-full ease-linear transition-all duration-150"
                    name="ppat_name"
                    value={inputAjb.ppat_name}
                    onChange={handleChange}
                    disabled
                  />
                </div>
                {/* <div className="relative w-full mb-3">
                  <label
                    className="block text-xs pt-6 font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Gelar Notaris
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-2 border-grey rounded text-sm shadow-md focus:outline-none w-full ease-linear transition-all duration-150"
                    name="ppat_gelar"
                    value={inputAjb.ppat_gelar}
                    onChange={handleChange}
                    required
                  />
                </div> */}
                <div className="relative w-full mb-3">
                  <label
                    className="block text-xs pt-6 font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Kota
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-2 border-grey rounded text-sm shadow-md focus:outline-none w-full ease-linear transition-all duration-150"
                    name="kota"
                    value={inputAjb.kota}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="relative w-full mb-3">
                  <label
                    className="block text-xs pt-6 font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Nilai Transaksi
                  </label>
                  <input
                    type="number"
                    className="border-0 px-3 py-2 border-grey rounded text-sm shadow-md focus:outline-none w-full ease-linear transition-all duration-150"
                    name="harga"
                    value={inputAjb.harga}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="text-center">
                  <label
                    className="block text-blue text-xl font-bold mb-4 mt-4"
                    htmlFor="grid-password"
                  >
                    Unggah Dokumen AJB
                  </label>
                  <label className="text-xs">
                    Dokumen Akta Jual Beli. <br />
                    Gunakan <b>format .pdf</b>
                  </label>
                </div>
                <div className="space-y-4">
                  <span className="flex w-800 mx-auto border-2 border-blue-400 pt-2 border-dashed rounded">
                    {/* <div className="bg-fix" style={{img: "url(assets/img/ktp.png)"}}/> */}
                    <ul id="gallery" className="flex flex-1 flex-wrap mt-px">
                      <li
                        id="empty"
                        className="h-full w-full text-center flex flex-col items-center justify-center"
                      >
                        <div className="h-auto">
                          <label htmlFor="upload-button" className=" mx-auto">
                            {file ? (
                              <>
                                <div className="Example__container_pdf">
                                  {/* <div className="Example__container__document"> */}
                                  <div className="flex flex-row bg-darkgray w-full justify-center py-1">
                                    {pageNumber === 1 ? (
                                      <button
                                        type="button"
                                        disabled={pageNumber <= 1}
                                        onClick={previousPage}
                                        className="bg-darkgray-2 rounded-md text-white px-2 py-1"
                                        // disabled
                                      >
                                        Previous
                                      </button>
                                    ) : (
                                      <button
                                        type="button"
                                        disabled={pageNumber <= 1}
                                        onClick={previousPage}
                                        className="bg-white rounded-md text-black px-2 py-1 border-black"
                                      >
                                        Previous
                                      </button>
                                    )}
                                    <p className="text-black px-3 py-1 font-semibold">
                                      Page {pageNumber || (numPages ? 1 : "--")}{" "}
                                      of {numPages || "--"}
                                    </p>
                                    {pageNumber === numPages ? (
                                      <button
                                        type="button"
                                        disabled={pageNumber >= numPages}
                                        onClick={nextPage}
                                        className="bg-darkgray-2 rounded-md text-white px-4 py-1"
                                        // disabled
                                      >
                                        Next
                                      </button>
                                    ) : (
                                      <button
                                        type="button"
                                        disabled={pageNumber >= numPages}
                                        onClick={nextPage}
                                        className="bg-white rounded-md text-black px-4 border-black"
                                      >
                                        Next
                                      </button>
                                    )}
                                  </div>
                                  <Document
                                    file={file}
                                    onLoadSuccess={onDocumentLoadSuccess}
                                  >
                                    <Page pageNumber={pageNumber} />
                                  </Document>
                                  <div className="flex flex-row bg-darkgray w-full justify-center py-1">
                                    {pageNumber === 1 ? (
                                      <button
                                        type="button"
                                        disabled={pageNumber <= 1}
                                        onClick={previousPage}
                                        className="bg-darkgray-2 rounded-md text-white px-2 py-1"
                                        // disabled
                                      >
                                        Previous
                                      </button>
                                    ) : (
                                      <button
                                        type="button"
                                        disabled={pageNumber <= 1}
                                        onClick={previousPage}
                                        className="bg-white rounded-md text-black px-2 py-1 border-black"
                                      >
                                        Previous
                                      </button>
                                    )}
                                    <p className="text-black px-3 py-1 font-semibold">
                                      Page {pageNumber || (numPages ? 1 : "--")}{" "}
                                      of {numPages || "--"}
                                    </p>
                                    {pageNumber === numPages ? (
                                      <button
                                        type="button"
                                        disabled={pageNumber >= numPages}
                                        onClick={nextPage}
                                        className="bg-darkgray-2 rounded-md text-white px-4 py-1"
                                        // disabled
                                      >
                                        Next
                                      </button>
                                    ) : (
                                      <button
                                        type="button"
                                        disabled={pageNumber >= numPages}
                                        onClick={nextPage}
                                        className="bg-white rounded-md text-black px-4 border-black"
                                      >
                                        Next
                                      </button>
                                    )}
                                  </div>
                                  {/* </div> */}
                                </div>
                                {/* </div> */}
                              </>
                            ) : (
                              <>
                                {/* <i className={"far fa-file-alt text-6xl py-2"}></i>{" "} */}
                                <p className="text-center text-xs pt-1">
                                  Klik untuk upload Dokumen AJB
                                </p>
                              </>
                            )}
                          </label>
                          <input
                            type="file"
                            id="upload-button"
                            style={{ display: "none" }}
                            onChange={onFileChange}
                            name="dokumen_ajb"
                            // required={true}
                            // value={inputAjb.dokumen_ajb}
                          />
                          <br />
                          <button hidden>Upload</button>
                        </div>
                      </li>
                    </ul>
                  </span>
                </div>
              </div>
            </div>
            {/* </form> */}
          </div>
        </div>
      </FormGroup>
    </>
  );
};

export default Step5;
