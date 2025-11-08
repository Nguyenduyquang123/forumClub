import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import timeAgo from "./timeAgo";

const ItemDiscuss = ({ excludePinned = false }) => {
  const { id: clubId } = useParams(); // Lấy clubId từ URL
  const [posts, setPosts] = useState([]);

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
  const postsToShow = posts
    .filter((post) => !excludePinned || !post.is_pinned) // nếu excludePinned=true thì loại pinned
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)); // sắp xếp mới nhất trước

  console.log(posts);
  return (
    <>
      {postsToShow.map((post) => (
        <Link
          to={`post/${post.id}`}
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
                  {post.is_pinned ? (
                    <div className="mt-2 flex items-center gap-2">
                      <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-800 dark:bg-red-900/50 dark:text-red-300">
                        Thông Báo
                      </span>
                    </div>
                  ) : null}
                </div>
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
              <div className="flex items-center gap-1.5" title="Lượt xem">
                <span className="material-symbols-outlined !text-base">
                  visibility
                </span>
                <span>{post.views || 0}</span>
              </div>
              <div className="flex items-center gap-1.5" title="Hoạt động cuối">
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
