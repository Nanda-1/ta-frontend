import React, { useContext, useState, useRef } from "react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import meteraiImg from "assets/img/signature/meterai.png";

import { DokumenContext } from "Context/DokumenContext";

import { fabric } from "fabric";
import ModalDokumen from "components/Modals/ModalDokumen";
import CallMobile from "components/Pexip/Call/CallMobile";
import File from "../../assets/pdf/apht_demo.pdf";

export default function MobileVer() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = async ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
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

  const ref = useRef(null);

  return (
    <div className="bg-darkgray-2">
      <Document
        file={File}
        // file={b64}
        onLoadSuccess={onDocumentLoadSuccess}
        className='px-4'
      >
        <Page pageNumber={pageNumber}></Page>
      </Document>
    </div>
  );
}
