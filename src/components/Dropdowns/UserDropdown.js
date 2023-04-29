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
    <div className="items-center flex">
      <span className="w-8 h-8 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
        <img
          alt="..."
          className="w-full rounded-full align-middle border-black"
          src={noImage}
        />
      </span>
      <div className={"px-3 text-blue"}>
        {!object.user_detail ? "Pengguna" : getName(object.user_detail.name)}
      </div>
    </div>
  );
};

export default UserDropdown;