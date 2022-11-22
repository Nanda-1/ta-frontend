import React, { useContext } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { UserContext } from "Context/UserContext";

import Logo from "assets/img/icon/Forms-rafiki@2x.png";

export default function LengkapiDiriCard() {
  const { lengkapidiri } = useContext(UserContext)
  
  return (
    <>
    {lengkapidiri ?
    <>
    <div
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none"
        >
          <div className="w-auto my-2 mx-auto">
            {/*content*/}
            <div className="rounded-lg shadow-lg flex flex-col w-full bg-white px-12">
              {/*body*/}
              <div className=" p-6 flex-col text-blue">
                <div className="w-full text-center text-2xl font-montserrat text-bold-700">
                  Lengkapi Data Diri
                  <img src={Logo} width='200' className="mx-auto" alt="profil"/>
                </div>
                <div className=" text-black text-xs font-montserrat text-bold-700">
                  <div className="px-3 py-3 text-center mb-6">
                  Silahkan melengkapi data diri Anda <br /> dengan baik dan benar untuk dapat menggunakan <br /> layanan yang kami sediakan.
                  </div>
                  <div className="text-center mb-3">
                    <Link to='/lengkapiDiri/tipe' className='cursor-pointer bg-blue px-12 text-white py-3 rounded-md'>
                      Lanjutkan
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed inset-0 z-40 bg-lengkapidiri"></div>
        </>
        :
        null
      }
      </>
  );
}
