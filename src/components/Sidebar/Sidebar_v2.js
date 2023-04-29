/*eslint-disable*/
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

import NotificationDropdown from "components/Dropdowns/NotificationDropdown.js";
import UserDropdown from "components/Dropdowns/UserDropdown.js";

// Icon
import LogoIppat from "assets/img/logoippat.png";
import LogoBpn from "assets/img/logo_bpn.png";
import Beranda from "assets/img/icon/ic_home.png";
import DataPpat from "assets/img/sidebar/folder.png";
import Dok from "assets/img/sidebar/document.png";
import Karyawan from "assets/img/sidebar/businessman.png";
import Histori from "assets/img/sidebar/history.png";
import Logout from "assets/img/sidebar/logout.png";
import noImage from "assets/img/icon/no-avatar.jpg";
import NewDoc from "assets/img/Iconnew.png";

// Context
import { UserContext } from "../../Context/UserContext";
import ListBlanko from "./ListBlanko";

export default function Sidebar_v2() {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const { setLoginStatus, sidebar } = useContext(UserContext);

  let history = useHistory();

  var val = localStorage.getItem("dataPPAT");
  var object = JSON.parse(val);

  const handleLogout = () => {
    setLoginStatus(false);
    localStorage.removeItem("dataPPAT");
    localStorage.removeItem("authentication");
    window.location.reload()
  };

  return (
    <>
      {sidebar ? (
        <nav className="fixed sidebar-scroll md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden sidebar bg-white flex flex-wrap items-center justify-between md:w-46 z-40 py-4 font-roboto sidebar-open">
          <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
            {/* Toggler */}
            <button
              className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
              type="button"
              onClick={() => setCollapseShow("bg-white m-2 py-2 px-6")}
            >
              <i className="fas fa-bars"></i>
            </button>
            {window.screen.width > 500 ? (
              <img
                src={LogoIppat}
                alt="logo_ippat"
                className="mx-auto"
                width={80}
              />
            ) : null}
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
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
                <div className="flex flex-wrap">
                  <div className="w-full text-center">
                    <img
                      src={LogoIppat}
                      alt="logo_ippat"
                      className="mx-auto"
                      width={85}
                    />
                  </div>
                </div>
              </div>
              {/* Form */}
              <table className=" ml-4">
                <tbody>
                  <tr>
                    <td rowSpan={2} width={50}>
                      <img
                        src={noImage}
                        className="rounded-full align-middle"
                        width={35}
                      />
                    </td>
                    <td className="font-bold text-sm">
                      {object.user_detail?.name}
                    </td>
                  </tr>
                  <tr>
                    {/* <td style={{background: 'blue'}}></td> */}
                    <td className="text-xs">{object.role.toUpperCase()}</td>
                  </tr>
                </tbody>
              </table>
              <hr className="mt-2 mx-auto sidebar-line" />
              {/* Navigation */}
              <div className="ml-4 mt-3">
                <label className="font-700 flex" style={{ fontSize: "13px" }}>
                  <img
                    src={NewDoc}
                    style={{ width: "15px", height: "18px" }}
                    className="mr-2 mb-2"
                  />
                  Buat Baru Blangko Akta PPAT
                </label>
                <div>
                  <ListBlanko />
                </div>
              </div>

              <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                <li className="items-center mt-2">
                  {window.location.pathname.includes("dashboard") ? (
                    <div className="sidebar-active"></div>
                  ) : null}
                  <Link
                    className={
                      "text-md py-2 ml-6 block focus:outline-none" +
                      (window.location.pathname.includes("dashboard")
                        ? "text-blue hover:text-blue-500"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                    to="/admin/dashboard"
                  >
                    <img src={Beranda} className="sidebar-icon" alt="beranda" />
                    <div className="pl-8 pt-1 sidebar-font">Beranda</div>
                  </Link>
                </li>

                <li className="items-center mt-2">
                  {window.location.pathname.includes("ppat") ? (
                    <div className="sidebar-active"></div>
                  ) : null}
                  <Link
                    className={
                      "text-md py-2 ml-6 block focus:outline-none" +
                      (window.location.pathname.includes("ppat")
                        ? "text-sky-500 hover:text-sky-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                    to="/admin/ppat"
                  >
                    <img
                      src={DataPpat}
                      className="sidebar-icon"
                      alt="data_ppat"
                    />
                    <div className="pl-8 pt-1 sidebar-font">Data PPAT</div>
                  </Link>
                </li>

                <li className="items-center mt-2">
                  {window.location.pathname.includes("dokumen") ? (
                    <div className="sidebar-active"></div>
                  ) : null}
                  <Link
                    className={
                      "text-md py-2 ml-6 block focus:outline-none" +
                      (window.location.pathname.includes("dokumen")
                        ? "text-blue-500 hover:text-blue-500"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                    to="/admin/dokumen"
                  >
                    <img src={Dok} className="sidebar-icon" alt="doc" />
                    <div className="pl-8 pt-1 sidebar-font">Dokumen</div>
                  </Link>
                </li>

                <li className="items-center mt-2">
                  {window.location.pathname.includes("karyawan") ? (
                    <div className="sidebar-active"></div>
                  ) : null}
                  <Link
                    className={
                      "text-md py-2 ml-6 block focus:outline-none" +
                      (window.location.pathname.includes("karyawan")
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
                    <div className="pl-8 pt-1 sidebar-font">Karyawan</div>
                  </Link>
                </li>

                <li className="items-center mt-2">
                  {window.location.pathname.includes("histori") ? (
                    <div className="sidebar-active"></div>
                  ) : null}
                  <Link
                    className={
                      "text-md py-2 ml-6 block focus:outline-none" +
                      (window.location.pathname.includes("histori")
                        ? "text-sky-500 hover:text-sky-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                    to="/admin/histori"
                  >
                    <img src={Histori} className="sidebar-icon" alt="histori" />
                    <div className="pl-8 pt-1 sidebar-font">Histori</div>
                  </Link>
                </li>

                <li className="items-center mt-2">
                  <button
                    className={
                      "text-md py-2 ml-6 block focus:outline-none" +
                      (window.location.pathname.includes("logout")
                        ? "text-sky-500 hover:text-sky-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                    onClick={handleLogout}
                  >
                    <img src={Logout} className="sidebar-icon" alt="logout" />
                    <div className="pl-8 pt-1 sidebar-font">Log Out</div>
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
