import React from "react";
import { RiChat1Line } from "react-icons/ri";
import { LuSearch } from "react-icons/lu";

import { CgAdd } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { TbLogout2 } from "react-icons/tb";
import { useContext } from "react";
import { userContext } from "../Context/user.context";

export default function Sidebar() {
  const navigate = useNavigate();
  const { user, logout } = useContext(userContext);
  return (
    <div className="bg-[#1A1A1A] flex flex-col gap-3 p-3 rounded-[15px] h-fit">
      <div
        className="w-[50px] h-[50px] rounded-full bg-[#303030] cursor-pointer flex justify-center items-center"
        title="Profile"
        onClick={() => navigate("/profile")}
      >
        <img
          src={user?.profileUrl}
          className="w-full object-cover h-full rounded-full"
        />
      </div>
      <div
        className="w-[50px] h-[50px] rounded-full bg-[#303030] cursor-pointer flex justify-center items-center"
        title="Chat"
        onClick={() => navigate("/")}
      >
        <RiChat1Line size={20} className="text-gray-300"></RiChat1Line>
      </div>
      <div
        className="w-[50px] h-[50px] rounded-full bg-[#303030] cursor-pointer  flex justify-center items-center"
        title="Requests"
        onClick={() => navigate("/requests")}
      >
        <CgAdd size={20} className="text-gray-300"></CgAdd>
      </div>
      <div
        className="w-[50px] h-[50px] rounded-full bg-[#303030] cursor-pointer flex justify-center items-center"
        title="search"
        onClick={() => navigate("/findfriends")}
      >
        <LuSearch size={20} className="text-gray-300"></LuSearch>
      </div>
      <div
        className="w-[50px] h-[50px] rounded-full bg-[#303030] cursor-pointer flex justify-center items-center"
        title="logout"
        onClick={() => logout(navigate)}
      >
        <TbLogout2 size={20} className="text-gray-300"></TbLogout2>
      </div>
    </div>
  );
}
