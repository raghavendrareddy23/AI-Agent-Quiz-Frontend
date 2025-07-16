import { useState } from "react";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Signup() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(form);
      toast.success("Signup successful! Please login.");
      navigate("/login");
    } catch {
      toast.error("Signup failed, Password must be atleast 8 charecters");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-100 to-purple-100">
      <form
        onSubmit={handleSubmit}
        className="p-8 rounded-2xl shadow-lg bg-white w-full max-w-sm animate-fadeIn"
      >
        <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">
          Signup for AI Agent Quiz
        </h2>

        <div className="mb-4">
          <input
            name="username"
            onChange={handleChange}
            placeholder="Username"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>

        <div className="mb-4">
          <input
            name="email"
            type="email"
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>

        <div className="mb-6">
          <input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg font-medium text-white ${
            loading
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 transition"
          }`}
        >
          {loading ? (
            <div className="flex justify-center items-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              Signing up...
            </div>
          ) : (
            "Signup"
          )}
        </button>
      </form>
    </div>
  );
}

export default Signup;
