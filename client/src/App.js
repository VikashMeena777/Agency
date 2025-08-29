import React, { useState } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import { setAuthToken } from "./api";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [page, setPage] = useState(token ? "profile" : "login");

  const handleLogin = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setAuthToken(newToken);
    setPage("profile");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setAuthToken("");
    setPage("login");
  };

  return (
    <div>
      <nav>
        <button onClick={() => setPage("register")}>Register</button>
        <button onClick={() => setPage("login")}>Login</button>
        {token && (
          <>
            <button onClick={() => setPage("profile")}>Profile</button>
            <button onClick={() => setPage("change-password")}>Change Password</button>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </nav>
      {page === "register" && <Register />}
      {page === "login" && <Login onLogin={handleLogin} />}
      {page === "profile" && token && <Profile token={token} />}
      {page === "change-password" && token && <ChangePassword token={token} />}
    </div>
  );
}

export default App;