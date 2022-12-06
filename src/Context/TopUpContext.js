import Cookies from "js-cookie";
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
    eform: 0,
    ttd: 0,
    emeterai: 0,
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

  var auth = localStorage.getItem("authentication");
  var getToken = JSON.parse(auth);

  const refreshToken = () => {
    fetch(process.env.REACT_APP_BACKEND_HOST_AUTH + "api/auth/refresh-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        refresh_token: getToken.refresh_token,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.success === true) {
          getToken.access_token = result.data.access_token;
          localStorage.setItem("authentication", JSON.stringify(getToken));
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          swal("Gagal", "Silahkan login kembali", "error");
          localStorage.removeItem("dataPPAT");
          localStorage.removeItem("authentication");
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
        headers: { Authorization: "Bearer " + getToken.access_token },
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
        headers: { Authorization: "Bearer " + getToken.access_token },
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
        headers: { Authorization: "Bearer " + getToken.access_token },
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
        headers: { Authorization: "Bearer " + getToken.access_token },
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
        headers: { Authorization: "Bearer " + getToken.access_token },
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
        headers: { Authorization: "Bearer " + getToken.access_token },
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
    fetch(process.env.REACT_APP_BACKEND_HOST_QUOTA + "api/top-up/packages", {
      method: "GET",
      redirect: "follow",
      headers: {
        Authorization: "Bearer " + getToken.access_token,
        "Kunci-Masuk":
          "EqRkdrkckcHKyJZI3PNsEhD4PeqmKZqqO8pv8jI5lilxuU72wnkueE42iReEMItBPbATcfGCsGC",
      },
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
    fetch(process.env.REACT_APP_BACKEND_HOST_QUOTA + "api/top-up/price-list", {
      method: "GET",
      redirect: "follow",
      headers: {
        Authorization: "Bearer " + getToken.access_token,
        "Kunci-Masuk":
          "EqRkdrkckcHKyJZI3PNsEhD4PeqmKZqqO8pv8jI5lilxuU72wnkueE42iReEMItBPbATcfGCsGC",
      },
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

  const historiTopUp = () => {
    fetch(process.env.REACT_APP_BACKEND_HOST_QUOTA + "api/top-up/history", {
      method: "GET",
      redirect: "follow",
      headers: {
        Authorization: "Bearer " + getToken.access_token,
        "Kunci-Masuk":
          "EqRkdrkckcHKyJZI3PNsEhD4PeqmKZqqO8pv8jI5lilxuU72wnkueE42iReEMItBPbATcfGCsGC",
      },
    })
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
    fetch(process.env.REACT_APP_BACKEND_HOST_QUOTA + "api/top-up/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getToken.access_token,
        "Kunci-Masuk":
          "EqRkdrkckcHKyJZI3PNsEhD4PeqmKZqqO8pv8jI5lilxuU72wnkueE42iReEMItBPbATcfGCsGC",
      },
      body: JSON.stringify({
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
            setPaymentModal(true);
            Cookies.set(
              "top_up_transaction_id",
              result.data.top_up_transaction_id
            );
            setLoadingFile(false);
          }, 2000);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const topUpPay = (id) => {
    fetch(process.env.REACT_APP_BACKEND_HOST_QUOTA + "api/top-up/pay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getToken.access_token,
        "Kunci-Masuk":
          "EqRkdrkckcHKyJZI3PNsEhD4PeqmKZqqO8pv8jI5lilxuU72wnkueE42iReEMItBPbATcfGCsGC",
      },
      body: JSON.stringify({
        top_up_id: id,
        // listPayment
        payment_type: listPayment.payment_type,
        // bank: listPayment.bank,
        // cstore: {
        //   store: listPayment.store,
        // },
        // gopay: {
        //   callback_url: "https://demo.infinids.id",
        // },
        // credit_card: {
        //   token_id: token,
        // },
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
    fetch(process.env.REACT_APP_BACKEND_HOST_QUOTA + "api/top-up/" + id, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + getToken.access_token,
        "Kunci-Masuk":
          "EqRkdrkckcHKyJZI3PNsEhD4PeqmKZqqO8pv8jI5lilxuU72wnkueE42iReEMItBPbATcfGCsGC",
      },
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
      })
      .catch((error) => console.log("error", error));
  };

  const functions = {
    topUp,
    historiTopUp,
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
