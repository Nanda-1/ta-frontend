/*eslint-disable*/
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../assets/img/impeesa_icon.png";
import TeamIcon from "../../assets/img/team_icon.png";
import CollectionIcon from "../../assets/img/collection_icon.png";
import BorrowIcon from "../../assets/img/borrower_icon.png";
import DashboardIcon from "../../assets/img/dashboard_icon.png";
import Pohon from "../../assets/img/pohon.png";

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = useState("hidden");

  return (
    <>
      <nav className="fixed sidebar-scroll md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden sidebar bg-white flex flex-wrap items-center justify-between md:w-46 z-40 py-4 font-manrope font-thin sidebar-open">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-2 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>
          <img src={Icon} alt="icon" className="mx-auto mt-4" width={85} />
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Form */}
            <ul className="md:flex-col md:min-w-full flex flex-col list-none font-manrope">
              <li className="items-center mt-2">
                <Link
                  className={
                    "text-md py-2 px-6 flex ml-6 focus:outline-none " +
                    (window.location.pathname.includes("dashboard")
                      ? "text-white sidebar-active mr-6 rounded-lg"
                      : "text-blue")
                  }
                  to="/admin/dashboard"
                  onClick={() => setCollapseShow("hidden")}
                >
                  <img
                    src={DashboardIcon}
                    width={10}
                    className={`sidebar-icon mr-2 ${
                      !window.location.pathname.includes("dashboard")
                        ? "filter-icon"
                        : ""
                    }`}
                  />
                  <div className=" sidebar-font">Dashboard</div>
                </Link>
              </li>
              <li className="items-center mt-2">
                <Link
                  className={
                    "text-md py-2 px-6 flex ml-6 focus:outline-none " +
                    (window.location.pathname.includes("team")
                      ? "text-white sidebar-active mr-6 rounded-lg"
                      : "text-blue")
                  }
                  to="/admin/team"
                  onClick={() => setCollapseShow("hidden")}
                >
                  <img
                    src={TeamIcon}
                    width={10}
                    className={`sidebar-icon mr-2 ${
                      window.location.pathname.includes("/admin/team")
                        ? "filter-icon-2"
                        : ""
                    }`}
                  />
                  <div className=" sidebar-font">Team</div>
                </Link>
              </li>
              <li className="items-center mt-2">
                <Link
                  className={
                    "text-md py-2 px-6 flex ml-6 focus:outline-none " +
                    (window.location.pathname.includes("borrower")
                      ? "text-white sidebar-active mr-6 rounded-lg"
                      : "text-blue")
                  }
                  to="/admin/borrower"
                  onClick={() => setCollapseShow("hidden")}
                >
                  <img
                    src={BorrowIcon}
                    width={10}
                    className={`sidebar-icon mr-2 ${
                      window.location.pathname.includes("/admin/borrower")
                        ? "filter-icon-2"
                        : ""
                    }`}
                  />
                  <div className=" sidebar-font">Borrower</div>
                </Link>
              </li>
              <li className="items-center mt-2">
                <Link
                  className={
                    "text-md py-2 px-6 flex ml-6 focus:outline-none " +
                    (window.location.pathname.includes("collection")
                      ? "text-white sidebar-active mr-6 rounded-lg"
                      : "text-blue")
                  }
                  to="/admin/collection"
                  onClick={() => setCollapseShow("hidden")}
                >
                  <img
                    src={CollectionIcon}
                    width={10}
                    className={`sidebar-icon mr-2 ${
                      window.location.pathname.includes("/admin/collection")
                        ? "filter-icon-2"
                        : ""
                    }`}
                  />
                  <div className=" sidebar-font">Collection</div>
                </Link>
              </li>
            </ul>
          </div>
          <img src={Pohon} className="absolute bottom-0" width={150} />
        </div>
      </nav>
    </>
  );
}
