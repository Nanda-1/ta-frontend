import React, { useContext, useState } from "react";
import OtpInput from "react-otp-input";

// Context
import { MyAjbContext } from "Context/AjbContext";

export default function OtpModal() {
  const { otpModal, functions, setLoadingFile } = useContext(MyAjbContext);

  const { otpTandaTangan } = functions;
  const [kodeOtp, setKodeOtp] = useState("");

  const handleChange = (event) => {
    setKodeOtp(event);
  };

  const handleSubmit = () => {
    setLoadingFile(true);
    otpTandaTangan(kodeOtp);
  };

  var val = localStorage.getItem("dataPPAT");
  var object = JSON.parse(val);

  return (
    <>
      {otpModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none"
            //   onClick={() => setOtpModal(false)}
          >
            <div className="relative w-auto my-2 mx-auto">
              {/*content*/}
              {/* <form> */}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white ">
                {/*body*/}
                <div className="relative p-6 px-12 flex-col text-blue font-roboto">
                  <label className="block text-center text-blue text-xl font-bold mb-4">
                    Bubuhkan Dokumen
                  </label>
                  <label className="text-md text-black block text-center py-10">
                    Saya {object.nama}, Saya Menyetujui Dokumen Ini
                  </label>
                  <OtpInput
                    inputStyle="otpInput"
                    value={kodeOtp}
                    onChange={handleChange}
                    numInputs={6}
                    isInputNum={true}
                    name="otp"
                  />
                </div>
              </div>
              <button
                onClick={handleSubmit}
                className="text-white float-right cursor-pointer text-xs bg-blue mt-2 border-blue rounded-lg background-transparent font-bold px-6 py-2 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              >
                Bubuhkan
              </button>
              {/* </form> */}
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
