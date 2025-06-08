import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup({ changeMode }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null); // new state
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-5 rounded-[10px] p-4">
      <div className="flex flex-col gap-1">
        <input
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          className="w-[350px] h-[45px] outline-none text-white bg-[#202020] rounded-[5px] px-2 font-mont font-medium"
        />
      </div>

      <div className="flex flex-col gap-1">
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-[350px] h-[45px] outline-none text-white bg-[#202020] rounded-[5px] px-2 font-mont font-medium"
        />
      </div>

      <div className="flex flex-col gap-1">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-[350px] h-[45px] outline-none text-white bg-[#202020] rounded-[5px] px-2 font-mont font-medium"
        />
      </div>

      <div className="flex flex-col gap-1">
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-[350px] h-[45px] outline-none text-white bg-[#202020] rounded-[5px] px-2 font-mont font-medium"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-white font-mont text-[14px]">
          Profile Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setProfileImage(e.target.files[0])}
          className="w-[350px] text-white font-mont text-sm bg-[#202020] p-2 rounded-[5px]"
        />
      </div>

      <div
        className="flex justify-center bg-white font-mont font-medium h-[40px] text-black rounded-[10px] items-center cursor-pointer mt-2"
        // onClick={() => {
        //   signup(name, email, username, password, profileImage, navigate);
        // }}
      >
        Signup
      </div>

      <h4 className="font-mont font-semibold text-center text-gray-400">
        Already have an account,{" "}
        <span
          className="text-[#218AFF] cursor-pointer"
          onClick={() => changeMode((prev) => !prev)}
        >
          Login here.
        </span>
      </h4>
    </div>
  );
}
