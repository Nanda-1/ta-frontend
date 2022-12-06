import React, { useContext, useEffect, useRef, useState } from "react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import { useHistory } from "react-router";
import { MySuratKuasaContext } from "Context/SuratKuasaContext";
import { fabric } from "fabric";
import OtpModal from "components/Modals/OTP";
import OtpTtd from "components/Modals/PTSL/OtpTtd";
import ModalDokumen from "components/Modals/ModalDokumen";
import MeteraiImg from "../../../assets/img/signature/meterai.png";

const StampingSuratKuasa = () => {
  const {
    filePtsl,
    setLoading,
    getDokumen,
    ttdImage,
    getTtdImage,
    dataPtsl,
    addTandaTangan,
    setDataPtsl,
    addMeterai,
    loading,
  } = useContext(MySuratKuasaContext);

  const [btnConfirmTtd, setBtnConfirmTtd] = useState(false);
  const [btnConfirmMeterai, setBtnConfirmMeterai] = useState(false);

  const history = useHistory();

  if (ttdImage === "") {
    getTtdImage();
  }

  useEffect(() => {
    getDokumen("surat_kuasa");
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

  const handlePembubuhan = () => {
    setBtnConfirmTtd(false);
    setLoading(true);
    addTandaTangan();
  };

  const handlePembubuhan2 = () => {
    setBtnConfirmMeterai(false);
    setLoading(true);
    addMeterai();
  };

  const addTtd = (data) => {
    // setMeterai(true)
    setBtnConfirmTtd(true);

    var canvas = new fabric.Canvas("canvasTtd", {
      preserveObjectStacking: true,
    });
    canvas.setDimensions({
      width: ref.current.clientWidth,
      height: ref.current.clientHeight,
    });

    var eTtd = document.getElementById("ttd");

    var imgTtd = new fabric.Image(eTtd, {
      preserveObjectStacking: true,
      hasControls: false,
      hasBorders: false,
      scaleX: 0.45,
      scaleY: 0.7,
    });

    if (data !== "cancel") {
      canvas.add(imgTtd);
    } else {
      canvas.clear();
      canvas.dispose();
      setBtnConfirmTtd(false);
    }

    canvas.on("object:moving", function (e) {
      var obj = e.target;

      let lower_x_coord = obj.setCoords().oCoords.bl.x;
      let lower_y_coord = canvas.getHeight() - obj.setCoords().oCoords.bl.y;
      let upper_x_coord = obj.setCoords().oCoords.tr.x;
      let upper_y_coord = canvas.getHeight() - obj.setCoords().oCoords.tr.y;

      setDataPtsl({
        ...dataPtsl,
        llx: Math.round(lower_x_coord).toString(),
        lly: Math.round(lower_y_coord).toString(),
        urx: Math.round(upper_x_coord).toString(),
        ury: Math.round(upper_y_coord).toString(),
        page: pageNumber.toString(),
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

  const stampMeterai = (data) => {
    // setMeterai(true)
    setBtnConfirmMeterai(true);

    var canvas = new fabric.Canvas("canvasMeterai", {
      preserveObjectStacking: true,
    });
    canvas.setDimensions({
      width: ref.current.clientWidth,
      height: ref.current.clientHeight,
    });

    var eMeterai = document.getElementById("meterai");

    var imgMeterai = new fabric.Image(eMeterai, {
      preserveObjectStacking: true,
      hasControls: false,
      hasBorders: false,
      scaleX: 0.8,
      scaleY: 0.8,
    });

    if (data !== "cancel") {
      canvas.add(imgMeterai);
    } else {
      canvas.clear();
      canvas.dispose();
      setBtnConfirmMeterai(false);
    }

    canvas.on("object:moving", function (e) {
      var obj = e.target;

      let lower_x_coord = obj.setCoords().oCoords.bl.x;
      let lower_y_coord = canvas.getHeight() - obj.setCoords().oCoords.bl.y;
      let upper_x_coord = obj.setCoords().oCoords.tr.x;
      let upper_y_coord = canvas.getHeight() - obj.setCoords().oCoords.tr.y;

      setDataPtsl({
        ...dataPtsl,
        llx: Number(lower_x_coord),
        lly: Number(lower_y_coord),
        urx: Number(upper_x_coord),
        ury: Number(upper_y_coord),
        page: pageNumber.toString(),
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

  return (
    <>
      {loading ? <ModalDokumen /> : null}
      {OtpModal ? <OtpTtd /> : null}
      <div className="flex content-center items-center justify-center h-full mt-20">
        <div className="w-full lg:w-8/12 px-1">
          {/* <form onSubmit={addDokumen}> */}
          <div className="relative flex min-w-0 break-words w-full mb-6 justify-between">
            <div className="rounded-t mb-0 lg:w-12/12 text-grey shadow-lg mr-6 w-full rounded-lg border-0">
              <div className="text-white text-right bg-darkgray py-2 px-6 pembubuhan shadow-md font-bold font-sans">
                <button
                  className="bg-blue px-6 py-2 rounded-md mr-2 text-xs"
                  onClick={() => stampMeterai("addMeterai")}
                >
                  E-Meterai
                </button>
                <button
                  className="bg-blue px-6 py-2 rounded-md text-xs"
                  onClick={() => addTtd("addTtd")}
                >
                  Tanda Tangan
                </button>
              </div>
              <div className="mb-6 px-6 py-6">
                <div className="flex w-full justify-center py-2 ">
                  <button
                    type="button"
                    disabled={pageNumber <= 1}
                    onClick={previousPage}
                    className={`rounded-md text-grey px-2 py-1 ml-3 ${
                      pageNumber === 1
                        ? "bg-darkgray"
                        : "bg-white text-black border-black"
                    }`}
                  >
                    Previous
                  </button>
                  <p className="text-black px-3 py-1 font-semibold">
                    Page {pageNumber || (numPages ? 1 : "--")} of{" "}
                    {numPages || "--"}
                  </p>
                  <button
                    type="button"
                    disabled={pageNumber >= numPages}
                    onClick={nextPage}
                    className={`rounded-md text-grey px-4 py-1 ml-3 ${
                      pageNumber === numPages
                        ? "bg-darkgray"
                        : "bg-white text-black border-black"
                    }`}
                  >
                    Next
                  </button>
                </div>
                <div
                  ref={ref}
                  id="pdf-wrapper"
                  style={{
                    width: "fit-content",
                    margin: "0 auto",
                    marginTop: "1rem",
                  }}
                >
                  <div
                    className="canvas-wrapper"
                    style={{ position: "absolute" }}
                  >
                    <canvas
                      id="canvasMeterai"
                      className="z-2 border-blue"
                      style={{ zIndex: "2" }}
                    >
                      <img
                        src={MeteraiImg}
                        id="meterai"
                        className="z-2"
                        alt="meterai"
                        style={{
                          display: "none",
                          position: "inherit",
                          width: '300% !important'
                        }}
                      />
                    </canvas>
                  </div>
                  <div
                    className="canvas-wrapper"
                    style={{ position: "absolute" }}
                  >
                    <canvas
                      id="canvasTtd"
                      className="z-2"
                      style={{ zIndex: "2" }}
                    >
                      <img src={ttdImage} id="ttd" className="z-2" alt="ttd" />
                    </canvas>
                  </div>
                  <Document
                    file={filePtsl}
                    onLoadSuccess={onDocumentLoadSuccess}
                  >
                    <Page pageNumber={pageNumber}></Page>
                  </Document>
                </div>
                {btnConfirmTtd ? (
                  <div className="flex min-w-full mb-4">
                    <button
                      className="bg-blue text-white w-full rounded-md text-center text-xs py-2 m-2 ml-6"
                      onClick={handlePembubuhan}
                    >
                      Bubuhkan
                    </button>
                    <button
                      className="bg-red-400 text-white w-full rounded-md text-center text-xs py-2 m-2 mr-6"
                      onClick={() => addTtd("cancel")}
                    >
                      Cancel
                    </button>
                  </div>
                ) : null}
                {btnConfirmMeterai ? (
                  <div className="flex min-w-full mb-4">
                    <button
                      className="bg-blue text-white w-full rounded-md text-center text-xs py-2 m-2 ml-6"
                      onClick={handlePembubuhan2}
                    >
                      Bubuhkan
                    </button>
                    <button
                      className="bg-red-400 text-white w-full rounded-md text-center text-xs py-2 m-2 mr-6"
                      onClick={() => stampMeterai("cancel")}
                    >
                      Cancel
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default StampingSuratKuasa;
