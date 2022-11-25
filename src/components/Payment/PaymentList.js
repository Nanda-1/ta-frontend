import React, { useContext, useState } from "react";
import { TopUpContext } from "Context/TopUpContext";
import CreditCard from "./CreditCard";
import BankTransfer from "./BankTransfer";
import DigitalWallet from "./DigitalWallet";
import Bri from "assets/img/icon/bank_bri.png";
import Bni from "assets/img/icon/bank_bni.png";
import Bca from "assets/img/icon/bank_bca.png";
import Mandiri from "assets/img/icon/bank_mandiri.png";
import Permata from "assets/img/icon/bank_permata.png";
import Indomaret from "assets/img/icon/indomaret.png";
import Alfamart from "assets/img/icon/alfamart.png";
import Visa from "assets/img/icon/visa.png";
import MasterCard from "assets/img/icon/master-card.png";
import JCB from "assets/img/icon/JCB_logo.png";

export default function PaymentList() {
  const { setListPayment, listPayment, checkout, functions } = useContext(TopUpContext);

  const { topUpPay} = functions

  const [paymentType, setPaymentType] = useState("");

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
    topUpPay(checkout.top_up_transaction_id, '');
  }
  return (
    <>
      {paymentType === "" ? (
        <>
          <button
            className="border cursor-pointer hover:pilihPayment text-sm text-left w-full py-4 px-2 my-2 rounded-md"
            onClick={() => setPaymentType("credit card")}
          >
            <span className="flex font-bold px-2 py-1 text-md">
              Credit Card
            </span>
            <img src={Visa} className="bank-icon-3 pl-1" alt="Visa" />
            <img src={MasterCard} className="bank-icon-3" alt="MasterCard" />
            <img src={JCB} className="bank-icon-3" alt="JCB" />
          </button>
          <button
            className="border cursor-pointer hover:pilihPayment text-sm text-left w-full py-4 px-2 my-2 rounded-md"
            onClick={() => setPaymentType("transfer")}
          >
            <span className="flex font-bold px-2 py-1 text-md">
              Bank Transfer
            </span>
            <img src={Bca} className="bank-icon-3 pl-1" alt="Bca" />
            <img src={Bni} className="bank-icon-3" alt="Bni" />
            <img src={Mandiri} className="bank-icon-3" alt="Mandiri" />
            <img src={Bri} className="bank-icon-3" alt="Bri" />
            <img src={Permata} className="bank-icon-3" alt="Permata" />
          </button>
          <DigitalWallet />
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
      ) : paymentType === "credit card" ? (
        <>
          <button
            className="focus:outline-none mx-2 mb-8"
            onClick={() => setPaymentType("")}
          >
            <i className="fas fa-arrow-left"></i>
            <label className="ml-3 font-bold">Credit/Debit Card</label>
          </button>
          <CreditCard />
        </>
      ) : paymentType === "transfer" ? (
        <>
          <button
            className="focus:outline-none mx-2 mb-4"
            onClick={() => setPaymentType("")}
          >
            <i className="fas fa-arrow-left"></i>
            <label className="ml-3 font-bold">Bank Transfer</label>
          </button>
          <BankTransfer />
        </>
      ) : null}
    </>
  );
}
