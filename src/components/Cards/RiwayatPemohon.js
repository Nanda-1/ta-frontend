import React, { useContext, useEffect } from "react";

import { Link } from "react-router-dom";
import { UserContext } from "Context/UserContext";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

export default function RiwayatPemohon() {
  const { functions, listTransaction } = useContext(UserContext);

  const { transactionList } = functions;

  let history = useHistory();

  const getType = (data) => {
    if (data === "akta_jual_beli") {
      return "Akta Jual Beli";
    } else {
      return "Akta Pemberian Hak Tanggungan";
    }
  };

  const getStatus = (data) => {
    if (data === "submit_dokumen") {
      return <div className="text-red-500">Menunggu pembubuhan meterai</div>;
    } else if (data === "draft") {
      return <div className="text-blue">Menunggu pengisian pihak 1</div>;
    } else if (data === "stamp_materai") {
      return <div className="text-teal-500">Menunggu tanda tangan</div>;
    } else if (data === "pihak_pertama") {
      return <div className="text-pink-400">Menunggu pengisian pihak 2</div>;
    } else if (data === "pihak_kedua") {
      return (
        <div className="text-orange-500">Menunggu pengisian data akta</div>
      );
    } else {
      return "Selesai";
    }
  };

  useEffect(() => {
    // transactionList(dataUser.uid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentDoc = (id, statusDoc, typeDoc) => {
    Cookies.set("id_transaksi", id, { expires: 1 });
    let url = "";

    if (typeDoc === "akta_jual_beli") {
      url = "AktaJualBeli";
    } else {
      url = "AktaPemberianHakTanggungan";
    }

    if (statusDoc === "draft") {
      Cookies.set("step", "input_data_penjual");
      history.push("/admin/" + url);
    } else if (statusDoc === "pihak_pertama") {
      Cookies.set("step", "input_data_pembeli");
      history.push("/admin/" + url);
    } else if (statusDoc === "pihak_kedua") {
      Cookies.set("step", "dokumen");
      history.push("/admin/" + url);
    } else if (statusDoc === "submit_dokumen") {
      Cookies.set("step", "stamping");
      history.push("/admin/" + url);
    } else {
      history.push(`/admin/preview_dokumen/transaction_id=${id}`);
    }
    window.location.reload();
  };

  return (
    <>
      <div className="relative break-words font-montserrat mb-8 ">
        <div className="text-bold mt-6 mb-2 w-full">
          <div className="text-lg text-black font-bold">Riwayat Permohonan</div>
        </div>
        <div className="relative font-bold box-content px-3 py-5 card-shadow rounded-lg bg-white">
          <div className="block overflow-x-auto">
            {/* Projects table */}
            <table className="items-center w-full overflow-x-auto bg-transparent border-collapse">
              <thead>
                <tr>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 border-t-0 font-semibold text-left">
                    Nama Pemohon
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 border-t-0 font-semibold text-left">
                    E-Mail
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 border-t-0 font-semibold text-left">
                    Nama Dokumen
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 border-t-0 font-semibold text-center">
                    Nomor Dokumen
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 border-t-0 font-semibold text-center">
                    Kategori
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 border-t-0 font-semibold text-center">
                    Status
                  </th>
                  <th className="px-6 text-center align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 border-t-0 font-semibold">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {(listTransaction && listTransaction.length === 0) ||
                !listTransaction ? (
                  <tr>
                    <td
                      className="px-6 text-center text-grey border-l-0 border-r-0 text-xxs p-6"
                      colSpan={7}
                    >
                      Tidak Ada Dokumen
                    </td>
                  </tr>
                ) : (
                  <>
                    {listTransaction.slice(0, 5).map((item, index) => {
                      return (
                        <tr key={index}>
                          <td className="px-6 text-left text-xs p-4">
                            {item.actors && item.actors.length === 0 ? (
                              <div className="italic">Belum diinput</div>
                            ) : (
                              item.actors[0].user_name
                            )}
                          </td>
                          <td className="px-6 text-left text-xs p-4">
                            {item.actors && item.actors.length === 0 ? (
                              <div className="italic">Belum diinput</div>
                            ) : (
                              item.actors[0].user_email
                            )}
                          </td>
                          <td className="px-6 text-left text-xs p-4">
                            {item.doc_name ? (
                              item.doc_name
                            ) : (
                              <div className="italic">Belum diinput</div>
                            )}
                          </td>
                          <td className="px-6 text-left text-xs p-4">
                            {item.doc_num ? (
                              item.doc_num
                            ) : (
                              <div className="italic">Belum diinput</div>
                            )}
                          </td>
                          <td className="px-6 text-xs p-4">
                            {getType(item.doc_type)}
                          </td>
                          {item.total_pending_invitation === 0 ? (
                            <td className="px-6 text-xs p-4">
                              {getStatus(item.doc_status)}
                            </td>
                          ) : (
                            <td className="px-6 text-center text-yellow text-xs p-4">
                              Menunggu Registrasi
                            </td>
                          )}
                          <td className="px-6 text-center text-xs p-4">
                            {item.doc_status === "selesai" ? (
                              <Link
                                className="bg-blue text-white py-2 px-3 rounded-md cursor-pointer"
                                to={`/admin/preview_dokumen/transaction_id=${item.id}`}
                              >
                                Detail
                              </Link>
                            ) : (
                              <button
                                onClick={() =>
                                  currentDoc(
                                    item.id,
                                    item.doc_status,
                                    item.doc_type
                                  )
                                }
                                className="bg-blue text-white py-2 px-3 rounded-md cursor-pointer"
                              >
                                Detail
                              </button>
                            )}
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
      {/* </div> */}
    </>
  );
}
