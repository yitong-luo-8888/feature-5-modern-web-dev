import React, { useEffect, useState } from "react";
import { checkUser, loginUser } from "./AuthService";
import AuthForm from "./AuthForm";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const AuthLogin = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({
    email: "",
    password: ""
  });
  const [triggerLogin, setTriggerLogin] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (checkUser()) {
      alert("You are already logged in.");
      navigate("/dashboard");
    }
  }, [navigate]);

  // Handle login logic
  useEffect(() => {
    const tryLogin = async () => {
      try {
        const userLoggedIn = await loginUser(currentUser);
        if (userLoggedIn) {
          alert(`${userLoggedIn.get("firstName")}, you successfully logged in!`);
          navigate("/dashboard");
        }
      } catch (err) {
        console.error("Login error:", err);
      } finally {
        setTriggerLogin(false);
      }
    };

    if (triggerLogin) {
      tryLogin();
    }
  }, [triggerLogin, currentUser, navigate]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setCurrentUser((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setTriggerLogin(true);
  };

  return (
    <div className="auth-container">
    <h2>Login</h2>
    <AuthForm
      user={currentUser}
      isLogin={true}
      onChange={onChangeHandler}
      onSubmit={onSubmitHandler}
    />
    <p style={{ textAlign: "center", marginTop: "10px" }}>
      Don’t have an account? <Link to="/auth/register">Register here</Link>
    </p>
  </div>
  );
};

export default AuthLogin;
