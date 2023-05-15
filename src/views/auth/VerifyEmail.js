import React, { useContext, useEffect, useState } from "react";
import { RegistContext } from "./RegistContext";
import { Link, useLocation } from "react-router-dom";
import queryString from "query-string";
import Wait from "../../assets/img/wait.png";
import Email from "../../assets/img/emails1.png";

export default function VerifiyEmail() {
  const location = useLocation();

  var auth = localStorage.getItem("authentication");
  var token = JSON.parse(auth);

  const { email, verify_code } = queryString.parse(location.search);
  const { refreshToken } = useContext(RegistContext);

  const [go, setGo] = useState(false);

  //200
  const [respon, setRespon ] = useState(null);
  const successDiv = respon ? <div className="respon">{respon}</div> : "";
  //400
  const [errors, setErrors] = useState(null);
  const errorDiv = errors ? <div className="error">{errors}</div> : "";

  // const checkCode = async () => {

  useEffect(() => {
    let myHeaders = new Headers();
    myHeaders.append("Cookies", "REVEL_FLASH=");
    // myHeaders.append("Authorization", "Bearer " + token.access_token);

    fetch(
      process.env.REACT_APP_BACKEND_HOST_AUTH +
        "api/auth/register/verify-email?email=" +
        email +
        "&verify_code=" +
        verify_code,
      { method: "GET" }
    )
      .then((ress) => {
        if (ress.status === 401) {
          refreshToken();
        } else {
          return ress.json();
        }
      })
      .then((res) => {
        console.log(res);
        if (res.success === true) {
          setGo(true);
          setRespon(res.data.message);
        } else {
          setGo(false);
          setErrors(res.error);
        }
      })
      .catch((error) => console.log("error", error));

    // checkCode();
  }, []);

  return (
    <>
      <div className="container mx-auto h-screen">
        <div className="flex content-center items-center justify-center h-screen">
          <div className="w-full lg:w-1/12 px-1">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6">
              <img
                className="mx-auto h-24 w-24 content-center bg-white"
                src={go ? Email : Wait}
                alt="emailImage"
              />
              <h1 className="text-center text-4xl font-bold mt-4">
                {errors ? "Perhatian!" : "Selamat!"}
                {errors || respon}
              </h1>
              <div className="text-center mt-6">
                <Link
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
