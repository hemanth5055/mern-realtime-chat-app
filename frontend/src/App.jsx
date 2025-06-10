import { useContext } from "react";
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

  const {
    user,
    setFriends,
    checkAuth,
    loading,
    handleSocketConnection,
    getFriends,
    setusersLoading,
    onlineUsers,
    friends,
  } = useContext(userContext);
  const navigate = useNavigate();

  // Check if device is mobile
  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    if (isMobile) return; // Skip auth check on mobile

    const runCheck = async () => {
      try {
        const authUser = await checkAuth();
        if (authUser) {
          await getFriends(setusersLoading);
          await handleSocketConnection(authUser._id);
          if (window.location.pathname !== "/") {
            navigate("/");
          }
        } else {
          navigate("/auth");
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        navigate("/auth");
      }
    };
    runCheck();
  }, []);

  useEffect(() => {
    if (friends && onlineUsers) {
      const updatedFriends = friends.map((friend) => ({
        ...friend,
        online: onlineUsers.includes(friend._id),
      }));
      setFriends(updatedFriends);
    }
  }, [onlineUsers]);

  // Don't render app UI on mobile
  if (isMobile) {
    return (
      <div className="w-full font-mont h-screen flex text-center items-center justify-center bg-black text-white text-xl">
        This app is not supported on mobile devices.
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-black relative p-5 flex gap-2">
      {loading ? <Loading /> : ""}
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
