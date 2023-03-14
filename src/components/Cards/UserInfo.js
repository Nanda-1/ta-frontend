import React from "react";
import DokumenCard from "./DokumenCard";
import KuotaCardV2 from "./KuotaCard_v2";

export default function UserInfo() {
  return (
    <>
      <div className="relative flex text-white font-montserrat font-bold w-full dashboard-mobile">
        <KuotaCardV2 />
        <DokumenCard />
      </div>
    </>
  );
}
