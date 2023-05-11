import React, { useState } from "react";

// Context
import LoginForm from "components/Login/LoginForm";

export default function Login() {
  const [input, setInput] = useState({
    tlp: null,
    email: null,
    password: "",
  });

  if (input.tlp?.includes("@")) {
    setInput({ ...input, email: input.tlp, tlp: null });
  }

  return (
    <div className="h-screen">
      <div className="rounded-t mb-0 login-bg min-h-screen">
        {/* <div className="bg-white"> */}
          <LoginForm />
        {/* </div> */}
      </div>
    </div>
  );
}
