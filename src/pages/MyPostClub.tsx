import { useEffect, useState } from "react";
import ItemDiscuss from "../components/ItemDiscuss";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import timeAgo from "../components/timeAgo";

function MyPostClub() {
  const { id: clubId } = useParams(); // Lấy clubId từ URL
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/clubs/${clubId}/posts`
        );
        // Chỉ lấy bài viết của user hiện tại
        const myPosts = res.data.posts.filter(
          (post) => post.creator?.id === userId
        );
        setPosts(myPosts);
      } catch (err) {
        console.error("Lỗi khi lấy bài viết của tôi:", err);
      }
    };
    fetchMyPosts();
  }, [clubId, userId]);

  return (
    <div className=" flex flex-col  flex-1">
      <div className="flex flex-wrap gap-2 px-1 pb-4">
        <a
          className="text-gray-500 dark:text-gray-400 hover:text-primary text-sm font-medium leading-normal"
          href="#"
        >
          Trang chủ
        </a>
        <span className="text-gray-400 dark:text-gray-500 text-sm font-medium leading-normal">
          /
        </span>
        <span className="text-[#111418] dark:text-gray-200 text-sm font-medium leading-normal">
          Bài viết của tôi
        </span>
      </div>
      <div className="flex flex-wrap justify-between items-center gap-4 pb-6">
        <div className="flex flex-col gap-2">
          <p className="text-[#111418] dark:text-white text-3xl font-black leading-tight tracking-[-0.033em]">
            Bài viết của tôi
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4 mb-6">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
            search
          </span>
          <input
            className="form-input w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/50"
            placeholder="Tìm kiếm chủ đề..."
            type="text"
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-gray-100 dark:bg-gray-800 px-3 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <span className="material-symbols-outlined !text-lg text-gray-500 dark:text-gray-400">
              category
            </span>
            <p className="text-sm font-medium text-[#111418] dark:text-gray-200">
              Danh mục
            </p>
            <span className="material-symbols-outlined !text-lg text-gray-500 dark:text-gray-400">
              expand_more
            </span>
          </button>
          <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-gray-100 dark:bg-gray-800 px-3 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <span className="material-symbols-outlined !text-lg text-gray-500 dark:text-gray-400">
              calendar_today
            </span>
            <p className="text-sm font-medium text-[#111418] dark:text-gray-200">
              Ngày đăng
            </p>
            <span className="material-symbols-outlined !text-lg text-gray-500 dark:text-gray-400">
              expand_more
            </span>
          </button>
          <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-gray-100 dark:bg-gray-800 px-3 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <span className="material-symbols-outlined !text-lg text-gray-500 dark:text-gray-400">
              trending_up
            </span>
            <p className="text-sm font-medium text-[#111418] dark:text-gray-200">
              Độ phổ biến
            </p>
            <span className="material-symbols-outlined !text-lg text-gray-500 dark:text-gray-400">
              expand_more
            </span>
          </button>
          <div className="flex-grow"></div>
          <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-gray-100 dark:bg-gray-800 px-3 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <span className="material-symbols-outlined !text-lg text-gray-500 dark:text-gray-400">
              sort
            </span>
            <p className="text-sm font-medium text-[#111418] dark:text-gray-200">
              Sắp xếp: Mới nhất
            </p>
            <span className="material-symbols-outlined !text-lg text-gray-500 dark:text-gray-400">
              expand_more
            </span>
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <Link
            to={`/homeClub/${clubId}/discuss-club/post/${post.id}`}
            key={post.id}
            className="group block"
            href="#"
          >
            <div className="flex flex-col gap-4 rounded-xl border p-4 border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-800/50">
              {/* Header */}
              <h3 className="font-bold text-[#111418] dark:text-white">
                {post.title}
              </h3>

              {/* Footer */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <div
                    className="size-6 rounded-full bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url(${
                        post.creator?.avatarUrl || "/default-avatar.png"
                      })`,
                    }}
                  ></div>
                  <span>{post.creator?.username || "Người dùng"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined !text-base">
                    chat_bubble_outline
                  </span>
                  <span>{post.comments.length || 0}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined !text-base">
                    visibility
                  </span>
                  <span>{post.views || 0}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined !text-base">
                    schedule
                  </span>
                  <span>{timeAgo(post.updated_at)}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <button className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
          <span className="material-symbols-outlined !text-xl">
            chevron_left
          </span>
        </button>
        <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white">
          1
        </button>
        <button className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
          2
        </button>
        <button className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
          3
        </button>
        <span className="px-2">...</span>
        <button className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
          10
        </button>
        <button className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
          <span className="material-symbols-outlined !text-xl">
            chevron_right
          </span>
        </button>
      </div>
    </div>
  );
}
export default MyPostClub;
