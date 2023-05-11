import React, { useContext, useEffect } from "react";
import { TopUpContext } from "Context/TopUpContext";
import Cookies from "js-cookie";
import PaymentMethod from "components/Payment/PaymentMethod";
import Secure from "../../assets/img/security.png";
import OtherPayment from "components/Payment/OtherPayment";
import ModalDokumen from "./ModalDokumen";

export default function Payment() {
  const {
    paymentModal,
    setPaymentModal,
    midtrans,
    checkout,
    functions,
    listItem,
    listPaketQuota,
    produkSatuan,
    listPayment,
    otherPayment,
    setOtherPayment,
    setLoadingFile,
    loadingFile,
  } = useContext(TopUpContext);

  const { topUpDetail, topUpPay } = functions;

  const listHarga = [...produkSatuan, ...listPaketQuota];

  const formatHarga = (angka) => {
    var parts = angka.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return "Rp" + parts.join(",");
  };

  const totalHarga = midtrans
    ? midtrans.gross_amount
    : checkout.sub_total_fee + checkout.tax_fee + checkout.admin_fee;

  const biaya_transaksi =
    listPayment.payment_type !== "gopay" ? 4000 : totalHarga * (2 / 100);

  const pajak = Math.ceil(biaya_transaksi * (10 / 100));

  useEffect(() => {
    if (paymentModal) {
      topUpDetail(Cookies.get("top_up_transaction_id"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cekStatus = () => {
    topUpDetail(Cookies.get("top_up_transaction_id"));
  };

  const hargaBarang = (nama_produk) => {
    if (nama_produk.includes("Paket")) {
      const filter = listHarga.filter((el) => el.package_name === nama_produk);
      return formatHarga(filter.map((el) => el.price));
    } else {
      const filter = listHarga.filter((el) =>
        nama_produk.toLowerCase().includes("meterai")
          ? el.product_name === "emeterai"
          : nama_produk.toLowerCase().includes("form")
          ? el.product_name === "eform"
          : el.product_name === "ttd"
      );
      const quota = nama_produk.split("")[0] + nama_produk.split("")[1];
      return formatHarga(filter.map((el) => el.product_price * Number(quota)));
    }
  };

  const payTransaction = () => {
    topUpPay(checkout.top_up_transaction_id);
    setLoadingFile(true);
  };

  return (
    <>
      {paymentModal ? (
        <>
          <div className="justify-center cursor-default font-sans items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-2 mx-auto font-roboto">
              {/*content*/}
              <div
                className="border-0 rounded-lg shadow-lg relative flex flex-col w-700-d bg-white outline-none focus:outline-none"
                style={{ filter: otherPayment ? "brightness(0.9)" : "" }}
              >
                {loadingFile && <ModalDokumen />}
                {/*body*/}
                <div className="px-4">
                  <div className="flex ">
                    <button
                      className="focus:outline-none pr-3 mt-1"
                      type="button"
                      onClick={() => setPaymentModal(false)}
                    >
                      <i className="fa fa-times fa-lg"></i>
                    </button>
                    <h2 className="w-full text-xl font-700 py-4 text-black">
                      Pembayaran
                    </h2>
                  </div>
                  {checkout.payment_status !== "success" &&
                  checkout.payment_status !== "failure" ? (
                    <>
                      <PaymentMethod
                        midtrans={midtrans}
                        checkout={checkout}
                        setOtherPayment={setOtherPayment}
                      />
                      <hr className="border-t-4" />
                    </>
                  ) : null}
                  <div className="text-black">
                    <h3 className="font-700 mt-1">Rincian Pembelian</h3>
                    {listItem.map(({ package_name }, index) => {
                      return (
                        <div
                          className="text-grey flex text-xs py-1"
                          key={index}
                        >
                          <label className="w-full">{package_name}</label>
                          <label>{hargaBarang(package_name)}</label>
                        </div>
                      );
                    })}
                    {listPayment.length !== 0 || midtrans !== null ? (
                      <>
                        <div className="text-grey flex text-xs py-1">
                          <label style={{ width: "100px" }}>PPN 10%</label>
                          <label className="ppat-1 w-full">
                            {formatHarga(Number(checkout.tax_fee || pajak))}
                          </label>
                        </div>
                        <div className="text-grey flex text-xs py-1">
                          <label className="w-full">Biaya Transaksi</label>
                          <label className="ppat-1">
                            {formatHarga(biaya_transaksi)}
                          </label>
                        </div>
                      </>
                    ) : null}
                    <div className="text-grey flex text-xs py-1 font-bold">
                      <label className="w-full">Total Belanja</label>
                      <label className="ppat-1">
                        {midtrans
                          ? formatHarga(Number(midtrans.gross_amount))
                          : formatHarga(
                              checkout.sub_total_fee +
                                (listPayment.length !== 0 ? pajak : 0) +
                                (listPayment.length !== 0 ? biaya_transaksi : 0)
                            )}
                      </label>
                    </div>
                  </div>
                </div>
                <div
                  className="text-black px-4 py-3 flex"
                  style={{ boxShadow: " 0px -2px 10px rgba(0, 0, 0, 0.12)" }}
                >
                  <div
                    className={
                      checkout.payment_status === "pending" ? "w-60" : "w-80"
                    }
                  >
                    Total Belanja <br />
                    <label className="font-700">
                      {midtrans
                        ? formatHarga(Number(midtrans.gross_amount))
                        : formatHarga(
                            checkout.sub_total_fee +
                              (listPayment.length !== 0 ? pajak : 0) +
                              (listPayment.length !== 0 ? biaya_transaksi : 0)
                          )}
                    </label>
                  </div>
                  {checkout.payment_status === null ? (
                    <button
                      className="bg-blue text-white flex rounded-lg px-8 py-2 text-sm"
                      style={{ alignSelf: "center" }}
                      onClick={payTransaction}
                    >
                      <img
                        src={Secure}
                        style={{ width: "22px", height: "20px" }}
                        className="mr-2"
                        alt=""
                      />
                      Bayar
                    </button>
                  ) : checkout.payment_status === "pending" ? (
                    <button
                      className="bg-blue text-white flex rounded-lg px-2 py-2 text-sm"
                      style={{ alignSelf: "center" }}
                      onClick={cekStatus}
                    >
                      Saya Sudah Membayar
                    </button>
                  ) : null}
                </div>
              </div>
              {otherPayment && (
                <div className="z-50 p-1 px-4 bg-white absolute bottom-0 w-full rounded-lg shadow-lg animate fadeInUp">
                  <OtherPayment />
                </div>
              )}
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
