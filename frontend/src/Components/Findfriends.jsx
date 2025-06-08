import React from "react";
import RequestUser from "./RequestUser";
import Sendrequest from "./Sendrequest";

export default function Findfriends() {
  return (
    <div className="w-full p-4 px-[40px] flex flex-col  gap-4">
      <h3 className="font-play text-[50px] text-white">Find Friends</h3>
      <input
        type="text"
        className="h-[50px] rounded-[20px] outline-none w-[400px] font-mont bg-[#1A1A1A] text-white px-3"
        placeholder="search users.."
      />
      <div className="flex justify-start flex-wrap gap-5">
        <Sendrequest></Sendrequest>
        <Sendrequest></Sendrequest>
        <Sendrequest></Sendrequest>
        <Sendrequest></Sendrequest>
        <Sendrequest></Sendrequest>
        <Sendrequest></Sendrequest>
        <Sendrequest></Sendrequest>
      </div>
    </div>
  );
}
