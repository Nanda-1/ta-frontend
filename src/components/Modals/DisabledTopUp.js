import React, { useContext } from "react";

// Context
import { TopUpContext } from "Context/TopUpContext";
import { useHistory } from "react-router";

export default function DisableTopUp() {
  const { backModal, setBackModal } = useContext(TopUpContext);

  const histori = useHistory()

  const backDashboard =() => {
    histori.push('/admin/dashboard')
    setBackModal(false)
  }

  return (
    <>
      {backModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none font-sans">
            <div className="relative w-600-d my-2 mx-auto">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white ">
                {/*body*/}
                <div className="relative p-6 flex-col text-blue font-roboto">
                  <label className="block text-center text-black text-lg font-bold mb-3">
                    Keluar dari halaman Top Up?
                  </label>
                  <label className="text-xs text-black block text-center px-12">
                    Kamu akan keluar dari halaman Top Up dan membatalkan
                    pembelian
                  </label>
                  <button
                    onClick={() => setBackModal(false)}
                    className="text-white w-full cursor-pointer text-sm bg-blue mt-5 rounded-lg font-bold py-3 outline-none focus:outline-none"
                  >
                    Tetap Di Halaman Ini
                  </button>
                  <button
                    onClick={backDashboard}
                    className="text-blue w-full cursor-pointer text-sm border-blue mt-2 rounded-lg font-bold py-3 outline-none focus:outline-none"
                  >
                    Kembali Ke Dasbor
                  </button>
                </div>
              </div>
              {/* </form> */}
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) }
    </>
  );
}
