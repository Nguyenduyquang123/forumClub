import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TimeAgo from "timeago-react";

function MyProfile() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ posts: 0, comments: 0, likes: 0 });
  const userlocal = JSON.parse(localStorage.getItem("user"));
  const [posts, setPosts] = useState([]);
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
    if (!userlocal.id) return;
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/users/${userlocal.id}/stats`
        );
        setStats(res.data);
      } catch (err) {
        console.error("Lỗi khi tải thống kê:", err);
      }
    };
    fetchStats();
  }, [userlocal.id]);

  useEffect(() => {
    if (!userlocal.id) return;

    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/users/${userlocal.id}/posts`
        );
        setPosts(res.data);
      } catch (err) {
        console.error("Lỗi khi tải bài viết:", err);
      }
    };

    fetchPosts();
  }, [userlocal.id]);

  console.log(posts);

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
                  <Link
                    to="/notification"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    href="#"
                  >
                    <span className="material-symbols-outlined text-2xl">
                      notifications
                    </span>
                    <p className="text-sm font-medium leading-normal">
                      Thông báo
                    </p>
                  </Link>
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
                      {stats.posts}
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-neutral-600 dark:text-neutral-200 text-sm font-normal leading-normal">
                        Bài viết
                      </p>
                    </div>
                  </div>
                  <div className="flex min-w-[120px] flex-1 basis-[fit-content] flex-col gap-1 rounded-lg border border-neutral-200 dark:border-neutral-800 p-3 items-start">
                    <p className="text-neutral-800 dark:text-neutral-100 tracking-light text-2xl font-bold leading-tight">
                      {stats.comments}
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-neutral-600 dark:text-neutral-200 text-sm font-normal leading-normal">
                        Bình luận
                      </p>
                    </div>
                  </div>
                  <div className="flex min-w-[120px] flex-1 basis-[fit-content] flex-col gap-1 rounded-lg border border-neutral-200 dark:border-neutral-800 p-3 items-start">
                    <p className="text-neutral-800 dark:text-neutral-100 tracking-light text-2xl font-bold leading-tight">
                      {stats.likes}
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
                  </div>
                </div>
                <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-800 max-h-[650px] overflow-y-auto custom-scroll">
                  {posts.map((post) => (
                    <Link
                      to={`/homeClub/${post.club_id}/discuss-club/post/${post.id}`}
                      className="p-4 sm:p-6"
                    >
                      <div className="flex flex-col-reverse sm:flex-row items-stretch justify-between gap-6">
                        <div className="flex flex-[2_2_0px] flex-col gap-3">
                          <div className="flex flex-col gap-1">
                            <p className="text-neutral-600 dark:text-neutral-200 text-sm font-normal leading-normal">
                              <TimeAgo
                                datetime={post?.created_at}
                                locale="vi"
                              />
                            </p>
                            <p className="text-neutral-800 dark:text-neutral-100 text-lg font-bold leading-tight">
                              {post.title}
                            </p>
                          </div>
                          <div className="flex items-center gap-4 text-neutral-600 dark:text-neutral-200 text-sm">
                            <div className="flex items-center gap-1.5">
                              <span className="material-symbols-outlined text-base">
                                thumb_up
                              </span>
                              <span>{post.likes_count}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="material-symbols-outlined text-base">
                                chat_bubble
                              </span>
                              <span>{post.comments.length}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
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
