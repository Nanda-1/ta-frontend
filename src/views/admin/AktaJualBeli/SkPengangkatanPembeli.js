import React, { useContext, useState } from "react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";

import { MyAjbContext } from "Context/AjbContext";
import { FormGroup } from "reactstrap";
import swal from "sweetalert";

const SkPengangkatanPenjual = (props) => {
  const { setAjb, inputAjb, setInputAjb } = useContext(MyAjbContext);

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

  function firstPage() {
    setPageNumber(1);
  }

  function lastPage() {
    setPageNumber(numPages);
  }

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
          const reader = new FileReader();
          reader.onload = function (fileLoadedEvent) {
            var akta = fileLoadedEvent.target.result;
            var base64 = akta.replace(/^data:.+;base64,/, "");
            setInputAjb({ ...inputAjb, [formInput]: base64 });
          };
          reader.readAsDataURL(files);
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

  if (props.currentStep !== "sk_pengangkatan_pembeli") {
    return null;
  }

  return (
    <>
      {/* <p>We recommend creating a secure password for your account</p> */}
      <FormGroup>
        <div className="flex content-center items-center justify-center h-full mt-20">
          <div className="w-full lg:w-10/12 px-1">
            {/* <form onSubmit={addDokumen}> */}
            <div className="relative bg-white flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg border-0">
              <div className="rounded-t mb-0 px-6 text-grey py-6">
                <div className="text-center">
                  <label
                    className="block text-blue text-2xl font-bold mb-2 mt-4"
                    htmlFor="grid-password"
                  >
                    SK Pengangkatan
                  </label>
                  <label className="text-xs">
                    Unggah SK Pengangkatan Pembeli
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
                                <div className="Example__container__pdf">
                                  {/* <div className="Example__container__document"> */}
                                  <div className="flex flex-row bg-darkgray w-full justify-center py-1">
                                    {pageNumber === 1 ? (
                                      <>
                                        <button
                                          type="button"
                                          disabled={pageNumber <= 1}
                                          onClick={firstPage}
                                          className="bg-darkgray-2 rounded-md text-white px-2 py-1 mr-3"
                                        >
                                          First Page
                                        </button>
                                        <button
                                          type="button"
                                          disabled={pageNumber <= 1}
                                          onClick={previousPage}
                                          className="bg-darkgray-2 rounded-md text-white px-2 py-1"
                                        >
                                          Previous
                                        </button>
                                      </>
                                    ) : (
                                      <>
                                        <button
                                          type="button"
                                          disabled={pageNumber <= 1}
                                          onClick={firstPage}
                                          className="bg-white rounded-md text-black px-2 py-1 border-black mr-3"
                                        >
                                          First Page
                                        </button>
                                        <button
                                          type="button"
                                          disabled={pageNumber <= 1}
                                          onClick={previousPage}
                                          className="bg-white rounded-md text-black px-2 py-1 border-black"
                                        >
                                          Previous
                                        </button>
                                      </>
                                    )}
                                    <p className="text-black px-3 py-1 font-semibold">
                                      Page {pageNumber || (numPages ? 1 : "--")}{" "}
                                      of {numPages || "--"}
                                    </p>
                                    {pageNumber === numPages ? (
                                      <>
                                        <button
                                          type="button"
                                          disabled={pageNumber >= numPages}
                                          onClick={nextPage}
                                          className="bg-darkgray-2 rounded-md text-white px-4 py-1 ml-3"
                                        >
                                          Next
                                        </button>
                                        <button
                                          type="button"
                                          disabled={pageNumber >= numPages}
                                          onClick={lastPage}
                                          className="bg-darkgray-2 rounded-md text-white px-4 py-1 ml-3"
                                        >
                                          Last Page
                                        </button>
                                      </>
                                    ) : (
                                      <>
                                        <button
                                          type="button"
                                          disabled={pageNumber >= numPages}
                                          onClick={nextPage}
                                          className="bg-white rounded-md text-black px-4 border-black"
                                        >
                                          Next
                                        </button>
                                        <button
                                          type="button"
                                          disabled={pageNumber >= numPages}
                                          onClick={lastPage}
                                          className="bg-white rounded-md text-black px-4 border-black ml-3"
                                        >
                                          Last Page
                                        </button>
                                      </>
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
                                      <>
                                        <button
                                          type="button"
                                          disabled={pageNumber <= 1}
                                          onClick={firstPage}
                                          className="bg-darkgray-2 rounded-md text-white px-2 py-1 mr-3"
                                        >
                                          First Page
                                        </button>
                                        <button
                                          type="button"
                                          disabled={pageNumber <= 1}
                                          onClick={previousPage}
                                          className="bg-darkgray-2 rounded-md text-white px-2 py-1"
                                        >
                                          Previous
                                        </button>
                                      </>
                                    ) : (
                                      <>
                                        <button
                                          type="button"
                                          disabled={pageNumber <= 1}
                                          onClick={firstPage}
                                          className="bg-white rounded-md text-black px-2 py-1 border-black mr-3"
                                        >
                                          First Page
                                        </button>
                                        <button
                                          type="button"
                                          disabled={pageNumber <= 1}
                                          onClick={previousPage}
                                          className="bg-white rounded-md text-black px-2 py-1 border-black"
                                        >
                                          Previous
                                        </button>
                                      </>
                                    )}
                                    <p className="text-black px-3 py-1 font-semibold">
                                      Page {pageNumber || (numPages ? 1 : "--")}{" "}
                                      of {numPages || "--"}
                                    </p>
                                    {pageNumber === numPages ? (
                                      <>
                                        <button
                                          type="button"
                                          disabled={pageNumber >= numPages}
                                          onClick={nextPage}
                                          className="bg-darkgray-2 rounded-md text-white px-4 py-1 ml-3"
                                        >
                                          Next
                                        </button>
                                        <button
                                          type="button"
                                          disabled={pageNumber >= numPages}
                                          onClick={lastPage}
                                          className="bg-darkgray-2 rounded-md text-white px-4 py-1 ml-3"
                                        >
                                          Last Page
                                        </button>
                                      </>
                                    ) : (
                                      <>
                                        <button
                                          type="button"
                                          disabled={pageNumber >= numPages}
                                          onClick={nextPage}
                                          className="bg-white rounded-md text-black px-4 border-black"
                                        >
                                          Next
                                        </button>
                                        <button
                                          type="button"
                                          disabled={pageNumber >= numPages}
                                          onClick={lastPage}
                                          className="bg-white rounded-md text-black px-4 border-black ml-3"
                                        >
                                          Last Page
                                        </button>
                                      </>
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
                                  Klik untuk mengunggah file.
                                </p>
                              </>
                            )}
                          </label>
                          <input
                            type="file"
                            id="upload-button"
                            style={{ display: "none" }}
                            onChange={onFileChange}
                            name="sk_pengangkatan_pembeli"
                            // required={true}
                            // value={inputAjb.sk_pengangkatan_pembeli}
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

export default SkPengangkatanPenjual;
