import React, { useContext, useEffect } from "react";

import { Link } from "react-router-dom";
import { UserContext } from "Context/UserContext";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

export default function RiwayatPemohon() {
  const { functions, listTransaction } = useContext(UserContext);

  const { transactionList } = functions;

  let history = useHistory();

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
    transactionList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentDoc = (id, statusDoc, typeDoc) => {
    Cookies.set("transaction_id", id, { expires: 1 });
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
    } else if (statusDoc === "stamp_emeterai") {
      Cookies.set("transaction_id", id);
      history.push("/admin/" + typeDoc + "/pembubuhan");
    } else if (statusDoc === "generate_document") {
      Cookies.set("transaction_id", id);
      if (typeDoc === "akta_jual_beli") {
        Cookies.set("step", "dokumen");

        history.push("/admin/" + url);
      } else if (typeDoc === "akta_pemberian_hak_tanggunan") {
        Cookies.set("step", "dokumen");
        history.push("/admin/" + url);
      } else {
        history.push("/admin/" + typeDoc + "/inputDataForm");
      }
    } else {
      history.push(`/admin/preview_dokumen/transaction_id=${id}`);
    }
    window.location.reload();
  };

  const getType = (data) => {
    let result = data.replace(/_/g, " ");
    var splitStr = result.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(" ");
  };

  return (
    <>
      <div className="relative break-words font-sans mb-8 ">
        <div className="text-bold mt-6 mb-2 w-full">
          <div className="text-lg text-black font-bold">Riwayat Permohonan</div>
        </div>
        <div className="relative font-bold box-content px-3 py-2 card-shadow rounded-lg bg-white">
          <div className="block overflow-x-auto">
            {/* Projects table */}
            <table className="items-center w-full overflow-x-auto bg-transparent border-collapse">
              <thead>
                <tr>
                  <th className="px-3 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 border-t-0 font-semibold text-left">
                    Nama Pemohon
                  </th>
                  <th className="px-3 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 border-t-0 font-semibold text-left">
                    E-Mail
                  </th>
                  <th className="px-3 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 border-t-0 font-semibold text-left">
                    Nama Dokumen
                  </th>
                  <th className="px-3 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 border-t-0 font-semibold text-center">
                    Nomor Dokumen
                  </th>
                  <th className="px-3 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 border-t-0 font-semibold text-center">
                    Kategori
                  </th>
                  <th className="px-3 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 border-t-0 font-semibold text-center">
                    Status
                  </th>
                  <th className="px-3 text-center align-middle border border-solid py-3 text-xs border-l-0 border-r-0 border-t-0 font-semibold">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {(listTransaction && listTransaction.length === 0) ||
                !listTransaction ? (
                  <tr>
                    <td
                      className="px-3 text-center text-grey border-l-0 border-r-0 text-xxs p-6"
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
                          <td className="px-3 text-left text-xs py-3 border border-solid border-l-0 border-r-0 border-t-0 ">
                            {item.actors[0] ? (
                              item.actors[0].user_name
                            ) : (
                              <div className="italic">Belum diinput</div>
                            )}
                          </td>
                          <td className="px-3 text-left text-xs py-3 border border-solid border-l-0 border-r-0 border-t-0 ">
                            {item.actors[0] ? (
                              item.actors[0].user_email
                            ) : (
                              <div className="italic">Belum diinput</div>
                            )}
                          </td>
                          <td className="px-3 text-left text-xs py-3 border border-solid border-l-0 border-r-0 border-t-0 ">
                            {item.doc_name ? (
                              item.doc_name
                            ) : (
                              <div className="italic">Belum diinput</div>
                            )}
                          </td>
                          <td className="px-3 text-left text-xs py-3 border border-solid border-l-0 border-r-0 border-t-0 ">
                            {item.doc_num ? (
                              item.doc_num
                            ) : (
                              <div className="italic">Belum diinput</div>
                            )}
                          </td>
                          <td className="px-3 text-xs py-3 border border-solid border-l-0 border-r-0 border-t-0 ">
                            {getType(item.doc_type)}
                          </td>
                          <td className="px-3 text-xs py-3 border border-solid border-l-0 border-r-0 border-t-0 ">
                            {item.doc_status}
                          </td>
                          <td className="px-3 text-center text-xs py-3 border border-solid border-l-0 border-r-0 border-t-0 ">
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
                                    item.transaction_id,
                                    item.doc_status,
                                    item.doc_type
                                  )
                                }
                                className="bg-blue font-bold text-white py-2 px-3 rounded-md cursor-pointer"
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
          {listTransaction.length > 5 ? (
            <div className="w-full my-3 text-center">
              <button
                className="text-xs border font-bold px-6 py-2 rounded shadow focus:outline-none"
                onClick={() => history.push("/admin/dokumen")}
              >
                Lihat Semua
              </button>
            </div>
          ) : null}
        </div>
      </div>
      {/* </div> */}
    </>
  );
}