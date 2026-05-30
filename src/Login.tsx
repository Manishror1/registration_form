import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function Login() {
  const navigate = useNavigate();

  // State for form fields
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // State for error message and loading spinner
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Basic validation — check fields are not empty
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      // Send email and password to backend login API
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      // Show error if login failed
      if (!response.ok) {
        setError(data.message || "Login failed.");
        return;
      }

      // Save JWT token and student name in localStorage for future use
      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", data.name);

      // Go to dashboard after successful login
      alert(`Welcome, ${data.name}!`);
      navigate("/dashboard");

    } catch (err) {
      // Show error if server is not running
      setError("Could not connect to server. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Full page background
    <div className="auth-container">

      {/* White login card */}
      <div className="auth-card">

        {/* Card header */}
        <div className="auth-header">
          <h1 className="auth-title">Student Login</h1>
          <p className="auth-subtitle">Sign in to your account</p>
        </div>

        {/* Login form */}
        <form onSubmit={handleSubmit} className="auth-form">

          {/* Email input field */}
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              className="form-input"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required />
          </div>

          {/* Password input field */}
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required />
          </div>

          {/* Show error message if login fails */}
          {error && <p className="auth-error">{error}</p>}

          {/* Submit button — shows loading text while waiting */}
          <button className="auth-btn" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Link to registration page */}
        <p className="auth-switch">
          Don't have an account?{" "}
          <span className="auth-link" onClick={() => navigate("/register")}>
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;