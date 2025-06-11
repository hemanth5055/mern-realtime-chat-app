import React, { useContext } from "react";
import { userContext } from "../Context/user.context";
import { LuUsers } from "react-icons/lu";

export default function Profile() {
  const { user, friends } = useContext(userContext);
  return (
    <div className="w-full h-full  flex justify-center items-center">
      <div className="flex gap-4 bg-[#222222] p-6 rounded-[15px] items-center">
        <div className="h-[150px] w-[150px] rounded-full">
          <img
            src={
              user.profileUrl == ""
                ? "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"
                : user.profileUrl
            }
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <h1 className="font-mont text-white text-[20px] font-medium">
            {user.name}
          </h1>
          <h4 className="font-mont text-gray-300 text-[15px] font-medium">
            @{user.username}
          </h4>
          <div className="flex mt-3 items-center" title="Friends">
            <div className="h-[30px] w-[30px] flex items-center justify-center ">
              <LuUsers className="text-gray-200" size={20} />
            </div>
            <h3 className="font-mont text-gray-300 text-[15px] font-medium">
              {friends?.length}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
