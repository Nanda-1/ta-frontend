import React, { useContext } from "react";
import { TopUpContext } from "Context/TopUpContext";
import Bca from "assets/img/icon/bank_bca.png";
import Mandiri from "assets/img/icon/bank_mandiri.png";
import Gopay from "assets/img/icon/gopay_.png";

export default function PaymentList() {
  const { setListPayment, listPayment } = useContext(TopUpContext);

  const handleButton = (type) => {
    let text1 = "payment_type";
    setListPayment({ [text1]: type });
  };

  // if (listPayment.length !== 0) {
  //   topUpPay(checkout.top_up_transaction_id, "");
  // }
  return (
    <div className="font-roboto font-bold text-black">
      <>
        <button
          className="cursor-pointer flex items-center border-b-2 text-sm text-left w-full p-3 my-1 outline-none focus:outline-none"
          onClick={() => handleButton("mandiri")}
        >
          <img src={Mandiri} className="bank-icon mr-4" alt="Mandiri" />
          <div className="flex flex-col mr-auto">
            <span className="font-bold">Mandiri Virtual Account</span>
            <label className="text-xxs text-grey">
              Biaya transaksi Rp4.000
            </label>
          </div>
          <input
            type="radio"
            className="radio-payment my-1"
            checked={listPayment.payment_type === "mandiri"}
          />
        </button>
        <button
          className="cursor-pointer flex items-center border-b-2 text-sm text-left w-full p-3 my-1 outline-none focus:outline-none"
          onClick={() => handleButton("bca")}
        >
          <img src={Bca} className="bank-icon mr-4" alt="Bca" />
          <div className="flex flex-col mr-auto">
            <span className="font-bold">Bank BCA</span>
            <label className="text-xxs text-grey">
              Biaya transaksi Rp4.000
            </label>
          </div>
          <input
            type="radio"
            className="radio-payment my-1"
            checked={listPayment.payment_type === "bca"}
          />
        </button>
        <button
          className="cursor-pointer flex items-center text-sm text-left w-full p-3 my-1 outline-none focus:outline-none"
          onClick={() => handleButton("gopay")}
        >
          <img src={Gopay} className="bank-icon mr-4" alt="Gopay" />
          <div className="flex flex-col mr-auto">
            <span className="font-bold text-md">Gopay</span>
            <label className="text-xxs text-grey">
              Biaya transaksi 2% dari total pembelian
            </label>
          </div>
          <input
            type="radio"
            className="radio-payment my-1"
            checked={listPayment.payment_type === "gopay"}
          />
        </button>
      </>
    </div>
  );
}
