import React, { useContext } from "react";
import { userContext } from "../Context/user.context";

export default function User({ user }) {
  const { setselectedUser } = useContext(userContext);
  return (
    <div
      className="relative w-full rounded-[15px] shrink-0 flex bg-[#1A1A1A] hover:bg-[#303030] items-center py-[10px] pl-3 gap-4 cursor-pointer"
      onClick={() => {
        setselectedUser((prev) => {
          if (prev === user) {
            return null; // Deselect if clicking same user again
          }
          return user; // Select new user
        });
      }}
    >
      <div className="w-[50px] h-[50px] rounded-full bg-gray-600 relative">
        <img
          src={user.profileUrl}
          className="w-full h-full rounded-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="font-mont text-white text-[17px] font-medium">
          {user.name}
        </h2>
        <h4 className="font-mont text-[#BFBFBF] text-[10px] font-medium">
          @{user.username}
        </h4>
      </div>
      {user.online ? (
        <div className="absolute w-[12px] h-[12px] bg-[#1dce20] rounded-full  right-5"></div>
      ) : (
        <div className="absolute w-[12px] h-[12px] bg-[#333433] rounded-full  right-5"></div>
      )}
    </div>
  );
}
