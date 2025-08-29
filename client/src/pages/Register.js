import React, { useState } from "react";
import { api } from "../api";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.post("/register", form);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input name="name" placeholder="Name" onChange={handleChange} value={form.name} required />
      <input name="email" placeholder="Email" onChange={handleChange} value={form.email} required type="email" />
      <input name="password" placeholder="Password" onChange={handleChange} value={form.password} required type="password" />
      <button type="submit">Register</button>
      <div>{message}</div>
    </form>
  );
}