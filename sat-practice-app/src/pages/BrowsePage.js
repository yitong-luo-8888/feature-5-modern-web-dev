import React from "react";
import { checkUser } from "../components/Auth/AuthService";
import { Navigate } from "react-router-dom";
import BrowseProblems from "../components/ProblemSet/BrowseProblems";

export default function BrowsePage() {
  if (!checkUser()) {
    // redirect if not authenticated
    return <Navigate to="/auth/login" replace />;
  }
  return (
    <div className="page-container">
      <h2>Browse Questions</h2>
      <BrowseProblems />
    </div>
  );
}
