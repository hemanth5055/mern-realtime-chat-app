import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { userContext } from "../Context/user.context";
import Loading from "./Loading";

export default function PrivateRoute({ children }) {
  const { user, loading } = useContext(userContext);
  if (loading) return <Loading></Loading>; // Optional loading UI
  if (!user) {
    return <Navigate to="/auth" />;
  }
  return children;
}
