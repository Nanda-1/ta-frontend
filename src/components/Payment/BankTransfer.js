import React, { useContext } from "react";
import { TopUpContext } from "Context/TopUpContext";
import Bri from "assets/img/icon/bank_bri.png";
import Bni from "assets/img/icon/bank_bni.png";
import Bca from "assets/img/icon/bank_bca.png";
import Mandiri from "assets/img/icon/bank_mandiri.png";
import Permata from "assets/img/icon/bank_permata.png";

export default function BankTransfer() {
  const { checkout, listPayment, setListPayment, functions } =
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

    if (listPayment.length !== 0) {
      topUpPay(checkout.top_up_transaction_id, listPayment);
    }
  };

  return (
    <>
      <button
        className="border cursor-pointer hover:pilihPayment text-sm text-left w-full py-4 px-2 my-2 rounded-md"
        onClick={() => handleButton("bri")}
      >
        <img src={Bri} className="bank-icon" alt="Bri" />
        <span className="font-bold p-2 text-md">Bank BRI</span>
      </button>
      <button
        className="border cursor-pointer hover:pilihPayment text-sm text-left w-full py-4 px-2 my-2 rounded-md"
        onClick={() => handleButton("bni")}
      >
        <img src={Bni} className="bank-icon" alt="Bni" />
        <span className="font-bold p-2 text-md">Bank BNI</span>
      </button>
      <button
        className="border cursor-pointer hover:pilihPayment text-sm text-left w-full py-4 px-2 my-2 rounded-md"
        onClick={() => handleButton("bca")}
      >
        <img src={Bca} className="bank-icon" alt="Bca" />
        <span className="font-bold p-2 text-md">Bank BCA</span>
      </button>
      <button
        className="border cursor-pointer hover:pilihPayment text-sm text-left w-full py-4 px-2 my-2 rounded-md"
        onClick={() => handleButton("permata")}
      >
        <img src={Permata} className="bank-icon" alt="Permata" />
        <span className="font-bold p-2 text-md">Bank Permata</span>
      </button>
      <button
        className="border cursor-pointer hover:pilihPayment text-sm text-left w-full py-4 px-2 my-2 rounded-md"
        onClick={() => handleButton("echannel")}
      >
        <img src={Mandiri} className="bank-icon" alt="Mandiri" />
        <span className="font-bold p-2 text-md">Bank Mandiri</span>
      </button>
    </>
  );
}
