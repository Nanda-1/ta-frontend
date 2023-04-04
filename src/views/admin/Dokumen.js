import React, { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { UserContext } from "Context/UserContext";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import { Pagination } from "react-headless-pagination";
import NextIcon from "../../assets/img/next-light.png";
import PrevIcon from "../../assets/img/prev.png";

export default function Dokumen() {
  const { functions, listTransaction, cekKtp, dataNik } =
    useContext(UserContext);

  var val = localStorage.getItem("dataPPAT");
  var object = JSON.parse(val);

  const { transactionList } = functions;

  const [listNik, setListNik] = useState([]);
  const [page, setPage] = useState(0);
  let history = useHistory();

  const handlePageChange = (page) => {
    setPage(page);
  };

  const indexOfLastTodo = (page + 1) * 10;
  const indexOfFirstTodo = indexOfLastTodo - 10;

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

  const getDataUmum = (data) => {
    let hasil = data.replace(/'/g, '"');
    let hasil2 = hasil.replace(/None/g, "null");

    let obj = JSON.parse(hasil2);
    console.log(obj)

      return obj.name;
  };

  return (
    <div className="relative flex flex-col min-w-full break-words pb-6 font-sans   dokumen-all-scroll">
      <div className={"text-blue text-bold text-xl pl-6 mb-2"}>
        Daftar Dokumen
      </div>
      <div className="relative font-bold box-content bg-white px-3 py-2 history-shadow rounded-lg mb-2">
        <div className="block overflow-x-auto doc-list">
          {/* Projects table */}
          <table
            className={`items-center bg-transparent border-collapse ${
              listTransaction.length !== 0 ? "w-100" : "w-full"
            }`}
          >
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
              {listTransaction.length === 0 || listTransaction === "" ? (
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
                  {listTransaction
                    .slice(indexOfFirstTodo, indexOfLastTodo)
                    .map((item, index) => {
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
                              getDataUmum(item.eform_json_data)
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
                            width={"20%"}
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
      {listTransaction.length !== 0 && (
        <Pagination
          currentPage={page}
          setCurrentPage={handlePageChange}
          totalPages={Math.ceil(listTransaction.length / 10)}
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
  );
}
