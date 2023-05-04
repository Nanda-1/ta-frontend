import React, { useContext, useEffect, useState } from "react";
import { TopUpContext } from "Context/TopUpContext";
import ModalDokumen from "components/Modals/ModalDokumen";
import ListProduk from "components/TopUp/ListProduk";
import Cookies from "js-cookie";
import { useHistory } from "react-router";
import BackBtn from "../../../assets/img/arrow-back.png";
import { Pagination } from "react-headless-pagination";
import NextIcon from "../../../assets/img/next-light.png";
import PrevIcon from "../../../assets/img/prev.png";
import DisableTopUp from "components/Modals/DisabledTopUp";

export default function TopUp() {
  const {
    historiList,
    loadingFile,
    functions,
    setPaymentModal,
    backModal,
    setBackModal,
  } = useContext(TopUpContext);
  const { historiTopUp } = functions;

  const [page, setPage] = useState(0);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const indexOfLastTodo = (page + 1) * 10;
  const indexOfFirstTodo = indexOfLastTodo - 10;

  const formatHarga = (angka) => {
    var parts = angka.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return "Rp " + parts.join(",");
  };

  useEffect(() => {
    historiTopUp();

    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener("popstate", function (event) {
      setBackModal(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatter = new Intl.DateTimeFormat("id-GB", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  const detailBtn = (id) => {
    setPaymentModal(true);
    Cookies.set("top_up_transaction_id", id);
  };

  const histori = useHistory();

  return (
    <div className="px-32 pt-16 bg-white font-sans pb-6">
      {loadingFile && <ModalDokumen />}
      {backModal && <DisableTopUp />}
      <h1 className="text-xl font-bold flex items-center">
        <img
          alt=""
          src={BackBtn}
          className="p-1 pr-3 cursor-pointer z-40"
          onClick={() => histori.goBack()}
          style={{ height: "fit-content" }}
        />
        Top Up
      </h1>
      <hr className="my-3 mx-auto topup-line" />
      <ListProduk />
      <div className="mt-8 text-xl font-bold">Riwayat Top Up</div>
      <div className="card-shadow border-grey-3 w-9/12 rounded-lg my-4">
        <table className="items-center w-full overflow-x-auto">
          <thead>
            <tr>
              <th className="px-4 align-middle py-4 text-grey text-sm font-bold border-grey-2 border-l-0 border-r-0 border-t-0 text-left">
                No.
              </th>
              <th className="px-4 align-middle py-4 text-grey text-sm font-bold border-grey-2 border-l-0 border-r-0 border-t-0 text-left">
                Tanggal
              </th>
              <th className="px-4 align-middle py-4 text-grey text-sm font-bold border-grey-2 border-l-0 border-r-0 border-t-0 text-left">
                Produk
              </th>
              <th className="px-4 align-middle py-4 text-grey text-sm font-bold border-grey-2 border-l-0 border-r-0 border-t-0 text-left">
                Total Harga
              </th>
              <th className="px-4 align-middle py-4 text-grey text-sm font-bold border-grey-2 border-l-0 border-r-0 border-t-0 text-left">
                Status
              </th>
              <th className="px-4 align-middle py-4 text-grey text-sm font-bold border-grey-2 border-l-0 border-r-0 border-t-0 text-left">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {!historiList ? (
              <tr>
                <td
                  className="px-6 text-center border-l-0 text-grey border-r-0 text-xs p-6"
                  colSpan={6}
                >
                  Tidak Ada Transaksi
                </td>
              </tr>
            ) : (
              <>
                {historiList
                  .slice(indexOfFirstTodo, indexOfLastTodo)
                  .map((el, index) => {
                    return (
                      <tr key={el.top_up_transaction_id}>
                        <td className="px-6 text-left text-xs p-3 border border-l-0 border-r-0 border-t-0">
                          {index + 1 + indexOfFirstTodo}
                        </td>
                        <td className="px-6 text-left text-xs p-3 border border-l-0 border-r-0 border-t-0">
                          {formatter.format(Date.parse(el.created_at))}
                        </td>
                        <td className="px-6 text-left text-xs p-3 border border-l-0 border-r-0 border-t-0">
                          {el.top_up_details.map((item, index) => {
                            return (
                              <span key={index}>
                                {item.package_name}
                                <br />
                              </span>
                            );
                          })}
                        </td>
                        <td className="px-6 text-left text-xs p-3 border border-l-0 border-r-0 border-t-0">
                          {formatHarga(
                            el.sub_total_fee + el.tax_fee + el.admin_fee
                          )}
                        </td>
                        <td className=" text-left text-xs border border-l-0 border-r-0 border-t-0">
                          {el.payment_status === "success" ? (
                            <span className="success-label text-tex px-3 rounded py-1">
                              Berhasil
                            </span>
                          ) : el.payment_status === null ? (
                            <span className="unpaid-label text-tex px-3 rounded py-1">
                              Belum Dibayar
                            </span>
                          ) : el.payment_status === "pending" ? (
                            <span className="pending-label text-tex px-3 rounded py-1">
                              Menunggu Pembayaran
                            </span>
                          ) : (
                            <span className="failed-label text-tex px-3 rounded py-1">
                              Gagal
                            </span>
                          )}
                        </td>
                        <td className="px-6 text-left text-xs p-3 border border-l-0 border-r-0 border-t-0">
                          <button
                            className="bg-blue text-white text-md px-4 py-2 rounded-lg"
                            onClick={() => detailBtn(el.top_up_transaction_id)}
                          >
                            Detail
                          </button>
                          {/* {tokenByList(json_data)} */}
                        </td>
                      </tr>
                    );
                  })}
              </>
            )}
          </tbody>
        </table>
      </div>
      <div className="w-9/12">
        {historiList && (
          <Pagination
            currentPage={page}
            setCurrentPage={handlePageChange}
            totalPages={Math.ceil(historiList.length / 10)}
            edgePageCount={2}
            middlePagesSiblingCount={3}
            className="pagination mt-5"
            truncableText="..."
            truncableClassName=""
          >
            <Pagination.PrevButton className="paginationBtn focus:outline-none">
              <img width={5} src={PrevIcon} alt="prev" />
            </Pagination.PrevButton>

            {/* <div className='items-center justify-center'> */}
            <Pagination.PageButton
              activeClassName="paginationActive"
              inactiveClassName="paginationInactive"
              className="paginationItems"
            />
            {/* </div> */}

            <Pagination.NextButton className="paginationBtn focus:outline-none">
              <img width={5} src={NextIcon} alt="next" />
            </Pagination.NextButton>
          </Pagination>
        )}
      </div>
    </div>
  );
}
