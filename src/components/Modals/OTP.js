import React, { useContext, useState } from "react";
import OtpInput from "react-otp-input";

// Context
import { MyAjbContext } from "Context/AjbContext";
import { useEffect } from "react";

export default function OtpModal({ id }) {
  const { otpModal, functions, setLoadingFile } = useContext(MyAjbContext);

  const { otpTandaTangan } = functions;
  const [kodeOtp, setKodeOtp] = useState("");
  const [getMinute, setGetMinute] = useState(0);
  const [getSecond, setGetSecond] = useState(0);

  const handleChange = (event) => {
    setKodeOtp(event);
  };

  const handleSubmit = () => {
    setLoadingFile(true);
    otpTandaTangan(kodeOtp, id);
  };

  var val = localStorage.getItem("dataPPAT");
  var object = JSON.parse(val);

  // Set the date we're counting down to
  var countDownDate = new Date().getTime() + 15 * 60 * 1000;

  useEffect(() => {
    setInterval(() => {
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now;

      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the result in the element with id="demo"
      if (minutes >= 0) {
        setGetMinute(minutes);
      }

      if (seconds >= 0) {
        setGetSecond(seconds);
      }
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {otpModal && (
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
                    Saya {object.ppat_detail.name}, Saya Menyetujui Dokumen Ini
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
                <p className="text-blueGray-500 text-xs text-center mb-8">
                  Mohon menunggu {getMinute < 10 ? "0" + getMinute : getMinute}{" "}
                  : {getSecond < 10 ? "0" + getSecond : getSecond} untuk
                  melakukan
                  <br /> generate ulang kode OTP yang baru.
                </p>
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
      )}
    </>
  );
}
