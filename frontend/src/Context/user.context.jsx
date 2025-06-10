import { createContext, use, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import io from "socket.io-client";
import axios from "axios";
import { useRef } from "react";
import { useEffect } from "react";

export const userContext = createContext();

export const ContextProvider = ({ children }) => {
  const backend = import.meta.env.VITE_BACKEND;
  const [user, setUser] = useState(null);
  const [pendingRequests, setPendingRequests] = useState(null);
  const [friends, setFriends] = useState(null);
  const [loading, setLoading] = useState(false);
  const [socketState, setSocketState] = useState(null);
  const [selectedUser, setselectedUser] = useState(null);
  const [messages, setMessages] = useState(null);
  const [onlineUsers, setonlineUsers] = useState(null);
  const [usersLoading, setusersLoading] = useState(false);
  const selectedUserRef = useRef(selectedUser);

  // Update the ref whenever selectedUser changes
  useEffect(() => {
    selectedUserRef.current = selectedUser;
  }, [selectedUser]);

  const signup = async (
    name,
    email,
    username,
    password,
    profileImage,
    navigate
  ) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("profileImage", profileImage); // Assuming backend expects "profileImage"

      const res = await axios.post(`${backend}/auth/signup`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        setUser(res.data.user);
        toast.success("Signup Successfull");
        navigate("/");
      } else {
        toast.error(res.data.msg);
        console.error("Signup failed:", res.data.msg);
      }
    } catch (err) {
      console.error("Error during signup:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password, navigate) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${backend}/auth/login`,
        { username, password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        setUser(res.data.user);
        toast.success("Login successful");
        navigate("/");
      } else {
        toast.error(res.data.msg || "Login failed");
      }
    } catch (err) {
      toast.error(err.response?.data?.msg || "Login error");
      console.error("Error during login:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };
  const checkAuth = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${backend}/auth/check`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setUser(res.data.user);
        return res.data.user;
      } else {
        setUser(null);
        return null;
      }
    } catch (err) {
      setUser(null);
      console.error("Auth check failed:", err.response?.data || err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getFriends = async (setuusersLoading) => {
    setuusersLoading(true);
    try {
      const res = await axios.get(`${backend}/request/getFriends`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setFriends(res.data.friends);
      } else {
        console.error("Failed to get friends:", res.data.message);
        return [];
      }
    } catch (err) {
      console.error("Error fetching friends:", err);
    } finally {
      setuusersLoading(false);
    }
  };

  const getUsers = async (username, setterFunc) => {
    if (username.length == 0) {
      setterFunc(null);
      return;
    }
    try {
      const res = await axios.get(
        `${backend}/auth/userbyUsername?username=${username}`,
        {
          withCredentials: true,
        }
      );
      console.log(res);
      if (res.data.success) {
        setterFunc(res.data.users);
      } else {
        setterFunc([]);
        console.error("Failed to fetch users:", res.data.msg);
      }
    } catch (err) {
      // console.error("Error fetching users:", err);
      setterFunc([]);
    }
  };

  const getDebouncedUsers = (() => {
    let timer;
    return (fn, delay, username, setterFunc) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(username, setterFunc);
      }, delay);
    };
  })();

  const sendFriendRequest = async (receiverId) => {
    try {
      const res = await axios.post(
        `${backend}/request/sendRequest`,
        { receiverId },
        { withCredentials: true }
      );
      console.log(res);
      if (res.data.success) {
        toast.success("Friend request sent successfully!");
      } else {
        toast.error(`Failed to send request: ${res.data.msg}`);
      }
    } catch (error) {
      toast.error("Error sending friend request");
      console.error("Error sending friend request:", error);
    }
  };

  const getPendingRequests = async (setterFunc) => {
    try {
      const res = await axios.get(`${backend}/request/allRequestsGot`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setterFunc(res.data.requests); // or whatever key your API returns
      } else {
        toast.error("Failed to fetch pending requests.");
        setterFunc([]);
      }
    } catch (err) {
      console.error("Error fetching pending requests:", err);
      toast.error("Something went wrong while fetching requests.");
      setterFunc([]);
    }
  };

  const acceptRequest = async (requestId, setterFunc) => {
    try {
      const res = await axios.post(
        `${backend}/request/acceptRequest`,
        { requestId },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Friend request accepted.");
        setterFunc((prev) => prev.filter((req) => req._id !== requestId));
      } else {
        toast.error(res.data.msg || "Failed to accept request.");
      }
    } catch (err) {
      console.error("Error accepting request:", err);
      toast.error("Something went wrong while accepting request.");
    }
  };

  const removeRequest = async (requestId, setterFunc) => {
    try {
      const res = await axios.delete(`${backend}/request/removeRequest`, {
        data: { requestId },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success("Friend request removed.");
        setterFunc((prev) => prev.filter((req) => req._id !== requestId));
      } else {
        toast.error(res.data.msg || "Failed to remove request.");
      }
    } catch (err) {
      console.error("Error removing request:", err);
      toast.error("Something went wrong while removing request.");
    }
  };
  const logout = async (navigate) => {
    try {
      const res = await axios.get(`${backend}/auth/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success("Logged out successfully.");
        socketState.disconnect();
        setUser(null);
        navigate("/auth");
      } else {
        toast.error(res.data.msg || "Logout failed.");
      }
    } catch (err) {
      console.error("Logout error:", err);
      toast.error("Something went wrong during logout.");
    }
  };

  const sendMessage = async (msg, receiverId) => {
    if (!msg.trim()) return;

    try {
      const res = await axios.post(
        `${backend}/msg/send`,
        {
          msg,
          receiverId,
        },
        {
          withCredentials: true,
        }
      );

      const newMsg = res.data.message;
      const newMsgDate = newMsg.timestamp.split("T")[0]; // 'YYYY-MM-DD' from ISO string

      setMessages((prev) => {
        if (!prev || prev.length === 0) {
          // No messages yet, create initial group
          return [{ date: newMsgDate, messages: [newMsg] }];
        }

        // Try to find existing group for the message date
        const existingGroupIndex = prev.findIndex(
          (group) => group.date === newMsgDate
        );

        if (existingGroupIndex !== -1) {
          // Group found, append new message to that group
          const updatedGroup = {
            ...prev[existingGroupIndex],
            messages: [...prev[existingGroupIndex].messages, newMsg],
          };

          // Return new array with updated group
          return [
            ...prev.slice(0, existingGroupIndex),
            updatedGroup,
            ...prev.slice(existingGroupIndex + 1),
          ];
        } else {
          // No group for the date, add new group at the end
          return [...prev, { date: newMsgDate, messages: [newMsg] }];
        }
      });
      if (socketState?.connected) {
        socketState.emit("sendMessage", newMsg);
      } else {
        console.warn("Socket not connected. Cannot emit message.");
      }
      console.log("Message sent successfully");
    } catch (err) {
      console.error("Send message error:", err);
    }
  };

  const getMessages = async (receiverId, setmsgLoading) => {
    setmsgLoading(true);
    if (!receiverId) return;
    try {
      const res = await axios.post(
        `${backend}/msg/getMessages`,
        { receiverId },
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      if (res.data.success) {
        setMessages(res.data.groupedMessages || []);
      } else {
        console.error("Failed to fetch messages:", res.data.msg);
        setMessages([]); // optional: clear messages if fetch failed
      }
    } catch (err) {
      console.error("Error fetching messages:", err.message || err);
      setMessages([]); // fallback in case of error
    } finally {
      setmsgLoading(false);
    }
  };

  const handleSocketConnection = async (userId) => {
    const socket = io.connect(backend, { withCredentials: true });
    setSocketState(socket);
    socket.on("connect", () => {
      socket.emit("userConnected", userId, socket.id);
    });
    socket.on("getAllConnectedUsers", (onlineIds) => {
      console.log(onlineIds);
      setonlineUsers(onlineIds);
    });
    socket.on("singleUserConnected", (userId) => {
      console.log("Connected", userId);
      setonlineUsers((prev) => {
        if (!prev.includes(userId)) {
          return [...prev, userId];
        }
        return prev; // Don't add duplicates
      });
    });

    socket.on("singleUserDisconnected", (userId) => {
      console.log("Disconnected", userId);
      setonlineUsers((prev) => prev.filter((id) => id !== userId));
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });

    // Optional: Handle disconnects
    socket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
    });

    socket.on("messageRecieved", (newMsg) => {
      console.log(newMsg);
      // Only update messages if the message is from the selected user
      if (
        selectedUserRef.current &&
        selectedUserRef.current._id === newMsg.senderId
      ) {
        console.log("hello");
        const newMsgDate = newMsg.timestamp.split("T")[0];

        setMessages((prev) => {
          if (!prev || prev.length === 0) {
            return [{ date: newMsgDate, messages: [newMsg] }];
          }

          const existingGroupIndex = prev.findIndex(
            (group) => group.date === newMsgDate
          );

          if (existingGroupIndex !== -1) {
            const updatedGroup = {
              ...prev[existingGroupIndex],
              messages: [...prev[existingGroupIndex].messages, newMsg],
            };

            return [
              ...prev.slice(0, existingGroupIndex),
              updatedGroup,
              ...prev.slice(existingGroupIndex + 1),
            ];
          } else {
            return [...prev, { date: newMsgDate, messages: [newMsg] }];
          }
        });
      }
      toast(`${newMsg.senderName} : ${newMsg.message}`);
    });
  };
  return (
    <userContext.Provider
      value={{
        user,
        setUser,
        signup,
        loading,
        ToastContainer,
        login,
        checkAuth,
        getFriends,
        friends,
        getUsers,
        setFriends,
        getDebouncedUsers,
        sendFriendRequest,
        getPendingRequests,
        removeRequest,
        acceptRequest,
        pendingRequests,
        setPendingRequests,
        logout,
        selectedUser,
        setselectedUser,
        messages,
        onlineUsers,
        sendMessage,
        getMessages,
        socketState,
        setSocketState,
        handleSocketConnection,
        usersLoading,
        setusersLoading,
      }}
    >
      {children}
    </userContext.Provider>
  );
};
