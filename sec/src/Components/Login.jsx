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
    <>
      <div className={` ${styles.logback}`}>
        <div className={`container ${styles.conlog}`}>
          <h1>Welcome back!</h1>
          <h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              class="bi bi-box-arrow-in-right"
              viewBox="0 0 16 16"
              color="black"
            >
              <path
                fill-rule="evenodd"
                d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z"
              />
              <path
                fill-rule="evenodd"
                d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
              />
            </svg>
           {" "} Sign in
          </h2>
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
    </>
  );
};

export default Login;
