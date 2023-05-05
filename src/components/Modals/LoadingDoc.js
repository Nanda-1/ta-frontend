import React from "react";

export default function LoadingDoc() {
  return (
    <div className="relative w-auto mx-auto">
      <div className="lds-ellipsis bg-white rounded-md">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
