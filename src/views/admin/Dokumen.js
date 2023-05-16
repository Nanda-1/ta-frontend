import React, { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { UserContext } from "Context/UserContext";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import { Pagination } from "react-headless-pagination";
import NextIcon from "../../assets/img/next-light.png";
import PrevIcon from "../../assets/img/prev.png";
import { io } from "socket.io-client";
import swal from "sweetalert";

export default function Dokumen() {
  const { functions, listTransaction } = useContext(UserContext);

  const { transactionList, getSocket } = functions;

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
    } else if (data === "add_data") {
      return <div className="text-teal-500">Proses melengkapi dokumen</div>;
    } else if (data === "generate_document") {
      return <div className="text-orange-500">Membuat dokumen</div>;
    } else if (data === "stamp_emeterai") {
      return <div className="text-red-500">Menunggu tanda tangan</div>;
    } else if (data === "sign_ttd") {
      return <div className="text-red-500">Menunggu tanda tangan</div>;
    } else {
      return "Selesai";
    }
  };

  useEffect(() => {
    transactionList("doc");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  var val = localStorage.getItem("dataPPAT");
  var object = JSON.parse(val);

  var auth = localStorage.getItem("authentication");
  var token = JSON.parse(auth);

  const currentDoc = (id, statusDoc, typeDoc) => {
    let url = "";

    if (object.role === "member") {
      const socket = io("https://be-ppat-transaction.infinids.id");
      // console.log(socket)

      socket.on("connect", () => {
        console.log(`Connected with ID: ${socket.id}`);
      });

      socket.on(`room start ${id}`, (data) => {
        swal({
          title: "Berhasil",
          text: data.message,
          icon: "success",
        }).then(() => {
          history.push("/ruang_virtual=testing&&id=" + id);
        });
      });
    }

    if (typeDoc === "akta_jual_beli") {
      url = "AktaJualBeli";
    } else {
      url = "AktaPemberianHakTanggungan";
    }

    if (statusDoc === "draft") {
      Cookies.set("step", "input_data_penjual");
      history.push("/admin/" + url + "=" + id);
    } else if (statusDoc === "pihak_pertama") {
      Cookies.set("step", "input_data_pembeli");
      history.push("/admin/" + url + "=" + id);
    } else if (statusDoc === "add_data") {
      Cookies.set("step", "input_data_pembeli");
      history.push("/admin/" + url + "=" + id);
    } else if (statusDoc === "pihak_kedua") {
      Cookies.set("step", "dokumen");
      history.push("/admin/" + url + "=" + id);
    } else if (statusDoc === "submit_dokumen") {
      Cookies.set("step", "stamping");
      history.push("/admin/" + url + "=" + id);
    } else if (statusDoc === "stamp_emeterai") {
      getSocket(id);
      history.push("/ruang_virtual=testing&&id=" + id);
    } else if (statusDoc === "sign_ttd") {
      // history.push("/ruang_virtual=testing&&id=" + id);
    } else if (statusDoc === "generate_document") {
      // Cookies.set("transaction_id", id);
      if (typeDoc === "akta_jual_beli") {
        Cookies.set("step", "dokumen");

        history.push("/admin/" + url + "=" + id);
      } else if (typeDoc === "akta_pemberian_hak_tanggunan") {
        Cookies.set("step", "dokumen");
        history.push("/admin/" + url + "=" + id);
      } else {
        history.push("/admin/" + typeDoc + "/inputDataForm");
      }
    } else {
      history.push(`/admin/preview_dokumen/transaction_id=${id}`);
    }
    // window.location.reload();
  };

  return (
    <div className="relative flex flex-col min-w-full break-words pb-6 font-sans   dokumen-all-scroll">
      <div className={"text-blue text-bold text-xl pl-6 mb-2"}>
        Daftar Dokumen
      </div>
      <div className="relative font-bold box-content bg-white px-3 py-2 history-shadow rounded-lg mb-2">
        <div className="block  doc-list">
          {/* Projects table */}
          <table
            className={`items-center bg-transparent border-collapse w-full
            `}
          >
            <thead>
              <tr>
                <th
                  className={
                    "px-1 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 border-t-0 font-bold text-left "
                  }
                >
                  Nama Pemohon
                </th>
                <th
                  className={
                    "px-1 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 border-t-0 font-bold text-left "
                  }
                >
                  E-Mail
                </th>
                <th
                  className={
                    "px-1 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 border-t-0 font-bold text-left "
                  }
                >
                  Nama Dokumen
                </th>
                <th
                  className={
                    "px-1 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 border-t-0 font-bold text-left "
                  }
                >
                  Nomor Dokumen
                </th>
                <th
                  className={
                    "px-1 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 border-t-0 font-bold text-left "
                  }
                >
                  Kategori
                </th>
                <th
                  className={
                    "px-1 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 border-t-0 font-bold text-left "
                  }
                >
                  Status
                </th>
                <th
                  className={
                    "px-1 text-left align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 border-t-0 font-bold "
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
                    className="px-1 text-center border-l-0 border-r-0 text-xxs text-gray p-6"
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
                            className="px-1 text-left text-xs py-2 border border-solid border-l-0 border-r-0 border-t-0"
                            width={"18%"}
                          >
                            {item.actors[0] ? (
                              item.actors[0].user_name
                            ) : (
                              <div className="italic">Belum diinput</div>
                            )}
                          </td>
                          <td
                            className="px-1 text-left text-xs py-2 border border-solid border-l-0 border-r-0 border-t-0"
                            width={"18%"}
                          >
                            {item.actors[0] ? (
                              item.actors[0].user_email
                            ) : (
                              <div className="italic">Belum diinput</div>
                            )}
                          </td>
                          <td
                            className="px-1 text-left text-xs py-2 border border-solid border-l-0 border-r-0 border-t-0"
                            width={"18%"}
                          >
                            {item.doc_name ? (
                              item.doc_name
                            ) : (
                              <div className="italic">Belum diinput</div>
                            )}
                          </td>
                          <td
                            className="px-1 text-left text-xs py-2 border border-solid border-l-0 border-r-0 border-t-0"
                            width={"18%"}
                          >
                            {item.doc_num ? (
                              item.doc_num
                            ) : (
                              <div className="italic">Belum diinput</div>
                            )}
                          </td>
                          <td
                            className="px-1 text-xs py-2 border border-solid border-l-0 border-r-0 border-t-0"
                            width={"18%"}
                          >
                            {getType(item.doc_type)}
                          </td>
                          <td
                            className="px-1 text-xs py-2 border border-solid border-l-0 border-r-0 border-t-0"
                            width={"18%"}
                          >
                            {getStatus(item.doc_status)}
                          </td>
                          <td
                            className="px-1 text-center text-xs py-2 border border-solid border-l-0 border-r-0 border-t-0"
                            // width={"28%"}
                          >
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
                                  className={`font-bold text-white py-2 px-3 cursor-pointer rounded-md ${
                                    item.doc_status === "sign_ttd" ||
                                    item.doc_status === "stamp_emeterai"
                                      ? "bg-red-500"
                                      : "bg-blue"
                                  }`}
                                >
                                  {item.doc_status === "sign_ttd" ||
                                  item.doc_status === "stamp_emeterai"
                                    ? "Tanda Tangan"
                                    : "Detail"}
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
          middlePagesSiblingCount={1}
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
