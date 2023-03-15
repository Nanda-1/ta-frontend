import React, { useContext } from "react";

// components
import UserInfo from "components/Cards/UserInfo.js";

// Context
import { UserContext } from "Context/UserContext";
import cookies from "js-cookie";
import ModalDokumen from "components/Modals/ModalDokumen";
import RiwayatPemohon from "components/Cards/RiwayatPemohon";

export default function Dashboard() {
  const { setLengkapidiri, loading } = useContext(UserContext);

  var val = localStorage.getItem("dataPPAT");
  var object = JSON.parse(val);

  // cookies.remove("id_transaksi");
  cookies.remove("step");
  cookies.remove("otp_sms");
  cookies.remove("phone");
  cookies.remove("tipe_otp");
  localStorage.removeItem("dataDiri");

  if (!object.user_detail) {
    setLengkapidiri(true);
  }
  
  return (
    <>
      {loading ? <ModalDokumen /> : null}
      <div className="flex flex-wrap cursor-default">
        <div className="w-full xl:w-12/12 mb-8 xl:mb-2 px-1">
          <UserInfo dataUser={object} />
        </div>
        <div className="w-full xl:w-12/12 mb-8 xl:mb-2 px-1">
          <RiwayatPemohon dataUser={object} />
        </div>
      </div>
    </>
  );
}
