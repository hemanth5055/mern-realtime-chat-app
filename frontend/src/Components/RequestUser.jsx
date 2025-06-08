import React from "react";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";

export default function RequestUser() {
  return (
    <div className=" w-[350px] rounded-[15px]  shrink-0 flex justify-around bg-[#1A1A1A] items-center py-[10px] pl-3 gap-2">
      <div className="w-[50px] h-[50px] rounded-full bg-gray-600 relative">
        {/* <div className="absolute w-[10px] h-[10px] bg-[#1dce20] rounded-full bottom-0 right-2"></div> */}
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="font-mont text-white text-[17px] font-medium">
          Richard Wilson
        </h2>
        <h4 className="font-mont text-[#BFBFBF] text-[11px]">@username</h4>
      </div>
      <div className="flex items-center gap-3">
        <div className="bg-[#2F2F2F] w-[40px] flex justify-center items-center h-[40px] rounded-full cursor-pointer">
          <TiTick className="text-white" size={25}></TiTick>
        </div>
        <div className="bg-[#2F2F2F] w-[40px] flex justify-center items-center h-[40px] rounded-full cursor-pointer">
          <RxCross2 className="text-red-500" size={20}></RxCross2>
        </div>
      </div>
    </div>
  );
}
