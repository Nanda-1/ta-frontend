import React, { useContext } from "react";
import { UserContext } from "Context/UserContext";
import cookies from "js-cookie";
import { useHistory } from "react-router";
import Profil from "components/Modals/Profil.js"

import noImage from "../../assets/img/no-avatar.jpg";
import LogoutIcon from "../../assets/img/logout_icon.png";

export default function Navbar() {
  let history = useHistory();

  const { setLoginStatus } = useContext(UserContext);

  const HandleLogout = () => {
    setLoginStatus(false);
    localStorage.removeItem("token");
    cookies.remove("token");
    history.push("/login");
  };
  
  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 md:flex-row md:flex-nowrap md:justify-start flex items-center p-5">
        <div className="w-full mx-auto items-center flex justify-end md:flex-nowrap flex-wrap md:px-4">
          <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
            <div className="items-center flex">
              <span className="w-8 h-8 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
                <img
                  alt="..."
                  className="w-full rounded-full border-3 align-middle border-blue"
                  src={noImage}
                />
              </span>
              <div onClick={Profil} className="px-1 text-blue font-semibold">Admin</div>
              <span className="h-8 ml-6 text-sm inline-flex items-center justify-center">
                <img
                  alt="..."
                  className="align-middle"
                  width={20}
                  src={LogoutIcon}
                />
              </span>
              <button onClick={HandleLogout} className="px-1 text-blue font-semibold">
                Logout
              </button>
            </div>
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}
