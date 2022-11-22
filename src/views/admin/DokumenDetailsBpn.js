import React, { useContext, useEffect, useRef, useState } from "react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";

import { DokumenContext } from "Context/DokumenContext";
import { useParams } from "react-router-dom";
import cookies from "js-cookie";

export default function DokumenDetailsBpn() {
  const { functions, detailtransaction, doc } = useContext(DokumenContext);

  const { fetchDataTransaksi } = functions;

  let { id } = useParams();

  cookies.set("id_transaksi", id);

  useEffect(() => {
    fetchDataTransaksi(id);
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

  const formatPrice = (num) => {
    var parts = num.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return "Rp " + parts.join(",");
  };

  const formatter = new Intl.DateTimeFormat("id-GB", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  const ref = useRef(null);

  return (
    <div className="container mx-auto px-2 h-full">
      <div className="flex content-center items-center justify-center h-full">
        <div className="w-full lg:w-12/12 px-1">
          <div className="relative bg-white flex flex-col min-w-0 break-words mb-6 pb-6">
            <div className="w-full grid grid-cols-4 gap-4">
              <div className="text-bold">
                Dokumen
                <div className="text-bold mt-4 text-3xl">
                  {detailtransaction.doc_name}
                </div>
                <div className="text-bold mt-4 text-sm">
                  Tanggal <br />
                  <div className="font-light">
                    {detailtransaction.created_at
                      ? formatter.format(
                          Date.parse(detailtransaction.created_at)
                        )
                      : ""}
                  </div>
                </div>
                <div className="text-bold mt-4 text-sm">
                  Nama PPAT <br />
                  <div className="font-light">
                    {detailtransaction.author_name}
                  </div>
                </div>
                <div className="text-bold mt-4 text-sm">
                  Nomor Dokumen <br />
                  <div className="font-light">{detailtransaction.doc_num}</div>
                </div>
                <div className="text-bold mt-4 text-sm">
                  Kategori Dokumen <br />
                  <div className="font-light">
                    {detailtransaction.doc_type === "akta_jual_beli"
                      ? "Akta Jual Beli"
                      : "Akta Pemberian Hak Tanggungan"}
                  </div>
                </div>
                <div className="text-bold mt-4 text-sm">
                  Nilai Transaksi <br />
                  <div className="font-light">
                    {detailtransaction.price_value
                      ? formatPrice(detailtransaction.price_value)
                      : "Rp 0"}
                  </div>
                </div>
              </div>
              <div className="col-span-3 row-span-6">
                <div className="text-right text-sm">
                  Dokumen |{" "}
                  {detailtransaction.doc_type === "akta_jual_beli"
                    ? "Akta Jual Beli"
                    : "Akta Pemberian Hak Tanggungan"}
                </div>
                <div className="bg-darkgray-3 text-sm shadow-md text-black pembubuhan-2 mt-4">
                  <div className="mx-auto w-12/12">
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
                        <p className="text-white px-3 py-1 font-semibold">
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
                      <div ref={ref}>
                        <Document
                          file={doc}
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
                              className="bg-white rounded-md text-black px-2 py-1 border-black"
                            >
                              Previous
                            </button>
                          </>
                        )}
                        <p className="text-white px-3 py-1 font-semibold">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
