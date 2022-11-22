import React, { useContext } from "react";
import { TopUpContext } from "Context/TopUpContext";

import Bri from "assets/img/icon/bank_bri.png";
import Bni from "assets/img/icon/bank_bni.png";
import Bca from "assets/img/icon/bank_bca.png";
import Mandiri from "assets/img/icon/bank_mandiri.png";
import Permata from "assets/img/icon/bank_permata.png";
import Gopay from "assets/img/icon/gopay_.png";
import Indomaret from "assets/img/icon/indomaret.png";
import Alfamart from "assets/img/icon/alfamart.png";
import Qris from "assets/img/icon/qris.png";
import Visa from "assets/img/icon/visa.png";
import MasterCard from "assets/img/icon/master-card.png";
import JCB from "assets/img/icon/JCB_logo.png";

export default function PaymentMethod() {
  const { midtrans, setPaymentModal } = useContext(TopUpContext);

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

  const getBank = (data) => {
    if (data === "bni") {
      return <img src={Bni} className="bank-icon-2" alt="Bni" />;
    } else if (data === "bca") {
      return <img src={Bca} className="bank-icon-2" alt="Bca" />;
    } else {
      return <img src={Bri} className="bank-icon-2" alt="Bri" />;
    }
  };

  if (midtrans.redirect_url) {
    window.open(midtrans.redirect_url, "NewWindow");
  }

  return (
    <>
      <div className="flex px-2 mt-2">
        <label className="w-full font-bold">
          {hurufKapital(
            midtrans.payment_type === "cstore"
              ? "indomaret"
              : midtrans.payment_type
          )}
        </label>
        {midtrans.payment_type === "gopay" ? (
          <img src={Gopay} className="bank-icon-2" alt="Gopay" />
        ) : midtrans.payment_type === "bank_transfer" && !midtrans.bank ? (
          <img src={Permata} className="bank-icon-2" alt="Permata" />
        ) : midtrans.payment_type === "bank_transfer" && midtrans.bank ? (
          getBank(midtrans.bank)
        ) : midtrans.store === "indomaret" ? (
          <img src={Indomaret} className="bank-icon-2" alt="Indomaret" />
        ) : midtrans.store === "alfamart" ? (
          <img src={Alfamart} className="bank-icon-2" alt="Alfamart" />
        ) : midtrans.payment_type === "qris" ? (
          <img src={Qris} className="bank-icon-2" alt="Qris" />
        ) : midtrans.payment_type === "credit_card" ? (
          <>
            <img src={Visa} className="bank-icon-5" alt="Visa" />
            <img src={JCB} className="bank-icon-5" alt="JCB" />
            <img src={MasterCard} className="bank-icon-5" alt="MasterCard" />
          </>
        ) : (
          <img src={Mandiri} className="bank-icon-2" alt="Mandiri" />
        )}
      </div>
      <div className="px-2 py-4">
        {midtrans.payment_type === "bank_transfer" ||
        midtrans.payment_type === "echannel" ? (
          <p className="my-8 text-justify">
            Selesaikan pembayaran anda dari{" "}
            {hurufKapital(midtrans.payment_type)} ke Nomor Vitrual di bawah ini.
          </p>
        ) : null}
        {midtrans.payment_type === "gopay" ||
        midtrans.payment_type === "qris" ? (
          <img src={barcode(midtrans.actions)} className="barcode" alt="QRIS" />
        ) : midtrans.payment_type === "bank_transfer" &&
          midtrans.permata_va_number ? (
          <>
            <label>No. Vitrual Account</label>
            <p className="border py-2 border-l-0 border-r-0 border-t-0">
              {midtrans.permata_va_number}
              <i className="fas fa-copy inline pt-2 pr-3 float-right"></i>
            </p>
          </>
        ) : midtrans.payment_type === "bank_transfer" ? (
          <>
            <label>No. Vitrual Account</label>
            <p className="border py-2 border-l-0 border-r-0 border-t-0">
              {midtrans.va_number}
              <i className="fas fa-copy inline pt-2 pr-3 float-right"></i>
            </p>
          </>
        ) : midtrans.payment_type === "echannel" ? (
          <>
            <label>Kode Pembayaran</label>
            <p className="border py-2 border-l-0 border-r-0 border-t-0 mb-4">
              {midtrans.biller_code}
              <i className="fas fa-copy inline pt-2 pr-3 float-right"></i>
            </p>

            <label>No. Vitrual Account</label>
            <p className="border py-2 border-l-0 border-r-0 border-t-0">
              {midtrans.bill_key}
              <i className="fas fa-copy inline pt-2 pr-3 float-right"></i>
            </p>
          </>
        ) : midtrans.payment_type === "cstore" ? (
          <>
            <label>No. Vitrual Account</label>
            <p className="border py-2 border-l-0 border-r-0 border-t-0">
              {midtrans.payment_code}
              <i className="fas fa-copy inline pt-2 pr-3 float-right"></i>
            </p>
          </>
        ) : null}
      </div>
      {midtrans.payment_type !== "credit_card" ? (
        <button
          className=" border-blue rounded-md w-full my-2 py-1"
          onClick={() => setPaymentModal(false)}
        >
          Kembali ke halaman checkout
        </button>
      ) : (
        <p className="w-full font-bold text-center my-4">
          Segera selesaikan pembayaran anda.
        </p>
      )}
    </>
  );
}
