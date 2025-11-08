import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8000/api/auth/register", {
        username,
        email,
        displayName,
        password,
        password_confirmation: confirmPassword,
      });
      navigate("/login");
    } catch (error) {
      console.error("Error registering:", error);
    }
  };
  console.log("Register Page Rendered");
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
                <div className="px-4 py-3">
                  <div className="flex h-10 flex-1 items-center justify-center rounded-lg bg-slate-200 dark:bg-slate-800 p-1">
                    <Link
                      className="tab-link flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 text-sm font-medium leading-normal transition-colors text-[#617589] dark:text-slate-400"
                      to="/login"
                    >
                      <span>Đăng nhập</span>
                    </Link>
                    <a
                      className="tab-link flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 text-sm font-medium leading-normal transition-colors text-[#617589] dark:text-slate-400"
                      href="#register-form-container"
                    >
                      <span>Đăng ký</span>
                    </a>
                  </div>
                </div>

                <div className="form-container" id="register-form-container">
                  <h1 className="text-[#111418] dark:text-white tracking-light text-[32px] font-bold leading-tight px-4 text-left pb-1 pt-6">
                    Tạo tài khoản mới
                  </h1>
                  <p className="text-slate-600 dark:text-slate-400 text-base font-normal leading-normal pb-3 pt-1 px-4">
                    Tham gia cộng đồng và kết nối với những người bạn.
                  </p>
                  <form onSubmit={handleSubmit}>
                    <div className="flex w-full flex-col px-4 py-3">
                      <label className="flex flex-col w-full">
                        <p className="text-[#111418] dark:text-white text-base font-medium leading-normal pb-2">
                          Tên người dùng
                        </p>
                        <input
                          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbe0e6] dark:border-slate-700 bg-white dark:bg-slate-800 focus:border-primary h-14 placeholder:text-[#617589] p-[15px] text-base font-normal leading-normal"
                          placeholder="Chọn một tên người dùng"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </label>
                    </div>
                    <div className="flex w-full flex-col px-4 py-3">
                      <label className="flex flex-col w-full">
                        <p className="text-[#111418] dark:text-white text-base font-medium leading-normal pb-2">
                          Email
                        </p>
                        <input
                          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbe0e6] dark:border-slate-700 bg-white dark:bg-slate-800 focus:border-primary h-14 placeholder:text-[#617589] p-[15px] text-base font-normal leading-normal"
                          placeholder="Nhập địa chỉ email của bạn"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </label>
                    </div>
                    <div className="flex w-full flex-col px-4 py-3">
                      <label className="flex flex-col w-full">
                        <p className="text-[#111418] dark:text-white text-base font-medium leading-normal pb-2">
                          Tên hiển thị (Nickname)
                        </p>
                        <input
                          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbe0e6] dark:border-slate-700 bg-white dark:bg-slate-800 focus:border-primary h-14 placeholder:text-[#617589] p-[15px] text-base font-normal leading-normal"
                          placeholder="Tên bạn muốn mọi người thấy"
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                        />
                      </label>
                    </div>
                    <div className="flex w-full flex-col px-4 py-3">
                      <label className="flex flex-col w-full">
                        <p className="text-[#111418] dark:text-white text-base font-medium leading-normal pb-2">
                          Mật khẩu
                        </p>
                        <input
                          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbe0e6] dark:border-slate-700 bg-white dark:bg-slate-800 focus:border-primary h-14 placeholder:text-[#617589] p-[15px] text-base font-normal leading-normal"
                          placeholder="Tạo một mật khẩu mạnh"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </label>
                    </div>
                    <div className="flex w-full flex-col px-4 py-3">
                      <label className="flex flex-col w-full">
                        <p className="text-[#111418] dark:text-white text-base font-medium leading-normal pb-2">
                          Nhập lại mật khẩu
                        </p>
                        <input
                          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbe0e6] dark:border-slate-700 bg-white dark:bg-slate-800 focus:border-primary h-14 placeholder:text-[#617589] p-[15px] text-base font-normal leading-normal"
                          placeholder="Xác nhận mật khẩu của bạn"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </label>
                    </div>
                    <div className="flex px-4 py-3">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          className="form-checkbox rounded border-slate-300 dark:border-slate-600 text-primary focus:ring-primary/50 bg-white dark:bg-slate-800"
                          type="checkbox"
                        />
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          Tôi đồng ý với{" "}
                          <a
                            className="font-medium text-primary hover:underline"
                            href="#"
                          >
                            Điều khoản Dịch vụ
                          </a>
                          .
                        </span>
                      </label>
                    </div>
                    <div className="px-4 py-3 mt-4">
                      <button
                        type="submit"
                        className="flex h-14 w-full items-center justify-center rounded-lg bg-primary text-white text-base font-bold leading-normal shadow-md hover:bg-primary/90 transition-colors"
                      >
                        Đăng ký
                      </button>
                    </div>
                  </form>
                </div>
                <div className="flex items-center gap-4 px-4 py-3">
                  <hr className="flex-grow border-t border-slate-200 dark:border-slate-700" />
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    Hoặc
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
                    <span>Tiếp tục với Google</span>
                  </button>
                  <button className="flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-medium leading-normal hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                    <img
                      alt="Facebook icon"
                      className="w-5 h-5"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFFqtoXerqWZrQSMUcBBFGtcwPo8iyWJrijKsOLXNX7dmPs92TCNEdnYM6xRM5VFWIkW2xnxNyJTIcdZh2Jmy0UQWUT9h1PjQJ4IJpfHa8Zfz5rTHy2vyUE-9hcCpu6Ahc6DM4GVQgRDhVynb9FNTyMc6f3e7_5TICpV9jHKHlzphXMb0MNFGOe9ilTkYj2Gah-oKoRp5H1UYJL6nKh0lXS1ueNYNdwf3oWBlNHm8fG-ziw3TUApSH87ys1zgC-69lsVwUD0VVZQ8"
                    />
                    <span>Tiếp tục với Facebook</span>
                  </button>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm font-normal leading-normal pt-6 px-4 text-center">
                  Bằng việc tiếp tục, bạn đồng ý với{" "}
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
export default Register;
