import React from "react";
import PaymentList from "./PaymentList";

export default function PaymentMethod({ midtrans, checkout, setOtherPayment }) {
  const hurufKapital = (str) => {
    if (str) {
      if (str === "bank_transfer") {
        str = midtrans.bank;
        return "Bank " + str.toUpperCase();
      } else if (str === "echannel") {
        str = "bank Mandiri";
        return str.charAt(0).toUpperCase() + str.slice(1);
      } else if (str === "credit_card") {
        str = "credit Card";
        return str.charAt(0).toUpperCase() + str.slice(1);
      } else if (str === "qris") {
        return str.toUpperCase();
      }
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  };

  const barcode = (data) => {
    if (data) {
      const filteredResult = data.find((e) => e.name === "generate-qr-code");
      return filteredResult.url;
    } else {
      barcode(data);
    }
  };

  const copyText = (data) => {
    return navigator.clipboard.writeText(data);
  };

  return (
    <>
      {midtrans === null ? (
        <>
          <div className="flex w-full justify-between">
            <h2 className="font-bold font-700 text-black">Metode Pembayaran</h2>
            <button
              className="text-blue font-bold text-sm focus:outline-none"
              onClick={() => setOtherPayment(true)}
            >
              Lihat Lainnya
            </button>
          </div>
          <div className="relative flex-col overflow-x-auto modal">
            <div className="flex-row">
              <PaymentList />
            </div>
          </div>
        </>
      ) : checkout.payment_type === "gopay" ? (
        <>
          <label>Scan barcode dibawah ini untuk melakukan pembayaran</label>
          <img src={barcode(midtrans.actions)} className="barcode" alt="QRIS" />
        </>
      ) : checkout.payment_type === "mandiri" ? (
        <div className="text-sm">
          <p className="mb-2">
            Selesaikan pembayaran anda dari{" "}
            {hurufKapital(checkout.payment_type)} ke Nomor Vitrual di bawah ini.
          </p>
          <p className="font-bold">Kode Pembayaran</p>
          <p className="font-bold py-2">
            {midtrans.biller_code}
            <i
              className="fas fa-copy inline pt-2 pr-3 float-right cursor-pointer"
              onClick={() => copyText(midtrans.biller_code)}
            ></i>
          </p>
          <p className="font-bold">No. Vitrual Account</p>
          <p className="font-bold py-2">
            {midtrans.bill_key}
            <i
              className="fas fa-copy inline pt-2 pr-3 float-right cursor-pointer"
              onClick={() => copyText(midtrans.bill_key)}
            ></i>
          </p>
        </div>
      ) : (
        <>
          <div className="text-sm">
            <p className="mb-2">
              Selesaikan pembayaran anda dari{" "}
              {hurufKapital(checkout.payment_type)} ke Nomor Vitrual di bawah
              ini.
            </p>
            <p className="font-bold">No. Vitrual Account</p>
            <p className="font-bold py-2">
              {midtrans.va_number}
              <i
                className="fas fa-copy inline pt-2 pr-3 float-right cursor-pointer"
                onClick={() => copyText(midtrans.va_number)}
              ></i>
            </p>
          </div>
        </>
      )}
    </>
  );
}
