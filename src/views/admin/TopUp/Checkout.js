import React, { useContext, useEffect } from "react";
import { TopUpContext } from "Context/TopUpContext";
import { useParams } from "react-router-dom";
import Payment from "components/Modals/Payment";

export default function Checkout() {
  const {
    functions,
    checkout,
    listItem,
    statusPayment,
    setPaymentModal,
    paymentModal,
    midtrans,
  } = useContext(TopUpContext);

  const { topUpDetail } = functions;

  let { id } = useParams();

  let pajak = checkout.tax;
  let total = checkout.total_price;

  useEffect(() => {
    topUpDetail(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatHarga = (angka) => {
    var parts = angka.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return "Rp " + parts.join(",");
  };

  const hargaTotal = () => {
    if (midtrans) {
      const hasil = midtrans.gross_amount - (total + pajak);
      return pajak + total + hasil;
    } else {
      return pajak + total;
    }
  };

  return (
    <>
      {paymentModal ? <Payment /> : null}
      <div className="w-full relative break-words font-montserrat cursor-default">
        <div className="col-span-3">
          <div className="font-bold text-3xl text-center">Detail Pesanan</div>
          <div className="mt-6 text-grey font-semibold text-md flex flex-row text-md">
            Status Pesanan :
            {statusPayment === "success" ? (
              <div className="text-green pl-2">Berhasil</div>
            ) : statusPayment === "unpaid" ? (
              <div className="text-red-500 pl-2">Belum dibayar</div>
            ) : statusPayment === "pending" ? (
              <div className="text-red-500 pl-2">Menunggu Pembayaran</div>
            ) : (
              <div className="text-red-500 pl-2">Gagal</div>
            )}
          </div>
          <div className="grid grid-cols-4 mt-2 text-grey w-full">
            <div className="col-span-3">
              <p className="font-bold text-black text-md mt-4 mb-2">
                Rincian Pembelian
              </p>
              {listItem.map(
                (
                  { eform_quota, ematerai_quota, package_name, ttd_quota },
                  index
                ) => {
                  return (
                    <div
                      className="checkout-box py-2 px-4 text-sm mb-2 mr-4"
                      key={index}
                    >
                      <div className="w-full font-bold border-grey-2 border-l-0 border-r-0 border-t-0 text-black py-2">
                        {package_name}
                      </div>
                      <div
                        className="text-black py-2 font-medium"
                        key={package_name}
                      >
                        Blangko : {eform_quota} <br />
                        Meterai : {ematerai_quota} <br />
                        Tanda Tangan : {ttd_quota} <br />
                      </div>
                    </div>
                  );
                }
              )}
            </div>
            <div>
              <p className="font-bold text-black text-md mt-4 mb-2">
                Rincian Pembayaran
              </p>
              <div className="bg-blue rounded-md text-sm p-4 text-white ">
                <div className="mb-5">
                  Total Harga :
                  <span className="float-right">
                    {formatHarga(total ? total : 0)}
                  </span>
                </div>
                <div className="mb-5">
                  Pajak :
                  <span className="float-right">
                    {formatHarga(pajak ? pajak : 0)}
                  </span>
                </div>
                {midtrans ? (
                  <div className="mb-5">
                    Biaya Admin :
                    <span className="float-right">
                      {formatHarga(
                        Number(midtrans.gross_amount) - (total + pajak)
                      )}
                    </span>
                  </div>
                ) : null}
                <div className="horizontal-line"></div>
                <div className="font-bold mt-4">
                  Total Pesanan
                  <span className="float-right">
                    {formatHarga(hargaTotal())}
                  </span>
                </div>
                <div className="text-right text-lg font-bold"></div>
              </div>
              {statusPayment !== "success" ? (
                <button
                  className="checkout-button align-bottom text-white bg-green-2 text-sm mt-4 w-full font-bold py-2 rounded-md"
                  onClick={() => setPaymentModal(true)}
                >
                  <i className="fas fa-arrow-right mr-2"></i>Pilih Pembayaran
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
