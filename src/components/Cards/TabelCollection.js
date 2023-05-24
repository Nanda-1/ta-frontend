import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "Context/UserContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function TabelCollection() {
  const { CollectionList, listCollection } = useContext(UserContext);
  const [limitExceeded, setLimitExceeded] = useState(false);

  useEffect(() => {
    if(!limitExceeded)
      CollectionList();
      setLimitExceeded(true)
  }, [listCollection,limitExceeded]);

  const histori = useHistory();

  const [page, setPage] = useState(0);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const indexOfLastTodo = (page + 1) * 5;
  const indexOfFirstTodo = indexOfLastTodo - 5;

  const dataPpat = [
    {
      nama: "nan",
      email: "achmadnurachman142@gmail.com",
      sk: "389-XVII-2006 18/12/2006",
      alamat: "JL. MT HARYONO NO. 142",
      kab: "Semarang",
      status: "PPAT | Berhenti",
    },
    {
      nama: "Agnes Maria Lanny Widjaja",
      email: "lannynotaris@gmail.com",
      sk: "15-XI-1998 24/09/1998",
      alamat: "Jl. Tentara Pelajar no 29",
      kab: "Semarang",
      status: "PPAT | Aktif",
    },
    {
      nama: "Agnes Maria Lanny Widjaja",
      email: "lannynotaris@gmail.com",
      sk: "15-XI-1998 24/09/1998",
      alamat: "Jl. Tentara Pelajar no 29",
      kab: "Semarang",
      status: "PPAT | Aktif",
    },
    {
      nama: "Agnes Maria Lanny Widjaja",
      email: "lannynotaris@gmail.com",
      sk: "15-XI-1998 24/09/1998",
      alamat: "Jl. Tentara Pelajar no 29",
      kab: "Semarang",
      status: "PPAT | Aktif",
    },
    {
      nama: "Agnes Maria Lanny Widjaja",
      email: "lannynotaris@gmail.com",
      sk: "15-XI-1998 24/09/1998",
      alamat: "Jl. Tentara Pelajar no 29",
      kab: "Semarang",
      status: "PPAT | Aktif",
    },
    {
      nama: "Agnes Maria Lanny Widjaja",
      email: "lannynotaris@gmail.com",
      sk: "15-XI-1998 24/09/1998",
      alamat: "Jl. Tentara Pelajar no 29",
      kab: "Semarang",
      status: "PPAT | Aktif",
    },
  ];

  return (
    <>
      <div className="relative break-words font-sans mb-8 ">
        <div className="relative font-bold font-manrope box-content px-3 py-2 card-shadow rounded-lg bg-blue-2">
          <div className="block overflow-x-auto">
            <div className="flex justify-between py-1">
              <h4 className="text-white mb-1">TABLE OF COLLECTION</h4>
              <h4
                className="text-white mb-1 cursor-pointer"
                onClick={() => histori.push("/admin/borrower")}
              >
                Show all {">"}
              </h4>
            </div>
            <div className="block overflow-x-auto text-black">
              {/* Projects table */}
              <table className="items-center  w-full border-black overflow-x-auto bg-transparent border-collapse bg-white">
                <thead>
                  <tr className="text-center text-xs font-bold py-2 text-black border-black">
                    <th
                      className="align-middle border-1 border-black border-solid py-3"
                      width="10"
                    >
                      No
                    </th>
                    <th className="align-middle border-1 border-black border-solid py-3">
                      Name
                    </th>
                    <th className="align-middle border-1 border-black border-solid py-3">
                      Division
                    </th>
                    <th className="align-middle border-1 border-black border-solid py-3">
                      Total
                    </th>
                    <th className="align-middle border-1 border-black border-solid py-3">
                      Information
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {!dataPpat ? (
                    <tr>
                      <td
                        className="px-3 text-center text-grey border-l-0 border-r-0 text-xxs p-6"
                        colSpan={5}
                      >
                        Tidak Ada Dokumen
                      </td>
                    </tr>
                  ) : (
                    <>
                      {listCollection.map((item, index) => {
                        return (
                          <tr
                            key={index}
                            // className=" border-2 border-solid border-l-0 border-r-0 border-t-0 text-inter"
                            style={{ fontSize: "12px" }}
                          >
                            <td className="px-3 py-1 text-center border-1 border-solid border-black border-b-0 border-t-0">
                              {index + 1}
                            </td>
                            <td className="border-1 border-solid px-3 py-1 border-black border-b-0 border-t-0">
                              {item.nama}
                            </td>
                            <td className="border-1 border-solid px-3 py-1 border-black border-b-0 border-t-0">
                              {item.divisi.name}
                            </td>
                            <td className="border-1 border-solid px-3 py-1 border-black border-b-0 border-t-0">
                              {item.jumlah}
                            </td>
                            <td className="border-1 border-solid px-3 py-1 border-black border-b-0 border-t-0">
                              {item.keterangan}
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
      </div>
    </>
  );
}
