import React, { useState } from "react";

//react-pdf
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";

const PreviewFile = ({ file }) => {
  //Preview PDF
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
      <>
        <div className="relative flex flex-wrap my-6 w-auto mx-auto">
          <div className="relative flex mb-1 mx-auto">
          <button
            type="button"
            disabled={pageNumber <= 1}
            onClick={previousPage}
            className={`rounded-md text-grey text-xs px-1 py-1 ${
              pageNumber === 1
                ? "bg-darkgray"
                : "bg-white text-black px-1 py-1 border-grey"
            }`}
          >
            Sebelumnya
          </button>
          <p className="text-black text-xs px-1 py-1 font-semibold">
          {"  "} {pageNumber || (numPages ? 1 : "--")} / {"  "}
            {numPages || "--"} {"  "}
          </p>
          <button
            type="button"
            disabled={pageNumber >= numPages}
            onClick={nextPage}
            className={`rounded-md text-grey text-xs px-1 py-1 ${
              pageNumber === numPages
                ? "bg-darkgray"
                : "bg-white text-black px-1 py-1 border-grey"
            }`}
          >
            Selanjutnya
          </button>
          </div>
        </div>
      </>
      <Document
        className="react-pdf__Page__canvas border-grey"
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber}></Page>
      </Document>
    </>
  );
};

export default PreviewFile;
