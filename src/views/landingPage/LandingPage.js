import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Splash from "../../assets/img/splash.png";

export default function LandingPage() {
  return (
    <>
      <div className="flex flex-col lg:flex-row text-white">
        <div className="lg:w-7/12 p-14">
          <label>
            All IMPEESA collections have a service that you can use to borrow
            mountaineering equipment and other items. <br /> <br />
            Choose the items you want and fill out your form with a loan letter
            from your organization. Follow the instructions to complete your
            loan.
          </label>
          <div className="w-full mt-3">
            <button className="landing-btn py-1 px-6 rounded-lg">
              <Link to="/form">Borrow Collection ➜</Link>
            </button>
          </div>
        </div>
        <div className="lg:w-5/12">
          <img src={Splash} alt="Splash" />
        </div>
      </div>
      <div className="text-blue font-semibold mx-3 lg:mx-31 p-4 historiCard">
        <h4 className="mb-4">HISTORY</h4>
        <label>
          IMPEESA Perbanas merupakan salah satu UKM yang bertujuan membina
          mental, pikiran, serta kepribadian yang sesuai dengan jiwa Pancasila
          serta menyalurkan minat dan bakat mahasiswa/i yang mempunyai rasa
          kecintaan terhadap kegiatan alam terbuka. Impeesa merupakan gabungan
          dari UKM Impeesa eks. STIE Perbanas yang berdiri di Sukamantri, ...
        </label>
      </div>
    </>
  );
}
