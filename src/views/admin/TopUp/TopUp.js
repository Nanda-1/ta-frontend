import React, { useContext, useEffect } from "react";
import { TopUpContext } from "Context/TopUpContext";
import ModalDokumen from "components/Modals/ModalDokumen";
import ListProduk from "components/TopUp/ListProduk";
import Cookies from "js-cookie";
import { useHistory } from "react-router";
import BackBtn from "../../../assets/img/arrow-back.png";

export default function TopUp() {
  const { historiList, loadingFile, functions, setPaymentModal } =
    useContext(TopUpContext);
  const { historiTopUp } = functions;

  const formatHarga = (angka) => {
    var parts = angka.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return "Rp " + parts.join(",");
  };

  useEffect(() => {
    historiTopUp();
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
      {loadingFile ? <ModalDokumen /> : null}
      <h1 className="text-xl font-bold flex items-center">
        <img alt="" src={BackBtn} className='p-1 pr-3 cursor-pointer' onClick={() => histori.goBack()} style={{height: 'fit-content'}} />
        Top Up
      </h1>
      <hr className="my-3 mx-auto topup-line" />
      <ListProduk />
      <div className="mt-8 text-xl font-bold">Riwayat Top Up</div>
      <div className="card-shadow border-grey-3 w-9/12 rounded-lg my-4">
        <table className="items-center w-full overflow-x-auto mb-6">
          <thead>
            <tr>
              <th className="px-6 align-middle py-4 text-grey text-sm font-bold border-grey-2 border-l-0 border-r-0 border-t-0 text-left">
                No.
              </th>
              <th className="px-6 align-middle py-4 text-grey text-sm font-bold border-grey-2 border-l-0 border-r-0 border-t-0 text-left">
                Tanggal
              </th>
              <th className="px-6 align-middle py-4 text-grey text-sm font-bold border-grey-2 border-l-0 border-r-0 border-t-0 text-left">
                Produk
              </th>
              <th className="px-6 align-middle py-4 text-grey text-sm font-bold border-grey-2 border-l-0 border-r-0 border-t-0 text-left">
                Total Harga
              </th>
              <th className="px-6 align-middle py-4 text-grey text-sm font-bold border-grey-2 border-l-0 border-r-0 border-t-0 text-left">
                Status
              </th>
              <th className="px-6 align-middle py-4 text-grey text-sm font-bold border-grey-2 border-l-0 border-r-0 border-t-0 text-left">
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
                {historiList.map((el, index) => {
                  return (
                    <tr key={el.top_up_transaction_id}>
                      <td className="px-6 text-left text-xs p-4 border border-l-0 border-r-0 border-t-0">
                        {index + 1}
                      </td>
                      <td className="px-6 text-left text-xs p-4 border border-l-0 border-r-0 border-t-0">
                        {formatter.format(Date.parse(el.created_at))}
                      </td>
                      <td className="px-6 text-left text-xs p-4 border border-l-0 border-r-0 border-t-0">
                        {el.top_up_details.map((item, index) => {
                          return (
                            <span key={index}>
                              {item.package_name}
                              <br />
                            </span>
                          );
                        })}
                      </td>
                      <td className="px-6 text-left text-xs p-4 border border-l-0 border-r-0 border-t-0">
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
                      <td className="px-6 text-left text-xs p-4 border border-l-0 border-r-0 border-t-0">
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
    </div>
  );
}
