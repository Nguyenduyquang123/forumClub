import { Link } from "react-router-dom";
import CategoryList from "../CategoryList";
import { Button } from "../ui/button";
import avatar from "../../assets/images/avata.jpg";
import { useEffect, useState } from "react";
import UserMenu from "../UserMenu";
import axios from "axios";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOpenmenu, setIsOpenmenu] = useState(false);
  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("http://localhost:8000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data.user);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // 1. Dùng useState để theo dõi trạng thái hiển thị của dropdown

  // 2. Hàm xử lý khi click vào nút chuông
  const toggleDropdown = () => {
    setIsOpenmenu(!isOpenmenu);
  };

  if (loading) return <nav className="p-4">Loading...</nav>;

  return (
    <header className="sticky top-0 z-20 w-full border-b border-slate-200 dark:border-slate-800 bg-card-light dark:bg-card-dark/80 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center gap-8">
          <a
            className="flex items-center gap-3 text-slate-900 dark:text-white"
            href="#"
          >
            <div className="size-8 text-primary">
              <svg
                fill="none"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <h2 className=" sm:block text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-[-0.015em]">
              ForumClub
            </h2>
          </a>
          <nav className=" md:flex items-center gap-4">
            <CategoryList />
          </nav>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <label className="hidden md:flex flex-col min-w-40 !h-10 max-w-64">
            <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
              <div className="text-slate-500 dark:text-slate-400 flex bg-slate-100 dark:bg-slate-800 items-center justify-center pl-3 rounded-l-lg border-r-0">
                <span className="material-symbols-outlined text-xl">
                  search
                </span>
              </div>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-slate-100 focus:outline-0 focus:ring-0 border-none bg-slate-100 dark:bg-slate-800 focus:border-none h-full placeholder:text-slate-500 dark:placeholder:text-slate-400 px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                placeholder="Tìm kiếm..."
                value=""
              />
            </div>
          </label>
          <button className="md:hidden flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-transparent text-slate-800 dark:text-slate-200 gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined text-xl">search</span>
          </button>
          {!user ? (
            <div className="hidden sm:flex items-center gap-2">
              <Button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-sm font-bold leading-normal tracking-[0.015em] hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                <Link className="truncate" to="/login">
                  Đăng nhập
                </Link>
              </Button>
              <Button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors">
                <Link className="truncate" to="/register">
                  Đăng ký
                </Link>
              </Button>
            </div>
          ) : (
            <div className="flex flex-1 justify-end gap-2 sm:gap-4">
              <div className="inline-block text-left">
                {/* --- BUTTON CHUÔNG (TRIGGER) --- */}
                <Button
                  className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  // Gắn sự kiện click
                  onClick={toggleDropdown}
                >
                  <span className="material-symbols-outlined text-xl">
                    notifications
                  </span>
                </Button>

                {/* --- DROPDOWN THÔNG BÁO --- */}
                {/* 4. Điều kiện hiển thị: Chỉ hiển thị khi isOpen là true */}
                {isOpenmenu && (
                  <div className="absolute top-15 right-4 sm:right-8 mt-2 w-full max-w-sm origin-top-right rounded-xl bg-white dark:bg-gray-800 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                          Thông báo
                        </h2>
                        <button className="text-sm font-medium text-primary hover:underline">
                          Đánh dấu đã đọc tất cả
                        </button>
                      </div>

                      <div className="flex flex-col py-2 max-h-96 overflow-y-auto">
                        <div className="flex items-start gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer relative bg-primary/10 dark:bg-primary/20">
                          <div className="absolute left-1 top-1/2 -translate-y-1/2 h-3 w-1.5 bg-primary rounded-full"></div>
                          <div className="flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-500 dark:text-blue-400 shrink-0 size-10">
                            <span className="material-symbols-outlined">
                              chat
                            </span>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-800 dark:text-gray-200">
                              <span className="font-bold">Anh Tuấn</span> đã
                              bình luận trong chủ đề "Kế hoạch dã ngoại cuối
                              tuần".
                            </p>
                            <p className="text-xs text-primary font-semibold mt-1">
                              5 phút trước
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer relative bg-primary/10 dark:bg-primary/20">
                          <div className="absolute left-1 top-1/2 -translate-y-1/2 h-3 w-1.5 bg-primary rounded-full"></div>
                          <div className="flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50 text-green-500 dark:text-green-400 shrink-0 size-10">
                            <span className="material-symbols-outlined">
                              person_add
                            </span>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-800 dark:text-gray-200">
                              <span className="font-bold">Lan Chi</span> đã gửi
                              cho bạn một lời mời kết bạn.
                            </p>
                            <p className="text-xs text-primary font-semibold mt-1">
                              1 giờ trước
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer relative bg-primary/10 dark:bg-primary/20">
                          <div className="absolute left-1 top-1/2 -translate-y-1/2 h-3 w-1.5 bg-primary rounded-full"></div>
                          <div className="flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-500 dark:text-purple-400 shrink-0 size-10">
                            <span className="material-symbols-outlined">
                              groups
                            </span>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-800 dark:text-gray-200">
                              Bạn có một lời mời tham gia câu lạc bộ{" "}
                              <span className="font-bold">
                                "Yêu Sách Hà Nội"
                              </span>
                              .
                            </p>
                            <p className="text-xs text-primary font-semibold mt-1">
                              Hôm qua
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer">
                          <div className="flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 shrink-0 size-10">
                            <span className="material-symbols-outlined">
                              event_available
                            </span>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Sự kiện{" "}
                              <span className="font-semibold text-gray-800 dark:text-gray-200">
                                "Gặp mặt cuối năm"
                              </span>{" "}
                              sắp diễn ra.
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              2 ngày trước
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer">
                          <div className="flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 shrink-0 size-10">
                            <span className="material-symbols-outlined">
                              thumb_up
                            </span>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              <span className="font-semibold text-gray-800 dark:text-gray-200">
                                Minh Quang
                              </span>{" "}
                              đã thích bài viết của bạn.
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              3 ngày trước
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 dark:border-gray-700">
                        <a
                          className="block w-full text-center py-3 text-sm font-bold text-primary hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-b-xl"
                          href="#"
                        >
                          Xem tất cả thông báo
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <Button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                <span className="material-symbols-outlined text-xl">
                  chat_bubble
                </span>
              </Button>
              <Link to="/userClubs">
                <Button variant="outline">Quản lý CLB</Button>
              </Link>
              <div
                className="relative w-full bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 "
                data-alt="User avatar"
                onMouseEnter={handleMouseEnter} // Bắt sự kiện di chuột vào
                onMouseLeave={handleMouseLeave} // Bắt sự kiện di chuột ra
              >
                <img
                  src={user?.avatarUrl}
                  alt="ảnh "
                  className="rounded-full h-full w-full object-cover"
                />
                {isOpen && <UserMenu />}
              </div>
            </div>
          )}

          <button className="sm:hidden flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-transparent text-slate-800 dark:text-slate-200 gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
