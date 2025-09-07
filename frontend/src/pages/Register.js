import { useState } from "react";
import { register as registerApi } from "../api/auth";

export default function Register() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerApi(form);
      alert("Registered successfully");
      window.location.href = "/login";
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-6 shadow-lg rounded bg-white">
        <h2 className="text-xl font-bold mb-4">Register</h2>
        <input type="email" placeholder="Email" className="border p-2 w-full mb-2"
               value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password" className="border p-2 w-full mb-4"
               value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="bg-green-600 text-white px-4 py-2 rounded">Register</button>
      </form>
    </div>
  );
}
