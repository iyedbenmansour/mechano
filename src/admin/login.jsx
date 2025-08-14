import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, User, Lock } from "lucide-react"; // Import icons

export default function Login() {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Static check for hardcoded credentials
    if (userid === "ramilafi" && password === "Aezakmi123") {
      sessionStorage.setItem("admin", "true");
      setError("");
      alert("Login successful!");
      navigate("/admin"); // Redirect to a protected route
    } else {
      setError("Invalid userid or password");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-sm border border-gray-700">
        <div className="flex flex-col items-center mb-8">
          <LogIn size={48} className="text-yellow-500 mb-2" />
          <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
            Admin Login
          </h2>
        </div>

        {error && (
          <div className="bg-red-600 text-white p-3 rounded-xl mb-6 text-center font-semibold transition-all duration-300">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="userid"
              className="block mb-2 text-gray-400 font-medium"
            >
              User ID
            </label>
            <div className="relative">
              <User
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                type="text"
                id="userid"
                value={userid}
                onChange={(e) => setUserid(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-500 transition"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-gray-400 font-medium"
            >
              Password
            </label>
            <div className="relative">
              <Lock
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-500 transition"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 p-3 rounded-xl font-bold transition-transform duration-200 ease-in-out hover:scale-105 bg-gradient-to-r from-red-500 to-yellow-500 text-gray-900 shadow-lg"
          >
            <LogIn size={20} />
            Login
          </button>
        </form>
      </div>
    </div>
  );
}   