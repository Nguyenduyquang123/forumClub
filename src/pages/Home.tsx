import { Link } from "react-router-dom";

import { useState } from "react";
import axios from "axios";
function Home() {
  const [inviteCode, setInviteCode] = useState("");
  const [message, setMessage] = useState("");
  const user = JSON.parse(localStorage.getItem("user")); // Lấy user từ localStorage (nếu bạn lưu khi login)

  const userId = user?.id;
  const handleJoin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/clubs/join", {
        invite_code: inviteCode,
        user_id: userId,
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Có lỗi xảy ra");
    }
  };
  console.log(message)

  return (
    <main className="flex-1 w-full container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
      <div className="flex flex-col gap-8 md:gap-12">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Bắt đầu hành trình của bạn
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300">
            Tạo không gian riêng cho đội nhóm, câu lạc bộ, hoặc tham gia vào các
            cộng đồng sẵn có.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-lg p-8 flex flex-col items-center text-center">
            <div className="bg-primary/10 text-primary rounded-full p-4">
              <span className="material-symbols-outlined text-4xl">
                add_circle
              </span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-6">
              Tạo Câu lạc bộ Mới
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 flex-1">
              Tự tay xây dựng một cộng đồng cho riêng bạn. Quản lý thành viên,
              tạo sự kiện, và thảo luận về những chủ đề bạn quan tâm.
            </p>
            <Link
              to={"/createClub"}
              className="mt-6 flex w-full sm:w-auto min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors"
            >
              Bắt đầu tạo
            </Link>
          </div>
          <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-lg p-8 flex flex-col items-center text-center">
            <div className="bg-primary/10 text-primary rounded-full p-4">
              <span className="material-symbols-outlined text-4xl">groups</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-6">
              Tham gia một Câu lạc bộ
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 flex-1">
              Kết nối với những người cùng sở thích. Sử dụng mã mời hoặc khám
              phá các câu lạc bộ công khai để tìm ngôi nhà mới của bạn.
            </p>
            <div className="mt-6 w-full flex flex-col gap-4">
              <form
                onSubmit={handleJoin}
                className="flex w-full items-center gap-2"
              >
                <input
                  type="text"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-slate-100 focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-transparent h-11 placeholder:text-slate-500 dark:placeholder:text-slate-400 px-4 text-base font-normal leading-normal"
                  placeholder="Nhập mã mời..."
                  onChange={(e) => setInviteCode(e.target.value)}
                />
                <button
                  type="submit"
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 px-4 bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 text-sm font-bold leading-normal tracking-[0.015em] hover:bg-slate-700 dark:hover:bg-slate-300 transition-colors"
                >
                  Tham gia
                </button>
              </form>
              <div className="relative flex items-center">
                <div className="flex-grow border-t border-slate-300 dark:border-slate-700"></div>
                <span className="flex-shrink mx-4 text-sm text-slate-500 dark:text-slate-400">
                  hoặc
                </span>
                <div className="flex-grow border-t border-slate-300 dark:border-slate-700"></div>
              </div>
              <div className="flex justify-center">
                <button className="flex w-full max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 px-4 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-sm font-bold leading-normal tracking-[0.015em] hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                  <span className="truncate">Xem các Câu lạc bộ Công khai</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 md:mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Tại sao nên tham gia ForumClub?
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-slate-600 dark:text-slate-300">
              Khám phá những lợi ích khi trở thành một phần của cộng đồng chúng
              tôi.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-card-light dark:bg-card-dark rounded-xl">
              <div className="bg-green-500/10 text-green-500 rounded-full p-3">
                <span className="material-symbols-outlined text-3xl">hub</span>
              </div>
              <h3 className="text-lg font-bold mt-4">Kết nối dễ dàng</h3>
              <p className="text-slate-500 dark:text-slate-400 mt-1">
                Tìm và tham gia các nhóm có cùng đam mê, sở thích, hoặc mục tiêu
                công việc.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-card-light dark:bg-card-dark rounded-xl">
              <div className="bg-blue-500/10 text-blue-500 rounded-full p-3">
                <span className="material-symbols-outlined text-3xl">
                  shield
                </span>
              </div>
              <h3 className="text-lg font-bold mt-4">Không gian riêng tư</h3>
              <p className="text-slate-500 dark:text-slate-400 mt-1">
                Tạo các câu lạc bộ kín chỉ dành cho thành viên được mời, đảm bảo
                an toàn và bảo mật.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-card-light dark:bg-card-dark rounded-xl">
              <div className="bg-purple-500/10 text-purple-500 rounded-full p-3">
                <span className="material-symbols-outlined text-3xl">
                  checklist
                </span>
              </div>
              <h3 className="text-lg font-bold mt-4">Quản lý hiệu quả</h3>
              <p className="text-slate-500 dark:text-slate-400 mt-1">
                Các công cụ quản lý thành viên, tổ chức sự kiện và thảo luận
                giúp vận hành câu lạc bộ trơn tru.
              </p>
            </div>
          </div>
        </div>
      </div>
      
    </main>
  );
}
export default Home;
