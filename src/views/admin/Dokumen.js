import React, { useContext, useEffect } from "react";

import { Link } from "react-router-dom";
import { UserContext } from "Context/UserContext";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

export default function Dokumen() {
  const { functions, listTransaction } = useContext(UserContext);

  var val = localStorage.getItem("dataPPAT");
  var object = JSON.parse(val);

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
      return <div className="text-yellow">Menunggu pengisian pihak 2</div>;
    } else if (data === "pihak_kedua") {
      return (
        <div className="text-orange-500">Menunggu pengisian data akta</div>
      );
    } else {
      return "Selesai";
    }
  };

  useEffect(() => {
    transactionList(object.uid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentDoc = (id, statusDoc, typeDoc) => {
    Cookies.set("id_transaksi", id, { expires: 1 });
    let ajb = "AktaJualBeli";
    let apht = "AktaPemberianHakTanggungan";
    if (statusDoc === "draft") {
      Cookies.set("step", 1);
      history.push("/admin/" + typeDoc === "akta_jual_beli" ? ajb : apht);
    } else if (statusDoc === "pihak_pertama") {
      Cookies.set("step", 4);
      history.push("/admin/" + typeDoc === "akta_jual_beli" ? ajb : apht);
    } else if (statusDoc === "pihak_kedua") {
      Cookies.set("step", 7);
      history.push("/admin/" + typeDoc === "akta_jual_beli" ? ajb : apht);
    } else if (statusDoc === "submit_dokumen") {
      Cookies.set("step", 8);
      history.push("/admin/" + typeDoc === "akta_jual_beli" ? ajb : apht);
    } else {
      history.push(`/admin/preview_dokumen/transaction_id=${id}`);
    }
    window.location.reload();
  };

  return (
    <div className="relative bg-white flex flex-col min-w-full break-words pb-6 font-roboto">
      <div className={"text-blue text-bold text-xl pl-6 mb-2"}>
        Daftar Dokumen
      </div>
      <div className="relative font-bold box-content w-full px-3 py-5 history-shadow rounded-lg mb-2">
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 border-t-0 font-bold text-left "
                  }
                >
                  No.
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 border-t-0 font-bold text-left "
                  }
                >
                  Nama Pemohon
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 border-t-0 font-bold text-left "
                  }
                >
                  E-Mail
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 border-t-0 font-bold text-left "
                  }
                >
                  Nama Dokumen
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 border-t-0 font-bold text-center "
                  }
                >
                  Nomor Dokumen
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 border-t-0 font-bold text-center "
                  }
                >
                  Kategori
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 border-t-0 font-bold text-center "
                  }
                >
                  Status
                </th>
                <th
                  className={
                    "px-6 text-center align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 border-t-0 font-bold "
                  }
                >
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {listTransaction.length === 0 || !listTransaction ? (
                <tr>
                  <td
                    className="px-6 text-center border-l-0 border-r-0 text-xs p-6 bg-gray"
                    colSpan={7}
                  >
                    Anda belum membuat dokumen
                  </td>
                </tr>
              ) : (
                <>
                  {listTransaction.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="px-6 text-left text-xs p-4">
                          {item.actors.length === 0 ? (
                            <div className="italic">{index + 1}</div>
                          ) : (
                            index + 1
                          )}
                        </td>
                        <td className="px-6 text-left text-xs p-4">
                          {item.actors.length === 0 ? (
                            <div className="italic">Belum diinput</div>
                          ) : (
                            item.actors[0].user_name
                          )}
                        </td>
                        <td className="px-6 text-left text-xs p-4">
                          {item.actors.length === 0 ? (
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
                            <>
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
                            </>
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
  );
}
