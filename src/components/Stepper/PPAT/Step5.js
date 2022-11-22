import React, { useState, useRef, useContext } from "react";
import { fabric } from "fabric";
import { FormGroup } from "reactstrap";
import { RegistContext } from "views/auth/RegistContext";
import cookies from "js-cookie";
import swal from "sweetalert";
// import { Link } from "react-router-dom";
// import { Imag } from "@tensorflow/tfjs";

const Step5 = (props) => {
  const { inputRegist, setInputRegist } = useContext(RegistContext);

  //Show Spinner
  // eslint-disable-next-line no-unused-vars
  const [load, setLoad] = useState(false);
  //Show Modal
  const [showModal, setShowModal] = React.useState(false);
  //canvas
  // eslint-disable-next-line no-unused-vars
  const [show, setShow] = useState(false);
  //default ttd
  // eslint-disable-next-line no-unused-vars
  const [dont, setDont] = useState(true);
  //disable button gambar
  // eslint-disable-next-line no-unused-vars
  const [disabled, setDisabled] = useState(false);
  //Hide/Show Span Div
  const [hidden, setHidden] = useState(false);
  //Change button "simpan" or "ulangi"
  const [capturing, setCapturing] = React.useState(false);

  //** Upload TTD Section **//

  //ttd image upload
  const [ttd, setttd] = React.useState({ previewttd: "", rawttd: "" });

  const unggah = (e) => {
    setHidden(false);
  };

  const uploadttdPreview = (e) => {
    if (e.currentTarget.files.length) {
      let name = "nik_photo";
      let getttd = e.target.files[0];
      let typeDoc = e.currentTarget.files[0].type;
      if (
        typeDoc === "image/png" ||
        typeDoc === "image/jpg" ||
        typeDoc === "image/jpeg"
      ) {
        setttd({
          previewttd: URL.createObjectURL(e.currentTarget.files[0]),
          rawttd: e.currentTarget.files[0],
        });
        setInputRegist({ ...inputRegist, [name]: getttd });
        cookies.set(name, getttd);
        console.log(inputRegist);
      } else {
        swal({
          title: "Gagal!",
          text: "Format Dokumen Tidak Sesuai",
          icon: "warning",
        });
      }
    }
  };

  //** Canvas Section **//
  const [undoSteps, setUndoSteps] = useState({});
  const [undo, setUndo] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  //Get image from canvas
  // eslint-disable-next-line no-unused-vars
  const [imagess, setImagess] = useState(false);

  const canvas = new fabric.Canvas(document.getElementById("canvasId"));
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

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

  const showCanvas = (e) => {
    e.preventDefault();
    setHidden(true);
    // setDisabled(true);
    // setShow(true);
    // setDont(false);
    // setImage(false);
    // setImagess(false);
    // document.getElementById("upload-button").disabled = true;
    // document.getElementById("new").hidden = true;
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

  //gambar ulang/reset canvas
  const redraw = (e) => {
    setCapturing(false);
    // canvas.clear();
    // canvas.dispose();
    // canvas.remove(canvas.getActiveObject());
    // canvas.getActiveObject().remove();
    // var activeObject = canvas.getActiveObject();
    // if (activeObject) {
    //   canvas.remove(activeObject);
    // }
    // var curSelectedObjects = canvas.getObjects(canvas.getActiveObject);

    // canvas.discardActiveObject();
    // for (var i = 0; i < curSelectedObjects.length; i++) {
    //   canvas.remove(curSelectedObjects[i]);
    // }
    // canvas.clear().renderAll();
    canvas.isDrawingMode = true;
    // setHidden(false);
    // testFaceAPI();
    // canvas.calcOffset();
  };

  //save canvas
  const save = () => {
    // setImagess(imagess);
    setCapturing(true);
    canvas.isDrawingMode = false;
    // setHidden(true);
    // setDont(true);
    var reSign = canvas
      .toDataURL("image/png")
      .replace("img/png", "image/octet-string");
    console.log(reSign);

    let selfie = "specimen_tdtgn_file";
    const contentType = "image/jpg";
    var base64result = reSign.substring(reSign.indexOf(",") + 1);
    var str = Buffer.from(base64result);
    const blob = b64toBlob(str, contentType);
    const blobUrl = URL.createObjectURL(blob);
    setInputRegist({ ...inputRegist, [selfie]: blobUrl });

    cookies.set(selfie, blob);
    console.log(blobUrl);
    console.log(blob);
    console.log(inputRegist);
    cookies.set("specimen_tdtgn_file", blob);
    //////////////////

    // var geeks = new fabric.Image(blob, {
    //   lockScalingY: true,
    // });
    // canvas.add(geeks);
    // canvas.centerObject(geeks);
    //////////////////////////
    // var imgInstance = new fabric.Image(blob, {
    // });

    // function lockMovementX(){
    // const imgInstance = new fabric.Image(blob, {
    //   lockMovementX: true,
    // });
    // canvas.clear();
    // canvas.add(imgInstance);
    // canvas.centerObject(imgInstance);
    // }
    // lockMovementX();

    // Rendering the image to canvas
    // canvas.add(imgInstance);
    // setImagess(blobUrl);
    canvas.item(0).lockMovementX = true;
    canvas.item(0).lockMovementY = true;
    canvas.item(0).hasControls = canvas.item(0).hasBorders = false;
  };

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
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
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

  // const sendLengkapiDiri = async () => {
  //   // event.preventDefault();
  //   let myHeaders = new Headers();
  //   myHeaders.append("Cookie", "REVEL_FLASH=");
  //   myHeaders.append("Content-Type", "multipart/form-data");

  //   let formdata = new FormData();
  //   formdata.append("uid", cookies.get("uid"));
  //   formdata.append("nama", cookies.get("nama"));
  //   formdata.append("tempat_lahir", cookies.get("tempat_lahir"));
  //   formdata.append("tanggal_lahir", cookies.get("tgl_lahir"));
  //   formdata.append("gender", cookies.get("gender"));
  //   formdata.append("no_nik", cookies.get("nik"));
  //   formdata.append("no_npwp", cookies.get("npwp"));
  //   formdata.append("alamat", cookies.get("alamat"));
  //   formdata.append("prov", cookies.get("id_prov"));
  //   formdata.append("kotkab", cookies.get("id_kota"));
  //   formdata.append("kecamatan", cookies.get("id_camat"));
  //   formdata.append("kodepos", cookies.get("kodepos"));
  //   formdata.append("ppat_name", cookies.get("ppat_name"));
  //   formdata.append("ppat_prov", cookies.get("ppat_prov"));
  //   formdata.append("ppat_kotkab", cookies.get("ppat_kotkab"));
  //   formdata.append("ppat_kecamatan", cookies.get("ppat_kecamatan"));
  //   formdata.append("ppat_alamat", cookies.get("ppat_alamat"));
  //   formdata.append("no_sk_pengangkatan", cookies.get("no_sk_pengangkatan"));
  //   formdata.append("tgl_sk", cookies.get("tgl_sk"));
  //   formdata.append("email_karyawan", cookies.get("email_karyawan"));
  //   formdata.append("jabatan_karyawan", cookies.get("jabatan_karyawan"));
  //   formdata.append("nik_photo", cookies.get("nik_photo"));
  //   formdata.append("npwp_photo", cookies.get("npwp_photo"));
  //   formdata.append("roles", "");
  //   formdata.append("sk_pengangkatan", cookies.get("sk_pengangkatan"));
  //   formdata.append("status_nikah", cookies.get("status"));
  //   formdata.append("self_photo", cookies.get("self_photo"));
  //   formdata.append("self_video", cookies.get("self_video"));
  //   formdata.append("specimen_tdtgn_file", cookies.get("specimen_tdtgn_file"));

  //   let requestOptions = {
  //     method: "POST",
  //     credentials: "same-origin",
  //     headers: myHeaders,
  //     body: formdata,
  //     redirect: "follow",
  //   };

  //   // try {
  //   // setLoad(true);

  //   await fetch(
  //     process.env.REACT_APP_BACKEND_HOST + "api/lengkapidiri/update",
  //     requestOptions
  //   )
  //     .then((res) => res.json())
  //     .then((res) => {
  //       let data = res.data;
  //       let sukses = res.success;

  //       if (data === null && sukses === false) {
  //         if (res.error === "user not found") {
  //           swal({
  //             title: "Gagal!",
  //             text: "User tidak ditemukan",
  //             icon: "warning",
  //           });
  //           setLoad(false);
  //         } else {
  //           swal({
  //             title: "Gagal!",
  //             text: res.error,
  //             icon: "error",
  //           });
  //         }
  //         setLoad(false);
  //         console.log(res);
  //         console.log(formdata);
  //         console.log(false);

  //       } else if (sukses === true) {
  //         console.log(res);
  //         console.log(formdata);
  //         console.log(true);
  //         setLoad(false);
  //         setShowModal(true);
  //       }
  //     })
  //     .catch((error) => {
  //       setLoad(false);
  //       console.log("error", error);
  //     });
  //   // } catch (err) {
  //   //   // error handling code
  //   // }
  // };

  if (props.currentStep !== 1) {
    return null;
  }

  return (
    <>
      {load === true ? (
        <>
          <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-25-d flex flex-col items-center justify-center">
            <div className="loader ease-linear rounded-full border-4 border-t-4 h-36 w-36 mb-4"></div>
          </div>
        </>
      ) : null}
      <p className="pt-10"></p>
      <FormGroup>
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
                  <button
                    type="button"
                    id="button1"
                    disabled={disabled}
                    onClick={showCanvas}
                    className="get-started shadow text-white px-4 py-2 rounded-lg outline-none focus:outline-none mr-1 bg-blue-500 active:bg-blue-500 text-xs shadow hover:shadow-lg ease-linear transition-all duration-150 disabled:opacity-button"
                    img={require("assets/img/pemerintah.png").default}
                    // value="PPAT"
                  >
                    <i className="far fa-edit"></i> Gambar
                  </button>
                  {/* <label
                    htmlFor="button1"
                    className="labels active:bg-sky-500 text-blue-500 text-xs justify-center text-center my-auto h-8 w-24 mr-1"
                  >
                    Gambar
                  </label> */}
                </li>
                <li>
                  <button
                    type="button"
                    id="button1"
                    disabled={disabled}
                    onClick={unggah}
                    className="get-started shadow text-black px-4 py-2 rounded-lg outline-none focus:outline-none mr-1 bg-white border-blue-500 active:bg-blue-500 text-xs shadow hover:shadow-lg ease-linear transition-all duration-150 disabled:opacity-button"
                    img={require("assets/img/pemerintah.png").default}
                    // value="PPAT"
                  >
                    <i className="far fa-file-image"></i> Unggah
                  </button>
                </li>
              </ul>
            </span>

            {hidden === true ? (
              <span className="flex h-55-d w-auto ml-12 mr-12 mx-auto border-2 border-blue-400 border-dashed rounded">
                {/* grid */}
                <div className="grid grid-cols-6 gap-2">
                  <div className="col-start-1 col-span-6 border-1 border-blue-400">
                    <span className="flex-1 w-full">
                      <ul className="flex">
                        <li>
                          <button
                            type="button"
                            // disabled={undo === 0}
                            onClick={resetCanvas}
                            className="get-started shadow justify-center text-black px-4 py-2 rounded-lg outline-none focus:outline-none mr-1 bg-white active:bg-blue-500 text-xs shadow hover:shadow-lg ease-linear transition-all duration-150"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </li>
                        <li className="pl-customine text-right">
                          <button
                            type="button"
                            // disabled={undo === 0}
                            onClick={undoCanvas}
                            className="get-started shadow justify-center text-black px-4 py-2 rounded-lg outline-none focus:outline-none mr-1 bg-white active:bg-blue-500 text-xs shadow hover:shadow-lg ease-linear transition-all duration-150 place-self-end"
                          >
                            <i className="fas fa-redo-alt"></i>
                          </button>
                        </li>
                      </ul>
                    </span>
                  </div>

                  <div className="col-start-1 col-end-3 border-1 border-blue-400 mx-auto center ml-12">
                    <ul className="flex flex-1 flex-wrap mt-px">
                      <li
                        id="empty"
                        className="h-full w-full text-center flex flex-col items-center justify-center items-center"
                      >
                        <div
                          className="h-50 w-72 mx-auto my-auto bg-fix"
                          id="rightside"
                        >
                          <label>
                            {/* {dont && (
                              <img
                                className="mx-auto my-auto mt-2 h-36 w-72 bg-fix"
                                src={require("assets/img/ttd.png").default}
                                alt="no data"
                                id="imgttd"
                              />
                            )} */}
                            {/* {show && ( */}
                            <canvas
                              id="canvasId"
                              className="canvashd mt-4 h-ttd pr-12 border-2 border-blue-400"
                              onMouseDown={startDrawing}
                              onMouseUp={finishDrawing}
                              onMouseMove={draw}
                              ref={canvasRef}
                            ></canvas>
                            {/* )} */}
                            {/* {imagess ? (
                              <img
                                src={imagess}
                                alt=""
                                className="canvashd mt-4 h-ttd pr-12 border-2 border-blue-400"
                              />
                            ) : (
                              <canvas
                                id="canvasId"
                                className="canvashd mt-4 h-ttd pr-12 border-2 border-blue-400"
                                onMouseDown={startDrawing}
                                onMouseUp={finishDrawing}
                                onMouseMove={draw}
                                ref={canvasRef}
                              ></canvas>
                            )} */}
                          </label>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </span>
            ) : (
              <span className="flex h-55-d w-auto ml-12 mr-12 mx-auto border-2 border-blue-400 border-dashed rounded">
                {/* grid */}
                <div className="grid grid-cols-6 gap-2">
                  <div className="col-start-1 col-span-6 border-1 border-blue-400"></div>
                  <div className="col-start-1 col-end-3 border-1 border-blue-400 mx-auto center ml-cust-d">
                    <ul className="flex flex-1 flex-wrap mt-px">
                      <li
                        id="empty"
                        className="h-full w-full text-center flex flex-col items-center justify-center items-center"
                      >
                        <div className="mx-auto my-auto h-44 w-80">
                          <label htmlFor="upload-button" required>
                            {ttd.previewttd ? (
                              <img
                                src={ttd.previewttd}
                                alt="dummy1"
                                className="mx-auto my-auto h-44 w-80"
                                name="ttd"
                              />
                            ) : (
                              <>
                                <img
                                  className="flex mx-auto align-middle h-36 w-auto pt-2"
                                  src={require("assets/img/ttd.png").default}
                                  alt="no data"
                                />
                                <p className="text-center text-xs pt-2">
                                  Klik disini untuk upload foto ttd Asli di
                                  file.
                                </p>
                              </>
                            )}
                          </label>
                          <input
                            type="file"
                            id="upload-button"
                            name="nik_photo"
                            style={{ display: "none" }}
                            onChange={uploadttdPreview}
                            value={inputRegist.ttd_file}
                          />
                          <br />
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </span>
            )}
            <p className="text-center text-sm pt-2 w-auto px-10 mx-auto">
              Gambar tanda tangan Anda pada kotak diatas atau klik unggah untuk
              upload tanda tangan
            </p>
          </div>
          <div className="text-center mt-6 w-auto ml-12 mr-12 mx-auto">
            {/* <button
              className="bg-blue-500 text-white active:bg-sky-500 text-sm font-bold px-6 py-2 rounded-xl shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
              type="button"
              // onChange={sendLengkapiDiri}
              onClick={save}
              // onClick={() => setShowModal(true)}
            >
              Simpan
            </button> */}
            {capturing ? (
              <button
                type="button"
                id="idRedraw"
                className="bg-blue-500 text-white active:bg-sky-500 text-sm px-4 py-2 rounded-xl shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                onClick={redraw}
              >
                Ulangi
              </button>
            ) : (
              <button
                type="button"
                className="bg-blue-500 text-white active:bg-sky-500 text-sm px-4 py-2 rounded-xl shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                onClick={save}
              >
                Simpan
              </button>
            )}
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
                          require("assets/img/ic_konfirmasiemail.png").default
                        }
                        alt="no data"
                      />
                      <p className="mb-8 text-blueGray-500 text-sm text-center">
                        Anda telah selesai melakukan registrasi.
                        <br />
                        Kami akan memproses verifikasi data Anda selama 60-120
                        menit.
                        <br />
                      </p>
                    </div>
                    <div className="relative flex flex-wrap my-6 w-auto mx-auto">
                      <div className="w-1/2">
                        {/* <Link to="/syarat2">
                              <button className="get-started text-black px-6 py-3 rounded-xl outline-none focus:outline-none mr-1 mb-1 bg-white active:bg-blue-500 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150">
                                Kembali
                              </button>
                            </Link> */}
                      </div>
                      <div className="w-1/2 text-right">
                        {/* <Link to="/"> */}
                        <button
                          onClick={() => setShowModal(false)}
                          className="get-started text-white font-bold px-6 py-3 rounded-xl outline-none focus:outline-none mr-1 mb-1 bg-blue-500 active:bg-blue-500 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                        >
                          Lanjutkan
                        </button>
                        {/* </Link> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
              </>
            ) : null}
          </div>
          <hr className="mt-8 border-0 pt-2" />
        </div>
      </FormGroup>
    </>
  );
};

export default Step5;
