import React from "react";
import { RiChat1Line } from "react-icons/ri";
import { LuSearch } from "react-icons/lu";

import { CgAdd } from "react-icons/cg";

export default function Sidebar() {
  return (
    <div className="bg-[#1A1A1A] flex flex-col gap-3 p-3 rounded-[15px] h-fit">
      <div
        className="w-[50px] h-[50px] rounded-full bg-[#303030] cursor-pointer flex justify-center items-center"
        title="Chat"
      >
        <RiChat1Line size={20} className="text-gray-300"></RiChat1Line>
      </div>
      <div
        className="w-[50px] h-[50px] rounded-full bg-[#303030] cursor-pointer  flex justify-center items-center"
        title="Requests"
      >
        <CgAdd size={20} className="text-gray-300"></CgAdd>
      </div>
      <div
        className="w-[50px] h-[50px] rounded-full bg-[#303030] cursor-pointer flex justify-center items-center"
        title="search"
      >
        <LuSearch size={20} className="text-gray-300"></LuSearch>
      </div>
    </div>
  );
}
