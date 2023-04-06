import React, { createContext, useState } from "react";
import { useHistory } from "react-router";
import swal from "sweetalert";
import Cookies from "js-cookie";

export const DokumenContext = createContext();

export const DokumenProvider = (props) => {
  const [detailtransaction, setDetailtransaction] = useState([]);
  const [listData, setListData] = useState([]);
  const [doc, setDoc] = useState([""]);
  const [docBaru, setDocBaru] = useState();
  const [docPending, setDocPending] = useState();
  const [docDisetujui, setDocDisetujui] = useState();
  const [allUsers, setAllUsers] = useState(0);
  const [meterai, setMeterai] = useState(false);
  const [loadingFile, setLoadingFile] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [btnConfirm, setBtnConfirm] = useState(false);
  const [ttdImage, setTtdImage] = useState("");
  const [otpModal, setOtpModal] = useState(false);
  const [btnConfirmTtd, setBtnConfirmTtd] = useState(false);

  let history = useHistory();

  var val = localStorage.getItem("dataPPAT");
  var object = JSON.parse(val);

  var auth = localStorage.getItem("authentication");
  var token = JSON.parse(auth);

  const refreshToken = () => {
    fetch(process.env.REACT_APP_BACKEND_HOST_AUTH + "api/auth/refresh-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        refresh_token: token.refresh_token,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success === true) {
          token.access_token = result.data.access_token;
          localStorage.setItem("authentication", JSON.stringify(token));
          // setTimeout(() => {
          //   window.location.reload();
          // }, 1000);
        } else {
          swal("Gagal", "Silahkan login kembali", "error");
          localStorage.removeItem("authentication");
          localStorage.removeItem("dataPPAT");
          setTimeout(() => {
            history.push("/login");
          }, 1000);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const fetchDataTransaksi = (id) => {
    fetch(
      process.env.REACT_APP_BACKEND_HOST_AUTH + "api/transaction/" + id + "/detail",
      {
        method: "GET",
        redirect: "follow",
        headers: { Authorization: "Bearer " + object.token },
      }
    )
      .then((response) => {
        if (response.status === 401) {
          refreshToken();
        } else {
          return response.json();
        }
      })
      .then((result) => {
        // console.log(result)
        setDetailtransaction(result.data);
        setTimeout(() => {
          getDokumen(result.data.id, result.data.doc_type);
        }, 3000);
      })
      .catch((error) => console.log("error", error));
  };

  const listTransaksi = () => {
    fetch(process.env.REACT_APP_BACKEND_HOST + "api/transaction/ppat/list", {
      method: "GET",
      redirect: "follow",
      headers: {
        Authorization: "Bearer " + object.token,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setListData(result.data);
        for (let i = 0; i < result.data.length; i++) {
          if (result.data[i].doc_status === "draft") {
            const filterData = listData.filter((e) => {
              return e.doc_status === "draft";
            });
            setDocBaru(filterData);
          } else if (result.data[i].doc_status === "selesai") {
            const filterData = listData.filter((e) => {
              return e.doc_status === "selesai";
            });
            setDocDisetujui(filterData);
          } else {
            const filterData = listData.filter((e) => {
              return e.doc_status !== "draft" && "selesai";
            });
            setDocPending(filterData);
          }
        }
      })
      .catch((error) => console.log("error", error));
  };

  const getDokumen = (id, doc) => {
    fetch(
      process.env.REACT_APP_BACKEND_HOST +
        "/api/transaction/getdocument?transaction_id=" +
        id +
        "&doc_type=" +
        doc,
      {
        method: "GET",
        redirect: "follow",
        headers: { Authorization: "Bearer " + object.token },
      }
    )
      .then((response) => {
        if (response.status === 401) {
          refreshToken();
        } else {
          return response.blob();
        }
      })
      .then((result) => {
        setDoc(result);
      })
      .catch((error) => console.log("error", error));
  };

  const getCountUsers = () => {
    fetch(process.env.REACT_APP_BACKEND_HOST + "/api/users/total/bygroup", {
      method: "GET",
      redirect: "follow",
      headers: {
        Authorization: "Bearer " + object.token,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setAllUsers(result.data[2].total);
      })
      .catch((error) => console.log("error", error));
  };

  const getDocBaru = () => {
    console.log(listData);
    const filterData = listData.filter((e) => {
      return e.doc_status === "draft";
    });
    console.log(filterData);
  };

  const getDocPending = (status) => {
    const filterData = listData.filter((e) => {
      return e.doc_status === status;
    });
    setDocPending(filterData);
  };

  const getDocSelesai = (status) => {
    const filterData = listData.filter((e) => {
      return e.doc_status === status;
    });
    setDocDisetujui(filterData);
  };

  const changePage = (id) => {
    history.push("/admin/details/transaction_id=" + id);
  };

  const getDokumenAkta = (doc) => {
    let id = 887;

    fetch(
      process.env.REACT_APP_BACKEND_HOST +
        "/api/transaction/getdocument?transaction_id=" +
        id +
        "&doc_type=" +
        doc,
      {
        method: "GET",
        // body: formdata,
        redirect: "follow",
        headers: {
          "Content-Type": "application/pdf",
          Authorization: "Bearer " + object.token,
        },
      }
    )
      .then((response) => {
        if (response.status === 401) {
          refreshToken();
        } else {
          return response.blob();
        }
      })
      .then((result) => {
        let name = "doc";
        setDoc({ ...doc, [name]: result });
        setLoadingFile(false);
      })
      .catch((error) => console.log("error", error));
  };

  const getDokumenStamp = (type) => {
    // let id = inputAjb.id_transaksi
    //   ? Number(inputAjb.id_transaksi)
    //   : Number(cookies.get("id_transaksi"));
    let id = 887;

    fetch(
      process.env.REACT_APP_BACKEND_HOST +
        "/api/transaction/getdocument?transaction_id=" +
        id +
        "&doc_type=" +
        type,
      {
        method: "GET",
        // body: formdata,
        redirect: "follow",
        headers: {
          "Content-Type": "application/pdf",
          Authorization: "Bearer " + object.token,
        },
      }
    )
      .then((response) => {
        if (response.status === 401) {
          refreshToken();
        } else {
          return response.blob();
        }
      })
      .then((result) => {
        let name = "doc2";
        setDoc({ ...doc, [name]: result });
        setLoadingFile(false);
      })
      .catch((error) => console.log("error", error));
  };

  const getTtdImage = () => {
    fetch(
      process.env.REACT_APP_BACKEND_HOST_AUTH +
        "api/users/get-file?file_type=ttd",
      {
        method: "GET",
        redirect: "follow",
        headers: {
          Authorization: "Bearer " + token.access_token,
        },
      }
    )
      .then((response) => {
        if (response.status === 401) {
          refreshToken();
        } else {
          return response.blob();
        }
      })
      .then((result) => {
        setTtdImage(URL.createObjectURL(result));
      })
      .catch((error) => console.log("error", error));
  };

  const addMeterai = (type) => {
    let id = 887;

    fetch(process.env.REACT_APP_BACKEND_HOST + "api/transaction/stampmaterai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + object.token,
        // 'Access-Control-Allow-Origin' : '*'
      },
      credentials: "same-origin",
      body: JSON.stringify({
        transaction_id: id,
        llx: doc.llx,
        lly: doc.lly,
        urx: doc.urx,
        ury: doc.ury,
        page_num: doc.meteraiPage,
      }),
      redirect: "follow",
    })
      .then((response) => {
        if (response.status === 401) {
          refreshToken();
        } else {
          return response.json();
        }
      })
      .then((result) => {
        setLoadingFile(true);
        if (result.success === false) {
          if (result.error === "Maaf, quota habis.") {
            setMeterai(false);
            setLoadingFile(false);
            swal(
              "Gagal",
              "Maaf kuota materai anda habis.\n Segera isi ulang kuota anda.",
              "error"
            );
          } else {
            setLoadingFile(false);
            swal("Gagal", result.error, "error");
            setMeterai(false);
          }
        } else {
          getDokumenStamp("akta_jual_beli");
        }
      })
      .catch((error) => {
        getDokumenStamp("akta_jual_beli");
        console.log("error", error);
      });
  };

  const addTandaTangan = () => {
    let id = doc.id_transaksi
      ? Number(doc.id_transaksi)
      : Number(Cookies.get("id_transaksi"));

    fetch(process.env.REACT_APP_BACKEND_HOST + "api/transaction/stampmaterai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + object.token,
        // 'Access-Control-Allow-Origin' : '*'
      },
      credentials: "same-origin",
      body: JSON.stringify({
        transaction_id: id,
        llx: doc.llx,
        lly: doc.lly,
        urx: doc.urx,
        ury: doc.ury,
        page_num: doc.meteraiPage,
      }),
      redirect: "follow",
    })
      .then((response) => {
        if (response.status === 401) {
          refreshToken();
        } else {
          return response.json();
        }
      })
      .then((result) => {
        Cookies.set("sign_doc_id", result.data.data.sign_doc_id);
        console.log(result.data);
        setOtpModal(true);
      })
      .catch((error) => console.log(error));
  };

  const functions = {
    fetchDataTransaksi,
    listTransaksi,
    addTandaTangan,
    getDokumen,
    getCountUsers,
    getDocBaru,
    getDocPending,
    getDocSelesai,
    getDokumenAkta,
    getDokumenStamp,
    getTtdImage,
    addMeterai,
  };

  return (
    <DokumenContext.Provider
      value={{
        functions,
        detailtransaction,
        setDetailtransaction,
        changePage,
        doc,
        setDoc,
        docBaru,
        setDocBaru,
        docPending,
        setDocPending,
        docDisetujui,
        setDocDisetujui,
        allUsers,
        setAllUsers,
        listData,
        setListData,
        loadingFile,
        setLoadingFile,
        meterai,
        setMeterai,
        btnConfirm,
        setBtnConfirm,
        confirmModal,
        setConfirmModal,
        ttdImage,
        setTtdImage,
        otpModal,
        setOtpModal,
        btnConfirmTtd,
        setBtnConfirmTtd,
      }}
    >
      {props.children}
    </DokumenContext.Provider>
  );
};
