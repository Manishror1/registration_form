import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

// Interface defines the shape of registration form data
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

  // State for error message and loading spinner
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Update whichever field changed using field name
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Check all fields are filled
    if (!form.name || !form.email || !form.contact || !form.gender) {
      setError("Please fill in all fields.");
      return;
    }

    // Check both passwords match
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Check password is at least 6 characters
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      // Send student details to backend register API
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

      // Show error if registration failed
      if (!response.ok) {
        setError(data.message || "Registration failed.");
        return;
      }

      // Go to login page after successful registration
      alert("Registration successful! Please log in.");
      navigate("/login");

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

      {/* White registration card */}
      <div className="auth-card">

        {/* Card header */}
        <div className="auth-header">
          <h1 className="auth-title">Student Registration</h1>
          <p className="auth-subtitle">Create your school account</p>
        </div>

        {/* Registration form */}
        <form onSubmit={handleSubmit} className="auth-form">

          {/* Full name input */}
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input className="form-input" type="text" name="name"
              placeholder="Enter your full name" value={form.name}
              onChange={handleChange} required />
          </div>

          {/* Email input */}
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input className="form-input" type="email" name="email"
              placeholder="Enter your email" value={form.email}
              onChange={handleChange} required />
          </div>

          {/* Contact number input */}
          <div className="form-group">
            <label className="form-label">Contact Number</label>
            <input className="form-input" type="tel" name="contact"
              placeholder="Enter your contact number" value={form.contact}
              onChange={handleChange} required />
          </div>

          {/* Gender dropdown */}
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

          {/* Password input */}
          <div className="form-group">
            <label className="form-label">Password</label>
            <input className="form-input" type="password" name="password"
              placeholder="Min 6 characters" value={form.password}
              onChange={handleChange} required />
          </div>

          {/* Confirm password input */}
          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input className="form-input" type="password" name="confirmPassword"
              placeholder="Repeat your password" value={form.confirmPassword}
              onChange={handleChange} required />
          </div>

          {/* Show error message if validation fails */}
          {error && <p className="auth-error">{error}</p>}

          {/* Submit button — shows loading text while waiting */}
          <button className="auth-btn" type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Link to login page */}
        <p className="auth-switch">
          Already have an account?{" "}
          <span className="auth-link" onClick={() => navigate("/login")}>
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;