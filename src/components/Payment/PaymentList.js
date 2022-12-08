import React, { useContext } from "react";
import { TopUpContext } from "Context/TopUpContext";
import Bri from "assets/img/icon/bank_bri.png";
import Bni from "assets/img/icon/bank_bni.png";
import Bca from "assets/img/icon/bank_bca.png";
import Mandiri from "assets/img/icon/bank_mandiri.png";
import Permata from "assets/img/icon/bank_permata.png";
import Gopay from "assets/img/icon/gopay_.png";

export default function PaymentList() {
  const { setListPayment, listPayment, checkout, functions } =
    useContext(TopUpContext);

  const { topUpPay } = functions;

  const handleButton = (type) => {
    let text1 = "payment_type";
    setListPayment({ [text1]: type });
  };

  if (listPayment.length !== 0) {
    topUpPay(checkout.top_up_transaction_id, "");
  }
  return (
    <div className="font-roboto font-bold text-black">
      <>
        <button
          className="border cursor-pointer hover:pilihPayment text-sm text-left w-full p-3 my-1 rounded-md"
          onClick={() => handleButton("mandiri")}
        >
          <img src={Mandiri} className="bank-icon" alt="Mandiri" />
          <span className="font-bold p-2">Bank Mandiri</span>
        </button>
        <button
          className="border cursor-pointer hover:pilihPayment text-sm text-left w-full p-3 my-1 rounded-md"
          onClick={() => handleButton("bni")}
        >
          <img src={Bni} className="bank-icon" alt="Bni" />
          <span className="font-bold p-2">Bank BNI</span>
        </button>
        <button
          className="border cursor-pointer hover:pilihPayment text-sm text-left w-full p-3 my-1 rounded-md"
          onClick={() => handleButton("permata")}
        >
          <img src={Permata} className="bank-icon" alt="Permata" />
          <span className="font-bold p-2">Permata Bank</span>
        </button>
        <button
          className="border cursor-pointer hover:pilihPayment text-sm text-left w-full p-3 my-1 rounded-md"
          onClick={() => handleButton("bca")}
        >
          <img src={Bca} className="bank-icon" alt="Bca" />
          <span className="font-bold p-2">Bank BCA</span>
        </button>
        <button
          className="border cursor-pointer hover:pilihPayment text-sm text-left w-full p-3 my-1 rounded-md"
          onClick={() => handleButton("bri")}
        >
          <img src={Bri} className="bank-icon" alt="Bri" />
          <span className="font-bold p-2">Bank BRI</span>
        </button>
        <button
          className="border cursor-pointer hover:pilihPayment text-sm text-left w-full p-3 my-1 rounded-md"
          onClick={() => handleButton("gopay")}
        >
          <img src={Gopay} className="bank-icon" alt="Gopay" />
          <span className="font-bold p-2 text-md">Gopay</span>
        </button>
      </>
    </div>
  );
}
