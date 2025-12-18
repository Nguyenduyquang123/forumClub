import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    try {
      await axios.post("http://localhost:8000/api/auth/register", {
        username,
        email,
        password,
        password_confirmation: confirmPassword,
      });

      navigate("/login");
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Đăng ký thất bại, vui lòng thử lại"
      );
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-50 dark:bg-[#111821] px-4">
      <div className="w-full max-w-[520px] bg-white dark:bg-[#1a222e] rounded-xl shadow border border-slate-200 dark:border-slate-700 p-6 md:p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">
            Đăng ký tài khoản
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Đã có tài khoản?{" "}
            <Link
              to="/login"
              className="text-primary font-medium hover:underline"
            >
              Đăng nhập
            </Link>
          </p>
        </div>

        {/* Error */}
        {error && (
          <p className="mb-4 text-sm text-red-500 text-center">{error}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Tên người dùng
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full h-12 px-4 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#111821] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none"
              placeholder="Nhập tên của bạn"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 px-4 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#111821] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none"
              placeholder="vidu@email.com"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Mật khẩu
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 px-4 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#111821] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none"
              placeholder="Nhập mật khẩu"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Xác nhận mật khẩu
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full h-12 px-4 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#111821] text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none"
              placeholder="Nhập lại mật khẩu"
              required
            />
          </div>

          {/* Terms */}
          <label className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <input type="checkbox" required />
            Tôi đồng ý với điều khoản sử dụng
          </label>

          {/* Submit */}
          <button
            type="submit"
            className="w-full h-12 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition shadow"
          >
            Đăng ký tài khoản
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <hr className="flex-grow border-slate-300 dark:border-slate-700" />
          <span className="text-sm text-slate-500">Hoặc</span>
          <hr className="flex-grow border-slate-300 dark:border-slate-700" />
        </div>

        {/* Social */}
        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 h-11 rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span className="text-sm font-semibold">Google</span>
          </button>
          <button className="flex items-center justify-center gap-2 h-11 rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition">
            <svg
              className="w-5 h-5 text-[#1877F2]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-semibold">Facebook</span>
          </button>
        </div>
      </div>
    </div>
  );
}
