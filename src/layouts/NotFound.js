import React from "react";

export default function NotFound(){
  return (
      <div className="container mx-auto h-screen">
        <div className="flex content-center items-center justify-center h-screen">
          <div className="w-full lg:w-4/12 px-1">
            <div className="relative flex flex-col min-w-0 break-words w-full text-center font-semibold">
                <h2>OOPS! PAGE NOT FOUND</h2>
                <h1 className="font-bold text-8xl">404</h1>
                <span>WE'RE SORRY BUT THE PAGE YOU REQUEST WAS NOT FOUND</span>
            </div>
          </div>
        </div>
    </div>
  );
}