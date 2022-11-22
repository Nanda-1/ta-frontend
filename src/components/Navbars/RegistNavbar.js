/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

export default function RegistNavbar(props) {
  return (
    <>
      <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            {/* <a href="/login" className="flex items-center py-3 px-3">
              <img
                src={require("assets/img/logo_ATRBPN.png").default}
                alt="Logo"
                className="h-12 w-12 mr-2"
              />
              <p className="font-bold">ATR/BPN</p>
            </a> */}
            {/* <Link
              className="text-black text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
              to="/"
            >
              <img
                alt="ATR BPN"
                src={require("assets/img/logo_ATRBPN.png").default}

                // className="w-full align-middle rounded absolute shadow-lg max-w-100-px z-3 left-145-px -top-29-px"
              />
              ATR BPN
            </Link> */}
          </div>
        </div>
      </nav>
    </>
  );
}
