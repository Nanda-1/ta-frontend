import React, { useContext, useEffect, useState } from "react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import { useHistory } from "react-router";
import { MySuratKuasaContext } from "Context/SuratKuasaContext";
import InputKeteranganSuratKuasa from "components/Modals/SuratKuasa/InputKeterangan";
import FormDokumenSuratKuasa from "./FormDokumenSuratKuasa";

const DokumenSuratKuasa = () => {
  const {
    filePtsl,
    addKeterangan,
    setAddKeterangan,
    getDokumenDetail,
    getDokumen,
    dataPtsl,
    uploadPtsl2,
    setDataPtsl,
  } = useContext(MySuratKuasaContext);

  const history = useHistory();

  if (filePtsl) {
    setAddKeterangan(false);
  }

  useEffect(() => {
    getDokumen("surat_kuasa");
    getDokumenDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = async ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(+1);
  }

  return (
    <>
      {addKeterangan ? <InputKeteranganSuratKuasa /> : null}
      <div className="flex content-center items-center justify-center h-full mt-20">
        <div className="w-full lg:w-12/12 px-1">
          {/* <form onSubmit={addDokumen}> */}
          <div className="relative flex min-w-0 break-words w-full mb-6 justify-between">
            <div className="rounded-t mb-0 px-6 text-grey py-6 bg-white shadow-lg mr-6 w-full rounded-lg border-0">
              <div className="mb-6">
                <div className="flex w-full justify-center py-2 ">
                  {pageNumber === 1 ? (
                    <>
                      <button
                        type="button"
                        disabled={pageNumber <= 1}
                        onClick={previousPage}
                        className="bg-darkgray rounded-md text-grey px-2 py-1"
                      >
                        Previous
                      </button>
                    </>
                  ) : (
                    <>
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
                    Page {pageNumber || (numPages ? 1 : "--")} of{" "}
                    {numPages || "--"}
                  </p>
                  {pageNumber === numPages ? (
                    <>
                      <button
                        type="button"
                        disabled={pageNumber >= numPages}
                        onClick={nextPage}
                        className="bg-darkgray rounded-md text-grey px-4 py-1 ml-3"
                      >
                        Next
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
                    </>
                  )}
                </div>
                <Document
                  file={filePtsl}
                  // file={b64}
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  <Page pageNumber={pageNumber}></Page>
                </Document>
              </div>
            </div>
            <FormDokumenSuratKuasa
              dataPtsl={dataPtsl}
              setDataPtsl={setDataPtsl}
              uploadPtsl2={uploadPtsl2}
            />
          </div>
          <div className="w-full flex justify-between mb-6">
            <button
              className=" bg-green-2 text-white font-bold py-2 px-4 rounded-lg"
              onClick={() =>
                history.push(
                  "/admin/pendaftaran_tanah_sistematis_lengkap/uploadPph"
                )
              }
            >
              Sebelumnya
            </button>
            <button
              className=" bg-blue text-white font-bold py-2 px-4 rounded-lg"
              onClick={() => history.push("/admin/surat_kuasa/pembubuhan")}
            >
              Selanjutnya
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DokumenSuratKuasa;
