import React, { createContext, useState } from "react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

export const TopUpContext = createContext();

export const TopUpProvider = (props) => {
  const [taxBlangko, setTaxBlangko] = useState(0);
  const [priceBlangko, setPriceBlangko] = useState(0);
  const [taxTtd, setTaxTtd] = useState(0);
  const [priceTtd, setPriceTtd] = useState(0);
  const [taxMeterai, setTaxMeterai] = useState(0);
  const [priceMeterai, setPriceMeterai] = useState(0);
  const [token, setToken] = useState("");
  const [historiList, setHistoriList] = useState();
  const [count, setCount] = useState({
    blangko: 0,
    ttd: 0,
    meterai: 0,
    paket1: 0,
    paket2: 0,
    paket3: 0,
  });
  const [total, setTotal] = useState({
    harga: 0,
    pajak: 0,
    pesanan: 0,
  });
  const [listPaketQuota, setListPaketQuota] = useState([]);
  const [produkSatuan, setProdukSatuan] = useState([]);
  const [checkout, setCheckout] = useState([]);
  const [midtrans, setMidtrans] = useState([]);
  const [loadingFile, setLoadingFile] = useState(false);
  const [statusPayment, setStatusPayment] = useState("");
  const [listItem, setListItem] = useState([]);
  const [listPayment, setListPayment] = useState([]);
  const [paymentModal, setPaymentModal] = useState(false);
  const [item, setItem] = useState([]);

  let history = useHistory();

  var val = localStorage.getItem("dataPPAT");
  var object = JSON.parse(val);

  const refreshToken = () => {
    fetch(process.env.REACT_APP_BACKEND_HOST + "api/auth/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        refresh_token: object.refresh_token,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success === true) {
          object.token = result.data.token;
          localStorage.setItem("dataPPAT", JSON.stringify(object));
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

  const blankoTax = () => {
    fetch(
      process.env.REACT_APP_BACKEND_HOST +
        "api/websetting/detail?name=eform.tax",
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
        setTaxBlangko(result.data.value);
      })
      .catch((error) => console.log("error", error));
  };

  const blangkoPrice = () => {
    fetch(
      process.env.REACT_APP_BACKEND_HOST +
        "api/websetting/detail?name=eform.price",
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
        setPriceBlangko(result.data.value);
      })
      .catch((error) => console.log("error", error));
  };

  const ttdTax = () => {
    fetch(
      process.env.REACT_APP_BACKEND_HOST + "api/websetting/detail?name=ttd.tax",
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
        setTaxTtd(result.data.value);
      })
      .catch((error) => console.log("error", error));
  };

  const ttdPrice = () => {
    fetch(
      process.env.REACT_APP_BACKEND_HOST +
        "api/websetting/detail?name=ttd.price",
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
        setPriceTtd(result.data.value);
      })
      .catch((error) => console.log("error", error));
  };

  const meteraiTax = () => {
    fetch(
      process.env.REACT_APP_BACKEND_HOST +
        "api/websetting/detail?name=ematerai.tax",
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
        setTaxMeterai(result.data.value);
      })
      .catch((error) => console.log("error", error));
  };

  const meteraiPrice = () => {
    fetch(
      process.env.REACT_APP_BACKEND_HOST +
        "api/websetting/detail?name=ematerai.price",
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
        setPriceMeterai(result.data.value);
      })
      .catch((error) => console.log("error", error));
  };

  const paketKuota = () => {
    fetch(process.env.REACT_APP_BACKEND_HOST + "api/packages", {
      method: "GET",
      redirect: "follow",
      headers: { Authorization: "Bearer " + object.token },
    })
      .then((response) => {
        if (response.status === 401) {
          refreshToken();
        } else {
          return response.json();
        }
      })
      .then((result) => {
        setListPaketQuota(result.data);
      })
      .catch((error) => console.log("error", error));
  };

  const produk = () => {
    fetch(process.env.REACT_APP_BACKEND_HOST + "api/websetting/pricelist", {
      method: "GET",
      redirect: "follow",
      headers: { Authorization: "Bearer " + object.token },
    })
      .then((response) => {
        if (response.status === 401) {
          refreshToken();
        } else {
          return response.json();
        }
      })
      .then((result) => {
        setProdukSatuan(result.data);
      })
      .catch((error) => console.log("error", error));
  };

  const histori = () => {
    let id = Number(object.uid);

    fetch(
      process.env.REACT_APP_BACKEND_HOST + "api/topup/history?user_id=" + id,
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
        setHistoriList(result.data);
      })
      .catch((error) => console.log("error", error));
  };

  const topUp = (itemList) => {
    let id = Number(object.uid);

    // fetch(process.env.REACT_APP_BACKEND_HOST + "api/topup", {
    fetch(process.env.REACT_APP_BACKEND_HOST + "api/topup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + object.token,
      },
      // credentials: "same-origin",
      body: JSON.stringify({
        user_id: id,
        list_order: itemList,
      }),
    })
      .then((response) => {
        if (response.status === 401) {
          refreshToken();
        } else {
          return response.json();
        }
      })
      .then((result) => {
        if (result.success === false) {
          swal("Error", result.error, "error");
          setLoadingFile(false);
        } else {
          setTimeout(() => {
            history.push("/admin/checkout=" + result.data.id);
            setLoadingFile(false);
          }, 2000);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const topUpPay = (id, token) => {
    fetch(process.env.REACT_APP_BACKEND_HOST + "api/topup/pay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + object.token,
      },
      // credentials: "same-origin",
      body: JSON.stringify({
        top_up_id: id,
        // listPayment
        payment_type: listPayment.payment_type,
        bank: listPayment.bank,
        cstore: {
          store: listPayment.store,
        },
        gopay: {
          callback_url: "https://infinids.id",
        },
        credit_card: {
          token_id: token,
        },
      }),
    })
      .then((response) => {
        if (response.status === 401) {
          refreshToken();
        } else {
          return response.json();
        }
      })
      .then((result) => {
        if (!result.success) {
          swal("Gagal", result.error, "error");
        } else {
          if (midtrans === null) {
            topUpDetail(id);
          }
        }
      })
      .catch((error) => console.log("error", error));
  };

  const topUpDetail = (id) => {
    fetch(process.env.REACT_APP_BACKEND_HOST + "api/topup/" + id, {
      method: "GET",
      headers: { Authorization: "Bearer " + object.token },
    })
      .then((response) => {
        if (response.status === 401) {
          refreshToken();
        } else {
          return response.json();
        }
      })
      .then((result) => {
        setMidtrans(result.data.midtrans);
        setCheckout(result.data.top_up);
        setListItem(result.data.top_up.top_up_details);
        setStatusPayment(result.data.top_up.payment_status);
      })
      .catch((error) => console.log("error", error));
  };

  const functions = {
    topUp,
    histori,
    topUpDetail,
    topUpPay,
  };

  return (
    <TopUpContext.Provider
      value={{
        taxBlangko,
        setTaxBlangko,
        taxMeterai,
        setTaxMeterai,
        taxTtd,
        setTaxTtd,
        count,
        setCount,
        total,
        setTotal,
        blankoTax,
        meteraiTax,
        ttdTax,
        listPaketQuota,
        setListPaketQuota,
        paketKuota,
        produk,
        produkSatuan,
        setProdukSatuan,
        priceBlangko,
        setPriceBlangko,
        priceMeterai,
        setPriceMeterai,
        priceTtd,
        setPriceTtd,
        blangkoPrice,
        ttdPrice,
        meteraiPrice,
        functions,
        token,
        setToken,
        historiList,
        setHistoriList,
        loadingFile,
        setLoadingFile,
        checkout,
        setCheckout,
        listItem,
        setListItem,
        statusPayment,
        setStatusPayment,
        paymentModal,
        setPaymentModal,
        midtrans,
        setMidtrans,
        listPayment,
        setListPayment,
        item,
        setItem,
      }}
    >
      {props.children}
    </TopUpContext.Provider>
  );
};
