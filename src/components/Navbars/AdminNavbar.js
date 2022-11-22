import React, { useContext } from "react";
import Icon from "assets/img/icon/ic_bugermenu.png"

import UserDropdown from "components/Dropdowns/UserDropdown.js";
import Notifikasi from "components/Dropdowns/Notikasi";
import { UserContext } from "Context/UserContext";

export default function Navbar() {
  const { sidebar, setSidebar} = useContext(UserContext)

  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 bg-white md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-auto items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 py-2">
          {/* Brand */}
          {window.location.pathname !== '/admin/step6' && window.location.pathname !== '/admin/step6/call' ? 
            <img src={Icon} width='25' onClick={() => setSidebar(!sidebar)} alt='icon' className="cursor-pointer" />
            :
            <span className="text-white">ssd</span>
          }
          <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
            <Notifikasi />
            <UserDropdown />
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}
