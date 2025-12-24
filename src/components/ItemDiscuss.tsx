import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

import TimeAgo from "timeago-react";
import { set } from "date-fns";

interface User {
  id: number;
  username: string;
  avatarUrl?: string;
}

interface Comment {
  id: number;
}

interface Post {
  id: number;
  title: string;
  is_pinned: number; // 0 | 1
  updated_at: string;
  created_at: string;
  notify_members?: number;
  creator?: User;
  comments: Comment[];
  likes_count: number;
}

interface ItemDiscussProps {
  excludePinned?: boolean;
}

const ItemDiscuss = ({ excludePinned = false }) => {
    const { id: clubId } = useParams<{ id: string }>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [myRole, setMyRole] = useState<"owner" | "admin" | "member" | null>(null);
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
    useEffect(() => {
    const fetchRole = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/clubs/${clubId}/my-role`,
          {
            params: { user_id: user.id },
          }
        );
        setMyRole(res.data.role);
        console.log("Vai trò của tôi trong CLB:", res.data.role);
      } catch (err) {
        console.error("Lỗi khi lấy vai trò thành viên:", err);
      }
    };

    fetchRole();
  }, [clubId, user.id]);
  const postsFiltered = posts
    .filter((post) => !excludePinned || !post.is_pinned)
    .sort((a, b) => {
      if (a.is_pinned && !b.is_pinned) return -1;
      if (!a.is_pinned && b.is_pinned) return 1;

      return (
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
    });
  // Nếu excludePinned === true → chỉ lấy 6 bài
  const postsToShow = excludePinned ? postsFiltered.slice(0, 3) : postsFiltered;
  const handleDelete = async (postId) => {
    if (!window.confirm("Bạn có chắc muốn xóa bài này không?")) return;

    try {
      await axios.delete(`http://localhost:8000/api/posts/${postId}`, {
        data: { auth_user_id: user.id }, // hoặc token tùy backend bạn
      });

      // Xóa khỏi UI
      setPosts((prev) => prev.filter((p) => p.id !== postId));

      setOpenMenuId(null);
    } catch (err) {
      console.error("Lỗi khi xóa bài:", err);
    }
  };
  const togglePin = async (postId) => {
    try {
      const post = posts.find((p) => p.id === postId);
      if (!post) return;

      const url = post.is_pinned
        ? `http://localhost:8000/api/posts/${postId}/unpin`
        : `http://localhost:8000/api/posts/${postId}/pin`;

      await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const updatedPosts = posts.map((p) =>
        p.id === postId ? { ...p, is_pinned: post.is_pinned ? 0 : 1 } : p
      );
      setPosts(updatedPosts);
    } catch (err) {
      console.error(err);
      alert("Lỗi, không thể thực hiện thao tác");
    }
  };

  const unpinPost = async (postId) => {
    try {
      const res = await axios.patch(
        `http://localhost:8000/api/posts/${postId}/unpin`
      );

      setPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, is_pinned: false } : p))
      );
    } catch (err) {
      alert(err.response?.data?.error || "Không thể bỏ ghim bài");
    }
  };

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
                      {(myRole === "owner" || myRole === "admin") && (post.is_pinned ? (
                        
                        <button
                          className="w-full text-left px-3 py-1.5 text-red-600 hover:bg-red-50 rounded"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation(); // tránh click ảnh hưởng tới parent
                            unpinPost(post.id);
                          }}
                        >
                          Bỏ ghim bài
                        </button>
                      ) : (
                        <button
                          className="w-full text-left px-3 py-1.5 text-red-600 hover:bg-red-50 rounded"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation(); // tránh click ảnh hưởng tới parent
                            togglePin(post.id);
                          }}
                        >
                          Ghim bài
                        </button>
                      ))}

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
                  <span>
                    <TimeAgo datetime={post.created_at} locale="vi" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
    </>
  );
};

export default ItemDiscuss;
