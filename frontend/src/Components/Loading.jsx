import React from "react";
import { IoReloadOutline } from "react-icons/io5";
export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
      <div className="bg-white font-mont rounded-[10px] flex justify-center items-center shadow-md h-[60px] w-[60px] text-lg font-medium text-gray-800">
        <IoReloadOutline className="animate-spin text-black" size={24} />
      </div>
    </div>
  );
}
