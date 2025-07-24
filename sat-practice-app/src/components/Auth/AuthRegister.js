import React, { useEffect, useState } from "react";
import { checkUser, createUser } from "./AuthService";
import AuthForm from "./AuthForm";
import { useNavigate, Link } from "react-router-dom";

// UI and logic for user registration
// Calls createUser() from AuthService to register users in Parse
// Redirects authenticated users away from this page
// Shows link to login page if user already has an account

const AuthRegister = () => {
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const [triggerRegister, setTriggerRegister] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (checkUser()) {
      alert("You are already logged in.");
      navigate("/dashboard");
    }
  }, [navigate]);

  // Handle registration
  useEffect(() => {
    const register = async () => {
      try {
        const userCreated = await createUser(newUser);
        if (userCreated) {
          alert(`${userCreated.get("firstName")}, you successfully registered!`);
          navigate("/dashboard");
        }
      } catch (err) {
        console.error("Registration error:", err);
      } finally {
        setTriggerRegister(false);
      }
    };

    if (triggerRegister) register();
  }, [triggerRegister, newUser, navigate]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setTriggerRegister(true);
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <AuthForm
        user={newUser}
        isLogin={false} 
        onChange={onChangeHandler}
        onSubmit={onSubmitHandler}
      />
      <p style={{ textAlign: "center", marginTop: "10px" }}>
  Already have an account? <Link to="/auth/login">Login</Link>
</p>
    </div>
  );
};

export default AuthRegister;
