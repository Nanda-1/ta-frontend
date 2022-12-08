import React, { useContext, useEffect } from "react";
import { TopUpContext } from "Context/TopUpContext";
import Cookies from "js-cookie";
import PaymentMethod from "components/Payment/PaymentMethod";

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
  } = useContext(TopUpContext);

  const { topUpDetail } = functions;

  const listHarga = [...produkSatuan, ...listPaketQuota];

  const formatHarga = (angka) => {
    var parts = angka.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return "Rp" + parts.join(",");
  };

  useEffect(() => {
    if (paymentModal) {
      topUpDetail(Cookies.get("top_up_transaction_id"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hargaBarang = (nama_produk) => {
    if (nama_produk.includes("Paket")) {
      const filter = listHarga.filter((el) => el.package_name === nama_produk);
      return formatHarga(filter.map((el) => el.price));
    } else {
      const filter = listHarga.filter((el) =>
        nama_produk.toLowerCase().includes("e-meterai")
          ? el.product_name === "emeterai"
          : nama_produk.toLowerCase().includes("e-form")
          ? el.product_name === "eform"
          : el.product_name === "ttd"
      );
      const quota = nama_produk.split("")[0] + nama_produk.split("")[1];
      return formatHarga(filter.map((el) => el.product_price * Number(quota)));
    }
  };

  return (
    <>
      {paymentModal ? (
        <>
          <div className="justify-center cursor-default font-sans items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-2 mx-auto font-roboto">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-700-d bg-white outline-none focus:outline-none">
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
                  <PaymentMethod midtrans={midtrans} checkout={checkout} />
                  <hr className="mt-3 border-t-4" />
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
                    <div className="text-grey flex text-xs py-1">
                      <label>Pajak</label>
                      <label className="ppat-1 w-full">
                        {formatHarga(Number(checkout.tax_fee))}
                      </label>
                    </div>
                    <div className="text-grey flex text-xs py-1">
                      <label className="w-full">Biaya Admin</label>
                      <label className="ppat-1">
                        {formatHarga(Number(checkout.admin_fee))}
                      </label>
                    </div>
                  </div>
                </div>
                <div
                  className="text-black px-4 py-3 flex"
                  style={{ boxShadow: " 0px -2px 10px rgba(0, 0, 0, 0.12)" }}
                >
                  <div className=" w-80">
                    Total Tagihan <br />
                    <label className="font-700">
                      {midtrans
                        ? formatHarga(Number(midtrans.gross_amount))
                        : formatHarga(
                            checkout.sub_total_fee +
                              checkout.tax_fee +
                              checkout.admin_fee
                          )}
                    </label>
                  </div>
                  {/* <button
                    className="bg-blue text-white flex rounded-lg px-16 py-2 text-sm"
                    style={{ alignSelf: "center" }}
                  >
                    <img
                      src={Secure}
                      style={{ width: "22px", height: "20px" }}
                      className="mr-2"
                    />
                    Bayar
                  </button> */}
                  {/* </div> */}
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
