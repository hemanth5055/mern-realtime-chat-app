import React, { useContext } from "react";
import { LuPlus } from "react-icons/lu";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { userContext } from "../Context/user.context";
import { MdAccessTime } from "react-icons/md";


export default function Sendrequest({ user }) {
  const { sendFriendRequest } = useContext(userContext);
  return (
    <div className=" w-[300px] rounded-[15px]  shrink-0 flex justify-around bg-[#1A1A1A] items-center py-[10px] pl-3 gap-2">
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
        <h4 className="font-mont text-[#BFBFBF] text-[11px]">
          @{user.username}
        </h4>
      </div>
      <div className="flex items-center gap-3">
        {(() => {
          switch (user.status) {
            case "pending":
              return (
                <div
                  title="Request Pending"
                  className="bg-yellow-600 w-[40px] h-[40px] rounded-full flex justify-center items-center cursor-not-allowed"
                >
                  <MdAccessTime className="text-white" size={25} />
                </div>
              );

            case "accepted":
              return (
                <div
                  title="Already Friends"
                  className="bg-green-600 w-[40px] h-[40px] rounded-full flex justify-center items-center cursor-default"
                >
                  <LiaUserFriendsSolid className="text-white" size={25} />
                </div>
              );

            case "rejected":
            case null:
              return (
                <div
                  title="Send Friend Request"
                  className="bg-[#2F2F2F] w-[40px] h-[40px] rounded-full flex justify-center items-center cursor-pointer"
                  onClick={() => sendFriendRequest(user._id)}
                >
                  <LuPlus className="text-white" size={25} />
                </div>
              );

            default:
              return null;
          }
        })()}
      </div>
    </div>
  );
}
