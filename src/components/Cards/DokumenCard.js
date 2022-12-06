import React, { useContext, useEffect } from "react";
import { UserContext } from "Context/UserContext";
import { Link } from "react-router-dom";

export default function DokumenCard() {
  const {
    dataUser,
    selesai,
    pending,
    draft,
    dokumenPending,
    dokumenSelesai,
    dokumenDraft,
    functions,
  } = useContext(UserContext);

  const { quotaMeterai, cekQuota, quotaForm } = functions;

  useEffect(() => {
    // dokumenSelesai(dataUser.uid);
    // dokumenPending(dataUser.uid);
    // dokumenDraft(dataUser.uid);
    // quotaForm(dataUser.uid);
    // quotaMeterai(dataUser.uid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const kuotaList = [
    {
      name: "Selesai",
    },
    {
      name: "Pending",
    },
    {
      name: "Draft",
    },
  ];

  return (
    <div className="w-full bg-white text-black-2 rounded-lg p-4 card-shadow">
      <h1 className="pt-2 text-lg">Ringkasan Pekerjaan</h1>
      <div className="flex justify-between mt-4">
        {kuotaList.map((item, index) => {
          return (
            <div
              className={`shadow rounded-lg text-grey text-xxs font-600 w-full ${
                index !== 2 ? "mr-2" : null
              }`}
              key={index}
            >
              <div className="p-4" key={index}>
                <label>Dokumen {item.name}</label>
                <h3 className="text-black text-xl mb-4 font-bold">
                  {item.name.includes("Selesai")
                    ? selesai
                    : item.name.includes("Pending")
                    ? pending
                    : draft}
                </h3>
              </div>
              <div
                className={`${
                  item.name === "Selesai"
                    ? "bg-green-3"
                    : item.name === "Pending"
                    ? "bg-yellow"
                    : "bg-cyan"
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
