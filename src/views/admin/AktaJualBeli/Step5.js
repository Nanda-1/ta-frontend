import React, { useContext, useEffect, useState } from "react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import { MyAjbContext } from "Context/AjbContext";
import { FormGroup } from "reactstrap";
import InputDataDokumen from "components/AJB/InputDataDokumen";

const Step5 = (props) => {
  const { functions, ajbDoc } = useContext(MyAjbContext);

  const { detailAjb } = functions;

  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    if (props.currentStep === "dokumen") {
      detailAjb();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  useEffect(() => {
    if (props.currentStep === "dokumen") {
      function handleScroll() {
        const card = document.querySelector(".change-scroll");
        const cardTop = card.offsetTop;
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop >= cardTop) {
          setIsFixed(true);
        } else {
          setIsFixed(false);
        }
      }

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  if (props.currentStep !== "dokumen") {
    return null;
  }

  return (
    <>
      {/* <p>We recommend creating a secure password for your account</p> */}
      <FormGroup>
        <div className="flex content-center items-center justify-center h-full mt-20">
          <div className="flex w-full lg:w-12/12 px-1">
            {/* <form onSubmit={addDokumen}> */}
            <div className="relative bg-white flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg border-0 mr-4 change-scroll">
              <div className="Example__container_pdf text-sm">
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
                      <button
                        type="button"
                        disabled={pageNumber >= numPages}
                        onClick={lastPage}
                        className="bg-darkgray rounded-md text-grey px-2 py-1 ml-3"
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
                <div>
                  <Document file={ajbDoc} onLoadSuccess={onDocumentLoadSuccess}>
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
              <div
                className={`bg-white flex flex-col min-w-0 break-words mb-6 shadow-lg rounded-lg border-0 ${
                  isFixed ? "fixed-form mt-2" : "scroll-form w-full"
                }`}
              >
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
