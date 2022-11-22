import React, { useContext, useRef, useState } from "react";
import { FormGroup } from "reactstrap";
import { MyAjbContext } from "Context/AjbContext";
import Webcam from "react-webcam";
import swal from "sweetalert";

const SertifikatTanah = (props) => {
  const { inputAjb, setInputAjb, setAjb, penjual, setPenjual } =
    useContext(MyAjbContext);
  const webcamRef = useRef(null);
  const [capturing, setCapturing] = useState(false);

  const videoConstraints = {
    width: 5000,
    height: 7000,
    facingMode: "user",
  };

  const handleStartCaptureClick = async () => {
    setCapturing(true);
    const getSelfie = webcamRef.current.getScreenshot();
    var base64result = getSelfie.substr(getSelfie.indexOf(",") + 1);
    let name = "sertifikat_tanah";
    setInputAjb({ ...inputAjb, [name]: base64result });
    setAjb({ ...inputAjb });
  };

  const keterangan = [
    {
      text1: "Perhatian :",
      text2: "Gambar identitas & pas foto harus terbaca jelas.",
      text3: "Foto identitas adalah dokumen asli, bukan dokumen fotocopy.",
      text4: "Identitas yang terdaftar adalah data yang masih berlaku.",
    },
  ];

  if (penjual && props.currentStep === "sertifikat_tanah") {
    setPenjual(false);
    swal("Berhasil", "Berhasil membuat data penjual", "success");
  }

  if (props.currentStep !== "sertifikat_tanah") {
    return null;
  }

  return (
    <>
      <FormGroup>
        <div className="flex content-center items-center justify-center h-full mt-20">
          <div className="w-full lg:w-12/12 px-1">
            <div className="relative bg-white flex flex-col px-4 min-w-0 h-auto break-words w-full mb-4 shadow-lg rounded-lg border-0">
              <div className="rounded-tpx-6 text-darkgrey py-2 px-4 text-center">
                {capturing === false ? (
                  <div className="relative w-full mb-6">
                    <label
                      className="block text-center text-blue text-xl font-bold mb-4"
                      htmlFor="grid-password"
                    >
                      Ambil Foto Sertifikat Tanah
                    </label>
                    <label className="text-xs">
                      Data Sertifikat Tanah (Pihak Pertama). <br />
                      Gunakan Sertifikat Tanah Asli
                    </label>
                    <span className="flex mt-4 mb-4">
                      <Webcam
                        ref={webcamRef}
                        screenshotFormat="image/png"
                        videoConstraints={videoConstraints}
                        // width={4000}
                        name="Webcam"
                        id="Webcam"
                        className="w-full"
                      />
                    </span>
                    {keterangan.map((item, i) => {
                      return (
                        <div className="text-left text-xs" key={1}>
                          {item.text1}
                          <ol className="list-decimal-ket pl-3">
                            <li key={"2"}>{item.text2}</li>
                            <li key={"3"}>{item.text3}</li>
                            <li key={"4"}>{item.text4}</li>
                          </ol>
                        </div>
                      );
                    })}
                    <button
                      type="button"
                      className="bg-blue text-white text-sm px-4 py-3 rounded-md shadow outline-none focus:outline-none mt-4 w-full"
                      onClick={handleStartCaptureClick}
                    >
                      Submit
                    </button>
                  </div>
                ) : (
                  <div className="relative w-full mb-6">
                    <label
                      className="block text-center text-blue text-xl font-bold mb-4"
                      htmlFor="grid-password"
                    >
                      Ambil Foto Sertifikat Tanah
                    </label>
                    <label className="text-xs">
                      Data Sertifikat Tanah (Pihak Pertama). <br />
                      Gunakan Sertifikat Tanah Asli
                    </label>
                    <span className="flex mt-4 mb-1">
                      <img
                        src={
                          `data:image/png;base64,` + inputAjb.sertifikat_tanah
                        }
                        alt="sertifikat"
                      />
                    </span>
                    <button
                      type="button"
                      className="bg-green-n text-white text-sm px-4 py-3 mb-2 rounded-md shadow outline-none focus:outline-none mt-4 w-full"
                      onClick={() => setCapturing(false)}
                    >
                      Ganti
                    </button>
                    {keterangan.map((item, i) => {
                      return (
                        <div className="text-left text-xs" key={1}>
                          {item.text1}
                          <ol className="list-decimal-ket pl-3">
                            <li key={"2"}>{item.text2}</li>
                            <li key={"3"}>{item.text3}</li>
                            <li key={"4"}>{item.text4}</li>
                          </ol>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            {/* </form> */}
          </div>
        </div>
      </FormGroup>
    </>
  );
};

export default SertifikatTanah;
