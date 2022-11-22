import React, { useContext } from "react";
import { createPopper } from "@popperjs/core";

import { UserContext } from "Context/UserContext";
import cookies from "js-cookie";
import { useHistory } from "react-router";
import noImage from "assets/img/icon/no-avatar.jpg";

const UserDropdown = () => {
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

  const getName = (nama) => {
    let user_name = nama.split(" ")[0];
    return user_name;
  };

  var val = localStorage.getItem("dataPPAT");
  var object = JSON.parse(val);

  const handleLogout = () => {
    setLoginStatus(false);
    localStorage.removeItem("dataPPAT");
    cookies.remove("token");
    history.push("/login");
  };

  return (
    <>
      <a
        className="text-blueGray-500 block pr-10"
        href="logout"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex">
          <span className="w-8 h-8 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            <img
              alt="..."
              className="w-full rounded-full align-middle border-black"
              src={noImage}
            />
          </span>
          <div className={"px-3 text-blue"}>
            {!object.nama ? "Pengguna" : getName(object.nama)}
            <i className={"fas fa-caret-down px-4"}></i>
          </div>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <a
          href="login"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 cursor-pointer"
          }
          onClick={handleLogout}
        >
          Log Out
        </a>
      </div>
    </>
  );
};

export default UserDropdown;
