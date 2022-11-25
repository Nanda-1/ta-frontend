import React, { useContext, useEffect, useState } from "react";
import { TopUpContext } from "Context/TopUpContext";
import Visa from "assets/img/icon/visa.png";
import MasterCard from "assets/img/icon/master-card.png";
import JCB from "assets/img/icon/JCB_logo.png";
import { createDefaultMaskGenerator, MaskedInput } from "react-hook-mask";
import swal from "sweetalert";

export default function CreditCard() {
  const { checkout, listPayment, setToken, token, setListPayment, functions } =
    useContext(TopUpContext);
  const { topUpPay } = functions;
  const [noKartu, setNoKartu] = useState("");
  const [tglBerlaku, setTglBerlaku] = useState("");
  const [cvv, setCvv] = useState("");

  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl =
      "https://api.midtrans.com/v2/assets/js/midtrans-new-3ds.min.js";
    //change this according to your client-key
    const myMidtransClientKey = "SB-Mid-client-jc4soSObl8oZT-m2";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("id", "midtrans-script");
    scriptTag.setAttribute("type", "text/javascript");
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);
    scriptTag.setAttribute("data-environment", "sandbox");

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  const month = tglBerlaku.slice(0, 2);
  const year = tglBerlaku.slice(3, 5);

  // card data from customer input, for example
  var cardData = {
    card_number: noKartu,
    card_exp_month: month,
    card_exp_year: "20" + year,
    card_cvv: cvv,
  };

  // callback functions
  var options = {
    onSuccess: function (response) {
      // Success to get card token_id, implement as you wish here
      let text1 = "payment_type";
      setListPayment({ [text1]: "credit_card"});

      setToken(response.token_id);
    },
    onFailure: function (response) {
      // Fail to get card token_id, implement as you wish here
      swal('Gagal', response, 'error')
    },
  };

  const nextStep = () => {
    window.MidtransNew3ds.getCardToken(cardData, options);
  };

  const handleChange = (text) => {
    const type = text.target.name;
    if (type === "tglBerlaku") {
      const expDateFormatter =
        text.target.value.replace(/\//g, "").substring(0, 2) +
        (text.target.value.length > 2 ? "/" : "") +
        text.target.value.replace(/\//g, "").substring(2, 4);
      setTglBerlaku(expDateFormatter);
    } else {
      setCvv(text.target.value);
    }
  };

  if (listPayment.length !== 0) {
    topUpPay(checkout.top_up_transaction_id, token);
  }


  const mask = "9999 9999 9999 9999";
  const maskGenerator = createDefaultMaskGenerator(mask);

  return (
    <div className="px-2 w-full">
      <label>Nomor Kartu</label>
      <img
        src={Visa}
        className="bank-icon-4 align-middle float-right"
        alt="Visa"
      />
      <img
        src={MasterCard}
        className="bank-icon-4 align-middle float-right"
        alt="MasterCard"
      />
      <img
        src={JCB}
        className="bank-icon-4 align-middle float-right"
        alt="JCB"
      />
      <MaskedInput
        maskGenerator={maskGenerator}
        value={noKartu}
        name={"no_kartu"}
        onChange={setNoKartu}
        placeholder={mask}
        className={"w-full border p-2 my-2 rounded-md"}
      />

      <div className="grid grid-cols-2 mt-4 w-full">
        <div className="mr-6">
          <label>Tanggal Berlaku</label>
          <input
            type="text"
            onChange={handleChange}
            maxLength={5}
            name="tglBerlaku"
            value={tglBerlaku}
            className={"w-full hover:border-blue border-grey-2 my-2 rounded-md"}
            placeholder={"MM/YY"}
          />
        </div>
        <div className="ml-6">
          <label>CVV</label>
          <input
            type="password"
            onChange={handleChange}
            name="cvv"
            value={cvv}
            maxLength={6}
            className={"w-full hover:border-blue my-2 rounded-md"}
            placeholder={"•••"}
          />
        </div>
      </div>

      <button
        className="bg-green-2 text-center text-white w-full my-6 p-2 rounded-md"
        onClick={nextStep}
      >
        Kembali Ke Checkout Page
      </button>
    </div>
  );
}
