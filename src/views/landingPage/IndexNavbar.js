/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/img/impeesa_icon.png";
// components

export default function NavbarLanding() {
  return (
    <>
      <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between navbar-expand-lg bg-blue border border-blue-400 shadow" style={{position: 'inherit'}}>
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full  relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              to="/"
              className="text-white flex text-sm leading-relaxed mr-4 py-2 whitespace-nowrap uppercase"
            >
              <img src={Logo} width={35} className="mr-3" />
              <label style={{alignSelf: 'center'}}>IMPEESA</label>
            </Link>
          </div>
          <div
            className="lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none"
            id="example-navbar-warning"
          >
            <ul className="flex flex-col font-manrope lg:flex-row list-none lg:ml-auto">
              <li className="flex items-center">
                <Link
                  to="/"
                  className="text-white text-sm leading-relaxed inline-block mr-4 py-2 whitespace-nowrap"
                >
                  Home
                </Link>
              </li>

              <li className="flex items-center">
                <Link
                  to="/"
                  className="text-white text-sm leading-relaxed inline-block mr-4 py-2 whitespace-nowrap"
                >
                  Division
                </Link>
              </li>

              <li className="flex items-center">
                <Link
                  to="/"
                  className="text-white text-sm leading-relaxed inline-block mr-4 py-2 whitespace-nowrap"
                >
                  Form
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
