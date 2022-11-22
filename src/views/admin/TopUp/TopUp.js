import React, { useContext } from "react";
import { TopUpContext } from "Context/TopUpContext";
import ModalDokumen from "components/Modals/ModalDokumen";
import { useHistory } from "react-router-dom";
import ListProduk from "components/TopUp/ListProduk";

export default function TopUp() {
  const { historiList, loadingFile } = useContext(TopUpContext);

  let history = useHistory();

  const formatHarga = (angka) => {
    var parts = angka.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return "Rp " + parts.join(",");
  };

  const formatter = new Intl.DateTimeFormat("id-GB", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  return (
    <>
      {loadingFile ? (
        <>
          <ModalDokumen />
        </>
      ) : null}
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
                  className="px-6 text-center border-l-0 border-r-0 text-xs p-6 bg-gray"
                  colSpan={4}
                >
                  Tidak Ada Dokumen
                </td>
              </tr>
            ) : (
              <>
                {historiList.map(
                  (
                    {
                      id,
                      transaction_date,
                      total_price,
                      tax,
                      payment_status,
                      top_up_details,
                    },
                    index
                  ) => {
                    return (
                      <tr key={id}>
                        <td className="px-6 text-left text-xs p-4 border border-l-0 border-r-0 border-t-0">
                          {index + 1}
                        </td>
                        <td className="px-6 text-left text-xs p-4 border border-l-0 border-r-0 border-t-0">
                          {formatter.format(Date.parse(transaction_date))}
                        </td>
                        <td className="px-6 text-left text-xs p-4 border border-l-0 border-r-0 border-t-0">
                          {top_up_details.map((item, index) => {
                            return (
                              <span key={index}>
                                {item.package_name}
                                <br />
                              </span>
                            );
                          })}
                        </td>
                        <td className="px-6 text-left text-xs p-4 border border-l-0 border-r-0 border-t-0">
                          {formatHarga(total_price + tax)}
                        </td>
                        <td className="px-6 text-left text-xs p-4 border border-l-0 border-r-0 border-t-0">
                          {payment_status === "success" ? (
                            <div className="text-green pl-2">Berhasil</div>
                          ) : payment_status === "unpaid" ? (
                            <div className="text-red-500 pl-2">
                              Belum dibayar
                            </div>
                          ) : payment_status === "pending" ? (
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
                              history.push("/admin/detail_pesanan=" + id)
                            }
                          >
                            Detail
                          </button>
                          {/* {tokenByList(json_data)} */}
                        </td>
                      </tr>
                    );
                  }
                )}
              </>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
