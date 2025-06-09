import React, { useContext, useEffect, useRef, useState } from "react";
import Message from "./Message";
import { LuSendHorizontal } from "react-icons/lu";
import { userContext } from "../Context/user.context";

export default function Chatarea() {
  const { selectedUser, messages, sendMessage, getMessages } =
    useContext(userContext);
  const [msgLoading, setmsgLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const bref = useRef();
  const formatDateHeader = (dateStr) => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const date = new Date(dateStr);

    const isSameDay = (d1, d2) =>
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();

    if (isSameDay(date, today)) return "Today";
    if (isSameDay(date, yesterday)) return "Yesterday";

    return date.toLocaleDateString(undefined, {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  useEffect(() => {
    const updateMsgs = async () => {
      getMessages(selectedUser?._id, setmsgLoading);
    };
    updateMsgs();
  }, [selectedUser]);
  useEffect(() => {
    if (bref?.current) {
      bref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="w-[75%] relative bg-[#1A1A1A] rounded-[15px] flex flex-col items-center p-4">
      {selectedUser ? (
        <>
          {/* Chat Header */}
          <div className="w-full mb-4 flex items-center gap-4 px-4">
            <div className="w-[45px] h-[45px] bg-gray-400 rounded-full">
              <img
                className="w-full h-full rounded-full object-cover"
                src={selectedUser.profileUrl}
              />
            </div>
            <h3 className="text-white font-play text-[35px] font-light">
              {selectedUser.name}
            </h3>
          </div>

          {/* Messages */}
          {msgLoading ? (
            <h1 className="font-mont text-white">Loading Message</h1>
          ) : (
            ""
          )}
          <div className="flex-1 w-full px-4 overflow-y-scroll flex flex-col gap-2">
            {messages?.map((group) => (
              <div key={group.date} className="mb-6">
                {/* Date header */}
                <div className="text-center text-gray-400 mb-4 font-mont font-medium">
                  {formatDateHeader(group.date)}
                </div>

                {/* Messages for this date */}
                {group.messages.map((item) => (
                  <Message
                    key={item._id}
                    msg={item}
                    self={item.senderId !== selectedUser._id} // true if message from self
                  />
                ))}
              </div>
            ))}
            <div ref={bref} className="bottom-view w-full h-[10px]"></div>
          </div>

          {/* Input Box */}
          <div className="h-[50px] w-[90%] rounded-[20px] bottom-0 left-0 bg-[#303030] flex items-center">
            <input
              type="text"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && msg.trim() !== "") {
                  sendMessage(msg, selectedUser._id);
                  setMsg("");
                }
              }}
              className="h-full w-full rounded-l-[20px] outline-none pl-4 px-2 font-mont text-white"
              placeholder="Write a message ..."
            />

            <div
              className="w-[40px] h-[40px] mx-5 flex justify-center items-center cursor-pointer"
              onClick={() => {
                sendMessage(msg, selectedUser._id);
                setMsg("");
              }}
            >
              <LuSendHorizontal size={20} className="text-white" />
            </div>
          </div>
        </>
      ) : (
        // Empty State
        <div className="flex-1 flex justify-center items-center text-gray-400 text-xl font-mont">
          Click on a user to start chatting
        </div>
      )}
    </div>
  );
}
