import React, { useContext, useEffect, useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import { Navigate, useNavigate } from "react-router-dom";
import { userContext } from "../Context/user.context";

export default function Register() {
  const [loginPage, setLoginPage] = useState(true);
  const navigate = useNavigate();
  const { user, checkAuth } = useContext(userContext);
  useEffect(() => {
    // if (user) {
    //   navigate("/");
    //   return;
    // }
    // const runCheck = async () => {
    //   const isAuth = await checkAuth();
    //   if (isAuth) {
    //     navigate("/");
    //   }
    // };
    // runCheck();
  }, [user]);

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
