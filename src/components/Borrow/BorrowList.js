import { UserContext } from "Context/UserContext";
import UpdateApproval from "components/Modals/UpdateApproval";
import React, { useState } from "react";
import { useContext } from "react";
import { Pagination } from "react-headless-pagination";
// import PrevIcon from "../../assets/img/prev.png";
// import NextIcon from "../../assets/img/next-light.png";

export default function BorrowList() {
  const { setAddBorrowModal, addBorrowModal } = useContext(UserContext);
  const [page, setPage] = useState(0);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const indexOfLastTodo = (page + 1) * 15;
  const indexOfFirstTodo = indexOfLastTodo - 15;

  const dataPeminjam = [
    {
      nama: "Achmad Nurachman",
      email: "achmadnurachman142@gmail.com",
      sk: "389-XVII-2006 18/12/2006",
      alamat: "JL. MT HARYONO NO. 142",
      kab: "Semarang",
      status: "Pending",
    },
    {
      nama: "Agnes Maria Lanny Widjaja",
      email: "lannynotaris@gmail.com",
      sk: "15-XI-1998 24/09/1998",
      alamat: "Jl. Tentara Pelajar no 29",
      kab: "Semarang",
      status: "Pending",
    },
    {
      nama: "Agnes Maria Lanny Widjaja",
      email: "lannynotaris@gmail.com",
      sk: "15-XI-1998 24/09/1998",
      alamat: "Jl. Tentara Pelajar no 29",
      kab: "Semarang",
      status: "Pending",
    },
    {
      nama: "Agnes Maria Lanny Widjaja",
      email: "lannynotaris@gmail.com",
      sk: "15-XI-1998 24/09/1998",
      alamat: "Jl. Tentara Pelajar no 29",
      kab: "Semarang",
      status: "Approved",
    },
    {
      nama: "Agnes Maria Lanny Widjaja",
      email: "lannynotaris@gmail.com",
      sk: "15-XI-1998 24/09/1998",
      alamat: "Jl. Tentara Pelajar no 29",
      kab: "Semarang",
      status: "Approved",
    },
    {
      nama: "Agnes Maria Lanny Widjaja",
      email: "lannynotaris@gmail.com",
      sk: "15-XI-1998 24/09/1998",
      alamat: "Jl. Tentara Pelajar no 29",
      kab: "Semarang",
      status: "Approved",
    },
    {
      nama: "Agnes Maria Lanny Widjaja",
      email: "lannynotaris@gmail.com",
      sk: "15-XI-1998 24/09/1998",
      alamat: "Jl. Tentara Pelajar no 29",
      kab: "Semarang",
      status: "Approved",
    },
    {
      nama: "Agnes Maria Lanny Widjaja",
      email: "lannynotaris@gmail.com",
      sk: "15-XI-1998 24/09/1998",
      alamat: "Jl. Tentara Pelajar no 29",
      kab: "Semarang",
      status: "Approved",
    },
    {
      nama: "Agnes Maria Lanny Widjaja",
      email: "lannynotaris@gmail.com",
      sk: "15-XI-1998 24/09/1998",
      alamat: "Jl. Tentara Pelajar no 29",
      kab: "Semarang",
      status: "Approved",
    },
    {
      nama: "Agnes Maria Lanny Widjaja",
      email: "lannynotaris@gmail.com",
      sk: "15-XI-1998 24/09/1998",
      alamat: "Jl. Tentara Pelajar no 29",
      kab: "Semarang",
      status: "Approved",
    },
    {
      nama: "Agnes Maria Lanny Widjaja",
      email: "lannynotaris@gmail.com",
      sk: "15-XI-1998 24/09/1998",
      alamat: "Jl. Tentara Pelajar no 29",
      kab: "Semarang",
      status: "Reject",
    },
    {
      nama: "Agnes Maria Lanny Widjaja",
      email: "lannynotaris@gmail.com",
      sk: "15-XI-1998 24/09/1998",
      alamat: "Jl. Tentara Pelajar no 29",
      kab: "Semarang",
      status: "Reject",
    },
    {
      nama: "Agnes Maria Lanny Widjaja",
      email: "lannynotaris@gmail.com",
      sk: "15-XI-1998 24/09/1998",
      alamat: "Jl. Tentara Pelajar no 29",
      kab: "Semarang",
      status: "Reject",
    },
    {
      nama: "Agnes Maria Lanny Widjaja",
      email: "lannynotaris@gmail.com",
      sk: "15-XI-1998 24/09/1998",
      alamat: "Jl. Tentara Pelajar no 29",
      kab: "Semarang",
      status: "Approved",
    },
    {
      nama: "Agnes Maria Lanny Widjaja",
      email: "lannynotaris@gmail.com",
      sk: "15-XI-1998 24/09/1998",
      alamat: "Jl. Tentara Pelajar no 29",
      kab: "Semarang",
      status: "Approved",
    },
    {
      nama: "Agnes Maria Lanny Widjaja",
      email: "lannynotaris@gmail.com",
      sk: "15-XI-1998 24/09/1998",
      alamat: "Jl. Tentara Pelajar no 29",
      kab: "Semarang",
      status: "Approved",
    },
    {
      nama: "Agnes Maria Lanny Widjaja",
      email: "lannynotaris@gmail.com",
      sk: "15-XI-1998 24/09/1998",
      alamat: "Jl. Tentara Pelajar no 29",
      kab: "Semarang",
      status: "Approved",
    },
    {
      nama: "Agnes Maria Lanny Widjaja",
      email: "lannynotaris@gmail.com",
      sk: "15-XI-1998 24/09/1998",
      alamat: "Jl. Tentara Pelajar no 29",
      kab: "Semarang",
      status: "Approved",
    },
  ];

  return (
    <>
      {addBorrowModal ? <UpdateApproval /> : null}
      <div className="w-full text-black-2 shadow-sm">
        <div className="relative font-bold box-content px-3 py-2 card-shadow rounded-lg bg-blue-3">
          <div className="block overflow-x-auto">
            <h4 className="text-black font-manrope py-1 mb-1">
              TABLE OF BORROWERS
            </h4>
            <table className="items-center mb-8 w-full border-black bg-white overflow-x-auto bg-transparent border-collapse">
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
                    Organization
                  </th>
                  <th className="align-middle border-1 border-solid py-3 border-black">
                    Phone Number
                  </th>
                  <th className="align-middle border-1 border-solid py-3 border-black">
                    Email
                  </th>
                  <th className="align-middle border-1 border-solid py-3 border-black">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {!dataPeminjam || dataPeminjam.length === 0 ? (
                  <tr>
                    <td
                      className="px-3 text-center text-grey text-xxs p-6"
                      colSpan={7}
                    >
                      Tidak Ada Data
                    </td>
                  </tr>
                ) : (
                  <>
                    {dataPeminjam
                      .slice(indexOfFirstTodo, indexOfLastTodo)
                      .map((item, index) => {
                        return (
                          <tr key={index} style={{ fontSize: "12px" }}>
                            <td className="px-3 py-2 text-center border-1 border-solid border-black border-b-0 border-t-0">
                              {index + 1 + indexOfFirstTodo}
                            </td>
                            <td className="px-2 border-1 border-solid border-black border-b-0 border-t-0">
                              {item.nama}
                            </td>
                            <td className="px-2 border-1 border-solid border-black border-b-0 border-t-0">
                              {item.kab}
                            </td>
                            <td className="px-2 border-1 border-solid border-black border-b-0 border-t-0">
                              {item.sk}
                            </td>
                            <td className="px-2 border-1 border-solid border-black border-b-0 border-t-0">
                              {item.email}
                            </td>
                            <td className="px-2 border-1 mb-2 border-solid text-center text-white border-black border-b-0 border-t-0">
                              <div
                                className={`cursor-pointer ${
                                  item.status === "Approved"
                                    ? "success-label"
                                    : item.status === "Reject"
                                    ? "failed-label"
                                    : "pending-label"
                                }`}
                                onClick={() => setAddBorrowModal(true)}
                              >
                                {item.status}
                              </div>
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
        {dataPeminjam.length !== 0 && (
          <Pagination
            currentPage={page}
            setCurrentPage={handlePageChange}
            totalPages={Math.ceil(dataPeminjam.length / 15)}
            edgePageCount={2}
            middlePagesSiblingCount={1}
            className="pagination mt-2"
            truncableText="..."
            truncableClassName=""
          >
            {/* <Pagination.PrevButton className="paginationBtn focus:outline-none">
              <img width={5} src={PrevIcon} alt="prev" />
            </Pagination.PrevButton> */}

            {/* <div className='items-center justify-center'> */}
            <Pagination.PageButton
              activeClassName="paginationActive"
              inactiveClassName="paginationInactive"
              className="paginationItems"
            />
            {/* </div> */}

            {/* <Pagination.NextButton className="paginationBtn focus:outline-none">
              <img width={5} src={NextIcon} alt="next" />
            </Pagination.NextButton> */}
          </Pagination>
        )}
      </div>
    </>
  );
}
