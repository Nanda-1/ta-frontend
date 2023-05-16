import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { UserContext } from "Context/UserContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function TabelTeams() {
  const {GetAllTeams , listTeams } = useContext(UserContext);
  // const [loading, setLoading] = useState(true);
  const [limitExceeded, setLimitExceeded] = useState(false);

  useEffect(() => {
    if(!limitExceeded)
        GetAllTeams();
        setLimitExceeded(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listTeams, limitExceeded]);


  const histori = useHistory();


  return (
    <div className="w-full text-black-2 shadow-sm">
      <div className="relative font-bold box-content px-3 py-2 card-shadow rounded-lg bg-blue-2">
        <div className="block overflow-x-auto">
          <div className="flex justify-between font-manrope py-1">
            <h4 className="text-white mb-1">TABLE OF TEAMS</h4>
            <h4 className="text-white mb-1 cursor-pointer" onClick={() => histori.push('/admin/team')}>Show all {">"}</h4>
          </div>
          <table className="items-center w-full border-black bg-white overflow-x-auto bg-transparent border-collapse">
            <thead>
              <tr className="text-black text-xs text-grey-2 font-bold py-2 text-center">
                <th
                  className="align-middle border-1 border-solid py-3 border-black"
                  width="10"
                >
                  No
                </th>
                <th className="align-middle border-1 border-solid py-3 border-black">
                  Name
                </th>
                <th className="align-middle border-1 border-solid py-3 border-black">
                  NRA
                </th>
                <th className="align-middle border-1 border-solid py-3 border-black">
                  Division
                </th>
                <th className="align-middle border-1 border-solid py-3 border-black">
                  Phone Number
                </th>
                <th className="align-middle border-1 border-solid py-3 border-black">
                  Email
                </th>
              </tr>
            </thead>
            <tbody>
              {!listTeams ? (
                <tr>
                  <td
                    className="px-3 text-center text-grey text-xxs p-6"
                    colSpan={7}
                  >
                    Tidak Ada Dokumen
                  </td>
                </tr>
              ) : (
                <>
                  {listTeams.map((item, index) => {
                    return (
                      <tr key={index} style={{ fontSize: "12px" }}>
                        <td className="px-3 py-1 text-center border-1 border-solid border-black border-b-0 border-t-0">
                          {index + 1}
                        </td>
                        <td className=" border-1 border-solid px-3 py-1 border-black border-b-0 border-t-0">
                          {item.name}
                        </td>
                        <td className=" border-1 border-solid px-3 py-1 border-black border-b-0 border-t-0">
                          {item.nra}
                        </td>
                        <td className=" border-1 border-solid px-3 py-1 border-black border-b-0 border-t-0">
                          {item.divisi}
                        </td>
                        <td className=" border-1 border-solid px-3 py-1 border-black border-b-0 border-t-0">
                          {item.phone_number}
                        </td>
                        <td className=" border-1 border-solid px-3 py-1 border-black border-b-0 border-t-0">
                          {item.email}
                        </td>
                      </tr>
                    );
                  })}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
