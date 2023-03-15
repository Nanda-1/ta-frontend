import React, { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { UserContext } from "Context/UserContext";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import { get } from "jquery";

export default function Dokumen() {
  const { functions, listTransaction, cekKtp, dataNik } =
    useContext(UserContext);

  var val = localStorage.getItem("dataPPAT");
  var object = JSON.parse(val);

  const { transactionList } = functions;

  const [listNik, setListNik] = useState([]);

  let history = useHistory();

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
    } else if (data === "stamp_emeterai") {
      return <div className="text-orange-500">Menunggu Tanda Tangan</div>;
    } else {
      return "Selesai";
    }
  };

  useEffect(() => {
    transactionList(object.uid);
    // cekKtp()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log(cekKtp());

  const currentDoc = (id, statusDoc, typeDoc) => {
    alert(statusDoc + " " + typeDoc);
    Cookies.set("id_transaksi", id, { expires: 1 });
    let ajb = "AktaJualBeli";
    let apht = "AktaPemberianHakTanggungan";
    if (statusDoc === "draft") {
      Cookies.set("step", 1);
      history.push(
        "/admin/" + typeDoc === "akta_jual_beli"
          ? ajb
          : typeDoc === "surat_kuasa"
          ? "surat_kuasa/uploadSertipikat"
          : typeDoc === "pendaftaran_tanah_sistematis_lengkap"
          ? "pendaftaran_tanah_sistematis_lengkap/uploadAjb"
          : apht
      );
    } else if (statusDoc === "pihak_pertama") {
      Cookies.set("step", 4);
      history.push(
        "/admin/" + typeDoc === "akta_jual_beli"
          ? ajb
          : typeDoc === "surat_kuasa"
          ? "surat_kuasa"
          : typeDoc === "pendaftaran_tanah_sistematis_lengkap"
          ? "pendaftaran_tanah_sistematis_lengkap"
          : apht
      );
    } else if (statusDoc === "pihak_kedua") {
      Cookies.set("step", 7);
      history.push(
        "/admin/" + typeDoc === "akta_jual_beli"
          ? ajb
          : typeDoc === "surat_kuasa"
          ? "surat_kuasa"
          : typeDoc === "pendaftaran_tanah_sistematis_lengkap"
          ? "pendaftaran_tanah_sistematis_lengkap"
          : apht
      );
    } else if (statusDoc === "submit_dokumen") {
      Cookies.set("step", 8);
      history.push(
        "/admin/" + typeDoc === "akta_jual_beli"
          ? ajb
          : typeDoc === "surat_kuasa"
          ? "surat_kuasa"
          : typeDoc === "pendaftaran_tanah_sistematis_lengkap"
          ? "pendaftaran_tanah_sistematis_lengkap"
          : apht
      );
    } else if (statusDoc === "stamp_emeterai") {
      history.push(
        "/admin/" + typeDoc === "surat_kuasa"
          ? "surat_kuasa/pembubuhan"
          : "pendaftaran_tanah_sistematis_lengkap/pembubuhan"
      );
    } else if (statusDoc === "generate_document") {
      history.push(
        "/admin/" + typeDoc === "surat_kuasa"
          ? "surat_kuasa/inputDataForm"
          : "pendaftaran_tanah_sistematis_lengkap/inputDataForm"
      );
    } else {
      history.push(`/admin/preview_dokumen/transaction_id=${id}`);
    }
    window.location.reload();
  };

  const getDataUmum = (data, type) => {
    let obj = eval("(" + data + ")");

    // if (
    //   type === "nama" &&
    //   (obj.nama === object.user_detail.name ||
    //     obj.name === object.user_detail.name)
    // ) {
    //   return obj.nama || obj.name;
    // } else if (type === "email") {
    //   if (obj.name === object.user_detail.name) {
    //     return object.email;
    //   } else {
    //     return "sas";
    //   }
    // } else {
    //   return "dfd";
    // }
    //  cekKtp(obj.no_nik || obj.ni_identitas)
  };

  return (
    <div className="relative flex flex-col min-w-full break-words pb-6 font-sans dokumen-all-scroll">
      <div className={"text-blue text-bold text-xl pl-6 mb-2"}>
        Daftar Dokumen
      </div>
      <div className="relative font-bold box-content bg-white px-3 py-2 history-shadow rounded-lg mb-2">
        <div className="block overflow-x-auto">
          {/* Projects table */}
          <table className="items-center bg-transparent border-collapse w-100">
            <thead>
              <tr>
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
                    className="px-6 text-center border-l-0 border-r-0 text-xxs text-gray p-6"
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
                        <td
                          className="px-6 text-left text-xs py-2 border border-solid border-l-0 border-r-0 border-t-0"
                          width={"18%"}
                        >
                          {item.actors.length === 0 ? (
                            <div className="italic">Belum diinput</div>
                          ) : item.actors[0].user_name ? (
                            item.actors[0].user_name
                          ) : (
                            getDataUmum(item.eform_json_data, "nama")
                          )}
                        </td>
                        <td
                          className="px-6 text-left text-xs py-2 border border-solid border-l-0 border-r-0 border-t-0"
                          width={"18%"}
                        >
                          {item.actors.length === 0 ? (
                            <div className="italic">Belum diinput</div>
                          ) : item.actors[0].user_email ? (
                            item.actors[0].user_email
                          ) : (
                            getDataUmum(item.eform_json_data, "email")
                          )}
                        </td>
                        <td
                          className="px-6 text-left text-xs py-2 border border-solid border-l-0 border-r-0 border-t-0"
                          width={"18%"}
                        >
                          {item.doc_name ? (
                            item.doc_name
                          ) : (
                            <div className="italic">Belum diinput</div>
                          )}
                        </td>
                        <td
                          className="px-6 text-left text-xs py-2 border border-solid border-l-0 border-r-0 border-t-0"
                          width={"18%"}
                        >
                          {item.doc_num ? (
                            item.doc_num
                          ) : (
                            <div className="italic">Belum diinput</div>
                          )}
                        </td>
                        <td
                          className="px-6 text-xs py-2 border border-solid border-l-0 border-r-0 border-t-0"
                          width={"25%"}
                        >
                          {getType(item.doc_type)}
                        </td>
                        <td className="px-6 text-xs py-2 border border-solid border-l-0 border-r-0 border-t-0">
                          {item.doc_status}
                        </td>
                        <td className="px-6 text-center text-xs py-2 border border-solid border-l-0 border-r-0 border-t-0">
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
                                    item.transaction_id,
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
