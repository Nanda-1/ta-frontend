import React, { useContext, useState } from "react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import { MyAphtcontext } from "Context/AphtContext";
import { FormGroup } from "reactstrap";
import InputDataDokumen from "components/APHT/InputDataDokumen";
// import { connect } from "socket.io-client";

const Step5 = (props) => {
  const { inputApht, loadingFile, dokTemplate, functions } =
    useContext(MyAphtcontext);

  const { dokumenApht } = functions;

  if (!dokTemplate && !inputApht.doc) {
    dokumenApht("akta_pemberian_hak_tanggungan");
  }

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = async ({ numPages }) => {
    setNumPages(numPages);
  };

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
    changePage(+1);
  }

  const stepNum = () => {
    if (inputApht.tipe_kreditor === "personal") {
      if (inputApht.status_kreditor !== "menikah") {
        if (inputApht.tipe_debitor === "personal") {
          if (inputApht.status_debitor !== "menikah") {
            return 10;
          } else {
            return 11;
          }
        } else {
          return 7;
        }
      } else {
        if (inputApht.tipe_debitor === "personal") {
          if (inputApht.status_debitor !== "menikah") {
            return 11;
          } else {
            return 12;
          }
        } else {
          return 8;
        }
      }
    } else {
      if (inputApht.tipe_debitor === "personal") {
        if (inputApht.status_debitor !== "menikah") {
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
      {loadingFile ? alert("loading") : null}
      {/* <p>We recommend creating a secure password for your account</p> */}
      <FormGroup>
        <div className="flex content-center items-center justify-center h-full mt-20">
          <div className="flex w-full lg:w-12/12 px-1">
            {/* <form onSubmit={addDokumen}> */}
            <div className="relative bg-white flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg border-0">
              <div className="Example__container_pdf">
                <div className="flex w-full justify-center py-2 ">
                  {pageNumber === 1 ? (
                    <>
                      <button
                        type="button"
                        disabled={pageNumber <= 1}
                        onClick={firstPage}
                        className="bg-darkgray rounded-md text-grey px-2 py-1 mr-3"
                      >
                        First Page
                      </button>
                      <button
                        type="button"
                        disabled={pageNumber <= 1}
                        onClick={previousPage}
                        className="bg-darkgray rounded-md text-grey px-2 py-1 z-10"
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
                        className="bg-white rounded-md text-black px-2 py-1 border-black z-10"
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
                        className="bg-darkgray rounded-md text-grey px-4 py-1 ml-3 z-10"
                      >
                        Next
                      </button>
                      <button
                        type="button"
                        disabled={pageNumber >= numPages}
                        onClick={lastPage}
                        className="bg-darkgray rounded-md text-grey px-2 py-1 ml-3 z-10"
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
                        className="bg-white rounded-md text-black px-4 border-black z-10"
                      >
                        Next
                      </button>
                      <button
                        type="button"
                        disabled={pageNumber >= numPages}
                        onClick={lastPage}
                        className="bg-white rounded-md text-black px-4 border-black ml-3 z-10"
                      >
                        Last Page
                      </button>
                    </>
                  )}
                </div>
                <div>
                  <Document
                    file={inputApht.doc ? inputApht.doc : dokTemplate}
                    // file={b64}
                    onLoadSuccess={onDocumentLoadSuccess}
                  >
                    <Page pageNumber={pageNumber}></Page>
                  </Document>
                </div>
                <div className="flex w-full justify-center py-2 ">
                  {pageNumber === 1 ? (
                    <>
                      <button
                        type="button"
                        disabled={pageNumber <= 1}
                        onClick={firstPage}
                        className="bg-darkgray rounded-md text-grey px-2 py-1 mr-3"
                      >
                        First Page
                      </button>
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
                        onClick={firstPage}
                        className="bg-white rounded-md text-black px-2 py-1 border-black mr-3"
                      >
                        First Page
                      </button>
                      <button
                        type="button"
                        disabled={pageNumber <= 1}
                        onClick={previousPage}
                        className="bg-white rounded-md text-black px-2 py-1 border-black z-10"
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
                        className="bg-darkgray rounded-md text-grey px-4 py-1 z-10"
                      >
                        Next
                      </button>
                      <button
                        type="button"
                        disabled={pageNumber >= numPages}
                        onClick={lastPage}
                        className="bg-darkgray rounded-md text-grey px-3 py-1 ml-3"
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
                        className="bg-white rounded-md text-black px-3 border-black ml-3"
                      >
                        Last Page
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-1">
              <div className="relative bg-white flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg border-0">
                <InputDataDokumen />
              </div>
            </div>
          </div>
        </div>
      </FormGroup>
    </>
  );
};

export default Step5;
