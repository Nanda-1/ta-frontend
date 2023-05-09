import React, { useContext, useEffect } from "react";
import { RegistContext } from "./RegistContext";
import { Link, useLocation } from "react-router-dom";
import queryString from "query-string";
import swal from "sweetalert";

export default function VerifiyEmail() {
  const location = useLocation();

  var auth = localStorage.getItem("authentication");
  var token = JSON.parse(auth);

  const { email, verify_code } = queryString.parse(location.search);
  const { refreshToken } = useContext(RegistContext);

  const checkCode = async () => {
    let myHeaders = new Headers();
    myHeaders.append("Cookies", "REVEL_FLASH=");
    myHeaders.append("Authorization", "Bearer " + token.access_token);

    fetch(
      process.env.REACT_APP_BACKEND_HOST_AUTH +
        "api/auth/register/verify-email?email=" +
        email +
        "&verify_code=" +
        verify_code,
      { method: "GET" }
    )
      .then((res) => {
        if (res.status === 401) {
          refreshToken();
        } else {
          return res.json();
        }
      })
      .then((respons) => {
        if (respons.success === false) {
          console.log(respons.error);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    checkCode();
  });

  return (
    <>
      <div className="container mx-auto h-screen">
        <div className="flex content-center items-center justify-center h-screen">
          <div className="w-full lg:w-1/12 px-1">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6">
              <img
                className="mx-auto h-36 w-36 content-center"
                src={require("assets/img/emails1.png").default}
                alt="emailImage"
              />
              <h1 className="text-center text-4xl font-bold mt-4">
                Selamat!!! <br />
                Email Anda telah diverifikasi
              </h1>
              <p className="text-center mt-4">
                Akun Anda sudah dapat digunakan
              </p>
              <div className="text-center mt-6">
                <Link
                    // className="text-black px-6 py-3 rounded-xl outline-none focus:outline-none mr-1 mb-1 bg-white active:bg-blue-500 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150 cursor:pointer"
                    className="bg-blue text-white text-sm font-bold py-2 px-16 w-49-d text-center rounded shadow cursor:pointer"
                    to={"/"}
                >
                    Masuk
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
