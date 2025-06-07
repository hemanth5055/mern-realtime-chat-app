import React from "react";
import User from "./User";
import Message from "./Message";

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
        <div className="w-full mb-4 flex items-center">
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
        <div className="h-[50px]  w-[90%] rounded-[20px]  bottom-0 left-0 bg-[#303030] p-2">
          {/* You can add input and send button here */}
        </div>
      </div>
    </div>
  );
}
