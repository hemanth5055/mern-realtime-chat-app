import React from "react";

export default function User() {
  return (
    <div className="w-full rounded-[15px] shrink-0 flex bg-[#1A1A1A] items-center py-[10px] pl-3 gap-2">
      <div className="w-[50px] h-[50px] rounded-full bg-gray-600 relative">
        {/* <div className="absolute w-[10px] h-[10px] bg-[#1dce20] rounded-full bottom-0 right-2"></div> */}
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="font-mont text-white text-[17px] font-medium">
          Richard Wilson
        </h2>
        <h4 className="font-mont text-[#BFBFBF] text-[10px]">
          Will see you soon
        </h4>
      </div>
    </div>
  );
}
