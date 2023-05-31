import React, { useContext } from "react";
import { createPopper } from "@popperjs/core";

import { UserContext } from "Context/UserContext";
import cookies from "js-cookie";
import { useHistory } from "react-router";
import noImage from "assets/img/no-avatar.jpg";

const LandingDropDown = () => {
  let history = useHistory();

  const { setLoginStatus } = useContext(UserContext);

  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  const handleLogout = () => {
    setLoginStatus(false);
    localStorage.removeItem("dataPPAT");
    cookies.remove("token");
    history.push("/login");
  };

  return (
    <>
      <a
        className=" block"
        href="logout"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center text-sm font-manrope mr-4 py-2 text-white">
          Division
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base  z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <a
          href="/forest_mountain"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent font-manrope text-blue cursor-pointer"
          }
        >
          Forest Mountain
        </a>
        <a
          href="/rock_climbing"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent font-manrope text-blue cursor-pointer"
          }
        >
          Rock Climbing
        </a>
        <a
          href="/diving"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent font-manrope text-blue cursor-pointer"
          }
        >
          Diving
        </a>
      </div>
    </>
  );
};

export default LandingDropDown;
