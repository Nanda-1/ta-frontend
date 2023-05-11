import React, { useContext } from "react";

// Context
import { UserContext } from "Context/UserContext";

// Component
import ModalDokumen from "components/Modals/ModalDokumen";
import BorrowList from "components/Borrow/BorrowList";

export default function BorrowPage() {
  const { loading } = useContext(UserContext);

  return (
    <>
      <div className="flex flex-wrap cursor-default">
        {loading ? <ModalDokumen /> : null}

        <div className="w-full xl:w-12/12 mt-4 mb-8 xl:mb-2 px-1">
          <BorrowList />
        </div>
      </div>
    </>
  );
}
