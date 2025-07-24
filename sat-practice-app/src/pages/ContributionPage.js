import React from "react";
import { checkUser } from "../components/Auth/AuthService";
import { Navigate } from "react-router-dom";
import QuestionContributionForm from "../components/Main/QuestionContributionForm";

export default function ContributionPage() {
  if (!checkUser()) {
    return <Navigate to="/auth/login" replace />;
  }
  return (
    <div className="page-container">
      <h2>Contribute a New Question</h2>
      <QuestionContributionForm />
    </div>
  );
}
