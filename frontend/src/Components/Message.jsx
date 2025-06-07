import React from "react";

export default function Message({ self }) {
  if (self) {
    return (
      <div className="w-full flex flex-col items-end">
        <div className="max-w-[50%] bg-[#218AFF]  opacity-[77%] p-[10px] rounded-t-[10px] rounded-bl-[10px]">
          <h3 className="text-white font-mont text-[15px] font-medium">
            Supabase is a simple way to add user accounts, save messages.
          </h3>
        </div>
        <h2 className="text-[#8C8C8C] font-mont text-[10px] mt-1 ml-1 font-medium">
          12:00 PM
        </h2>
      </div>
    );
  }
  return (
    <div className="w-full">
      <div className="max-w-[50%] bg-[#313431] opacity-[77%] p-[10px] rounded-t-[10px] rounded-br-[10px]">
        <h3 className="text-white font-mont text-[15px] font-medium">
          I'll make the chat app more minimal by simplifying the design,
          reducing visual clutter, and using cleaner layouts.
        </h3>
      </div>
      <h2 className="text-[#8C8C8C] font-mont text-[10px] mt-1 ml-1 font-medium">
        12:00 PM
      </h2>
    </div>
  );
}
