import React from "react";
import Sidebar from "./Components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";

export default function App() {
  return (
    <div className="w-full h-screen bg-black relative p-5 flex gap-2">
      <Sidebar></Sidebar>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
      </Routes>
    </div>
  );
}
