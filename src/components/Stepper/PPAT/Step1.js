import React, { useContext, useEffect } from "react";
import { RegistContext } from "views/auth/RegistContext";
import swal from "sweetalert";

//react-pdf
import { FormGroup } from "reactstrap";
import ModalDokumen from "components/Modals/ModalDokumen";
import PreviewFile from "components/RegistPPAT/PreviewFile";

const Step1 = (props) => {
  const {
    inputRegist,
    setInputRegist,
    ppatFile,
    loading,
    setLoading,
    fileLengkapiDiri,
    setFileLengkapiDiri,
    getUserFile,
  } = useContext(RegistContext);

  
  const val = localStorage.getItem("dataPPAT");
  const object = JSON.parse(val);

  useEffect(() => {
    if (props.currentStep === 1) {
      getUserFile("sk_pengangkatan");
    } else if(props.currentStep === 2) {
      getUserFile("ktp");
    } else {
      return null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onFileChange(event) {
    event.preventDefault();
    if (event.target.files.length) {
      setFileLengkapiDiri(event.currentTarget.files[0]);
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
        setLoading(true);
        setInputRegist({
          ...inputRegist,
          sk_pengangkatan: getFile,
        });
        ppatFile("sk_pengangkatan", getFile);
      }
    }
  }

  console.log(fileLengkapiDiri);

  if (props.currentStep !== 1) {
    return null;
  }

  return (
    <>
      {loading ? <ModalDokumen /> : null}
      <FormGroup>
        <div className="relative flex-col break-words w-900-d mx-auto shadow-lg rounded-lg mt-12 bg-white border-0">
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
                  <div className="mx-auto my-auto">
                    <label htmlFor="upload-button" className="w-auto">
                      {!object.user_files.sk_pengangkatan && fileLengkapiDiri === ''? (
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
                            <div className="Example__container border-grey bebas">
                              {/* <div className="Example__container__document overflow-y-auto-d h-pdf"> */}
                                <PreviewFile file={fileLengkapiDiri} />
                              {/* </div> */}
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
          <div className="text-coolGray-900 pl-12 pt-2 text-left w-auto pb-6">
            <small>
              Perhatian: <br />
              1. File SK Pengangkatan PPAT harus terbaca jelas <br />
              2. File adalah dokumen asli, bukan dokumen fotokopi <br />
              3. File yang terdaftar adalah data yang masih berlaku <br />
              4. File yang di unggah harus berformat .pdf
            </small>
          </div>
        </div>
      </FormGroup>
    </>
  );
};

export default Step1;
