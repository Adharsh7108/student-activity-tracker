import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaUser, FaLock, FaExclamationCircle } from "react-icons/fa";

function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setError(""); // Clear error alerts immediately when the user starts re-typing
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Prevent unnecessary API hits if inputs are completely blank
    if (!form.username.trim() || !form.password) {
      setError("Please fill out all required fields.");
      return;
    }

    setLoading(true);
    try {
      // .trim() prevents broken authentication due to accidental trailing spaces
      await login(form.username.trim(), form.password);
    } catch (err) {
      console.error("Login failure:", err);
      setError("Invalid username or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 text-gray-900 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition duration-200";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#f8faff] to-[#eff5ff] px-4">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xl shadow-blue-900/5 w-full max-w-md p-8 transform transition-all">
        
        {/* BRAND IDENTITY */}
        <div className="mb-6">
          <h1 className="text-2xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            GoTeacher
          </h1>
          <p className="text-sm text-gray-400 font-medium mt-1">
            Welcome back! Please sign in to your workspace.
          </p>
        </div>

        {/* ERROR BOUNDARY DISPLAY */}
        {error && (
          <div className="mb-5 flex items-start gap-2.5 text-xs font-semibold text-red-600 bg-red-50 border border-red-100 rounded-xl p-3.5 animate-in fade-in zoom-in-95 duration-150">
            <FaExclamationCircle className="mt-0.5 shrink-0 text-red-500" size={13} />
            <span>{error}</span>
          </div>
        )}

        {/* LOGIN FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* USERNAME FIELD */}
          <div>
            <label className="block mb-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider">
              Username
            </label>
            <div className="relative">
              <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
              <input
                type="text"
                name="username"
                autoComplete="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Enter your system username"
                className={inputClass}
              />
            </div>
          </div>

          {/* PASSWORD FIELD */}
          <div>
            <label className="block mb-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={inputClass}
              />
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 font-bold rounded-xl text-sm px-5 py-3 shadow-md shadow-blue-500/10 transition active:scale-[0.99] disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-b-white rounded-full animate-spin" />
            ) : (
              "Sign In to Account"
            )}
          </button>
        </form>

        {/* NAVIGATION SWITCH */}
        <p className="text-xs text-gray-400 font-semibold text-center mt-6 pt-4 border-t border-gray-50">
          Don't have an instructor profile?{" "}
          <Link to="/register" className="text-blue-600 font-bold hover:text-blue-700 hover:underline transition">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;