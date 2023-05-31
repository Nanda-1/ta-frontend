import React from "react";
import Gambar from "../../assets/img/example.png";

export default function Diving() {
  return (
    <>
      <div className="flex text-blue">
        <div className="bg-white lg:w-10/12 mx-auto mt-6 flex rounded-lg shadow-form w-full">
          <div className="py-6 px-16 w-full text-center">
            <h2 className="font-bold mb-4 text-xl">DIVING</h2>
            <p className="text-left">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently. <br />
              <br />
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old. Richard McClintock, a Latin
              professor at Hampden-Sydney College in Virginia.
            </p>
            <div className="tex-center w-full mt-6 flex mx-auto justify-center">
              <button className="text-xl font-bold focus:outline-none">
                {"<"}
              </button>
              <img src={Gambar} width={"40%"} className="mx-6" />
              <button className="text-xl font-bold focus:outline-none">
                {">"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
