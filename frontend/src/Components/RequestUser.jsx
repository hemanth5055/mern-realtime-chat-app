import React from "react";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { useContext } from "react";
import { userContext } from "../Context/user.context";

export default function RequestUser({ user, requestId }) {
  const { removeRequest, acceptRequest, setPendingRequests } =
    useContext(userContext);
  return (
    <div className=" w-[350px] rounded-[15px]  shrink-0 flex justify-around bg-[#1A1A1A] items-center py-[10px] pl-3 gap-2">
      <div className="w-[50px] h-[50px] rounded-full bg-gray-600 ">
        <img
          src={
            user.profileUrl == ""
              ? "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"
              : user.profileUrl
          }
          className="w-full h-full rounded-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="font-mont text-white text-[17px] font-medium">
          {user?.name}
        </h2>
        <h4 className="font-mont text-[#BFBFBF] text-[11px]">
          @{user?.username}
        </h4>
      </div>
      <div className="flex items-center gap-3">
        <div
          className="bg-[#2F2F2F] w-[40px] flex justify-center items-center h-[40px] rounded-full cursor-pointer"
          onClick={(e) => {
            acceptRequest(requestId, setPendingRequests);
          }}
        >
          <TiTick className="text-white" size={25}></TiTick>
        </div>
        <div
          className="bg-[#2F2F2F] w-[40px] flex justify-center items-center h-[40px] rounded-full cursor-pointer"
          onClick={(e) => {
            removeRequest(requestId, setPendingRequests);
          }}
        >
          <RxCross2 className="text-red-500" size={20}></RxCross2>
        </div>
      </div>
    </div>
  );
}
