import React from "react";
import LoginPage from "../../components/Login/LoginPage";

// Context
// import LoginForm from "components/Login/LoginForm";

export default function Login() {

  return (
    <div className="h-screen">
      <div className="rounded-t mb-0 bg-blue min-h-screen">
        {/* <div className="bg-white"> */}
          <LoginPage />
        {/* </div> */}
      </div>
    </div>
  );
}
