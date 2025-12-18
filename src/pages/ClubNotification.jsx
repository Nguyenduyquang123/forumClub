import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TimeAgo from "timeago-react";
const colors = [
  { bg: "bg-red-100 dark:bg-red-900/50", text: "text-red-600 dark:text-red-400", border: "border-red-500/50 dark:border-red-500/30" },
  { bg: "bg-blue-100 dark:bg-blue-900/50", text: "text-blue-600 dark:text-blue-400", border: "border-blue-500/50 dark:border-blue-500/30" },
  { bg: "bg-green-100 dark:bg-green-900/50", text: "text-green-600 dark:text-green-400", border: "border-green-500/50 dark:border-green-500/30" },
  { bg: "bg-purple-100 dark:bg-purple-900/50", text: "text-purple-600 dark:text-purple-400", border: "border-purple-500/50 dark:border-purple-500/30" },
  { bg: "bg-orange-100 dark:bg-orange-900/50", text: "text-orange-600 dark:text-orange-400", border: "border-orange-500/50 dark:border-orange-500/30" },
  { bg: "bg-pink-100 dark:bg-pink-900/50", text: "text-pink-600 dark:text-pink-400", border: "border-pink-500/50 dark:border-pink-500/30" },
];

const getColorForPost = (postId) => colors[postId % colors.length];

function ClubNotification() {
  const { id: clubId } = useParams();
  const [club, setClub] = useState(null);
  const [posts, setPosts] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const POSTS_PER_PAGE = 5;

  const user = JSON.parse(localStorage.getItem("user")) || {};
const token = localStorage.getItem("token") || "";
  const toggleMenu = (postId) => {
    setOpenMenuId(openMenuId === postId ? null : postId);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/clubs/${clubId}/posts`);
        setClub(res.data);
        setPosts(res.data.posts || []);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách bài đăng:", err);
      }
    };

    fetchPosts();
  }, [clubId]);

  const handleDelete = async (postId) => {
    if (!window.confirm("Bạn có chắc muốn xóa bài này?")) return;

    try {
      await axios.delete(`http://localhost:8000/api/posts/${postId}`, 
   { data: { auth_user_id: user.id } }
      );

      setPosts((prev) => prev.filter((p) => p.id !== postId));
    } catch (err) {
      alert("Không thể xóa bài!");
      console.error(err);
    }
  };
  const filteredPosts = posts
    .filter((post) => post.notify_members !== 0)
    .filter((post) =>
      post.content?.toLowerCase().includes(search.toLowerCase())
    );
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );



  return (
    <>
     
      <div className="flex flex-wrap gap-2 px-1 pb-4">
        <a className="text-gray-500 dark:text-gray-400 hover:text-primary text-sm font-medium" href="#">
          Trang chủ
        </a>
        <span className="text-gray-500 dark:text-gray-500 text-sm font-medium">/</span>
        <span className="text-[#111418] dark:text-gray-200 text-sm font-medium">Thông báo chung</span>
      </div>

     
      <div className="md:col-span-9">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
          <h1 className="text-gray-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
            Thông báo của CLB
          </h1>
        </div>

       
        <div className="space-y-6">
          <div className="mb-6 max-w-md">
            <input
              type="text"
              placeholder="Tìm kiếm thông báo..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none dark:bg-gray-800 dark:text-white"
            />
          </div>

          {paginatedPosts.map((post) => {
              const color = getColorForPost(post.id);
             const currentUserMember = club?.members.find(m => m.id === user.id);

            const canDelete = ["owner", "admin"].includes(currentUserMember?.pivot.role);

              return (
                <div
                  key={post.id}
                  className={`group bg-white dark:bg-gray-900 rounded-xl border ${color.border} shadow-sm transition-all hover:shadow-lg`}
                >
                  <div className="p-6">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3 justify-between">
                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${color.bg} ${color.text}`}>
                          Thông báo
                        </span>

                        {canDelete && (
                          <div className="relative">
                            <button
                              onClick={() => toggleMenu(post.id)}
                              className="font-bold px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                            >
                              ⋮
                            </button>

                            {openMenuId === post.id && (
                              <div className="absolute right-0 mt-2 w-28 bg-white dark:bg-gray-800 border shadow-lg rounded">
                                <button
                                  onClick={() => handleDelete(post.id)}
                                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                  Xóa bài
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <div
                        className="text-[#343A40] dark:text-gray-300 text-base font-normal leading-relaxed [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6 [&_li]:mb-1 [&_p]:mb-4"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                      />

                      <p className="text-gray-500 dark:text-gray-500 text-sm font-normal">
                        Đăng bởi {post.creator?.displayName || "Ẩn danh"} | <TimeAgo datetime={post.created_at} locale="vi" />
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

        </div>


  <div className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-600 dark:text-slate-400">
    <button
      disabled={currentPage === 1}
      onClick={() => setCurrentPage((p) => p - 1)}
      className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40"
    >
      <span className="material-symbols-outlined">chevron_left</span>
    </button>

    {Array.from({ length: totalPages }).map((_, i) => (
      <button
        key={i}
        onClick={() => setCurrentPage(i + 1)}
        className={`flex h-9 w-9 items-center justify-center rounded-lg ${
          currentPage === i + 1
            ? "bg-primary text-white"
            : "hover:bg-slate-100 dark:hover:bg-slate-800"
        }`}
      >
        {i + 1}
      </button>
    ))}

    <button
      disabled={currentPage === totalPages}
      onClick={() => setCurrentPage((p) => p + 1)}
      className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40"
    >
      <span className="material-symbols-outlined">chevron_right</span>
    </button>
  </div>


      </div>

    </>
  );
}

export default ClubNotification;
