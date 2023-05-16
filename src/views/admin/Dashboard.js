import React, { useContext, useEffect, useState } from "react";

// components
import UserInfo from "components/Cards/UserInfo.js";

// Context
import { UserContext } from "Context/UserContext";
import cookies from "js-cookie";
import ModalDokumen from "components/Modals/ModalDokumen";
import RiwayatPemohon from "components/Cards/RiwayatPemohon";
import { io } from "socket.io-client";
import swal from "sweetalert";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function Dashboard() {
  const { setLengkapidiri, loading } = useContext(UserContext);

  const [userFiles, setUserFiles] = useState(false);

  var val = localStorage.getItem("dataPPAT");
  var object = JSON.parse(val);

  useEffect(() => {
    if (
      object.role === "member" &&
      object.user_files.bpjs &&
      object.user_files.ktp &&
      object.user_files.npwp &&
      object.user_files.self_video &&
      object.user_files.selfie_photo &&
      !object.user_files.sk_pengangkatan &&
      object.user_files.ttd
    ) {
      setUserFiles(true);
    } else if (
      object.role === "ppat" &&
      object.user_files.bpjs &&
      object.user_files.ktp &&
      object.user_files.npwp &&
      object.user_files.self_video &&
      object.user_files.selfie_photo &&
      object.user_files.sk_pengangkatan &&
      object.user_files.ttd
    ) {
      setUserFiles(true);
    }
  }, [userFiles]);

  cookies.remove("id_transaksi");
  cookies.remove("step");
  cookies.remove("otp_sms");
  cookies.remove("phone");
  cookies.remove("tipe_otp");
  localStorage.removeItem("dataDiri");

  if (!object.user_detail && userFiles === false) {
    setLengkapidiri(true);
  }

  const history = useHistory();

  let id = cookies.get("roomId");

  useEffect(() => {
    if (object.role === "member") {
      const socket = io("https://be-ppat-transaction.infinids.id");
      // console.log(socket)

      socket.on("connect", () => {
        console.log(`Connected with ID: ${socket.id}`);
      });

      socket.on(`room start ${id}`, (data) => {
        swal({
          title: "Berhasil",
          text: data.message,
          icon: "success",
        }).then(() => {
          history.push("/ruang_virtual=testing&&id=" + id);
        });
      });
    }
  }, []);

  return (
    <>
      {loading && <ModalDokumen />}
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
