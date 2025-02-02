import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "../Styles/Style.module.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

 
  const handleSignUp = (e) => {
    e.preventDefault();

  
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

   
    setError("");

    
    const users = JSON.parse(localStorage.getItem("users")) || [];

   
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      setError("This email is already registered");
      return;
    }

   
    const newUser = {
      name,
      email,
      password,
    };

   
    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    
    navigate("/Login");
  };

  return (
    <div className={` ${styles.logback}`}>
      <div className={`container ${styles.conlog}`}>
        <h2>Sign Up</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSignUp} style={{ margin: "50px 0px" }}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-dark mt-3">
              Sign Up
            </button>
          </div>
          <p>
            Already have an account? <Link to="/Login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
