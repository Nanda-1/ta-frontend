import React, { useContext, useEffect } from "react";
import { UserContext } from "Context/UserContext";
import KuotaCard from "./KuotaCard";

import Men from "assets/img/icon/Men.png";
import Female from "assets/img/icon/Female.png";

export default function UserInfo({ dataUser }) {
  const { dokumenPending, dokumenSelesai, dokumenDraft, functions } =
    useContext(UserContext);

  const { quotaMeterai, quotaTtd, quotaForm } = functions;

  useEffect(() => {
    dokumenSelesai(dataUser.uid);
    dokumenPending(dataUser.uid);
    dokumenDraft(dataUser.uid);
    quotaForm(dataUser.uid);
    quotaMeterai(dataUser.uid);
    quotaTtd(dataUser.uid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="relative flex text-white font-montserrat font-bold w-full">
        <div className="w-user bg-blue rounded-md flex user-info">
          <img
            src={dataUser.gender === "F" ? Female : Men}
            className="avatar pl-2"
            alt="profile"
          />
          <div className="text-sm pr-12 relative mt-10 font-bold">
            Halo,
            <div className="mt--5 text-xl">
              {dataUser.nama ? dataUser.nama : "Pengguna"}
            </div>
            {dataUser.nik === "" ? (
              <div className={"text-xxs pt-1 font-light mt--5"}>
                <i className="far fa-clock mr-2"></i>
                Proses Verifikasi Identitas
              </div>
            ) : (
              <div className="text-xxs pt-1 font-light mt--5">
                {" "}
                Terverifikasi
              </div>
            )}
            <div className="mt-8 text-xxs pt-1">
              Tipe Pengguna
              <div className="text-xl font-bold mt--5">
                {dataUser.roles ? dataUser.roles.toUpperCase() : "-"}
              </div>
            </div>
          </div>
        </div>
        <KuotaCard />
      </div>
    </>
  );
}
