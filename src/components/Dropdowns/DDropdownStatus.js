import React from "react";
import { createPopper } from "@popperjs/core";

// import { UserContext } from "Context/UserContext";
// import Cookies from "js-cookie";

const DDropdownStatus = () => {
  // const {dataUser, functions, setFetchStatus } = useContext(UserContext);

  // const {fetchDataUser} = functions

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

  // useEffect(() =>{
  //   fetchDataUser()
  //   setFetchStatus(false)
  // },[fetchDataUser, setFetchStatus])

  return (
    <>
      <a
        className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs font-bold"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        {/* className={"px-4 text-blue border-black"} */}

        <div className="border-0 px-6 py-3 mx-0 bg-white rounded shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
          <p className="font-normal text-sm text-blueGray-400">
            Pilih Status
            <i className={"fas fa-caret-down px-4"}></i>
          </p>
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
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => e.preventDefault()}
        >
          Belum Menikah
        </a>
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => e.preventDefault()}
        >
          Menikah
        </a>
        {/* <div className="h-0 my-2 border border-solid border-blueGray-100" /> */}
        {/* <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => e.preventDefault()}
        >
          Seprated link
        </a> */}
      </div>
    </>
  );
};

export default DDropdownStatus;
