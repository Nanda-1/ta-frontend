import React from "react";
import Instagram from "../../assets/img/instagram.png";
import Twitter from "../../assets/img/Twitter.png";
import Youtube from "../../assets/img/Youtube.png";

export default function FooterAdmin() {
  return (
    <>
      <footer className="block py-2 bg-blue-4 mt-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full lg:w-4/12 px-4">
              <div className="text-sm light-blue font-semibold py-1 text-center md:text-left"  style={{alignItems: 'center'}}>
                © 2023 IMPEESA Perbanas Institute
                <a
                  href="https://www.creative-tim.com?ref=nr-footer-admin"
                  className="light-blue hover:text-blueGray-700 text-sm font-semibold py-1"
                >
                  Creative Tim
                </a>
              </div>
            </div>
            <div className="w-full lg:w-8/12 px-4">
              <ul className="flex list-none text-white justify-center">
                <li className="lg:w-5/12 mr-12 pr-4">
                  <span className="font-bold">Address</span>
                  <br />
                  <span className="text-xs">
                    Jl. Perbanas No.16, RT.16/RW.7, Karet Kuningan, Jakarta
                    Selatan. (Ruang 1103)
                  </span>
                </li>
                <li className="lg:w-4/12">
                  <span className="font-bold">Contact</span>
                  <br />
                  <span className="text-xs">
                    WhatsApp:
                    <br />
                    081382683943 (Rinanda)
                  </span>
                </li>
                <li className="flex" style={{alignItems: 'end'}}>
                 <img width={60} className="mr-4" src={Youtube} style={{height: 'fit-content'}} />
                 <img width={25} className="mr-4" src={Instagram} style={{height: 'fit-content'}} />
                 <img width={25} src={Twitter} style={{height: 'fit-content'}} />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
