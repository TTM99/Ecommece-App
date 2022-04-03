import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Store } from "../Store";

const AdminRoute = ({ children }) => {
  const { state } = useContext(Store);
  const {
    user: { userInfo },
  } = state;

  return userInfo && userInfo.Admin ? children : <Navigate to="/signin" />;
};

export default AdminRoute;
