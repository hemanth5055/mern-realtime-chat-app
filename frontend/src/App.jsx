import React, { useContext } from "react";
import Sidebar from "./Components/Sidebar";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./Components/Home";
import Request from "./Components/Request";
import Findfriends from "./Components/Findfriends";
import Register from "./Components/Register";
import { userContext } from "./Context/user.context";
import PrivateRoute from "./Components/PrivateRoute";
import { useEffect } from "react";
import Loading from "./Components/Loading";

export default function App() {
  const location = useLocation();
  const { ToastContainer } = useContext(userContext);
  const hideSidebarOnRoutes = ["/auth"];
  const hideSidebar = hideSidebarOnRoutes.includes(location.pathname);
  const { user, checkAuth, loading } = useContext(userContext);
  const navigate = useNavigate();
  useEffect(() => {
    const runCheck = async () => {
      const isAuth = await checkAuth();
      if (isAuth) {
        navigate("/");
      }
    };
    runCheck();
  }, []);
  return (
    <div className="w-full h-screen bg-black relative p-5 flex gap-2">
      {loading ? <Loading></Loading> : ""}
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
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/auth" element={<Register />} />
        <Route
          path="/requests"
          element={
            <PrivateRoute>
              <Request />
            </PrivateRoute>
          }
        />
        <Route
          path="/findfriends"
          element={
            <PrivateRoute>
              <Findfriends />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}
