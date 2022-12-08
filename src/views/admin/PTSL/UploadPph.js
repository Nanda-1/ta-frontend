import React, { useContext, useState } from "react";
import swal from "sweetalert";
import { useHistory } from "react-router";
import { MySuratKuasaContext } from "Context/SuratKuasaContext";
import ModalDokumen from "components/Modals/ModalDokumen";

const UploadPh = () => {
  const { dataPtsl, setDataPtsl, addActors, loading } =
    useContext(MySuratKuasaContext);

  const [file, setFile] = useState("");

  const history = useHistory();

  function onFileChange(event) {
    // setFile(event.target.files[0]);
    if (event.target.files.length) {
      const fileSize = event.currentTarget.files[0].size / 1024;
      const fileType = event.currentTarget.files[0].type;
      console.log(fileType);
      if (fileType.includes("image/")) {
        if (fileSize <= 2048) {
          const formInput = event.target.name;
          var fileReader = new FileReader();
          var base64;
          // Onload of file read the file content
          fileReader.onload = function (fileLoadedEvent) {
            base64 = fileLoadedEvent.target.result;
            // Print data in console
            setFile(base64);
            const regex = /data:.*base64,/;
            setDataPtsl({
              ...dataPtsl,
              [formInput]: base64.replace(regex, ""),
            });
          };
          fileReader.readAsDataURL(event.target.files[0]);
        } else {
          swal("Error", "File tidak boleh lebih dari 2Mb", "error");
        }
      } else {
        swal("Error", "Format Tidak Sesuai", "error");
      }
    }
  }

  return (
    <>
      {loading ? <ModalDokumen /> : null}
      <div className="flex content-center items-center justify-center h-full mt-20">
        <div className="w-full lg:w-10/12 px-1">
          {/* <form onSubmit={addDokumen}> */}
          <div className="relative bg-white flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg border-0">
            <div className="rounded-t mb-0 px-6 text-grey py-6">
              <div className="text-center">
                <label
                  className="block text-blue text-xl font-bold mb-4 mt-4"
                  htmlFor="grid-password"
                >
                  Unggah Foto Dokumen PPH
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
                            <img src={file} alt='file' />
                          ) : (
                            <>
                              {/* <i className={"far fa-file-alt text-6xl py-2"}></i>{" "} */}
                              <p className="text-center text-xs pt-1">
                                Klik untuk upload Dokumen PPH
                              </p>
                            </>
                          )}
                        </label>
                        <input
                          type="file"
                          id="upload-button"
                          style={{ display: "none" }}
                          onChange={onFileChange}
                          name="doc_pph"
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
          <div className="w-full flex justify-between">
            <button
              className=" bg-green-2 text-white font-bold py-2 px-4 rounded-lg"
              onClick={() =>
                history.push(
                  "/admin/pendaftaran_tanah_sistematis_lengkap/uploadBphtb"
                )
              }
            >
              Sebelumnya
            </button>
            <button
              className=" bg-blue text-white font-bold py-2 px-4 rounded-lg"
              onClick={() => addActors()}
            >
              Selanjutnya
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadPh;
