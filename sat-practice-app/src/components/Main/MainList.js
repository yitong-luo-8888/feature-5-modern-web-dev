// src/Components/Main/MainList.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../Auth/AuthService";
import Parse from "../../parse/ParseConfig";

export default function MainList() {
  const user = Parse.User.current();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/auth/login");
  };

  return (
    <div className="dashboard-container">
      <h2>Welcome, {user?.get("firstName") || user?.get("username")}!</h2>
      <p>Email: {user?.get("email")}</p>

      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
}
