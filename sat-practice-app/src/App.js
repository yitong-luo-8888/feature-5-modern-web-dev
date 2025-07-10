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

export default function App() {
  console.log("✅ App.js loaded");

  return (
    <Router>
      <Routes>
        {/* Auth pages */}
        <Route path="/auth" element={<AuthModule />} />
        <Route path="/auth/login" element={<AuthLogin />} />
        <Route path="/auth/register" element={<AuthRegister />} />

        {/* ✅ ProtectedRoute wrapper, with MainList nested */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MainList />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
