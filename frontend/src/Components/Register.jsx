import React, { useContext, useEffect, useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [loginPage, setLoginPage] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex justify-center items-center">
      {/* {loading ? <Loading></Loading> : ""} */}
      {loginPage ? (
        <Login changeMode={setLoginPage} />
      ) : (
        <Signup changeMode={setLoginPage} />
      )}
    </div>
  );
}
