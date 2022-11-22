import React, { useState, useContext } from "react";
import { RegistContext } from "views/auth/RegistContext";
import cookies from "js-cookie";
import swal from "sweetalert";

//react-pdf
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import { FormGroup } from "reactstrap";
import ModalDokumen from "components/Modals/ModalDokumen";

const Step1 = (props) => {
  const {
    inputRegist,
    setInputRegist,
    ppatFile,
    loading,
    setLoading,
  } = useContext(RegistContext);

  //Preview PDF

  const [file, setFile] = useState("");
  const [numPages, setNumPages] = useState(null);

  function onFileChange(event) {
    event.preventDefault();
    setLoading(true);
    if (event.target.files.length) {
      setFile(event.currentTarget.files[0]);
      let getFile = event.currentTarget.files[0];
      let typeDoc = event.currentTarget.files[0].type;
      if (typeDoc !== "application/pdf") {
        setLoading(false);
        swal({
          title: "Gagal!",
          text: "Format Dokumen Tidak Sesuai, File harus PDF",
          icon: "warning",
        });
      } else {
        setInputRegist({
          ...inputRegist,
          sk_pengangkatan: getFile,
        });
        ppatFile("sk_pengangkatan", getFile);
      }
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
      {loading ? <ModalDokumen /> : null}
      <FormGroup>
        <div className="relative flex-col break-words w-800-d mx-auto shadow-lg rounded-lg mt-12 bg-white border-0">
          <div className="rounded-t mb-0 px-6 py-6">
            <div className="text-center mb-2">
              <h1 className="text-blue text-xl font-bold">
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
                      {file.length === 0 ? (
                        <div>
                          <img
                            className="mx-auto my-4 align-middle h-36 w-36 bg-fix"
                            src={require("assets/img/skppat_icon.png").default}
                            alt="no data"
                          />
                          <p className="text-center text-xs pt-1">
                            Klik untuk upload scan SK Pengangkatan PPAT Asli di
                            file.
                          </p>
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
      </FormGroup>
    </>
  );
};

export default Step1;
