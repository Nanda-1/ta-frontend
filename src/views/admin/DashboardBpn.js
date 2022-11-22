import React from "react";

// components
import BpnHistoryCard from "components/Cards/Bpn/BpnHistoryCard";
import BpnInfo from "components/Cards/Bpn/BpnInfo";

// Context
import cookies from "js-cookie";

export default function DashboardBpn() {

  cookies.remove('id_transaksi')
  
  return (
    <>
      <div className="flex flex-wrap cursor-default">
        <div className="w-full xl:w-12/12 mb-8 xl:mb-2 px-1">
          <BpnInfo />
        </div>
        <div className="w-full xl:w-12/12 mb-12 xl:mb-2 px-1">
          <BpnHistoryCard />
        </div>
      </div>
    </>
  );
}
