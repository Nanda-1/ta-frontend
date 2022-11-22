import React, { useContext } from "react";
import { TopUpContext } from "Context/TopUpContext";
import Gopay from "assets/img/icon/gopay_.png";
import Qris from "assets/img/icon/qris.png";

export default function DigitalWallet() {
  const { setListPayment } = useContext(TopUpContext);

  const handleButton = (type) => {
    let text1 = "payment_type";
    setListPayment({ [text1]: type });
  };

  return (
    <>
      <button
        className="border cursor-pointer hover:pilihPayment text-sm text-left w-full py-4 px-2 my-2 rounded-md"
        onClick={() => handleButton("gopay")}
      >
        <img src={Gopay} className="bank-icon" alt="Gopay" />
        <span className="font-bold p-2 text-md">Gopay</span>
      </button>
      <button
        className="border cursor-pointer hover:pilihPayment text-sm text-left w-full py-4 px-2 my-2 rounded-md"
        onClick={() => handleButton("qris")}
      >
        <img src={Qris} className="bank-icon" alt="Qris" />
        <span className="font-bold p-2 text-md">QRIS</span>
      </button>
    </>
  );
}
