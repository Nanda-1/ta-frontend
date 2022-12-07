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
      <button
        type="button"
        disabled={pageNumber <= 1}
        onClick={previousPage}
        className={`rounded-md text-grey px-2 py-1 ${
          pageNumber === 1
            ? "bg-darkgray"
            : "bg-white text-black px-2 py-1 border-black"
        }`}
      >
        Sebelumnya
      </button>
      <p className="text-black px-3 py-1 font-semibold">
        Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
      </p>
      <button
        type="button"
        disabled={pageNumber >= numPages}
        onClick={nextPage}
        className={`rounded-md text-grey px-2 py-1 ${
          pageNumber === numPages
            ? "bg-darkgray"
            : "bg-white text-black px-2 py-1 border-black"
        }`}
      >
        Selanjutnya
      </button>
      <Document
        className="react-pdf__Page__canvas"
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber}></Page>
      </Document>
    </>
  );
};

export default PreviewFile;
