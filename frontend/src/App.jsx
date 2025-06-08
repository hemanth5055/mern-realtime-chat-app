import React, { useContext } from "react";
import Sidebar from "./Components/Sidebar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./Components/Home";
import Request from "./Components/Request";
import Findfriends from "./Components/Findfriends";
import Register from "./Components/Register";
import { userContext } from "./Context/user.context";

export default function App() {
  const location = useLocation();
  const { ToastContainer } = useContext(userContext);
  const hideSidebarOnRoutes = ["/auth"];
  const hideSidebar = hideSidebarOnRoutes.includes(location.pathname);

  return (
    <div className="w-full h-screen bg-black relative p-5 flex gap-2">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {!hideSidebar && <Sidebar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Register />} />
        <Route path="/requests" element={<Request />} />
        <Route path="/findfriends" element={<Findfriends />} />
      </Routes>
    </div>
  );
}
