import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import TimeAgo from "timeago-react";

type EventType = {
  id: number;
  title: string;
  start_time: string;
};

function MyPostClub() {
  const { id: clubId } = useParams();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user?.id;
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);

  const POSTS_PER_PAGE = 5;
  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/clubs/${clubId}/posts`
        );

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
  const filteredPosts = posts
    .filter((post) => post.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === "newest") {
        return new Date(b.created_at) - new Date(a.created_at);
      }
      return new Date(a.created_at) - new Date(b.created_at);
    });
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

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
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex-grow"></div>
          <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-gray-100 dark:bg-gray-800 px-3 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <select
              className="h-9 rounded-lg bg-gray-100 dark:bg-gray-800 px-3 text-sm"
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="newest">Mới nhất</option>
              <option value="oldest">Cũ nhất</option>
            </select>
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {paginatedPosts.map((post) => (
          <Link
            to={`/homeClub/${clubId}/discuss-club/post/${post.id}`}
            key={post.id}
            className="group block"
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
                  <span>
                    <TimeAgo datetime={post.created_at} locale="vi" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-8 flex justify-center gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-3 py-1 rounded border disabled:opacity-50"
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </button>

        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 rounded border ${
              currentPage === index + 1 ? "bg-primary text-white" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-3 py-1 rounded border disabled:opacity-50"
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
    </div>
  );
}
export default MyPostClub;
