import React from "react";
import User from "./User";
import Message from "./Message";
import { LuSendHorizontal } from "react-icons/lu";

export default function Home() {
  return (
    <div className="w-full h-full flex">
      {/* Show Users */}
      <div className="w-[25%] flex flex-col p-2 gap-3 overflow-y-scroll">
        <User />
      </div>

      {/* Chat Area */}
      <div className="w-[75%] relative bg-[#1A1A1A] rounded-[15px] flex flex-col items-center p-4">
        {/* Chat Header */}
        <div className="w-full mb-4 flex items-center gap-2 px-4">
          <div className="w-[45px] h-[45px] bg-gray-400 rounded-full"></div>
          <h3 className="text-white font-play text-[35px] font-light">
            Vijay Ram
          </h3>
        </div>

        {/* Messages */}
        <div className="flex-1 w-full px-4 overflow-y-auto flex flex-col gap-2">
          <Message />
          <Message self={true} />
          <Message />
          <Message self={true} />
          <Message />
          <Message self={true} />
          <Message />
          <Message self={true} />
          <Message />
          <Message self={true} />
        </div>

        {/* Input Box */}
        <div className="h-[50px] w-[90%] rounded-[20px]  bottom-0 left-0 bg-[#303030] flex items-center">
          <input
            type="text"
            className="h-full w-full rounded-l-[20px]  outline-none pl-4 px-2 font-mont text-white"
            placeholder="Write a message ..."
          />
          <div className="w-[40px] h-[40px] mx-5 flex justify-center items-center cursor-pointer">
            <LuSendHorizontal size={20} className="text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
