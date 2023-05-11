import React, { useContext } from "react";

// components
import UserInfo from "components/Cards/UserInfo.js";

// Context
import { UserContext } from "Context/UserContext";
import ModalDokumen from "components/Modals/ModalDokumen";
import TeamList from "components/Teams/TeamList";

export default function TeamsPage() {
  const { loading } = useContext(UserContext);

  return (
    <>
      <div className="flex flex-wrap cursor-default">
        {loading ? <ModalDokumen /> : null}

        <div className="w-full xl:w-12/12 mt-4 mb-8 xl:mb-2 px-1">
          <TeamList />
        </div>
      </div>
    </>
  );
}
