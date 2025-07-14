import React from 'react';
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "jobseeker" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/register", form);
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Register</h2>
      <form onSubmit={handleRegister}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="input mb-3" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="input mb-3" required />
        <input name="password" value={form.password} onChange={handleChange} type="password" placeholder="Password" className="input mb-3" required />
        <select name="role" value={form.role} onChange={handleChange} className="input mb-3">
          <option value="jobseeker">Job Seeker</option>
          <option value="employer">Employer</option>
        </select>
        <button type="submit" className="btn">Register</button>
      </form>
    </div>
  );
}

export default Register;