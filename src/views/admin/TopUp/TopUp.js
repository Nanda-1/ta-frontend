import React, { useContext, useEffect } from "react";
import { TopUpContext } from "Context/TopUpContext";
import ModalDokumen from "components/Modals/ModalDokumen";
import { useHistory } from "react-router-dom";
import ListProduk from "components/TopUp/ListProduk";

export default function TopUp() {
  const { historiList, loadingFile, functions } = useContext(TopUpContext);
  const { historiTopUp } = functions;

  let history = useHistory();

  const formatHarga = (angka) => {
    var parts = angka.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return "Rp " + parts.join(",");
  };

  useEffect(() => {
    historiTopUp();
  }, []);

  const formatter = new Intl.DateTimeFormat("id-GB", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  return (
    <>
      {loadingFile ? <ModalDokumen /> : null}
      <ListProduk />
      <div className="mt-12 text-2xl font-bold">Histori Top Up</div>
      <div className="">
        <table className="items-center w-full overflow-x-auto bg-transparent border-collapse">
          <thead>
            <tr>
              <th className="px-6 align-middle border-black py-3 text-xs uppercase border-l-0 border-r-0 border-t-0 font-semibold text-left">
                No.
              </th>
              <th className="px-6 align-middle border-black py-3 text-xs uppercase border-l-0 border-r-0 border-t-0 font-semibold text-left">
                Tanggal
              </th>
              <th className="px-6 align-middle border-black py-3 text-xs uppercase border-l-0 border-r-0 border-t-0 font-semibold text-left">
                Produk
              </th>
              <th className="px-6 align-middle border-black py-3 text-xs uppercase border-l-0 border-r-0 border-t-0 font-semibold text-left">
                Total Harga
              </th>
              <th className="px-6 align-middle border-black py-3 text-xs uppercase border-l-0 border-r-0 border-t-0 font-semibold text-left">
                Status
              </th>
              <th className="px-6 align-middle border-black py-3 text-xs uppercase border-l-0 border-r-0 border-t-0 font-semibold text-left">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {!historiList ? (
              <tr>
                <td
                  className="px-6 text-center border-l-0 text-gray-500 border-r-0 text-xs p-6 bg-gray"
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
                        {formatHarga(el.sub_total_fee + el.tax_fee)}
                      </td>
                      <td className="px-6 text-left text-xs p-4 border border-l-0 border-r-0 border-t-0">
                        {el.payment_status === "success" ? (
                          <div className="text-green pl-2">Berhasil</div>
                        ) : el.payment_status === "unpaid" ? (
                          <div className="text-red-500 pl-2">Belum dibayar</div>
                        ) : el.payment_status === "pending" ? (
                          <div className="text-orange-500 pl-2">
                            Menunggu Pembayaran
                          </div>
                        ) : (
                          <div className="text-red-500 pl-2">Gagal</div>
                        )}
                      </td>
                      <td className="px-6 text-left text-xs p-4 border border-l-0 border-r-0 border-t-0">
                        <button
                          className="bg-blue text-white text-md px-2 py-1 rounded-sm"
                          onClick={() =>
                            history.push(
                              "/admin/detail_pesanan=" +
                                el.top_up_transaction_id
                            )
                          }
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
    </>
  );
}
