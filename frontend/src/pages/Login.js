import { useState, useContext } from "react";
import { login as loginApi } from "../api/auth";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginApi(email, password);
      login(res.token);
      window.location.href = "/dashboard";
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-6 shadow-lg rounded bg-white">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input type="email" placeholder="Email" className="border p-2 w-full mb-2"
               value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="border p-2 w-full mb-4"
               value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
      </form>
    </div>
  );
}
