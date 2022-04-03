import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Store } from "../Store";

const ProtectedRoute = ({ children }) => {
  const { state } = useContext(Store);
  const {
    user: { userInfo },
  } = state;

  return userInfo ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
