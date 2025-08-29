import React, { useState } from "react";
import { api, setAuthToken } from "../api";

export default function ChangePassword({ token }) {
  const [form, setForm] = useState({ oldPassword: "", newPassword: "" });
  const [message, setMessage] = useState("");

  setAuthToken(token);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.put("/change-password", form);
      setMessage(res.data.message);
      setForm({ oldPassword: "", newPassword: "" });
    } catch (err) {
      setMessage(err.response?.data?.message || "Error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Change Password</h2>
      <input name="oldPassword" placeholder="Old Password" onChange={handleChange} value={form.oldPassword} required type="password" />
      <input name="newPassword" placeholder="New Password" onChange={handleChange} value={form.newPassword} required type="password" />
      <button type="submit">Change Password</button>
      <div>{message}</div>
    </form>
  );
}