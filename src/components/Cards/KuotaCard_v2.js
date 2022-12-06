import React, { useContext, useEffect } from "react";
import { UserContext } from "Context/UserContext";
import { Link, useHistory } from "react-router-dom";

export default function KuotaCard_v2() {
  const { functions, meteraiQuota, ttdQuota, formQuota } =
    useContext(UserContext);

  const { cekQuota } = functions;

  // useEffect(() => {
  //   cekQuota("eform");
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const histori = useHistory();

  const kuotaList = [
    {
      name: "E-Meterai",
    },
    {
      name: "Tanda Tangan",
    },
    {
      name: "Blanko Akta",
    },
  ];

  const topUppage = () => {
    return histori.push("/topup");
  };

  return (
    <div className="w-full bg-white text-black-2 rounded-lg p-4 shadow-sm mr-4 card-shadow">
      <div className="flex justify-between">
        <h1 className="pt-2 text-lg">Saldo Anda</h1>
        <button
          className="bg-blue text-white px-8 py-2 text-xs rounded-lg font-700 focus:outline-none"
          onClick={topUppage}
        >
          <i className="fa fa-plus mr-2 text-xs"></i>Top Up
        </button>
      </div>
      <div className="flex justify-between mt-4">
        {kuotaList.map((item, index) => {
          return (
            <div
              className={`shadow rounded-lg text-grey text-xxs font-600 w-full ${
                index !== 2 ? "mr-2" : null
              }`}
              key={index}
            >
              <div className="p-4">
                <label>{item.name} Digital</label>
                <h3 className="text-black text-xl mb-4 font-bold">
                  {item.name.includes("meterai")
                    ? meteraiQuota
                    : item.name.includes("blanko")
                    ? formQuota
                    : ttdQuota}
                </h3>
              </div>
              <div
                className={`${
                  item.name === "E-Meterai"
                    ? "bg-blue"
                    : item.name === "Tanda Tangan"
                    ? "bg-purple-2"
                    : "bg-light-blue-2"
                }`}
                style={{ height: "10px", borderRadius: "0 0 8px 8px" }}
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
