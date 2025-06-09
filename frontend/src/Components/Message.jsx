import React from "react";

export default function Message({ self, msg }) {
  function convertUTCtoLocalTime(utcISOString) {
    const localDate = new Date(utcISOString);
    const hours = localDate.getHours().toString().padStart(2, "0");
    const minutes = localDate.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  if (self) {
    return (
      <div className="w-full flex flex-col items-end my-1">
        <div className="max-w-[50%] bg-[#218AFF]  opacity-[77%] p-[10px] rounded-t-[10px] rounded-bl-[10px]">
          <h3 className="text-white font-mont text-[15px] font-medium">
            {msg.message}
          </h3>
        </div>
        <h2 className="text-[#8C8C8C] font-mont text-[10px] mt-1 ml-1 font-medium">
          {convertUTCtoLocalTime(msg.timestamp)}
        </h2>
      </div>
    );
  }
  return (
    <div className="w-full flex flex-col items-start my-1">
      <div className="max-w-[50%] bg-[#313431] opacity-[77%] p-[10px] rounded-t-[10px] rounded-br-[10px]">
        <h3 className="text-white font-mont text-[15px] font-medium">
          {msg.message}
        </h3>
      </div>
      <h2 className="text-[#8C8C8C] font-mont text-[10px] mt-1 ml-1 font-medium">
        {convertUTCtoLocalTime(msg.timestamp)}
      </h2>
    </div>
  );
}
