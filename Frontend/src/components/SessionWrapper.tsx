import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";

const SessionWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to={"/login"} />;
};

export default SessionWrapper;
