import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import timeAgo from "./timeAgo";

const ItemDiscuss = ({ excludePinned = false }) => {
  const { id: clubId } = useParams(); // Lấy clubId từ URL
  const [posts, setPosts] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/clubs/${clubId}/posts`
        );
        setPosts(res.data.posts);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách bài đăng:", err);
      }
    };
    fetchPosts();
  }, [clubId]);
  const postsFiltered = posts
    .filter((post) => !excludePinned || !post.is_pinned)
    .sort((a, b) => {
      if (a.is_pinned && !b.is_pinned) return -1;
      if (!a.is_pinned && b.is_pinned) return 1;

      return (
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
    });
  // Nếu excludePinned === true → chỉ lấy 2 bài
  const postsToShow = excludePinned ? postsFiltered.slice(0, 2) : postsFiltered;
  const handleDelete = async (postId) => {
  if (!window.confirm("Bạn có chắc muốn xóa bài này không?")) return;

  try {
    await axios.delete(`http://localhost:8000/api/posts/${postId}`, {
      data: { auth_user_id: user.id },  // hoặc token tùy backend bạn
    });

    // Xóa khỏi UI
    setPosts((prev) => prev.filter((p) => p.id !== postId));

    setOpenMenuId(null);
  } catch (err) {
    console.error("Lỗi khi xóa bài:", err);
  }
}
console.log("Rendered posts:", postsToShow);
  return (
    <>
      {postsToShow
        .filter((post) => !post.notify_members || post.notify_members === 0)
        .map((post) => (
          <Link
            to={`/homeClub/${clubId}/discuss-club/post/${post.id}`}
            key={post.id}
            className="group block"
            href="#"
          >
            <div
              className={`flex flex-col gap-4 rounded-xl border p-4 transition-all duration-200 ${
                post.is_pinned
                  ? "border-primary/20 bg-primary/5 hover:border-primary/40 hover:bg-primary/10 dark:bg-primary/10 dark:hover:bg-primary/20"
                  : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm dark:border-gray-800 dark:bg-gray-800/50 dark:hover:border-gray-700"
              }`}
            >
              {/* --- Header --- */}

              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  {post.is_pinned ? (
                    <span className="material-symbols-outlined mt-1 text-primary">
                      push_pin
                    </span>
                  ) : null}
                  <div>
                    <h3 className="font-bold text-[#111418] transition-colors group-hover:text-primary dark:text-white dark:group-hover:text-primary">
                      {post.title}
                    </h3>
                  </div>
                </div>
              
                <div className="relative">
                  <span
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenMenuId(openMenuId === post.id ? null : post.id);
                    }}
                    className="material-symbols-outlined cursor-pointer text-gray-500 hover:text-gray-700"
                  >
                    more_vert
                  </span>

                  {/* Menu */}
               
                  {openMenuId === post.id && (
                    <div className="absolute right-0 mt-2 w-32 rounded-lg bg-white shadow-lg border p-2 z-10">
                      <button
                        className="w-full text-left px-3 py-1.5 text-red-600 hover:bg-red-50 rounded"
                        onClick={(e) => {
                          e.preventDefault();
                          handleDelete(post.id);
                        }}
                      >
                        Xóa bài
                      </button>
                    </div>
                  )}
                  
                </div>
              
              </div>

              {/* --- Footer --- */}
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
                  <span className="text-gray-600 dark:text-gray-300">
                    {post.creator?.username || "Người dùng"}
                  </span>
                </div>
                <div className="flex items-center gap-1.5" title="Bình luận">
                  <span className="material-symbols-outlined !text-base">
                    chat_bubble_outline
                  </span>
                  <span>{post.comments.length || 0}</span>
                </div>
                <div className="flex items-center gap-1.5" title="Lượt thích">
                  <span className="material-symbols-outlined !text-base">
                    thumb_up
                  </span>
                  <span>{post.likes_count || 0}</span>
                </div>
                <div
                  className="flex items-center gap-1.5"
                  title="Hoạt động cuối"
                >
                  <span className="material-symbols-outlined !text-base">
                    schedule
                  </span>
                  <span>{timeAgo(post.updated_at)}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
    </>
  );
};

export default ItemDiscuss;
