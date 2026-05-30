// auth.ts
// Helper functions to call login and profile APIs

// Send email and password to server, get back JWT token
export async function loginUser(email: string, password: string) {
  const res = await fetch("http://localhost:5000/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

// Use JWT token to fetch protected profile data from server
export async function getProfile(token: string) {
  const res = await fetch("http://localhost:5000/api/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}