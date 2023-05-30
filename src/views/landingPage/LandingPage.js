import React from "react";
import NavbarLanding from "./IndexNavbar";
import Splash from "../../assets/img/splash.png";
import Footer from "components/Footers/Footer";
import FooterSmall from "components/Footers/FooterSmall";
import FooterAdmin from "components/Footers/FooterAdmin";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen sidebar-transition landing-bg">
      <NavbarLanding />
      <div className="flex text-white">
        <div className="lg:w-7/12 p-14">
          <label>
            All IMPEESA collections have a service that you can use to borrow
            mountaineering equipment and other items. <br /> <br />
            Choose the items you want and fill out your form with a loan letter
            from your organization. Follow the instructions to complete your
            loan.
          </label>
          <div className="w-full mt-3">
            <button className="landing-btn py-1 px-6 rounded-lg ">
              Borrow Collection ➜
            </button>
          </div>
        </div>
        <div className="lg:w-5/12">
          <img src={Splash} />
        </div>
      </div>
      <div className="text-blue font-semibold mx-31 p-4 historiCard">
        <h4 className="mb-4">HISTORY</h4>
        <label>
          IMPEESA Perbanas merupakan salah satu UKM yang bertujuan membina
          mental, pikiran, serta kepribadian yang sesuai dengan jiwa Pancasila
          serta menyalurkan minat dan bakat mahasiswa/i yang mempunyai rasa
          kecintaan terhadap kegiatan alam terbuka. Impeesa merupakan gabungan
          dari UKM Impeesa eks. STIE Perbanas yang berdiri di Sukamantri, ...
        </label>
      </div>
      <FooterAdmin />
    </div>
  );
}
