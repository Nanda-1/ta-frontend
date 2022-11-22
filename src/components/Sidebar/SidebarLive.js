/*eslint-disable*/
import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import cookies from "js-cookie";

// Context
import { UserContext } from "../../Context/UserContext";
import Call from "components/Pexip/Call/Call.js";

export default function SidebarLive() {
  const { setLoginStatus, sidebar, dataUser, functions } =
    useContext(UserContext);

  let history = useHistory();

  const { fetchDataUser } = functions;

  useEffect(() => {
    fetchDataUser(cookies.get('uid'));
  }, []);

  const out = () => {
    setLoginStatus(false);
    localStorage.removeItem("data");
    cookies.remove("email");
    cookies.remove("token");
    history.push("/login");
  };

  return (
    <>
      {sidebar ? (
        <nav className="fixed md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden sidebar-bg flex flex-wrap items-center justify-between md:w-45 z-40 p-2 font-roboto sidebar-open">
          <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
            <Call />
          </div>
        </nav>
      ) : null}
    </>
  );
}
