import React, { useContext, useState } from "react";
import { TopUpContext } from "Context/TopUpContext";
import Indomaret from "assets/img/icon/indomaret.png";
import Alfamart from "assets/img/icon/alfamart.png";

export default function MiniMarket() {
  const { setListPayment, listPayment, checkout, functions } =
    useContext(TopUpContext);

  const { topUpPay } = functions;

  const handleButton = (type) => {
    let text1 = "payment_type";
    let text2 = "bank";

    if (type === "bri" || type === "bni" || type === "bca") {
      setListPayment({ [text1]: "bank_transfer", [text2]: type });
    } else if (type === "indomaret" || type === "alfamart") {
      setListPayment({ [text1]: "cstore", store: type });
    } else {
      setListPayment({ [text1]: type });
    }
  };

  if (listPayment.length !== 0) {
    topUpPay(checkout.id, "");
  }
  return (
    <>
      <button
        className="border cursor-pointer hover:pilihPayment text-sm text-left w-full py-4 px-2 my-2 rounded-md"
        onClick={() => handleButton("indomaret")}
      >
        <img src={Indomaret} className="bank-icon" alt="Indomaret" />
        <span className="font-bold p-2 text-md">Indomaret</span>
      </button>
      <button
        className="border cursor-pointer hover:pilihPayment text-sm text-left w-full py-4 px-2 my-2 rounded-md"
        onClick={() => handleButton("alfamart")}
      >
        <img src={Alfamart} className="bank-icon" alt="Alfamart" />
        <span className="font-bold p-2 text-md">Alfamart</span>
      </button>
    </>
  );
}
