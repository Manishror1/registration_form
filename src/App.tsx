import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";

// Dashboard page — shown only after successful login
function Dashboard() {
  // Get token and name from localStorage
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("userName");

  // If token not found, user is not logged in — redirect to login
  if (!token || !name) {
    window.location.href = "/login";
    return null;
  }

  return (
    // Full screen teal background
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      background: "#2a9d8f",
      fontFamily: "'Segoe UI', sans-serif",
    }}>
      {/* White card in the center */}
      <div style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "48px 56px",
        width: "100%",
        maxWidth: "420px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
        textAlign: "center",
      }}>

        {/* Show student name from localStorage */}
        <h1 style={{
          fontSize: "22px",
          fontWeight: "600",
          color: "#1a5276",
          marginBottom: "8px",
        }}>
          Welcome, {name}!
        </h1>

        {/* Login success message */}
        <p style={{
          fontSize: "14px",
          color: "#6b7280",
          marginBottom: "28px",
        }}>
          You are logged in successfully.
        </p>

        {/* Logout button — clears token and redirects to login */}
        <button
          onClick={() => {
            // Remove JWT token and username from storage
            localStorage.clear();
            // Send user back to login page
            window.location.href = "/login";
          }}
          style={{
            padding: "12px 36px",
            background: "#1a5276",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontSize: "15px",
            fontWeight: "600",
            cursor: "pointer",
            letterSpacing: "0.5px",
          }}>
          Logout
        </button>
      </div>
    </div>
  );
}

// Main App component — defines all routes
function App() {
  return (
    // BrowserRouter enables navigation between pages
    <BrowserRouter>
      <Routes>
        {/* Default route goes to register page */}
        <Route path="/" element={<Navigate to="/register" />} />

        {/* Student registration page */}
        <Route path="/register" element={<Register />} />

        {/* Student login page */}
        <Route path="/login" element={<Login />} />

        {/* Protected dashboard — only accessible after login */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;