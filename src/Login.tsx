import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      // Send credentials to backend
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Login failed.");
        return;
      }

      // Save JWT token and name in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", data.name);

      alert(`Welcome, ${data.name}!`);
      navigate("/dashboard");

    } catch (err) {
      setError("Could not connect to server. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          
          <h1 className="auth-title">Student Login</h1>
          <p className="auth-subtitle">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input className="form-input" type="email"
              placeholder="Enter your email" value={email}
              onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input className="form-input" type="password"
              placeholder="Enter your password" value={password}
              onChange={(e) => setPassword(e.target.value)} required />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button className="auth-btn" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account?{" "}
          <span className="auth-link" onClick={() => navigate("/register")}>Register here</span>
        </p>
      </div>
    </div>
  );
}

export default Login;