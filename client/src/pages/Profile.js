import React, { useState, useEffect } from "react";
import { api, setAuthToken } from "../api";

export default function Profile({ token }) {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setAuthToken(token);
    api.get("/user").then(res => {
      setUser(res.data.user);
      setName(res.data.user.name);
    });
  }, [token]);

  const handleEdit = async e => {
    e.preventDefault();
    try {
      const res = await api.put("/edit", { name });
      setMessage(res.data.message);
      setUser({ ...user, name });
    } catch (err) {
      setMessage(err.response?.data?.message || "Error occurred");
    }
  };

  return user ? (
    <div>
      <h2>Profile</h2>
      <form onSubmit={handleEdit}>
        <input value={name} onChange={e => setName(e.target.value)} />
        <button type="submit">Edit Name</button>
      </form>
      <div>Email: {user.email}</div>
      <div>{message}</div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}