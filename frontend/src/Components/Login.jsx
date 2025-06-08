import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ changeMode }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-5  rounded-[10px] p-4">
      <div className="flex flex-col gap-1">
        {/* <h1 className="font-mont font-medium text-[18px] text-white">Email</h1> */}
        <input
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          className="w-[350px] h-[45px] outline-none bg-[#202020] text-white rounded-[5px] px-2 font-mont font-medium"
        />
      </div>

      <div className="flex flex-col gap-1">
        {/* <h1 className="font-mont font-medium  text-[18px] text-white">
          Password
        </h1> */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-[350px] h-[45px] outline-none text-white bg-[#202020] rounded-[5px] px-2 font-mont font-medium"
        />
      </div>

      <div
        className="flex justify-center bg-white font-mont font-medium h-[40px] text-black rounded-[10px] items-center cursor-pointer mt-2"
        //   onClick={() => {
        //     login(email, password, navigate);
        //   }}
      >
        Login
      </div>
      <h4 className="font-mont font-semibold text-center text-gray-400 ">
        Don't have an account ,{" "}
        <span
          className="text-[#218AFF] cursor-pointer"
          onClick={() => changeMode((prev) => !prev)}
        >
          Create Account .
        </span>
      </h4>
    </div>
  );
}
