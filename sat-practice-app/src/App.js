// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import AuthModule from "./components/Auth/Auth";
import AuthLogin from "./components/Auth/AuthLogin";
import AuthRegister from "./components/Auth/AuthRegister";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import MainList from "./components/Main/MainList";

import BrowseProblems from "./components/ProblemSet/BrowseProblems";
import EditChallenge from "./components/ProblemSet/EditChallenge";
import AvailableChallenges from "./components/ProblemSet/AvailableChallenges";
import TakeChallenge from "./components/ProblemSet/TakeChallenge";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/auth" element={<AuthModule />} />
        <Route path="/auth/login" element={<AuthLogin />} />
        <Route path="/auth/register" element={<AuthRegister />} />

        {/* Protected */}
        <Route element={<ProtectedRoute />}>
          {/* MainList is your layout with header/nav + <Outlet/> */}
          <Route path="/" element={<MainList />}>
            {/* Default to “Available” or any one you like */}
            <Route index element={<Navigate to="available" replace />} />

            {/* Each feature gets its own page */}
            <Route path="browse"    element={<BrowseProblems />} />
            <Route path="edit"      element={<EditChallenge />} />
            <Route path="available" element={<AvailableChallenges />} />

            {/* NEW: the “take challenge” page */}
            <Route path="challenge/:id" element={<TakeChallenge />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
