import React, { useContext, useState } from "react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import AjbDropDown from "components/Dropdowns/AjbDropDown";

import { MyAjbContext } from "Context/AjbContext";

export default function PreviewDokumen() {
  const { inputAjb, setConfirmModal, functions } = useContext(MyAjbContext)

  const { getDokumenAjb } = functions


  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1); 

  const onDocumentLoadSuccess = async({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }
  
  function firstPage() {
    setPageNumber(1)
  }

  function lastPage() {
    setPageNumber(numPages)
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(+1);
  }

    const b64 = 'data:application/pdf;base64,' + inputAjb.doc_64

    if(b64 === undefined || b64 === null){
      getDokumenAjb('stemped')
    }

  return(
  <>
  <div className="container mx-auto px-2 h-full">
      <div className="flex content-center items-center justify-center h-full">
        <div className="w-full lg:w-12/12 px-1">
          <div className="relative bg-white flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-md pb-6">
            <div className="bg-white px-4 py-4 flex flex-row">
              <div className="bg-gray py-1 px-6 rounded-sm">
              <i className={"fas fa-file-alt mr-2 text-lg"}></i>{" "}
                  Dokumen
              </div>
              <div className="py-1 ml-12">
              <i className={"far fa-compass mr-2 text-lg"}></i>{" "}
                  Infromasi
              </div>
              <div className="py-1 ml-12">
              {/* <i className={"fas fa-user-friends mr-2 text-lg"}></i>{" "}
                  Penerima */}
                 <AjbDropDown />
              </div>
              <div className="py-1 ml-2">
                <button className="bg-blue text-white text-lg font-semibold px-6 rounded-sm"
                onClick={() => setConfirmModal(true)}
                >
                  Kirim
                </button>
              </div>
            </div>
            <div className="rounded-t px-40 text-grey py-2">
              <div className="text-grey text-sm font-bold bg-darkgray py-3 px-12 pembubuhan shadow-lg">
              Akta Jual Beli Gedung Le Meridien
              </div>
              <div className="bg-lightgrey text-xs shadow-lg text-black pembubuhan-2">
                <div className="mx-auto w-9/12">
                  <div className="Example__container">
                  <div className="flex w-full justify-center py-2 ">
                  {pageNumber === 1 ?
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
                            :
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
                            }
                            <p className="text-black px-3 py-1 font-semibold">
                              Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
                            </p>
                            {pageNumber === numPages ?
                            <>
                            <button
                              type="button"
                              disabled={pageNumber >= numPages}
                              onClick={nextPage}
                              className="bg-darkgray rounded-md text-grey px-4 py-1"
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
                            :
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
                            }
                      </div>
                    <div>
                    <Document
                      file={b64}
                      onLoadSuccess={onDocumentLoadSuccess}
                    >
                        <Page pageNumber={pageNumber}></Page>
                    </Document>
                      </div>
                      <div className="flex w-full justify-center py-2 ">
                      {pageNumber === 1 ?
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
                            :
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
                            }
                            <p className="text-black px-3 py-1 font-semibold">
                              Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
                            </p>
                            {pageNumber === numPages ?
                            <>
                            <button
                              type="button"
                              disabled={pageNumber >= numPages}
                              onClick={nextPage}
                              className="bg-darkgray rounded-md text-grey px-4 py-1"
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
                            :
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
                            }
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}