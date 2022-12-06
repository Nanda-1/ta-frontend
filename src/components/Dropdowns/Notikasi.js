import React, { useContext, useEffect } from "react";
import { createPopper } from "@popperjs/core";
import { NotifikasiContext } from "Context/NotifikasiContext";

const Notifikasi = () => {
  const { functions } = useContext(NotifikasiContext);
  const { getNotifikasi } = functions;

  useEffect(() => {
    // getNotifikasi();
    // eslint-disable-next-line no-unused-vars
  }, []);

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

  // const updateRead = (id) => {
  //   readNotifikasi(id);
  // };

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
          <i className="far fa-bell"></i>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-4 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <span className="text-sm py-2 px-4 text-grey italic">
          Tidak Ada Notifikasi
        </span>
      </div>
    </>
  );
};

export default Notifikasi;
