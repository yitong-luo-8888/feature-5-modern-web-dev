import React from "react";
import { checkUser } from "../components/Auth/AuthService";
import { Navigate } from "react-router-dom";
import EditChallenge from "../components/ProblemSet/EditChallenge";

export default function EditChallengePage() {
  if (!checkUser()) {
    return <Navigate to="/auth/login" replace />;
  }
  return (
    <div className="page-container">
      <h2>My Challenge</h2>
      <EditChallenge />
    </div>
  );
}
