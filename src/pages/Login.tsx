import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:8000/api/auth/login", {
        email,
        hashedPassword: password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Đăng nhập thất bại. Vui lòng thử lại."
      );
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* LEFT SIDE */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 w-full lg:w-[45%] bg-white dark:bg-background-dark">
        <div className="mx-auto w-full max-w-sm lg:w-[420px]">
          {/* Title */}
          <div className="flex flex-col gap-3">
            <h1 className="text-4xl font-black text-[#0e131b] dark:text-white">
              Chào mừng trở lại
            </h1>
            <p className="text-[#4e6d97] dark:text-gray-400">
              Vui lòng nhập thông tin của bạn để truy cập diễn đàn.
            </p>
          </div>

          {/* Social */}
          <div className="mt-10 grid grid-cols-2 gap-4">
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

          {/* Divider */}
          <div className="my-8 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#d0d9e7] dark:border-gray-700" />
            </div>
            <div className="relative flex justify-center text-sm font-medium">
              <span className="bg-white px-6 text-[#4e6d97] dark:bg-background-dark dark:text-gray-400">
                Hoặc đăng nhập bằng
              </span>
            </div>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="font-medium dark:text-white">
                Email hoặc tên đăng nhập
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-14 rounded-lg border border-[#d0d9e7] bg-slate-50 px-4 focus:border-primary dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                placeholder="email@example.com"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label className="font-medium dark:text-white">Mật khẩu</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-14 rounded-lg border border-[#d0d9e7] bg-slate-50 px-4 focus:border-primary dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                placeholder="Nhập mật khẩu"
              />
            </div>

            {/* Remember */}
            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 text-sm dark:text-gray-300">
                <input type="checkbox" />
                Ghi nhớ đăng nhập
              </label>
              <Link
                to="/forgot-password"
                className="text-sm font-bold text-primary"
              >
                Quên mật khẩu?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full h-12 rounded-lg bg-primary text-white font-bold hover:bg-primary/90 transition"
            >
              Đăng nhập
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-[#4e6d97] dark:text-gray-400">
            Chưa có tài khoản?
            <Link to="/register" className="ml-1 font-bold text-primary">
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>

      {/* RIGHT SIDE IMAGE */}
      <div className="relative hidden flex-1 lg:block bg-slate-50">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDDMz-joocKjs6923j1LE7U0hq-VolQbU2Stjs7oCX908kO7vSd5utNuf7eW2-fTngC9eFTqtaIMDZfMsEyRrB-7VRWe2f4GunnnWcN4xn0SkNfsdTk-a49B4W_w2jzBtHi0r5ZchI2MiXvFLDTta9vTmZJuXpi_ACZNwNoNzcRjBUHrzas1wzTPLf_k2sAi5mNiy89MCw1YjYQVYnCci0fHCQseBQSLVdhIp7yYXP01EoemqKwkxLYUz44S32q2FlP68zKimPNj0A")',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>
    </div>
  );
}

export default Login;
