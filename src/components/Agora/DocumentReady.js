import React, { useEffect, useRef, useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import Prev from "../../assets/img/icon/prev.png";
import Next from "../../assets/img/icon/nextBtn.png";
import FirstPage from "../../assets/img/icon/firstPage.png";
import LasttPage from "../../assets/img/icon/lastPage.png";
import { fabric } from "fabric";
import ModalDokumen from "components/Modals/ModalDokumen";
import OtpModal from "components/Modals/OTP";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { io } from "socket.io-client";
import swal from "sweetalert";

const DocumentReady = ({
  ajbDoc,
  ttdImage,
  setBtnConfirm,
  btnConfirm,
  inputAjb,
  setInputAjb,
  addTandaTangan,
  loadingFile,
  setLoadingFile,
  otpModal,
  getDokumenAjb,
}) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [disabled, setDisabled] = useState(true);
  const [disabledImg, setDisabledImg] = useState(false);

  let { id } = useParams();

  const val = localStorage.getItem("dataPPAT");
  const object = JSON.parse(val);

  useEffect(() => {
    const socket = io("https://be-ppat-transaction.infinids.id");
    // console.log(socket)

    socket.on("connect", () => {
      console.log(`Connected with ID: ${socket.id}`);
    });

    socket.on(`update document ${id}`, (data) => {
      swal({
        title: "Berhasil",
        text: data.message,
        icon: "success",
      });
      getDokumenAjb();
      setDisabled(!disabled);
    });

    socket.on(`ttd ${id} ${object.email}`, (data) => {
      swal({
        // title: "",
        text: data.message,
        icon: "warning",
      });
      setDisabled(!disabled);
    });
  }, []);

  var elements = [];

  if (numPages !== 0 && elements.length === 0) {
    for (let i = 0; i <= numPages; i++) {
      elements.push({ i });
    }
  }

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

  const changeHalaman = (e) => {
    let value = e.target.value;

    setPageNumber(Number(value));
  };

  const addTtd = (data) => {
    setBtnConfirm(true);

    let docHeight = document.querySelector(
      ".react-pdf__Page__textContent"
    )?.clientHeight;
    let docWidth = document.querySelector(
      ".react-pdf__Page__textContent"
    )?.clientWidth;

    var canvas = new fabric.Canvas("canvasTtd", {
      preserveObjectStacking: true,
    });
    canvas.setDimensions({
      width: docWidth,
      height: docHeight,
    });

    var eSign = document.getElementById("ttd");

    var imgSign = new fabric.Image(eSign, {
      hasControls: false,
      hasBorders: false,
      scaleX: 0.8,
      scaleY: 0.8,
    });

    if (data !== "cancel") {
      canvas.add(imgSign);
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
      // console.log(lower_x_coord, lower_y_coord)

      setInputAjb({
        ...inputAjb,
        llx: lower_x_coord,
        lly: lower_y_coord,
        urx: upper_x_coord,
        ury: upper_y_coord,
      });
      // setInputAjb({ ...inputAjb, [llx]: x_coord, [lly]: y_coord });

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

  const handlePembubuhan = () => {
    setDisabledImg(true);
    setLoadingFile(true);
    addTandaTangan(pageNumber, id);
  };

  const ref = useRef(null);

  return (
    <div className="col" style={{ width: "inherit" }}>
      {loadingFile ? (
        <>
          <ModalDokumen />
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {otpModal ? (
        <>
          <OtpModal id={id} />
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      <div
        className="w-5/12 flex py-2 px-6 bg-white rounded-lg mx-auto justify-between fixed bottom-0 z-10 mb-5 controls"
        style={{ left: "50%", transform: "translate(-79%, 0)" }}
      >
        <div className="flex">
          <img
            alt=""
            src={FirstPage}
            disabled={pageNumber < 2 ? true : false}
            onClick={firstPage}
            className={`mr-4 cursor-pointer ${
              pageNumber !== 1 ? "prev-btn" : ""
            }`}
            style={{ height: 15, alignSelf: "center" }}
          />
          <img
            alt=""
            src={Prev}
            disabled={pageNumber < 2 ? true : false}
            onClick={previousPage}
            className={`mr-4 cursor-pointer ${
              pageNumber !== 1 ? "prev-btn" : ""
            }`}
            style={{ height: 15, alignSelf: "center" }}
          />
          <select
            className="text-xs mr-4 rounded border-gray-400"
            style={{ width: "6rem" }}
            onChange={changeHalaman}
            value={pageNumber}
          >
            {elements.map((el) => {
              return (
                <option value={el.i + 1} key={el.i}>
                  {el.i + 1}/{numPages}
                </option>
              );
            })}
          </select>
          <img
            alt=""
            src={Next}
            disabled={pageNumber >= numPages}
            onClick={nextPage}
            className={`mr-4 cursor-pointer ${
              pageNumber >= numPages ? "next-btn" : ""
            }`}
            style={{ height: 15, alignSelf: "center" }}
          />
          <img
            alt=""
            src={LasttPage}
            disabled={pageNumber >= numPages}
            onClick={lastPage}
            className={`mr-4 cursor-pointer ${
              pageNumber >= numPages ? "next-btn" : ""
            }`}
            style={{ height: 15, alignSelf: "center" }}
          />
        </div>
        {btnConfirm ? (
          <div style={{ alignSelf: "center" }}>
            <button
              className="bg-red-600 text-white py-2 px-8 rounded mr-3"
              onClick={() => addTtd("cancel")}
            >
              Cancel
            </button>
            <button
              className="bg-green-2 text-white py-2 px-12 rounded"
              onClick={handlePembubuhan}
            >
              Bubuhkan
            </button>
          </div>
        ) : (
          <div style={{ alignSelf: "center" }}>
            <button
              className={`text-white py-2 px-12 rounded ${
                disabled ? "bg-gray-d cursor-not-allowed" : "bg-blue"
              }`}
              onClick={() => addTtd("addTtd")}
              // disabled={disabled}
            >
              Tanda Tangan
            </button>
          </div>
        )}
      </div>
      <div
        ref={ref}
        className="pb-6 doc-scroll mx-32"
        style={{
          height: "100vh",
          overflow: "auto",
          position: "fixed",
          padding: "0 10px",
        }}
      >
        <div className="Example__container_pdf">
          <div className="canvas-wrapper">
            <canvas id="canvasTtd" className="z-2 border-black">
              {!disabledImg && (
                <img
                  src={ttdImage}
                  id="ttd"
                  className="z-2 img-canvas"
                  alt="ttd"
                />
              )}
            </canvas>
          </div>
          <Document
            file={ajbDoc}
            onLoadSuccess={onDocumentLoadSuccess}
            className="doc_sign"
          >
            <Page pageNumber={pageNumber}></Page>
          </Document>
        </div>
      </div>
    </div>
  );
};

export default DocumentReady;
