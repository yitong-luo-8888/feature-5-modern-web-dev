// src/components/Main/MainList.js
import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { checkUser, logoutUser } from "../Auth/AuthService";
import { ProblemSetProvider } from "../../context/ProblemSetContext";

export default function MainList() {
  const navigate = useNavigate();

  // If not logged in, send to /auth/login
  useEffect(() => {
    if (!checkUser()) {
      navigate("/auth/login");
    }
  }, [navigate]);

  const handleLogout = async () => {
    await logoutUser();
    navigate("/auth/login");
  };

  return (
    <ProblemSetProvider>
      <div className="dashboard">
        <header>
          <h1>SAT Practice</h1>
          <nav style={{ margin: "16px 0" }}>
            <Link to="/browse"    style={{ marginRight: 8 }}>Browse Problems</Link>
            <Link to="/edit"      style={{ marginRight: 8 }}>Edit Challenge</Link>
            <Link to="/available">Available Challenges</Link>
          </nav>
          <button onClick={handleLogout}>Logout</button>
        </header>

        {/* this Outlet swaps in Browse, Edit, Available or TakeChallenge */}
        <main style={{ padding: 16 }}>
          <Outlet />
        </main>
      </div>
    </ProblemSetProvider>
  );
}
