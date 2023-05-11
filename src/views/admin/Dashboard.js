import React, { useContext } from "react";

// components
import UserInfo from "components/Cards/UserInfo.js";

// Context
import { UserContext } from "Context/UserContext";
import cookies from "js-cookie";
import ModalDokumen from "components/Modals/ModalDokumen";
import RiwayatPemohon from "components/Cards/RiwayatPemohon";
import TabelTeams from "components/Cards/TabelTeams";

export default function Dashboard() {
  const { loading } = useContext(UserContext);

  return (
    <>
      <div className="flex flex-wrap cursor-default">
        {loading ? <ModalDokumen /> : null}
        <div className="w-full xl:w-12/12 mb-8 xl:mb-2 px-1">
          <UserInfo />
        </div>
        <div className="w-full xl:w-12/12 mt-4 mb-8 xl:mb-2 px-1">
          <TabelTeams />
        </div>
        <div className="w-full xl:w-12/12 mt-4 mb-8 xl:mb-2 px-1">
          <RiwayatPemohon />
        </div>
      </div>
    </>
  );
}
