/*eslint-disable*/
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import cookies from "js-cookie";

import NotificationDropdown from "components/Dropdowns/NotificationDropdown.js";
import UserDropdown from "components/Dropdowns/UserDropdown.js";

// Icon
import LogoIppat from "assets/img/logoippat.png";
import LogoBpn from "assets/img/logo_bpn.png";
import NewDoc from "assets/img/icon/ic_baru.png";
import Beranda from "assets/img/icon/ic_home.png";
import DataPpat from "assets/img/sidebar/folder.png";
import Dok from "assets/img/sidebar/document.png";
import Karyawan from "assets/img/sidebar/businessman.png";
import Histori from "assets/img/sidebar/history.png";
import Logout from "assets/img/sidebar/logout.png";

// Context
import { UserContext } from "../../Context/UserContext";

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const { setLoginStatus, sidebar } = useContext(UserContext);

  let history = useHistory();

  var val = localStorage.getItem("dataPPAT");
  var object = JSON.parse(val);

  const handleLogout = () => {
    setLoginStatus(false);
    localStorage.removeItem("dataPPAT");
    cookies.remove("email");
    cookies.remove("token");
    history.push("/login");
  };

  return (
    <>
      {sidebar ? (
        <nav className="fixed md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden sidebar-bg flex flex-wrap items-center justify-between md:w-44 z-40 py-4 px-6 font-roboto sidebar-open">
          <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
            {/* Toggler */}
            <button
              className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
              type="button"
              onClick={() => setCollapseShow("bg-white m-2 py-2 px-6")}
            >
              <i className="fas fa-bars"></i>
            </button>
            {/* Brand */}
            {window.location.pathname.includes("Bpn") ? (
              <div className=" text-center md:pb-2 text-blueGray-600 ">
                <img
                  src={LogoBpn}
                  width="90"
                  className="mx-auto"
                  alt="logo_bpn"
                />
              </div>
            ) : (
              <div className=" text-center md:pb-2 text-blueGray-600 ">
                {object.roles === "ppat" ? (
                  <img
                    src={LogoIppat}
                    width="90"
                    alt="logo_ippat"
                    className="mx-auto"
                  />
                ) : null}
              </div>
            )}
            {/* User */}
            <ul className="md:hidden items-center flex flex-wrap list-none">
              <li className="inline-block relative">
                <NotificationDropdown />
              </li>
              <li className="inline-block relative">
                <UserDropdown />
              </li>
            </ul>
            {/* Collapse */}
            <div
              className={
                "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
                collapseShow
              }
            >
              {/* Collapse header */}
              <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid ">
                <div className="flex flex-wrap">
                  <div className="w-6/12">
                    <Link
                      className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-md uppercase font-bold p-4 px-0"
                      to="/"
                    >
                      Notus React
                    </Link>
                  </div>
                  <div className="w-6/12 flex justify-end">
                    <button
                      type="button"
                      className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                      onClick={() => setCollapseShow("hidden")}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                </div>
              </div>
              {/* Form */}
              <form className="mt-6 mb-4 md:hidden">
                <div className="mb-3 pt-0">
                  <input
                    type="text"
                    placeholder="Search"
                    className="px-3 py-2 h-12 border border-solid  border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                  />
                </div>
              </form>

              {/* Divider */}
              {/* <hr className="my-4 md:min-w-full" /> */}
              {/* Heading */}
              <h6 className="md:min-w-full text-blue text-xs uppercase font-bold block pt-1 no-underline">
                Menu
              </h6>
              {/* Navigation */}

              <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                <li className="items-center">
                  <Link
                    className={
                      "text-md py-2 font-bold block focus:outline-none" +
                      (window.location.pathname === "/admin/BuatDokumen"
                        ? "text-sky-500 hover:text-sky-600"
                        : "text-green hover:text-blueGray-500")
                    }
                    to="/admin/BuatDokumen"
                  >
                    <img src={NewDoc} className="sidebar-icon" alt="new_doc" />
                    <div className="pl-7 pt-1">Buat Baru</div>
                  </Link>
                </li>

                <li className="items-center">
                  <Link
                    className={
                      "text-md py-2 font-bold block focus:outline-none" +
                      (window.location.pathname === "/admin/dashboard"
                        ? "text-blue-500 hover:text-blue-500"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                    to="/admin/dashboard"
                  >
                    <img src={Beranda} className="sidebar-icon" alt="beranda" />
                    <div className="pl-7 pt-1">Beranda</div>
                  </Link>
                </li>

                <li className="items-center">
                  <Link
                    className={
                      "text-md py-2 font-bold block focus:outline-none" +
                      (window.location.pathname === "/admin/dokumen"
                        ? "text-sky-500 hover:text-sky-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                    to="/stepperPAT"
                  >
                    <img
                      src={DataPpat}
                      className="sidebar-icon"
                      alt="data_ppat"
                    />
                    <div className="pl-7 pt-1">Data PPAT</div>
                  </Link>
                </li>

                <li className="items-center">
                  <Link
                    className={
                      "text-md py-2 font-bold block focus:outline-none" +
                      (window.location.pathname === "/admin/dokumen"
                        ? "text-blue-500 hover:text-blue-500"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                    to="/admin/dokumen"
                  >
                    <img src={Dok} className="sidebar-icon" alt="doc" />
                    <div className="pl-7 pt-1">Dokumen</div>
                  </Link>
                </li>

                <li className="items-center">
                  <Link
                    className={
                      "text-md py-2 font-bold block focus:outline-none" +
                      (window.location.pathname === "/admin/karyawan"
                        ? "text-sky-500 hover:text-sky-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                    to="/admin/karyawan"
                  >
                    <img
                      src={Karyawan}
                      className="sidebar-icon"
                      alt="karyawan"
                    />
                    <div className="pl-7 pt-1">Karyawan</div>
                  </Link>
                </li>

                <li className="items-center">
                  <Link
                    className={
                      "text-md py-2 font-bold block focus:outline-none" +
                      (window.location.pathname === "/admin/histori"
                        ? "text-sky-500 hover:text-sky-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                    to="/admin/histori"
                  >
                    <img src={Histori} className="sidebar-icon" alt="histori" />
                    <div className="pl-7 pt-1">Histori</div>
                  </Link>
                </li>

                <li className="items-center">
                  <button
                    className={
                      "text-md py-2 font-bold block focus:outline-none" +
                      (window.location.pathname === "/admin/logout"
                        ? "text-sky-500 hover:text-sky-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                    onClick={handleLogout}
                  >
                    <img src={Logout} className="sidebar-icon" alt="logout" />
                    <div className="pl-7 pt-1">Log Out</div>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      ) : null}
    </>
  );
}
