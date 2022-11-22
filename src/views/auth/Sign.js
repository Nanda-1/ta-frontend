import React, { useState, useRef, useContext } from "react";
import { fabric } from "fabric";
// import { useHistory } from "react-router";
// import { FormGroup } from "reactstrap";
import { RegistContext } from "views/auth/RegistContext";
import cookies from "js-cookie";
import swal from "sweetalert";

import { Link } from "react-router-dom";
import ModalDokumen from "components/Modals/ModalDokumen";

export default function Sign() {
  // const history = useHistory();
  const { inputRegist, setInputRegist, refreshToken,  functions } =
    useContext(RegistContext);

  const { getTTD } = functions;

  //Show Spinner
  // eslint-disable-next-line no-unused-vars
  const [load, setLoad] = useState(false);
  //Show Modal
  // eslint-disable-next-line no-unused-vars
  const [showModal, setShowModal] = useState(false);
  //Disable Button Simpan
  const [disable, setDisable] = useState(true);

  //** Testing Section **//
  const [isShow, setShow] = React.useState(false);
  const [defaults, setDefaults] = React.useState(true);

  // var val = localStorage.getItem("dataPPAT");
  // var object = JSON.parse(val);

  const handleToggle = () => {
    setShow(true);
    setDefaults(false);
    setDisable(true);
  };

  const ref = useRef(null);
  //ttd image upload
  // const [ttd, setttd] = React.useState({ previewttd: "", rawttd: "" });


  // const uploadttdPreview = (e) => {
  //   let specimen_tdtgn_file = "specimen_tdtgn_file";
  //   let getttd = e.target.files[0];
  //   let typeDoc = e.currentTarget.files[0].type;
  //   if (e.currentTarget.files.length) {
  //     if (typeDoc === "image/png") {
  //       setttd({
  //         previewttd: URL.createObjectURL(e.currentTarget.files[0]),
  //         rawttd: e.currentTarget.files[0],
  //       });
  //       setInputRegist({ ...inputRegist, [specimen_tdtgn_file]: getttd });
  //       cookies.set(specimen_tdtgn_file, getttd);
  //       console.log(inputRegist);
  //       setDisable(false);
  //     } else {
  //       swal({
  //         title: "Gagal!",
  //         text: "Format Dokumen Tidak Sesuai",
  //         icon: "warning",
  //       });
  //       setDisable(true);
  //     }
  //   } else if (getttd && !getttd.name) {
  //     swal({
  //       title: "Gagal!",
  //       text: "Harap upload spesimen tandatangan Anda terlebih dahulu",
  //       icon: "warning",
  //     });
  //     setDisable(true);
  //   }
  // };

  //** Canvas Section **//
  const [undoSteps, setUndoSteps] = useState({});
  const [undo, setUndo] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);

  const canvas = new fabric.Canvas(document.getElementById("canvasId"));
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  canvas.setDimensions({
    width: ref.current?.clientWidth,
    height: ref.current?.clientHeight + 50,
  });

  canvas.isDrawingMode = true;

  canvas.freeDrawingBrush.width = 3;
  canvas.freeDrawingBrush.color = "#000000";

  var cw = canvas.width;
  var ch = canvas.height;
  var context = canvas.getContext("2d");

  context.clearRect(0, 0, cw, ch);
  context.lineCap = "round";
  context.strokeStyle = "black";
  context.lineWidth = 5;
  contextRef.current = context;

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    const temp = {
      ...undoSteps,
      [undo + 1]: [],
    };
    temp[undo + 1].push({ offsetX, offsetY });
    setUndoSteps(temp);
    setUndo(undo + 1);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
    setDisable(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      setDisable(false);
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    const temp = {
      ...undoSteps,
    };
    temp[undo].push({ offsetX, offsetY });
    setUndoSteps(temp);
  };

  //hapus semua canvas
  const resetCanvas = (event) => {
    event.preventDefault();
    canvas.clear();
  };

  //undo canvas
  const undoCanvas = (event) => {
    event.preventDefault();

    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    var object = canvas.item(canvas.getObjects().length - 1);
    canvas.remove(object);
  };

  const groupthem = () => {
    var objs = [];
    //get all the objects into an array
    objs = canvas._objects.filter(function (obj) {
      return obj;
    });

    //group all the objects
    var alltogetherObj = new fabric.Group(objs, {
      // top: 200,
      // left: 250,
      hasControls: false,
      hasBorders: false,
      lockMovementX: true,
      lockMovementY: true,
      hoverCursor: "default",
      selectable: true,
      originX: "center",
      originY: "center",
    });

    var object = canvas.item(canvas.getObjects().length - 1);
    canvas.remove(object);

    canvas.add(alltogetherObj);
    canvas.renderAll();
  };

  //save canvas
  const save = () => {
    setLoad(true);
    groupthem();
    canvas.isDrawingMode = false;

    var reSign = canvas
      .toDataURL("image/png")
      .replace("img/png", "image/octet-string");

    let specimen_tdtgn_file = "specimen_tdtgn_file";
    const contentType = "image/png";
    var base64result = reSign.substring(reSign.indexOf(",") + 1);
    var str = Buffer.from(base64result);
    const blob = b64toBlob(str, contentType);
    const blobUrl = URL.createObjectURL(blob);
    canvas.item.lockMovementX = true;
    canvas.item.lockMovementY = true;
    var blobs = new Blob([blob], {
      type: "image/png",
    });
    let nama = cookies.get("nama");
    var fileOfBlob = new File([blobs], "ttd_" + nama + ".png");
    setInputRegist({ ...inputRegist, [specimen_tdtgn_file]: fileOfBlob });

    setLoad(true);

    canvas.on("object:moving", function (e) {
      var obj = e.target;

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
    setTimeout(() => {
      sendLengkapiDiri(fileOfBlob);
      setLoad(true);
      sendRegistCA();
    }, 5000);

    let img = new Image();
    //edited from
    // img.crossOrigin = "anonymous";
    img.src = blobUrl;
    //edited end
    context.fillRect(100, 100, 100, 100);
    context.drawImage(img, 0, 0, 100, 100);
  };

  //checking signing size
  const handleChange = (event) => {
    let typeOfInput = event.target.value;
    let name = event.target.name;

    setInputRegist({ ...inputRegist, [name]: typeOfInput });

    let getttd = event.target.files[0];
    let sizeDoc = event.currentTarget.files[0].size;
    if (getttd) {
      if (sizeDoc === "1192") {
        swal({
          title: "Gagal!",
          text: "Harap gambar spesimen tandatangan Anda terlebih dahulu",
          icon: "warning",
        });
        setDisable(true);
      }
    } else if (sizeDoc > "1192") {
      swal({
        title: "Berhasil!",
        text: "Done",
        icon: "success",
      });
      setDisable(false);
    }
  };

  function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || "";
    sliceSize = sliceSize || 512;
    var byteCharacters = atob(b64Data);
    var byteArrays = [];
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);
      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  const sendLengkapiDiri = (fileOfBlob) => {
    setLoad(true);
    // event.preventDefault();
    let myHeaders = new Headers();
    myHeaders.append("Cookie", "REVEL_FLASH=");
    myHeaders.append("Authorization", "Bearer " + cookies.get("token"));

    let formdata = new FormData();
    formdata.append("uid", cookies.get("uid"));
    formdata.append("specimen_tdtgn_file", fileOfBlob);
    formdata.append("roles", "ppat");
    // formdata.append("roles", cookies.get("roles"));

    let requestOptions = {
      method: "POST",
      credentials: "same-origin",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };
    fetch(
      process.env.REACT_APP_BACKEND_HOST + "api/lengkapidiri/update",
      requestOptions
    )
      // .then((res) => res.json())
      .then((response) => {
        if (response.status === 401) {
          refreshToken();
        } else {
          return response.json();
        }
      })
      .then((res) => {
        setLoad(false);
        let sukses = res.success;

        if (sukses === false) {
          if (res.error === "user not found") {
            swal({
              title: "Gagal!",
              text: "User tidak ditemukan",
              icon: "warning",
            });
            setLoad(false);
          } else {
            swal({
              title: "Gagal!",
              text: res.error,
              icon: "error",
            });
            setLoad(false);
          }
        } else {
          swal({
            title: "Berhasil",
            text: "Spesimen Tanda Tangan Anda Tersimpan",
            icon: "success",
          });
          getTTD();
        }
      })
      .catch((error) => {
        setLoad(false);
        console.log("error", error);
      });
  };

  const sendRegistCA = () => {
    setLoad(true);
    // event.preventDefault();

    let myHeaders = new Headers();
    myHeaders.append("Cookie", "REVEL_FLASH=");
    myHeaders.append("Authorization", "Bearer " + cookies.get("token"));
    myHeaders.append("Content-Type", "application/json");

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      // headers: { Cookie: "REVEL_FLASH=", "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify({
        email: "nabilah3455@gmail.com",
        // email: cookies.get("email"),
      }),
    };
    fetch(
      process.env.REACT_APP_BACKEND_HOST + "api/ca/register",
      requestOptions
    )
      .then((res) => {
        if (res.status === 401) {
          refreshToken();
        } else {
          return res.json();
        }
      })
      .then((res) => {
        let sukses = res.success;
        setLoad(false);
        if (sukses === false) {
          swal({
            title: "Gagal!",
            text: res.error,
            icon: "error",
          });
          setLoad(false);
        } else if (sukses === true) {
          console.log(res);
          swal({
            title: "Lengkapi Diri Selesai",
            text:
              "Pengisian biodata Anda berhasil. Silahkan lanjutkan untuk menunggu proses verifikasi Certificates of Authentication (CA) dan " +
              res.data,
            icon: "success",
          });
        }
      })
      .catch((error) => {
        setLoad(false);
        console.log("error", error);
      });
  };

  return (
    <>
      {load === true ? <ModalDokumen /> : null}
      <div className="container mx-auto px-2 mt-12 h-auto">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full">
            <div className="relative flex-col break-words w-800-d mb-6 mx-auto shadow-lg rounded-lg bg-white border-0">
              <div className="rounded-t mt-8 px-6 py-6">
                <div className="text-center mb-2">
                  <h1 className="text-blue-500 text-xl font-bold">
                    Gambar Tanda Tangan
                  </h1>
                </div>
                <div className="text-coolGray-900 text-center text-xs">
                  Spesimen Tanda Tangan diperlukan <br />
                  untuk memverifikasi identitas Anda.
                </div>
              </div>
              <div className="space-y-4">
                <span className="flex w-auto ml-12 mx-auto mb-2 mt-0">
                  <ul className="w-full">
                    <li>
                      <Button
                        label=" Gambar"
                        onClick={handleToggle}
                        className="far fa-edit get-started shadow text-white px-4 py-2 rounded-lg outline-none focus:outline-none mr-1 bg-blue-500 active:bg-blue-500 text-xs hover:shadow-lg ease-linear transition-all duration-150 disabled:opacity-button"
                      />
                    </li>
                  </ul>
                </span>
                {defaults && (
                  <span className="flex h-55-d w-auto ml-12 mr-12 mx-auto border-2 border-blue-400 border-dashed rounded">
                    {/* grid */}
                    <div className="grid grid-cols-6 gap-2">
                      <div className="col-start-1 col-span-6"></div>
                      <div className="col-start-1 col-end-3 mx-auto center ml-cust-d">
                        <ul className="flex flex-1 flex-wrap mt-px">
                          <li
                            id="empty"
                            className="h-full w-full text-center flex flex-col justify-center items-center"
                          >
                            <div className="mx-auto my-auto h-44 w-80">
                              <img
                                className="flex mx-auto align-middle h-36 w-auto pt-2"
                                src={require("assets/img/ttd.png").default}
                                alt="no data"
                              />
                              <br />
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </span>
                )}
                <div>
                  {isShow && (
                    <span className="flex h-55-d w-auto ml-12 mr-12 mx-auto border-2 border-blue-400 border-dashed rounded">
                      {/* grid border-1 border-blue-400*/}
                      <div className="">
                        <div className="">
                          <span className="flex-1 w-full">
                            <ul className="flex">
                              <li>
                                <button
                                  type="button"
                                  onClick={resetCanvas}
                                  className="get-started justify-center text-black px-4 py-2 rounded-lg outline-none focus:outline-none mr-1 bg-white active:bg-blue-500 text-xs shadow hover:shadow-lg ease-linear transition-all duration-150"
                                >
                                  <i className="fas fa-trash"></i>
                                </button>
                              </li>
                              <li className="pl-customine text-right">
                                <button
                                  type="button"
                                  onClick={undoCanvas}
                                  className="get-started justify-center text-black px-4 py-2 rounded-lg outline-none focus:outline-none mr-1 bg-white active:bg-blue-500 text-xs shadow hover:shadow-lg ease-linear transition-all duration-150 place-self-end"
                                >
                                  <i className="fas fa-redo-alt"></i>
                                </button>
                              </li>
                            </ul>
                          </span>
                        </div>

                        <div className="" ref={ref}>
                          <label>
                            <canvas
                              id="canvasId"
                              name="canvasId"
                              onMouseDown={startDrawing}
                              onMouseUp={finishDrawing}
                              onMouseMove={draw}
                              ref={canvasRef}
                              onChange={handleChange}
                            ></canvas>
                          </label>
                        </div>
                      </div>
                    </span>
                  )}
                </div>

                <p className="text-center text-sm pt-2 w-auto px-10 mx-auto">
                  Gambar tanda tangan Anda pada kotak diatas
                </p>
              </div>
              <div className="text-center mt-6 w-auto ml-12 mr-12 mx-auto">
                <button
                  type="button"
                  className={`${
                    disable ? "opacity--d bg-gray-d " : "bg-blue-500 "
                  } opacity--d bg-gray-d text-white active:bg-sky-500 text-sm px-4 py-2 rounded-xl shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150`}
                  onClick={disable ? null : save}
                >
                  Simpan
                </button>

                {showModal ? (
                  <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                      <div className="relative w-800-d my-6 mx-auto max-w-3xl">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                          {/*header*/}
                          <div className="flex items-start justify-center rounded-t">
                            <h3 className="text-2xl font-semibold text-blue-500 pt-7">
                              Lengkapi Diri Selesai
                            </h3>
                          </div>
                          <img
                            className="mx-auto my-4 align-middle h-24 w-24 bg-fix"
                            src={
                              require("assets/img/ic_konfirmasiemail.png")
                                .default
                            }
                            alt="no data"
                          />
                          <p className="mb-8 text-blueGray-500 text-sm text-center">
                            Anda telah selesai melakukan registrasi.
                            <br />
                            Kami akan memproses verifikasi data Anda selama
                            60-120 menit.
                            <br />
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                  </>
                ) : null}
              </div>
              <hr className="mt-8 border-0 pt-2" />
            </div>
            <div className="relative flex flex-wrap my-6 w-800-d mx-auto">
              <div className="w-1/2"></div>
              <div className="w-1/2 text-right">
                <Link to="/modal3">
                  <button
                    // onClick={uploadSK}
                    className="get-started text-white font-bold px-6 py-3 rounded-lg outline-none focus:outline-none mr-1 mb-1 bg-blue-500 active:bg-blue-500 text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                  >
                    Lanjutkan
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="pb-16"></p>
    </>
  );
}

const Button = ({ className, label, onClick }) => {
  return (
    <button
      id="buttonTTD"
      className={className}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  );
};
