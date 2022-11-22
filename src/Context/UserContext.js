import React, { createContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import cookies from "js-cookie";
import swal from "sweetalert";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [loginStatus, setLoginStatus] = useState(false);
  const [addDocumentModal, setAddDocumentModal] = useState(false);
  const [dataUser, setDataUser] = useState([]);
  const [listTransaction, setListTransaction] = useState([]);
  const [detailtransaction, setDetailtransaction] = useState([]);
  const [fetchStatus, setFetchStatus] = useState(true);
  const [modalOtpLogin, setModalOtpLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resend, setResend] = useState(false);
  const [selesai, setSelesai] = useState(false);
  const [pending, setPending] = useState(false);
  const [draft, setDraft] = useState(false);
  const [sidebar, setSidebar] = useState(true);
  const [step, setStep] = useState(1);
  const [meteraiQuota, setMeteraiQuota] = useState(0);
  const [ttdQuota, setTtdQuota] = useState(0);
  const [formQuota, setFormKuota] = useState(0);
  const [lengkapidiri, setLengkapidiri] = useState(false);
  const [coordMaps, setCoordMaps] = useState([]);

  let history = useHistory();

  var val = localStorage.getItem("dataPPAT");
  var object = JSON.parse(val);

  var login = localStorage.getItem("authentication");
  var auth = JSON.parse(login);

  const refreshToken = () => {
    fetch(process.env.REACT_APP_BACKEND_HOST + "api/auth/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        refresh_token: auth.refresh_token,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success === true) {
          auth.token = result.data.access_token;
          localStorage.setItem("dataPPAT", JSON.stringify(auth));
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          swal("Gagal", "Silahkan login kembali", "error");
          localStorage.removeItem("dataPPAT");
          setTimeout(() => {
            history.push("/login");
          }, 1000);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const fetchDataUser = async (id) => {
    await fetch(process.env.REACT_APP_BACKEND_HOST + "api/users/" + id, {
      method: "GET",
      redirect: "follow",
      headers: { Authorization: "Bearer " + auth.token },
    })
      .then((response) => {
        if (response.status === 401) {
          refreshToken();
        } else {
          return response.json();
        }
      })
      .then((result) => {
        setDataUser(result.data);
        localStorage.setItem("dataPPAT", JSON.stringify(result.data));
      })
      .catch((error) => console.log("error", error.message));
  };

  const createDocumentAJB = () => {
    fetch(process.env.REACT_APP_BACKEND_HOST + "api/transaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth.token,
      },
      body: JSON.stringify({
        doc_type: "akta_jual_beli",
        // user_id: id,
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
        // console.log(result)
        let id_transaksi = result.data.transaction_id;
        cookies.set("id_transaksi", id_transaksi, { expires: 1 });
        history.push(`/admin/AktaJualBeli`);
        window.location.reload();
      })
      .catch((error) => console.log("error", error));
  };

  const createDocumentAPHT = () => {
    fetch(process.env.REACT_APP_BACKEND_HOST + "api/transaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth.token,
      },
      body: JSON.stringify({
        doc_type: "akta_pemberian_hak_tanggungan",
        // user_id: id,
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
        // console.log(result)
        let id_transaksi = result.data.transaction_id;
        cookies.set("id_transaksi", id_transaksi, { expires: 1 });
        history.push(`/admin/AktaPemberianHakTanggungan`);
        window.location.reload();
      })
      .catch((error) => console.log("error", error));
  };

  const transactionList = (id) => {
    fetch(
      process.env.REACT_APP_BACKEND_HOST +
        "api/transaction/" +
        id +
        "/list?is_ppat=1",
      {
        method: "GET",
        redirect: "follow",
        headers: { Authorization: "Bearer " + auth.token },
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
        let data = result.data;
        setListTransaction(data);
      })
      .catch((error) => console.log("error", error));
  };

  const verifiedOTP = async (otp) => {
    setModalOtpLogin(false);
    setLoading(true);

    await fetch(
      process.env.REACT_APP_BACKEND_HOST_AUTH + "api/auth/verify-login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          otp_code: otp,
          loc_latitude: coordMaps.latitude,
          loc_longitude: coordMaps.longitude,
          user_id: Number(cookies.get("uid")),
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.data === null) {
          swal("Error", res.error, "error");
          setLoading(false);
        } else {
          fetchDataUser(res.data.user.user_id);
          localStorage.setItem(
            "authentication",
            JSON.stringify(res.data.token)
          );
          swal("Berhasil", "Kode OTP berhasil diverifikasi", "success");
          setTimeout(() => {
            window.location.reload();
            setLoading(false);
          }, 3000);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const otpExpired = () => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
      user_id: Number(cookies.get("uid")),
    });

    let requestOptionsGet = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      process.env.REACT_APP_BACKEND_HOST_AUTH + "api/auth/login/resend-otp",
      requestOptionsGet
    )
      .then((res) => res.json())
      .catch((error) => console.log("error", error));
  };

  const getTransactionDetails = (id, type) => {
    fetch(
      process.env.REACT_APP_BACKEND_HOST + "api/transaction/" + id + "/detail",
      {
        method: "GET",
        redirect: "follow",
      }
    )
      .then((res) => res.json())
      .then((result) => {
        setDetailtransaction(result.data);
        setTimeout(() => {
          getDokumen(id, type);
        }, 3000);
      })
      .catch((error) => console.log("error", error));
  };

  const getDokumen = (id, type) => {
    fetch(
      process.env.REACT_APP_BACKEND_HOST +
        "api/transaction/getdocument?transaction_id=" +
        id +
        "&doc_type=" +
        type,
      {
        method: "GET",
        redirect: "follow",
        headers: { "Content-Type": "application/pdf" },
      }
    )
      .then((response) => response.blob())
      .then((result) => {
        let name = "doc";
        setDetailtransaction({ ...detailtransaction, [name]: result });
      })
      .catch((error) => console.log("error", error));
    // console.log(inputAjb)
  };

  const isInitialMount = useRef(true);

  const dataPenjual = async (user) => {
    if (isInitialMount.current) {
      await fetch(process.env.REACT_APP_BACKEND_HOST + "api/users/" + user, {
        method: "GET",
        redirect: "follow",
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result.data);
        })
        .catch((error) => console.log("error", error));
      isInitialMount.current = false;
    }
  };

  const dokumenSelesai = (id) => {
    fetch(
      process.env.REACT_APP_BACKEND_HOST +
        "api/transaction/" +
        id +
        "/list?status=selesai&is_ppat=1",
      {
        method: "GET",
        redirect: "follow",
        headers: { Authorization: "Bearer " + auth.token },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.data) {
          let data = result.data.length;
          setSelesai(data);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const dokumenDraft = (id) => {
    fetch(
      process.env.REACT_APP_BACKEND_HOST +
        "api/transaction/" +
        id +
        "/list?status=draft&is_ppat=1",
      {
        method: "GET",
        redirect: "follow",
        headers: { Authorization: "Bearer " + auth.token },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.data) {
          let data = result.data.length;
          setDraft(data);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const dokumenPending = (id) => {
    fetch(
      process.env.REACT_APP_BACKEND_HOST +
        "api/transaction/" +
        id +
        "/list?status=pending&is_ppat=1",
      {
        method: "GET",
        redirect: "follow",
        headers: { Authorization: "Bearer " + auth.token },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.data) {
          let data = result.data.length;
          setPending(data);
        }
        // setDataCount({...dataCount, 'pending' : data})
      })
      .catch((error) => console.log("error", error));
  };

  const changePage = (id) => {
    history.push("/admin/details/transaction_id=" + object.uid);
  };

  const quotaMeterai = () => {
    fetch(
      process.env.REACT_APP_BACKEND_HOST +
        "api/users/quota?name=emeterai&user_id=" +
        object.uid,
      {
        method: "GET",
        redirect: "follow",
        headers: { Authorization: "Bearer " + auth.token },
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
        setMeteraiQuota(result.data.quota_value);
      })
      .catch((error) => console.log("error", error));
  };

  const quotaTtd = () => {
    fetch(
      process.env.REACT_APP_BACKEND_HOST +
        "api/users/quota?name=ttd&user_id=" +
        object.uid,
      {
        method: "GET",
        redirect: "follow",
        // headers: {'Content-Type': 'application/docx'}
        headers: { Authorization: "Bearer " + auth.token },
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
        setTtdQuota(result.data.quota_value);
      })
      .catch((error) => console.log("error", error));
  };

  const quotaForm = () => {
    fetch(
      process.env.REACT_APP_BACKEND_HOST +
        "api/users/quota?name=eform&user_id=" +
        object.uid,
      {
        method: "GET",
        redirect: "follow",
        // headers: {'Content-Type': 'application/docx'}
        headers: { Authorization: "Bearer " + auth.token },
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
        setFormKuota(result.data.quota_value);
      })
      .catch((error) => console.log("error", error));
  };

  const functions = {
    fetchDataUser,
    createDocumentAJB,
    createDocumentAPHT,
    transactionList,
    dataPenjual,
    otpExpired,
    quotaForm,
    quotaMeterai,
    quotaTtd,
  };

  return (
    <UserContext.Provider
      value={{
        loginStatus,
        setLoginStatus,
        addDocumentModal,
        setAddDocumentModal,
        dataUser,
        setDataUser,
        fetchStatus,
        setFetchStatus,
        functions,
        listTransaction,
        setListTransaction,
        modalOtpLogin,
        setModalOtpLogin,
        verifiedOTP,
        loading,
        setLoading,
        getDokumen,
        getTransactionDetails,
        resend,
        setResend,
        dokumenSelesai,
        dokumenDraft,
        dokumenPending,
        selesai,
        pending,
        draft,
        sidebar,
        setSidebar,
        changePage,
        step,
        setStep,
        meteraiQuota,
        setMeteraiQuota,
        ttdQuota,
        setTtdQuota,
        formQuota,
        setFormKuota,
        lengkapidiri,
        setLengkapidiri,
        coordMaps,
        setCoordMaps,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
