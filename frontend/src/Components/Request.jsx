import React, { useContext, useEffect, useState } from "react";
import RequestUser from "./RequestUser";
import { userContext } from "../Context/user.context";

export default function Request() {
  const { getPendingRequests, pendingRequests, setPendingRequests } =
    useContext(userContext);
  useEffect(() => {
    const temp = async () => {
      await getPendingRequests(setPendingRequests);
    };
    temp();
  }, []);
  return (
    <div className="w-full p-4 px-[40px] flex flex-col  gap-4">
      <h3 className="font-play text-[50px] text-white">Requests</h3>
      <div className="w-fit flex flex-wrap justify-start gap-5"></div>
      {pendingRequests?.map((item, index) => (
        <RequestUser
          key={index}
          user={item.requestSender}
          requestId={item._id}
        ></RequestUser>
      ))}
    </div>
  );
}
