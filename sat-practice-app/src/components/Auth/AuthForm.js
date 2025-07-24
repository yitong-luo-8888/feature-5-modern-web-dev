import React from "react";
// Reusable form component used for both login and registration
// Receives user object, change handlers, and submit function as props
// Dynamically renders form fields based on login/register mode

const AuthForm = ({ user, isLogin, onChange, onSubmit }) => {
  return (
    <form className="auth-form" onSubmit={onSubmit} autoComplete="off">
      {!isLogin && (
        <>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              value={user.firstName}
              onChange={onChange}
              name="firstName"
              placeholder="First name"
              required
            />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              value={user.lastName}
              onChange={onChange}
              name="lastName"
              placeholder="Last name"
              required
            />
          </div>
        </>
      )}

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          value={user.email}
          onChange={onChange}
          name="email"
          placeholder="Email"
          required
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          value={user.password}
          onChange={onChange}
          name="password"
          placeholder="Password"
          required
        />
      </div>

      <button type="submit" className="submit-button">
        {isLogin ? "Login" : "Register"}
      </button>
    </form>
  );
};

export default AuthForm;
