import React, { useContext, useEffect, useState } from "react";
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

  const { respon, setRespon } = useState(null);
  const { errorr, setErrorr } = useState(null);
  const { go, setGo } = useState(false);

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
      ).then((res) => res.json())
      .then((res) => {
      let getErr = res.error 

      if (res.success === true) {
        console.log(getErr);
        setRespon(JSON.stringify(getErr))
        setGo(true)
      } else{
        console.log(getErr);
        setErrorr(JSON.stringify(getErr))
        setGo(false)
      }
    })
    .catch((error) => console.log("error", error));
      // .then((res) => {
      //   if (res.status === 401) {
      //     refreshToken();
      //   } else if (res.status === 400) {
      //     // setGo(false);
      //     // setErrorr(res.error);
      //     console.log(res.success);
      //   } else {
      //     return res.json();
      //   }
      // })
      // .then((respons) => {
      //   if (respons.data === null) {
      //     // setGo(true);
      //     setRespon(respons.data.message);
      //     console.log(respons.data.message);
      //   // } else if (respons.success === false) {
      //   //   // setGo(false);
      //     setErrorr("respons.error");
      //   //   console.log(respons.error);
      //   }
      // })
      // .catch((error) => {
      //   console.log("error", error);
      // });
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
              {go === true ? (
                <>
                  <img
                    className="mx-auto h-36 w-36 content-center"
                    src={require("assets/img/emails1.png").default}
                    alt="emailImage"
                  />
                  <h1 className="text-center text-4xl font-bold mt-4">
                    Selamat!!! <br />
                    
                    {respon && <h3>{respon}</h3>}
                    {errorr && <h3>{errorr}</h3>}
                  </h1>
                  <p className="text-center mt-4">
                    Akun Anda sudah dapat digunakan
                  </p>
                  <div className="text-center mt-6">
                    <Link
                      className="bg-blue text-white text-sm font-bold py-2 px-16 w-49-d text-center rounded shadow cursor:pointer"
                      to={"/"}
                    >
                      Masuk
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <img
                    className="mx-auto h-24 w-24 content-center bg-white"
                    src={require("assets/img/wait.png").default}
                    alt="emailImage"
                  />
                  <h1 className="text-center text-4xl font-bold mt-4">
                    Perhatian!!! <br />
                    {respon && <h3>{respon}</h3>}
                    {errorr && <h3>{errorr}</h3>}
                  </h1>
                  {/* <p className="text-center mt-4">
                    Akun Anda sudah dapat digunakan
                  </p> */}
                  <div className="text-center mt-6">
                    <Link
                      className="bg-blue text-white text-sm font-bold py-2 px-16 w-49-d text-center rounded shadow cursor:pointer"
                      to={"/"}
                    >
                      Masuk
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
