import React, { useContext, useState } from "react";
import OtpInput from 'react-otp-input';

// Context
import { MyAphtcontext } from "Context/AphtContext";
import swal from "sweetalert";

export default function OtpModalApht() {
    const { otpModal, setOtpModal, setConfirmModal } = useContext(MyAphtcontext)
    const [kodeOtp, setKodeOtp] = useState()

  const handleChange = (event) => {
      setKodeOtp(event);
    }

    const handleSubmit = () => {
      // otpNumber(...otp)
      if(kodeOtp === '123456'){
        setOtpModal(false)
        setConfirmModal(true)

        return false
      }else{
        swal("OTP Salah", "Silahkan Masukkan Kode OTP Yang Benar", "error");
        // setTtdDigital(true)
        setOtpModal(false)
        return false
      }
    }

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
            <form onSubmit={handleSubmit}>
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white ">
              {/*body*/}
              <div className="relative p-6 px-12 flex-col text-blue font-roboto">
              <label className="block text-center text-blue text-xl font-bold mb-4">
                    Pembubuhan Meterai
                </label>
                <label className="text-xs text-black block text-center py-10">
                    Saya Menyetujui Dokumen Ini
                </label>
                <OtpInput
                inputStyle="otpInput"
                        value={kodeOtp}
                        onChange={handleChange}
                        numInputs={6}
                        isInputNum={true}
                        name='otp'
                    />
                </div>
            </div>
            <input
              className="text-white float-right cursor-pointer text-xs bg-blue mt-2 border-blue rounded-lg background-transparent font-bold px-6 py-2 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="submit" value='Meterai'
              />
              <button
                className="text-blue float-right text-xs cursor-pointer bg-white mt-2 border-blue rounded-lg background-transparent font-bold px-6 py-2 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setOtpModal(false)}
                >
                Batalkan
              </button>
            </form>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
      ) : null}
    </>
  );
}