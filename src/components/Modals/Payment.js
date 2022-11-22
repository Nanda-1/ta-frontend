import React, { useContext } from "react";
import { TopUpContext } from "Context/TopUpContext";
import PaymentList from "components/Payment/PaymentList";
import PaymentMethod from "components/Payment/PaymentMethod";

export default function Payment() {
  const { paymentModal, setPaymentModal, midtrans, checkout } =
    useContext(TopUpContext);

  const formatHarga = (angka) => {
    var parts = angka.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(",");
  };

  return (
    <>
      {paymentModal ? (
        <>
          <div className="justify-center cursor-default items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-2 mx-auto font-roboto">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-700-d bg-white outline-none focus:outline-none">
                {/*body*/}
                {!midtrans ? (
                  <div className="flex justify-end">
                    <button
                      className="absolute focus:outline-none p-4"
                      type="button"
                      onClick={() => setPaymentModal(false)}
                    >
                      <i className="fas fa-times fa-lg"></i>
                    </button>
                  </div>
                ) : null}
                <h2 className="text-center text-xl font-bold py-4 text-blue">
                  Pilih Metode Pembayaran
                </h2>
                <div className="flex rounded-md p-4 m-2 text-white bg-blue">
                  <div className="w-full">Total</div>
                  <div className="text-3xl font-bold w-full text-right">
                    Rp{" "}
                    {midtrans
                      ? formatHarga(Number(midtrans.gross_amount))
                      : formatHarga(checkout.total_price + checkout.tax)}
                  </div>
                </div>
                <div className="relative flex-col overflow-x-auto modal">
                  <div className="flex-row py-2 px-2" style={{ height: "350px" }}>
                    {midtrans ? <PaymentMethod /> : <PaymentList />}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
