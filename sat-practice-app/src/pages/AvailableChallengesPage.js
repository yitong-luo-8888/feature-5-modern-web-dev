import React from "react";
import { checkUser } from "../components/Auth/AuthService";
import { Navigate } from "react-router-dom";
import AvailableChallenges from "../components/ProblemSet/AvailableChallenges";

export default function AvailableChallengesPage() {
  if (!checkUser()) {
    return <Navigate to="/auth/login" replace />;
  }
  return (
    <div className="page-container">
      <h2>Available Challenges</h2>
      <AvailableChallenges />
    </div>
  );
}
