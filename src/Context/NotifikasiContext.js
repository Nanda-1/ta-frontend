import React, { createContext, useState } from "react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

export const NotifikasiContext = createContext();

export const NotifikasiProvider = (props) => {
  const [data, setData] = useState();

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
           localStorage.setItem('dataPPAT', JSON.stringify(object))
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

  const getNotifikasi = () => {
    fetch(process.env.REACT_APP_BACKEND_HOST + "api/notifications", {
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
        setData(result.data);
      })
      .catch((error) => console.log("error", error));
  };

  const readNotifikasi = (id) => {
    fetch(
      process.env.REACT_APP_BACKEND_HOST +
        `api/notifications/` +
        id +
        `/update-status`,
      {
        method: "POST",
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
        // setData(result.data);
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  };

  const functions = {
    getNotifikasi,
    readNotifikasi,
  };

  return (
    <NotifikasiContext.Provider
      value={{
        data,
        setData,
        functions,
      }}
    >
      {props.children}
    </NotifikasiContext.Provider>
  );
};
