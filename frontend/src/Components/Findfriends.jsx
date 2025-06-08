import React, { useState } from "react";
import RequestUser from "./RequestUser";
import Sendrequest from "./Sendrequest";
import { useContext } from "react";
import { userContext } from "../Context/user.context";

export default function Findfriends() {
  const [usersFromDb, setusersFromDb] = useState(null);
  const { getUsers, getDebouncedUsers } = useContext(userContext);
  return (
    <div className="w-full p-4 px-[40px] flex flex-col  gap-4">
      <h3 className="font-play text-[50px] text-white">Find Friends</h3>
      <input
        type="text"
        onChange={(e) =>
          getDebouncedUsers(getUsers, 300, e.target.value, setusersFromDb)
        }
        className="h-[50px] rounded-[20px] outline-none w-[400px] font-mont bg-[#1A1A1A] text-white px-3"
        placeholder="search users.."
      />
      <div className="flex justify-start flex-wrap gap-5">
        {usersFromDb && usersFromDb.length == 0 ? (
          <h1 className="text-red-400 font-mont">No users found</h1>
        ) : (
          ""
        )}
        {usersFromDb?.map((item, index) => (
          <Sendrequest key={index} user={item}></Sendrequest>
        ))}
      </div>
    </div>
  );
}
