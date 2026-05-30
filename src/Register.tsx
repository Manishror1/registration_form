import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

interface RegisterForm {
  name: string;
  email: string;
  contact: string;
  gender: string;
  password: string;
  confirmPassword: string;
}

function Register() {
  const navigate = useNavigate();

  // Store all form field values in one state object
  const [form, setForm] = useState<RegisterForm>({
    name: "",
    email: "",
    contact: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Update whichever field changed
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Basic validation before sending to server
    if (!form.name || !form.email || !form.contact || !form.gender) {
      setError("Please fill in all fields.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      // Send registration data to backend
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          contact: form.contact,
          gender: form.gender,
          password: form.password,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Registration failed.");
        return;
      }

      // Go to login page after successful registration
      alert("Registration successful! Please log in.");
      navigate("/login");

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
          <h1 className="auth-title">Student Registration</h1>
          <p className="auth-subtitle">Create your school account</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input className="form-input" type="text" name="name"
              placeholder="Enter your full name" value={form.name}
              onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input className="form-input" type="email" name="email"
              placeholder="Enter your email" value={form.email}
              onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label className="form-label">Contact Number</label>
            <input className="form-input" type="tel" name="contact"
              placeholder="Enter your contact number" value={form.contact}
              onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label className="form-label">Gender</label>
            <select className="form-input" name="gender"
              value={form.gender} onChange={handleChange} required>
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input className="form-input" type="password" name="password"
              placeholder="Min 6 characters" value={form.password}
              onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input className="form-input" type="password" name="confirmPassword"
              placeholder="Repeat your password" value={form.confirmPassword}
              onChange={handleChange} required />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button className="auth-btn" type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?{" "}
          <span className="auth-link" onClick={() => navigate("/login")}>Login here</span>
        </p>
      </div>
    </div>
  );
}

export default Register;