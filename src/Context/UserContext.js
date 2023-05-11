import React, { createContext, useState } from "react";
import { useHistory } from "react-router";
import cookies from "js-cookie";
import swal from "sweetalert";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [loginStatus, setLoginStatus] = useState(false);
  const [addDocumentModal, setAddDocumentModal] = useState(false);
  const [addBorrowModal, setAddBorrowModal] = useState(false);
  const [addCollectionModal, setAddCollectionModal] = useState(false);
  const [dataUser, setDataUser] = useState([]);
  const [listTransaction, setListTransaction] = useState([]);
  const [loading, setLoading] = useState(false);

  let history = useHistory();

  var val = localStorage.getItem("dataPPAT");
  var object = JSON.parse(val);

  var login = localStorage.getItem("authentication");
  var auth = JSON.parse(login);

  const refreshToken = () => {
    fetch(process.env.REACT_APP_BACKEND_HOST_AUTH + "api/auth/refresh-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        refresh_token: auth.refresh_token,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.success === true) {
          auth.access_token = result.data.access_token;
          localStorage.setItem("authentication", JSON.stringify(auth));
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

  const fetchDataUser = (token) => {
    fetch(process.env.REACT_APP_BACKEND_HOST_AUTH + "api/auth/match-token", {
      method: "GET",
      redirect: "follow",
      headers: { Authorization: "Bearer " + token },
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
        setTimeout(() => {
          if (localStorage.getItem("dataPPAT")) {
            history.push("/admin/dashboard");
            // window.location.reload();
          }
          setLoading(false);
        }, 5000);
      })
      .catch((error) => console.log(error));
  };

  const transactionList = () => {
    fetch(process.env.REACT_APP_BACKEND_HOST + "api/ppat", {
      method: "GET",
      redirect: "follow",
      // headers: { Authorization: "Bearer " + auth.access_token },
    })
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

  return (
    <UserContext.Provider
      value={{
        loginStatus,
        setLoginStatus,
        addDocumentModal,
        setAddDocumentModal,
        loading,
        setLoading,
        listTransaction,
        setListTransaction,
        dataUser,
        setDataUser,
        fetchDataUser,
        addBorrowModal,
        setAddBorrowModal,
        addCollectionModal,
        setAddCollectionModal,
        transactionList,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
