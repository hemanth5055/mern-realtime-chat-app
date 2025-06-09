import React, { useContext, useEffect, useState } from "react";
import User from "./User";
import { userContext } from "../Context/user.context";
import Chatarea from "./Chatarea";

export default function Home() {
  const { getFriends, friends } = useContext(userContext);
  const [usersLoading, setusersLoading] = useState(false);
  useEffect(() => {
    const fetchFriends = async () => {
      await getFriends(setusersLoading);
    };
    fetchFriends();
  }, []);

  return (
    <div className="w-full h-full flex">
      {/* Show Users */}
      <div className="w-[25%] flex flex-col p-2 gap-3 overflow-y-scroll">
        {usersLoading ? (
          <h1 className="font-mont text-white">Loading..</h1>
        ) : (
          ""
        )}
        {friends?.map((item, index) => (
          <User key={index} user={item}></User>
        ))}
        {!usersLoading && friends && friends.length == 0 ? (
          <h1 className="font-mont text-white">Make friends to chat ..</h1>
        ) : (
          ""
        )}
      </div>

      {/* Chat Area */}
      <Chatarea></Chatarea>
    </div>
  );
}
