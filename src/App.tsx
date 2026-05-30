// App.tsx
// Main app — sets up page routing

import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";

// Dashboard shown after successful login
function Dashboard() {
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("userName");

  // If no token found, send to login page
  if (!token || !name) {
    window.location.href = "/login";
    return null;
  }

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      background: "#2a9d8f",
      fontFamily: "'Segoe UI', sans-serif",
    }}>
      <div style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "48px 56px",
        width: "100%",
        maxWidth: "420px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
        textAlign: "center",
      }}>

        {/* Student name */}
        <h1 style={{
          fontSize: "22px",
          fontWeight: "600",
          color: "#1a5276",
          marginBottom: "8px",
        }}>
          Welcome, {name}!
        </h1>

        {/* Status message */}
        <p style={{
          fontSize: "14px",
          color: "#6b7280",
          marginBottom: "28px",
        }}>
          You are logged in successfully.
        </p>

        {/* Logout button */}
        <button
          onClick={() => {
            // Clear token and name then go to login
            localStorage.clear();
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;