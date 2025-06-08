import React from "react";
import RequestUser from "./RequestUser";

export default function Request() {
  return (
    <div className="w-full p-4 px-[40px] flex flex-col  gap-4">
      <h3 className="font-play text-[50px] text-white">Requests</h3>
      <div className="w-fit flex flex-wrap justify-start gap-5">
        <RequestUser></RequestUser>
        <RequestUser></RequestUser>
        <RequestUser></RequestUser>
        <RequestUser></RequestUser>
        <RequestUser></RequestUser>
        <RequestUser></RequestUser>
        <RequestUser></RequestUser>
        <RequestUser></RequestUser>
      </div>
    </div>
  );
}
