import React, { useState } from "react";
import { api, setAuthToken } from "../api";

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.post("/login", form);
      setAuthToken(res.data.token);
      onLogin(res.data.token);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input name="email" placeholder="Email" onChange={handleChange} value={form.email} required type="email" />
      <input name="password" placeholder="Password" onChange={handleChange} value={form.password} required type="password" />
      <button type="submit">Login</button>
      <div>{message}</div>
    </form>
  );
}