import React, { useContext, useState, useRef, useEffect } from "react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import meteraiImg from "assets/img/signature/meterai.png";

import { MyAjbContext } from "Context/AjbContext";

import { fabric } from "fabric";
import { FormGroup } from "reactstrap";
import ModalDokumen from "components/Modals/ModalDokumen";
import OtpModal from "components/Modals/OTP";

const Step6 = (props) => {
  const {
    inputAjb,
    setInputAjb,
    ajbDoc,
    meterai,
    setConfirmModal,
    setBtnConfirm,
    btnConfirm,
    loadingFile,
    setLoadingFile,
    otpModal,
    ttdImage,
    functions,
  } = useContext(MyAjbContext);

  const { getDokumenAjb } = functions;

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    if (props.currentStep === "stamping") {
      getDokumenAjb();
      setLoadingFile(true);
    }
  }, []);

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

  const handlePembubuhan = () => {
    setInputAjb({ ...inputAjb, page: pageNumber });
    setConfirmModal(true);
  };

  const addMeterai = (data) => {
    setBtnConfirm(true);

    var canvas = new fabric.Canvas("canvasMeterai", {
      preserveObjectStacking: true,
    });
    canvas.setDimensions({
      width: ref.current.clientWidth,
      height: ref.current.clientHeight,
    });

    var eMeterai = document.getElementById("meterai");

    var imgMeterai = new fabric.Image(eMeterai, {
      hasControls: false,
      hasBorders: false,
      scaleX: 0.8,
      scaleY: 0.8,
    });

    if (data !== "cancel") {
      canvas.add(imgMeterai);
    } else {
      canvas.dispose();
      setBtnConfirm(false);
    }

    canvas.on("object:moving", function (e) {
      var obj = e.target;

      let lower_x_coord = obj.setCoords().oCoords.bl.x;
      let lower_y_coord = canvas.getHeight() - obj.setCoords().oCoords.bl.y;
      let upper_x_coord = obj.setCoords().oCoords.tr.x;
      let upper_y_coord = canvas.getHeight() - obj.setCoords().oCoords.tr.y;

      setInputAjb({
        ...inputAjb,
        llx: lower_x_coord,
        lly: lower_y_coord,
        urx: upper_x_coord,
        ury: upper_y_coord,
      });

      if (
        obj.currentHeight > obj.canvas.height ||
        obj.currentWidth > obj.canvas.width
      ) {
        return;
      }
      obj.setCoords();
      // top-left  corner
      if (obj.getBoundingRect().top < 0 || obj.getBoundingRect().left < 0) {
        obj.top = Math.max(obj.top, obj.top - obj.getBoundingRect().top);
        obj.left = Math.max(obj.left, obj.left - obj.getBoundingRect().left);
      }
      // bot-right corner
      if (
        obj.getBoundingRect().top + obj.getBoundingRect().height >
          obj.canvas.height ||
        obj.getBoundingRect().left + obj.getBoundingRect().width >
          obj.canvas.width
      ) {
        obj.top = Math.min(
          obj.top,
          obj.canvas.height -
            obj.getBoundingRect().height +
            obj.top -
            obj.getBoundingRect().top
        );
        obj.left = Math.min(
          obj.left,
          obj.canvas.width -
            obj.getBoundingRect().width +
            obj.left -
            obj.getBoundingRect().left
        );
      }
    });
  };

  const ref = useRef(null);

  if (props.currentStep !== "stamping") {
    return null;
  }

  return (
    <>
      {/* <p>We recommend creating a secure password for your account</p> */}
      <FormGroup>
        {loadingFile ? (
          <>
            <ModalDokumen />
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
        {otpModal ? <OtpModal /> : null}
        <div className="flex content-center items-center justify-center h-full mt-20">
          <div className="w-full lg:w-11/12 px-1">
            <div className="relative bg-white flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg border-0">
              <div className="rounded-t mb-0 px-4 text-grey py-6">
                <div className="text-white text-xs text-right bg-darkgray py-2 px-10 pembubuhan shadow-md">
                  <button
                    className={`px-10 py-2 rounded-md ${
                      meterai ? "bg-darkgray-2 pembubuhan" : "bg-blue"
                    }`}
                    onClick={() => addMeterai("addMeterai")}
                  >
                    E-Meterai
                  </button>
                </div>
                <div className="bg-darkgray-2 text-xs shadow-md text-black pembubuhan-2">
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
                      <div ref={ref} className="mb-6">
                        <div className="canvas-wrapper">
                          <canvas id="canvasMeterai" className="z-2">
                            <img
                              src={meteraiImg}
                              id="meterai"
                              className="z-2 img-canvas"
                              alt="meterai"
                            />
                          </canvas>
                        </div>
                        <div className="canvas-wrapper">
                          <canvas id="canvasTtd" className="z-2">
                            <img
                              src={ttdImage}
                              id="ttd"
                              className="z-2 img-canvas"
                              alt="ttd"
                            />
                          </canvas>
                        </div>
                        <Document
                          file={ajbDoc}
                          // file={b64}
                          onLoadSuccess={onDocumentLoadSuccess}
                        >
                          <Page pageNumber={pageNumber}></Page>
                        </Document>
                      </div>
                      {btnConfirm ? (
                        <div className="flex min-w-full mb-4">
                          <button
                            className="bg-blue text-white w-full rounded-md text-center py-2 m-2 ml-6"
                            onClick={handlePembubuhan}
                          >
                            Bubuhkan
                          </button>
                          <button
                            className="bg-red-400 text-white w-full rounded-md text-center py-2 m-2 mr-6"
                            onClick={() => addMeterai("cancel")}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FormGroup>
    </>
  );
};

export default Step6;
