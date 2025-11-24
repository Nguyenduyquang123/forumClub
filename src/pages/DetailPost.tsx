import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import timeAgo from "../components/timeAgo";
import Pusher from "pusher-js";
import TimeAgo from "timeago-react";
import "../utils/viLocale";

function DetailPost() {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [liked, setLiked] = useState(false);
  const [likedComment, setLikedComment] = useState(false);
  const [likedCountComment, setLikeCountComment] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));
  const commentsEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: "auto", // hoặc "smooth"
    });
  }, [comments]);
  const scrollToBottom = () => {
    commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/posts/${postId}`
        );
        setPost(res.data.data || res.data); // tùy backend
      } catch (err) {
        console.error("Lỗi tải bài viết:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [postId]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/posts/${postId}/comments`)
      .then((res) => {
        setComments(res.data.reverse());
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [postId, likedComment]);

  useEffect(() => {
    const pusher = new Pusher("5d1931596c569a22a972", { cluster: "ap1" });
    const channel = pusher.subscribe(`comments-post-${postId}`);

    channel.bind("new-comment", (data) => {
      setComments((prev) => [...prev, data.comment]);
      scrollToBottom();
    });

    return () => {
      channel.unbind_all();
      pusher.unsubscribe(`comments-post-${postId}`);
    };
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    const tempComment = {
      id: Date.now(),
      content,
      created_at: new Date().toISOString(),
      user: {
        id: user?.id,
        displayName: user?.displayName,
        avatarUrl: user?.avatarUrl,
      },
    };
    setComments([...comments, tempComment]);
    setContent("");

    try {
      const res = await axios.post(
        `http://localhost:8000/api/posts/${postId}/comments`,
        {
          user_id: user?.id,
          content,
        }
      );
      // Cập nhật comment thật
      setComments([...comments, res.data]);
      setContent("");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchLikeData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/posts/${postId}/likes`
        );
        setLikeCount(res.data.like_count);

        const checkRes = await axios.post(
          `http://localhost:8000/api/posts/check-like`,
          {
            post_id: postId,
            user_id: user.id,
          }
        );
        setLiked(checkRes.data.liked);
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu like:", err);
      }
    };
    fetchLikeData();
  }, [postId, user.id]);

  const handleToggleLike = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/posts/toggle-like`,
        {
          post_id: postId,
          user_id: user.id,
        }
      );

      setLiked(res.data.liked);
      setLikeCount(res.data.like_count);
    } catch (err) {
      console.error("Lỗi khi like bài viết:", err);
    }
  };

  const handleToggleLikeComment = async (commentId) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/comments/toggle-like",
        {
          comment_id: commentId,
          user_id: user.id,
        }
      );

      setLikeCountComment(res.data.like_count);
      setLikedComment(!likedComment);
    } catch (err) {
      console.error("Lỗi khi like/unlike:", err);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 dark:text-gray-300">
        Đang tải bài viết...
      </div>
    );

  if (!post)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Không tìm thấy bài viết
      </div>
    );

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-4 sm:py-1">
          <div className="layout-content-container flex flex-col w-full max-w-[960px] flex-1 gap-6">
            {/* === BẮT ĐẦU CHI TIẾT BÀI === */}
            <div className="flex flex-col gap-4 bg-white dark:bg-background-dark rounded-xl p-4 sm:p-6 shadow-sm">
              <h1 className="text-[#111418] dark:text-white tracking-tight text-[28px] md:text-[32px] font-bold leading-tight text-left">
                {post.title}
              </h1>

              <div className="flex w-full flex-row items-start justify-start gap-3">
                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 shrink-0"
                  style={{
                    backgroundImage: `url("${
                      post.creator?.avatarUrl ||
                      "https://i.pravatar.cc/100?img=5"
                    }")`,
                  }}
                ></div>

                <div className="flex h-full flex-1 flex-col items-start justify-start gap-3">
                  <div className="flex w-full flex-col sm:flex-row sm:items-start justify-start gap-x-3">
                    <p className="text-[#111418] dark:text-white text-sm font-bold leading-normal tracking-[0.015em]">
                      {post.creator?.displayName}
                    </p>
                    <p className="text-[#617589] dark:text-gray-400 text-sm font-normal leading-normal">
                      {timeAgo(post.created_at)}
                    </p>
                  </div>

                  <div
                    className="
    text-[#343A40] dark:text-gray-300 text-base font-normal leading-relaxed
    [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6
    [&_li]:mb-1 [&_p]:mb-4
  "
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  ></div>
                </div>
              </div>

              {/* Nút thích / trả lời giữ nguyên */}
              <div className="@container pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
                <div className="gap-2 flex flex-wrap justify-start">
                  <button
                    onClick={handleToggleLike}
                    className={`flex flex-col items-center justify-center gap-2 bg-transparent py-2.5 text-center w-20 rounded-lg 
        hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors`}
                  >
                    <div
                      className={`rounded-full p-2.5 ${
                        liked
                          ? "bg-blue-200 dark:bg-blue-600"
                          : "bg-[#f0f2f4] dark:bg-gray-700"
                      }`}
                    >
                      <span
                        className={`material-symbols-outlined text-lg ${
                          liked
                            ? "text-blue-600 dark:text-white"
                            : "text-[#111418] dark:text-white"
                        }`}
                      >
                        thumb_up
                      </span>
                    </div>
                    <p
                      className={`text-sm font-medium leading-normal ${
                        liked
                          ? "text-blue-600"
                          : "text-[#111418] dark:text-white"
                      }`}
                    ></p>
                    <p className="text-xs text-gray-500">
                      {likeCount} lượt thích
                    </p>
                  </button>
                  <button className="flex flex-col items-center justify-center gap-2 bg-transparent py-2.5 text-center w-20 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <div className="rounded-full bg-[#f0f2f4] dark:bg-gray-700 p-2.5">
                      <span className="material-symbols-outlined text-[#111418] dark:text-white">
                        reply
                      </span>
                    </div>
                    <p className="text-[#111418] dark:text-white text-sm font-medium leading-normal">
                      Trả lời
                    </p>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="text-[#111418] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pt-5">
                {comments.length} Phản hồi
              </h2>

              {/* Hiển thị danh sách bình luận */}
              <div
                ref={containerRef}
                className="max-h-[500px] overflow-y-auto "
              >
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="flex w-full flex-row items-start justify-start gap-3 p-4 bg-white dark:bg-background-dark rounded-xl shadow-sm "
                  >
                    <div
                      className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 shrink-0"
                      style={{
                        backgroundImage: `url(${
                          comment.user?.avatarUrl || "/default-avatar.png"
                        })`,
                      }}
                    ></div>

                    <div className="flex h-full flex-1 flex-col items-start justify-start gap-2">
                      <div className="flex w-full flex-row items-center justify-start gap-x-3">
                        <p className="text-[#111418] dark:text-white text-sm font-bold leading-normal tracking-[0.015em]">
                          {comment.user?.displayName || "Người dùng"}
                        </p>
                        <p className="text-[#617589] dark:text-gray-400 text-sm font-normal leading-normal">
                          <TimeAgo datetime={comment.created_at} locale="vi" />
                        </p>
                      </div>
                      <p className="text-[#343A40] dark:text-gray-300 text-base font-normal leading-relaxed">
                        {comment.content}
                      </p>
                      <div className="flex w-full flex-row items-center justify-start gap-6 pt-2">
                        <div
                          onClick={() => handleToggleLikeComment(comment.id)}
                          className={`flex items-center gap-2 cursor-pointer ${
                            (comment.likes || []).some(
                              (like) => like.user_id === user.id
                            )
                              ? "text-blue-600"
                              : "text-[#617589] dark:text-gray-400"
                          } hover:text-primary dark:hover:text-primary`}
                        >
                          <span className="material-symbols-outlined">
                            thumb_up
                          </span>
                          <p className="text-sm font-medium leading-normal">
                            {comment.likes?.length || 0}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 cursor-pointer text-[#617589] dark:text-gray-400 hover:text-red-500">
                          <span className="material-symbols-outlined">
                            thumb_down
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={commentsEndRef} />
              </div>
              {/* Ô nhập bình luận */}
              <div className="flex flex-col gap-4 bg-white dark:bg-background-dark rounded-xl p-4 sm:p-6 shadow-sm mt-6">
                <h3 className="text-[#111418] dark:text-white text-lg font-bold">
                  Viết phản hồi của bạn
                </h3>
                <form
                  onSubmit={handleSubmit}
                  className="flex items-start gap-4"
                >
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 shrink-0"
                    style={{
                      backgroundImage: `url("${
                        user?.avatarUrl || "https://i.pravatar.cc/100?img=5"
                      }")`,
                    }}
                  ></div>
                  <div className="flex-1">
                    <textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="w-full min-h-[120px] rounded-lg border border-gray-300 dark:border-gray-600 bg-background-light dark:bg-gray-800 p-3 text-[#343A40] dark:text-gray-300 focus:ring-primary focus:border-primary transition"
                      placeholder="Bạn nghĩ gì về chủ đề này?..."
                    ></textarea>
                    <div className="flex justify-end mt-4">
                      <button type="submit">Gửi Phản hồi</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DetailPost;
