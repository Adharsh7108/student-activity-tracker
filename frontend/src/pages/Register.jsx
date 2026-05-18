import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaUserPlus, FaLock, FaExclamationCircle, FaUserCheck, FaEnvelope } from "react-icons/fa";

function Register() {
  const { register } = useAuth();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setError("");
    const { name, value } = e.target;

    if (name === "username") {
      const sanitizedValue = value.replace(/[^a-zA-Z0-9_]/g, "");
      setForm((prev) => ({ ...prev, [name]: sanitizedValue }));
      return;
    }

    if (name === "email") {
      const sanitizedValue = value.replace(/[^a-zA-Z0-9.@+\-_]/g, "");
      setForm((prev) => ({ ...prev, [name]: sanitizedValue }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const normalizedUsername = form.username.trim();
    const normalizedEmail = form.email.trim();

    if (!normalizedUsername || !normalizedEmail || !form.password) {
      setError("All fields are required to register your account.");
      return;
    }

    if (form.password.length < 6) {
      setError("For security, your password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    try {
      await register(normalizedUsername, normalizedEmail, form.password);
    } catch (err) {
      console.error("Registration error:", err);
      
      if (err?.response?.status === 422 && Array.isArray(err.response.data?.detail)) {
        const firstError = err.response.data.detail[0];
        const fieldName = firstError.loc[1] || "input";
        setError(`${firstError.msg} (${fieldName})`);
      } else {
        setError(err?.response?.data?.detail || "Registration failed. Username or Email might be taken.");
      }
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 text-gray-900 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition duration-200";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#f8faff] to-[#eff5ff] px-4">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xl shadow-blue-900/5 w-full max-w-md p-8 transform transition-all">
        
        <div className="mb-6">
          <h1 className="text-2xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            GoTeacher
          </h1>
          <p className="text-sm text-gray-400 font-medium mt-1">
            Create an instructor account to manage student tasks.
          </p>
        </div>

        {error && (
          <div className="mb-5 flex items-start gap-2.5 text-xs font-semibold text-red-600 bg-red-50 border border-red-100 rounded-xl p-3.5 animate-in fade-in zoom-in-95 duration-150">
            <FaExclamationCircle className="mt-0.5 shrink-0 text-red-500" size={13} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider">
              Choose Username
            </label>
            <div className="relative">
              <FaUserCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
              <input
                type="text"
                name="username"
                autoComplete="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Only letters, numbers, underscores"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="block mb-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
              <input
                type="email"
                name="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                placeholder="teacher@school.com"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="block mb-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider">
              Create Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
              <input
                type="password"
                name="password"
                autoComplete="new-password"
                value={form.password}
                onChange={handleChange}
                placeholder="Minimum 6 characters"
                className={inputClass}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 font-bold rounded-xl text-sm px-5 py-3 shadow-md shadow-blue-500/10 transition active:scale-[0.99] disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-b-white rounded-full animate-spin" />
            ) : (
              <>
                <FaUserPlus size={14} /> Get Started Free
              </>
            )}
          </button>
        </form>

        <p className="text-xs text-gray-400 font-semibold text-center mt-6 pt-4 border-t border-gray-50">
          Already have an active profile?{" "}
          <Link to="/login" className="text-blue-600 font-bold hover:text-blue-700 hover:underline transition">
            Sign In here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;