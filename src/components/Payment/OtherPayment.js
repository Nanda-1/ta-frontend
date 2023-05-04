import React, { useContext } from "react";
import { TopUpContext } from "Context/TopUpContext";
import Bri from "assets/img/icon/bank_bri.png";
import Bni from "assets/img/icon/bank_bni.png";
import Permata from "assets/img/icon/bank_permata.png";

export default function OtherPayment() {
  const { setListPayment, listPayment, setOtherPayment } =
    useContext(TopUpContext);

  // const { topUpPay } = functions;

  const handleButton = (type) => {
    let text1 = "payment_type";
    setListPayment({ [text1]: type });
  };

  // if (listPayment.length !== 0) {
  //   topUpPay(checkout.top_up_transaction_id, "");
  // }
  return (
    <div className="font-roboto z-50 font-bold text-black">
      <div className="flex mb-2">
        <button
          className="focus:outline-none pr-3 mt-1"
          type="button"
          onClick={() => setOtherPayment(false)}
        >
          <i className="fa fa-times fa-lg"></i>
        </button>
        <h4 className="w-full font-700 py-1 text-black">Pilih Pembayaran</h4>
      </div>
      <span className="font-bold text-sm">Transfer Virtual Account</span>
      <button
        className="cursor-pointer flex items-center border-b-2 text-sm text-left w-full p-3 my-1 outline-none focus:outline-none"
        onClick={() => handleButton("bni")}
      >
        <img src={Bni} className="bank-icon mr-4" alt="Bni" />
        <div className="flex flex-col mr-auto">
          <span className="font-bold">BNI</span>
          <label className="text-xxs text-grey">Biaya transaksi Rp4.000</label>
        </div>
        <input
          type="radio"
          className="radio-payment my-1"
          checked={listPayment.payment_type === "bni"}
        />
      </button>
      <button
        className="cursor-pointer flex items-center border-b-2 text-sm text-left w-full p-3 my-1 outline-none focus:outline-none"
        onClick={() => handleButton("permata")}
      >
        <img src={Permata} className="bank-icon mr-4" alt="Permata" />
        <div className="flex flex-col mr-auto">
          <span className="font-bold">Permata</span>
          <label className="text-xxs text-grey">Biaya transaksi Rp4.000</label>
        </div>
        <input
          type="radio"
          className="radio-payment my-1"
          checked={listPayment.payment_type === "permata"}
        />
      </button>
      <button
        className="cursor-pointer flex items-center border-b-2 text-sm text-left w-full p-3 my-1 outline-none focus:outline-none"
        onClick={() => handleButton("bri")}
      >
        <img src={Bri} className="bank-icon mr-4" alt="Bri" />
        <div className="flex flex-col mr-auto">
          <span className="font-bold">BRI</span>
          <label className="text-xxs text-grey">Biaya transaksi Rp4.000</label>
        </div>
        <input
          type="radio"
          className="radio-payment my-1"
          checked={listPayment.payment_type === "bri"}
        />
      </button>

      <div className="mt-6 border-t">
        <button className="bg-blue my-4 py-2 w-full text-white rounded-md">
          Pilih Metode Pembayaran
        </button>
      </div>
    </div>
  );
}
