import { createContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

export const userContext = createContext();

export const ContextProvider = ({ children }) => {
  const backend = import.meta.env.VITE_BACKEND;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const signup = async (
    name,
    username,
    email,
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

  return (
    <userContext.Provider
      value={{ user, setUser, signup, loading, ToastContainer, login }}
    >
      {children}
    </userContext.Provider>
  );
};
