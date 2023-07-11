import React from "react";
import { useAuth } from "../../Context/AuthContext";

const Logout = () => {
  const auth = useAuth();
  auth.setLogout();
  return <div className="d-flex justify-content-center align-items-center">Logging Out ...</div>;
};

export default Logout;
