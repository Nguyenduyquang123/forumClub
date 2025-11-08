import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MyProfile() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
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
  useEffect(() => {
    if (user) {
      console.log("Dữ liệu user đã được cập nhật và re-render:", user.id);
    }
  }, [user]);

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <div className="flex flex-1 justify-center p-4 sm:p-6 lg:p-8">
          <div className="layout-content-container flex w-full max-w-6xl flex-col gap-6 lg:flex-row lg:gap-8">
            <aside className="w-full lg:w-64 flex-shrink-0">
              <div className="sticky top-8 flex flex-col gap-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4">
                <div className="flex gap-3 items-center">
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                    data-alt="User avatar image" // style
                    style={{
                      backgroundImage: `url("${user?.avatarUrl}")`,
                    }}
                  ></div>
                  <div className="flex flex-col">
                    <h1 className="text-neutral-800 dark:text-neutral-100 text-base font-bold leading-normal">
                      {user?.displayName}
                    </h1>
                    <p className="text-neutral-600 dark:text-neutral-200 text-sm font-normal leading-normal">
                      @{user?.username}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <a
                    className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary"
                    href="#"
                  >
                    <span className="material-symbols-outlined text-2xl">
                      grid_view
                    </span>
                    <p className="text-sm font-bold leading-normal">
                      Tổng quan
                    </p>
                  </a>
                  <a
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    href="#"
                  >
                    <span className="material-symbols-outlined text-2xl">
                      article
                    </span>
                    <p className="text-sm font-medium leading-normal">
                      Bài viết của tôi
                    </p>
                  </a>
                  <a
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    href="#"
                  >
                    <span className="material-symbols-outlined text-2xl">
                      settings
                    </span>
                    <p className="text-sm font-medium leading-normal">
                      Cài đặt tài khoản
                    </p>
                  </a>
                  <a
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    href="#"
                  >
                    <span className="material-symbols-outlined text-2xl">
                      notifications
                    </span>
                    <p className="text-sm font-medium leading-normal">
                      Thông báo
                    </p>
                  </a>
                </div>
                <hr className="border-neutral-200 dark:border-neutral-800" />
                <div className="flex flex-col gap-1">
                  <a
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    href="#"
                  >
                    <span className="material-symbols-outlined text-2xl">
                      logout
                    </span>
                    <p className="text-sm font-medium leading-normal">
                      Đăng xuất
                    </p>
                  </a>
                </div>
              </div>
            </aside>

            <main className="flex flex-1 flex-col gap-6">
              <div className="flex flex-col gap-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 sm:p-6">
                <div className="flex w-full flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div
                      className="bg-center bg-no-repeat aspect-square bg-cover rounded-full flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32"
                      data-alt="User avatar image" //style
                      style={{
                        backgroundImage: `url("${user?.avatarUrl}")`,
                      }}
                    ></div>
                    <div className="flex flex-col justify-center gap-1">
                      <p className="text-neutral-800 dark:text-neutral-100 text-2xl sm:text-3xl font-bold leading-tight">
                        {user?.displayName}
                      </p>
                      <p className="text-neutral-600 dark:text-neutral-200 text-base font-normal leading-normal">
                        {user?.email}
                      </p>
                      <p className="text-neutral-600 dark:text-neutral-200 text-sm font-normal leading-normal">
                        Tham gia vào{" "}
                        {new Date(user?.created_at).toLocaleDateString("vi-VN")}
                      </p>
                    </div>
                  </div>
                  <Link to="/my-profile/edit-profile">
                    <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] w-full sm:w-auto">
                      <span className="truncate">Chỉnh sửa hồ sơ</span>
                    </button>
                  </Link>
                </div>
                <div className="flex flex-wrap gap-3">
                  <div className="flex min-w-[120px] flex-1 basis-[fit-content] flex-col gap-1 rounded-lg border border-neutral-200 dark:border-neutral-800 p-3 items-start">
                    <p className="text-neutral-800 dark:text-neutral-100 tracking-light text-2xl font-bold leading-tight">
                      128
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-neutral-600 dark:text-neutral-200 text-sm font-normal leading-normal">
                        Bài viết
                      </p>
                    </div>
                  </div>
                  <div className="flex min-w-[120px] flex-1 basis-[fit-content] flex-col gap-1 rounded-lg border border-neutral-200 dark:border-neutral-800 p-3 items-start">
                    <p className="text-neutral-800 dark:text-neutral-100 tracking-light text-2xl font-bold leading-tight">
                      256
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-neutral-600 dark:text-neutral-200 text-sm font-normal leading-normal">
                        Bình luận
                      </p>
                    </div>
                  </div>
                  <div className="flex min-w-[120px] flex-1 basis-[fit-content] flex-col gap-1 rounded-lg border border-neutral-200 dark:border-neutral-800 p-3 items-start">
                    <p className="text-neutral-800 dark:text-neutral-100 tracking-light text-2xl font-bold leading-tight">
                      512
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-neutral-600 dark:text-neutral-200 text-sm font-normal leading-normal">
                        Lượt thích
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
                <div className="px-4 sm:px-6">
                  <div className="flex border-b border-neutral-200 dark:border-neutral-800 gap-8">
                    <a
                      className="flex flex-col items-center justify-center border-b-[3px] border-b-primary pb-[13px] pt-4"
                      href="#"
                    >
                      <p className="text-primary text-sm font-bold leading-normal tracking-[0.015em]">
                        Bài viết đã đăng
                      </p>
                    </a>
                    <a
                      className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-neutral-600 dark:text-neutral-200 pb-[13px] pt-4 hover:text-primary dark:hover:text-primary"
                      href="#"
                    >
                      <p className="text-sm font-bold leading-normal tracking-[0.015em]">
                        Bình luận
                      </p>
                    </a>
                    <a
                      className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-neutral-600 dark:text-neutral-200 pb-[13px] pt-4 hover:text-primary dark:hover:text-primary"
                      href="#"
                    >
                      <p className="text-sm font-bold leading-normal tracking-[0.015em]">
                        Thông tin chi tiết
                      </p>
                    </a>
                  </div>
                </div>
                <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-800">
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-col-reverse sm:flex-row items-stretch justify-between gap-6">
                      <div className="flex flex-[2_2_0px] flex-col gap-3">
                        <div className="flex flex-col gap-1">
                          <p className="text-neutral-600 dark:text-neutral-200 text-sm font-normal leading-normal">
                            Đăng 2 ngày trước
                          </p>
                          <p className="text-neutral-800 dark:text-neutral-100 text-lg font-bold leading-tight">
                            Chào thế giới! Bài viết đầu tiên trên diễn đàn.
                          </p>
                          <p className="text-neutral-600 dark:text-neutral-200 text-sm font-normal leading-normal">
                            Đây là đoạn trích ngắn gọn của bài viết để thu hút
                            người đọc. Nội dung tóm tắt những ý chính được đề
                            cập và giới thiệu bản thân...
                          </p>
                        </div>
                        <div className="flex items-center gap-4 text-neutral-600 dark:text-neutral-200 text-sm">
                          <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-base">
                              thumb_up
                            </span>
                            <span>15</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-base">
                              chat_bubble
                            </span>
                            <span>4</span>
                          </div>
                        </div>
                      </div>
                      <div
                        className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg flex-1"
                        data-alt="Abstract gradient for a blog post thumbnail" //style
                      ></div>
                    </div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-col-reverse sm:flex-row items-stretch justify-between gap-6">
                      <div className="flex flex-[2_2_0px] flex-col gap-3">
                        <div className="flex flex-col gap-1">
                          <p className="text-neutral-600 dark:text-neutral-200 text-sm font-normal leading-normal">
                            Đăng 1 tuần trước
                          </p>
                          <p className="text-neutral-800 dark:text-neutral-100 text-lg font-bold leading-tight">
                            Chia sẻ về dự án thiết kế UI mới nhất.
                          </p>
                          <p className="text-neutral-600 dark:text-neutral-200 text-sm font-normal leading-normal">
                            Gần đây mình vừa hoàn thành một dự án khá thú vị và
                            muốn chia sẻ quá trình, cũng như một vài thách thức
                            đã gặp phải trong quá trình thiết kế...
                          </p>
                        </div>
                        <div className="flex items-center gap-4 text-neutral-600 dark:text-neutral-200 text-sm">
                          <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-base">
                              thumb_up
                            </span>
                            <span>42</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-base">
                              chat_bubble
                            </span>
                            <span>12</span>
                          </div>
                        </div>
                      </div>
                      <div
                        className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg flex-1"
                        data-alt="Abstract colorful pattern for a blog post thumbnail" //style
                      ></div>
                    </div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-col-reverse sm:flex-row items-stretch justify-between gap-6">
                      <div className="flex flex-[2_2_0px] flex-col gap-3">
                        <div className="flex flex-col gap-1">
                          <p className="text-neutral-600 dark:text-neutral-200 text-sm font-normal leading-normal">
                            Đăng 3 tuần trước
                          </p>
                          <p className="text-neutral-800 dark:text-neutral-100 text-lg font-bold leading-tight">
                            Thảo luận về các công cụ tốt nhất cho developer.
                          </p>
                          <p className="text-neutral-600 dark:text-neutral-200 text-sm font-normal leading-normal">
                            Mình đang tìm kiếm một vài công cụ mới để tối ưu hóa
                            workflow. Mọi người có gợi ý nào hay ho không? Hãy
                            cùng nhau thảo luận nhé...
                          </p>
                        </div>
                        <div className="flex items-center gap-4 text-neutral-600 dark:text-neutral-200 text-sm">
                          <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-base">
                              thumb_up
                            </span>
                            <span>78</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-base">
                              chat_bubble
                            </span>
                            <span>29</span>
                          </div>
                        </div>
                      </div>
                      <div
                        className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg flex-1"
                        data-alt="Minimalist geometric shapes for a blog post thumbnail" //style
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
