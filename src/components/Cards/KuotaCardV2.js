import React from "react";
import Browwer from "../../assets/img/total_borrower.png";
import Member from "../../assets/img/total_members.png";

export default function KuotaCardV2() {
  const kuotaList = [
    {
      name: "Teams",
    },
    {
      name: "Borrowers",
    },
    {
      name: "lainnya",
    },
  ];

  const alatKuota = [
    {
      name: "Forest mountain ",
    },
    {
      name: "Rock Climbing",
    },
    {
      name: "Diving",
    },
  ];

  return (
    <div className="w-full text-black-2 shadow-sm">
      <div className="flex justify-between mt-4">
        {kuotaList.map((item, index) => {
          return (
            <div
              className={`text-grey text-xxs font-600 w-full ${
                index !== 2 ? "mr-13 bg-white shadow rounded-lg kuota-bg" : ""
              }`}
              key={index}
            >
              {item.name !== "lainnya" ? (
                <div className="p-6">
                  <div className="flex">
                    <label
                      className="text-white w-full"
                      style={{ fontSize: "18px", alignSelf: "center" }}
                    >
                      Total <br />
                      {item.name}
                    </label>
                    <img
                      className="card-icon p-2"
                      width={60}
                      src={item.name.includes("Teams") ? Member : Browwer}
                    />
                  </div>
                  <h3 className="text-blue-2 text-5xl font-bold">
                    {item.name.includes("Teams") ? 2035 : 6}
                  </h3>
                </div>
              ) : (
                <>
                  {alatKuota.map((item, index) => {
                    return (
                      <div
                        className={`w-full flex ${index !== 0 ? "mt-4" : ""}`}
                        key={index}
                      >
                        <div className="bg-blue-2 flex w-full rounded-lg">
                          <label
                            className="text-white w-full py-1 px-4 "
                            style={{ fontSize: "18px", lineHeight: "20px" }}
                          >
                            {item.name} <br /> collections
                          </label>
                          <label
                            className="text-blue-2 text-5xl px-3"
                            style={{ alignSelf: "center", marginTop: "-6px" }}
                          >
                            10
                          </label>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
