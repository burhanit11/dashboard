import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useStore from "../store/useStore";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
  const login = useStore((s) => s.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!EMAIL_REGEX.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 500));
    login(email.trim());
    setLoading(false);
  };

  const handleBlur = (field) => {
    validate();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1C58F2] via-[#2563EB] to-[#1D4ED8] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <a href="/">
            <img
              src="https://bachecaa.vercel.app/image/logo.png"
              alt="Logo"
              className="w-48 mx-auto mb-4 hover:opacity-80 transition-opacity cursor-pointer"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <div style={{ display: 'none' }} className="text-white text-2xl font-bold mb-4">Perfect Match</div>
          </a>
          <p className="text-white/80 text-sm">Sign in to your account</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-[#2D3154] mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => handleBlur("email")}
                placeholder="Enter your email"
                className={`w-full px-4 py-3 rounded-xl border-2 transition-colors text-[#2D3154] placeholder:text-gray-400 ${
                  errors.email
                    ? "border-red-400 focus:border-red-500"
                    : "border-gray-100 focus:border-[#1C58F2]"
                } focus:outline-none`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#2D3154] mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => handleBlur("password")}
                  placeholder="Enter your password"
                  className={`w-full px-4 py-3 pr-12 rounded-xl border-2 transition-colors text-[#2D3154] placeholder:text-gray-400 ${
                    errors.password
                      ? "border-red-400 focus:border-red-500"
                      : "border-gray-100 focus:border-[#1C58F2]"
                  } focus:outline-none`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#1C58F2] hover:bg-[#2563EB] disabled:bg-gray-300 text-white font-bold rounded-xl transition-colors shadow-lg shadow-blue-500/30"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-6">
            Use your credentials to access the platform
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-white/60 text-xs mt-6">
          Don't have an account? Contact your administrator
        </p>
      </div>
    </div>
  );
}