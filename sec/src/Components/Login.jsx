import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CartContext } from "../ContextAPIS/CartContext"; 
import styles from "../Styles/Style.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setCart } = useContext(CartContext); 
  const navigate = useNavigate();

  const adminEmail = "admin@gmail.com";
  const adminPassword = "admin123";

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    
    if (email === adminEmail && password === adminPassword) {
      const adminToken = "admin-token";
      localStorage.setItem("adminToken", adminToken);
      localStorage.setItem("role", "admin");
      localStorage.setItem("username", "Admin");

      
      const savedCart = JSON.parse(localStorage.getItem('admin_cart')) || [];
      setCart(savedCart); 

      navigate("/AdminDashboard");
      return;
    }

   
    const user = users.find((user) => user.email === email && user.password === password);

    if (user) {
      const userToken = "user-token";
      localStorage.setItem("userToken", userToken);
      localStorage.setItem("role", "user");
      localStorage.setItem("username", user.name);
      localStorage.setItem("userEmail", user.email); 

      
      const savedCart = JSON.parse(localStorage.getItem(`cart_${user.email}`)) || [];
      setCart(savedCart); 

      navigate("/Home"); 
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className={` ${styles.logback}`}>
      <div className={`container ${styles.conlog}`}>
        <h1>Welcome back!</h1>
        <h2>Sign in</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleLogin} style={{ margin: "50px 0px" }}>
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
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-dark mt-3">
              Login
            </button>
          </div>
          <p>
            Don't have an account? <Link to="/SignUp">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
