import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "../Styles/Style.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // بيانات الـ admin
  const adminEmail = "admin@gmail.com";
  const adminPassword = "admin123";

  // التعامل مع عملية تسجيل الدخول
  const handleLogin = (e) => {
    e.preventDefault();

    // جلب المستخدمين من localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // التحقق إذا كان المستخدم هو admin
    if (email === adminEmail && password === adminPassword) {
      const adminToken = "admin-token"; // توكن خاص بالأدمن
      localStorage.setItem("adminToken", adminToken); // تخزين التوكن في localStorage
      localStorage.setItem("role", "admin"); // تحديد دور المستخدم كـ "admin"
      navigate("/AdminDashboard"); // إعادة توجيه إلى صفحة الأدمن
      return;
    }

    // التحقق إذا كان المستخدم العادي موجود
    const user = users.find((user) => user.email === email && user.password === password);

    if (user) {
      const userToken = "user-token"; // توكن خاص بالمستخدم العادي
      localStorage.setItem("userToken", userToken); // تخزين التوكن في localStorage
      localStorage.setItem("role", "user"); // تحديد دور المستخدم كـ "user"
      navigate("/Home"); // إعادة توجيه إلى الصفحة الرئيسية
    } else {
      setError("Invalid email or password"); // خطأ في حالة بيانات غير صحيحة
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
