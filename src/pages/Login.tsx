import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  console.log(email, password);

  const handleSubmit = async (e: React.FormEvent) => {
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
    } catch (err: any) {
      console.log(err);
      setError(err.message || "Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <div className="flex flex-1 justify-center py-5">
          <div className="flex w-full max-w-6xl flex-col items-center justify-center lg:flex-row">
            <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-8">
              <div
                className="w-full max-w-md aspect-square bg-center bg-no-repeat bg-cover"
                data-alt="Abstract gradient of blue and purple shapes representing community and connection."
              ></div>
            </div>
            <div className="w-full max-w-md lg:w-1/2 p-4 sm:p-6 md:p-8">
              <div className="layout-content-container flex flex-col w-full">
                <div className="flex items-center gap-3 px-4 pb-4">
                  <span className="material-symbols-outlined text-primary text-4xl">
                    forum
                  </span>
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                    ForumClub
                  </h2>
                </div>
                <h1 className="text-[#111418] dark:text-white tracking-light text-[32px] font-bold leading-tight px-4 text-left pb-1 pt-6">
                  Chào mừng trở lại!
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-base font-normal leading-normal pb-3 pt-1 px-4">
                  Tham gia cộng đồng và kết nối với những người bạn.
                </p>
                <div className="flex px-4 py-3">
                  <div className="flex h-10 flex-1 items-center justify-center rounded-lg bg-slate-200 dark:bg-slate-800 p-1">
                    <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 has-[:checked]:bg-white has-[:checked]:dark:bg-slate-700 has-[:checked]:shadow-[0_0_4px_rgba(0,0,0,0.1)] has-[:checked]:text-[#111418] has-[:checked]:dark:text-white text-[#617589] dark:text-slate-400 text-sm font-medium leading-normal transition-colors">
                      <Link to="/login" className="truncate">
                        Đăng nhập
                      </Link>
                      <input
                        className="invisible w-0"
                        name="auth-toggle"
                        type="radio"
                        value="Đăng nhập"
                      />
                    </label>
                    <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 has-[:checked]:bg-white has-[:checked]:dark:bg-slate-700 has-[:checked]:shadow-[0_0_4px_rgba(0,0,0,0.1)] has-[:checked]:text-[#111418] has-[:checked]:dark:text-white text-[#617589] dark:text-slate-400 text-sm font-medium leading-normal transition-colors">
                      <span className="truncate">Đăng ký</span>
                      <input
                        className="invisible w-0"
                        name="auth-toggle"
                        type="radio"
                        value="Đăng ký"
                      />
                    </label>
                  </div>
                </div>
                <form onSubmit={handleSubmit}>
                  {error && (
                    <p className="text-red-500 text-center mb-3">{error}</p>
                  )}
                  <div className="flex w-full flex-col px-4 py-3">
                    <label className="flex flex-col w-full">
                      <p className="text-[#111418] dark:text-white text-base font-medium leading-normal pb-2">
                        Email hoặc Tên người dùng
                      </p>
                      <input
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbe0e6] dark:border-slate-700 bg-white dark:bg-slate-800 focus:border-primary h-14 placeholder:text-[#617589] p-[15px] text-base font-normal leading-normal"
                        placeholder="Nhập email hoặc tên người dùng"
                        type="text"
                        name="username_or_email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </label>
                  </div>

                  <div className="flex w-full flex-col px-4 py-3">
                    <label className="flex flex-col w-full">
                      <p className="text-[#111418] dark:text-white text-base font-medium leading-normal pb-2">
                        Mật khẩu
                      </p>
                      <div className="relative w-full">
                        <input
                          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbe0e6] dark:border-slate-700 bg-white dark:bg-slate-800 focus:border-primary h-14 placeholder:text-[#617589] p-[15px] pr-12 text-base font-normal leading-normal"
                          placeholder="Nhập mật khẩu của bạn"
                          type="password"
                          name="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary"
                          aria-label="Toggle password visibility"
                        >
                          <span
                            className="material-symbols-outlined"
                            data-icon="visibility"
                          >
                            visibility
                          </span>
                        </button>
                      </div>
                    </label>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        className="form-checkbox rounded border-slate-300 dark:border-slate-600 text-primary focus:ring-primary/50 bg-white dark:bg-slate-800"
                        type="checkbox"
                        name="remember_me"
                      />
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Ghi nhớ đăng nhập
                      </span>
                    </label>
                    <a
                      className="text-sm font-medium text-primary hover:underline"
                      href="/forgot-password"
                    >
                      Quên mật khẩu?
                    </a>
                  </div>

                  <div className="px-4 py-3 mt-4">
                    <button
                      type="submit"
                      className="flex h-14 w-full items-center justify-center rounded-lg bg-primary text-white text-base font-bold leading-normal shadow-md hover:bg-primary/90 transition-colors"
                    >
                      Đăng nhập
                    </button>
                  </div>
                </form>
                <div className="flex items-center gap-4 px-4 py-3">
                  <hr className="flex-grow border-t border-slate-200 dark:border-slate-700" />
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    Hoặc tiếp tục với
                  </span>
                  <hr className="flex-grow border-t border-slate-200 dark:border-slate-700" />
                </div>
                <div className="grid grid-cols-2 gap-4 px-4 py-3">
                  <button className="flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-medium leading-normal hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                    <img
                      alt="Google icon"
                      className="w-5 h-5"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJ4dKCo0jeG-RFe1PXfjmutHN5QSa5niwV93lDvJERufngcXuCrmwQaRQHElFzzH0znu7mO-9DzP7bsvcG7XTzNHD8VWQtibE4RaUGy7gQxWDR9Zoxjmfsg5UOilJrzF4z-K242IKxa2OkjSr4vDMRN0A2ibPkLzkt2sF_uSJUwzmaH2eyod9-dnnBjv5ck8hqcpNv5GD2wBXGU-gz46S5hOmJ4BqMeNEjUq2eTaa49sPlbSo2nU2yQeF9JRMIElvAUjidz6YWRzM"
                    />
                    <span>Google</span>
                  </button>
                  <button className="flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-medium leading-normal hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                    <img
                      alt="Facebook icon"
                      className="w-5 h-5"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFFqtoXerqWZrQSMUcBBFGtcwPo8iyWJrijKsOLXNX7dmPs92TCNEdnYM6xRM5VFWIkW2xnxNyJTIcdZh2Jmy0UQWUT9h1PjQJ4IJpfHa8Zfz5rTHy2vyUE-9hcCpu6Ahc6DM4GVQgRDhVynb9FNTyMc6f3e7_5TICpV9jHKHlzphXMb0MNFGOe9ilTkYj2Gah-oKoRp5H1UYJL6nKh0lXS1ueNYNdwf3oWBlNHm8fG-ziw3TUApSH87ys1zgC-69lsVwUD0VVZQ8"
                    />
                    <span>Facebook</span>
                  </button>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm font-normal leading-normal pt-6 px-4 text-center">
                  Bằng việc tiếp tục, bạn đồng ý với{" "}
                  <a
                    className="font-medium text-primary hover:underline"
                    href="#"
                  >
                    Điều khoản Dịch vụ
                  </a>{" "}
                  và{" "}
                  <a
                    className="font-medium text-primary hover:underline"
                    href="#"
                  >
                    Chính sách Bảo mật
                  </a>{" "}
                  của chúng tôi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
