import axios from "axios";
import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import RichTextEditor from "../components/RichTextEditor";
import { generateContentFromTitle } from "../services/geminiService";
import { toast } from "react-toastify";

function CreateTopic() {
  const [loadingAI, setLoadingAI] = useState(false);

  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPinned, setIsPinned] = useState(false);
  const [notifyMembers, setNotifyMembers] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const [value, setValue] = useState(content);

  const userId = user?.id;
  const clubId = id;
  const navigate = useNavigate();
  const handlePinnedChange = (checked: boolean) => {
    setIsPinned(checked);
    if (checked) setNotifyMembers(false);
  };

  const handleNotifyChange = (checked: boolean) => {
    setNotifyMembers(checked);
    if (checked) setIsPinned(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!userId) {
        alert("Không tìm thấy người dùng!");
        return;
      }

      const payload = {
        club_id: clubId,
        user_id: userId,
        title,
        content,
        is_pinned: isPinned,
        notify_members: notifyMembers,
      };

      const res = await axios.post("http://localhost:8000/api/posts", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });


      toast.success("Đăng bài thành công!");
      console.log("Bài viết:", res.data);
      setTitle("");
      setContent("");
      setIsPinned(false);
      setNotifyMembers(false);
      navigate(`/homeClub/${clubId}/discuss-club`);
    } catch (error) {
      console.error("Lỗi khi đăng bài:", error);
      toast.error("Đăng bài thất bại!");
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/clubs/${clubId}/my-role`,
          {
            params: { user_id: userId },
          }
        );
        setUserRole(res.data.role);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [clubId]);
  const textToHTML = (text: string) => {
    if (!text) return "";

    return (
      text
        .trim()
        // Chuẩn hóa xuống dòng Windows → Unix
        .replace(/\r\n/g, "\n")
        // Tách đoạn: dòng trống (có thể có space)
        .split(/\n\s*\n/)
        .map((p) => {
          const safe = p.trim().replace(/\n/g, "<br />");
          return safe ? `<p>${safe}</p>` : "";
        })
        .join("")
    );
  };

  const handleGenerateContent = async () => {
    try {
      setLoadingAI(true);

      const aiContent = await generateContentFromTitle(title);

      // Đổ thẳng vào RichTextEditor
      const html = textToHTML(aiContent);

      setContent(html);
      console.log("Generated AI content:", aiContent);
    } catch (err) {
      alert("Không thể tạo nội dung từ AI");
    } finally {
      setLoadingAI(false);
    }
  };
  useEffect(() => {
    setValue(content);
  }, [content]);
  console.log("User role:", userRole);
  return (
    <div className="container mx-auto max-w-7xl">
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-2">
          <a
            className="text-gray-500 dark:text-gray-400 text-sm font-medium hover:text-primary dark:hover:text-primary/90 transition-colors"
            href="#"
          >
            Trang chủ
          </a>
          <span className="text-gray-400 dark:text-gray-500 text-sm font-medium">
            /
          </span>
          <a
            className="text-gray-500 dark:text-gray-400 text-sm font-medium hover:text-primary dark:hover:text-primary/90 transition-colors"
            href="#"
          >
            Diễn đàn chung
          </a>
          <span className="text-gray-400 dark:text-gray-500 text-sm font-medium">
            /
          </span>
          <span className="text-gray-800 dark:text-gray-200 text-sm font-medium">
            Tạo chủ đề mới
          </span>
        </div>
      </div>
      <div className="mb-10">
        <p className="text-gray-900 dark:text-white text-3xl md:text-4xl font-black tracking-tighter">
          Tạo Chủ Đề Mới
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12">
        <form onSubmit={handleSubmit} className="lg:col-span-2">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col w-full">
              <label
                className="pb-2" //for="topic-title"
              >
                <span className="text-gray-900 dark:text-white text-base font-medium leading-normal">
                  Tiêu đề chủ đề
                </span>
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-primary dark:focus:border-primary h-14 placeholder:text-gray-500 dark:placeholder:text-gray-400 p-[15px] text-base font-normal leading-normal transition-all"
                id="topic-title"
                placeholder="Nhập tiêu đề cho bài viết của bạn"
                //required=""
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <button
                type="button"
                disabled={!title.trim() || loadingAI}
                onClick={handleGenerateContent}
                className="
    mt-3 inline-flex items-center gap-2
    px-4 py-2 rounded-lg
    text-sm font-medium
    text-white
    bg-gradient-to-r from-indigo-500 to-purple-600
    hover:from-indigo-600 hover:to-purple-700
    focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    transition-all duration-200
    shadow-sm hover:shadow-md
  "
              >
                {loadingAI ? (
                  <>
                    <svg
                      className="w-4 h-4 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                    Đang tạo nội dung...
                  </>
                ) : (
                  <>
                    <span>✨</span>
                    Áp dụng gợi ý AI
                  </>
                )}
              </button>

              <p className="text-red-600 dark:text-red-400 text-sm mt-2 hidden">
                Tiêu đề không được để trống.
              </p>
            </div>
            <RichTextEditor content={content} setContent={setContent} />
            {(userRole === "owner" || userRole === "admin") && (
              <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
                <h3 className="text-gray-900 dark:text-white text-lg font-bold mb-4">
                  Tùy chọn cho Quản trị viên
                </h3>
                <div className="flex flex-col gap-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      className="form-checkbox h-5 w-5 rounded text-primary bg-gray-100 border-gray-300 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-offset-gray-800"
                      type="checkbox"
                      checked={isPinned}
                      onChange={(e) => handlePinnedChange(e.target.checked)}
                    />
                    <span className="text-gray-700 dark:text-gray-300">
                      Ghim chủ đề này lên đầu thảo luận
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      className="form-checkbox h-5 w-5 rounded text-primary bg-gray-100 border-gray-300 focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-offset-gray-800"
                      type="checkbox"
                      checked={notifyMembers}
                      onChange={(e) => handleNotifyChange(e.target.checked)}
                    />
                    <span className="text-gray-700 dark:text-gray-300">
                      Gửi thông báo cho tất cả thành viên về chủ đề này
                    </span>
                  </label>
                </div>
              </div>
            )}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                type="submit"
                className="flex items-center justify-center w-full sm:w-auto h-12 px-8 text-base font-bold text-white bg-primary rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/30 transition-all"
              >
                Đăng bài
              </button>
              <button className="flex items-center justify-center w-full sm:w-auto h-12 px-8 text-base font-bold text-gray-700 dark:text-gray-300 bg-transparent border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-500/20 transition-all">
                Lưu nháp
              </button>
              <button className="flex items-center justify-center w-full sm:w-auto h-12 px-8 text-base font-medium text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 focus:outline-none transition-colors">
                Hủy
              </button>
            </div>
          </div>
        </form>
        <aside className="lg:col-span-1">
          <div className="sticky top-8 bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Trước khi bạn đăng bài
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <span className="material-symbols-outlined text-xl text-primary">
                    check_circle
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Giữ thái độ văn minh, lịch sự và tôn trọng các thành viên
                  khác.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <span className="material-symbols-outlined text-xl text-primary">
                    check_circle
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Sử dụng công cụ tìm kiếm để chắc chắn rằng chủ đề của bạn chưa
                  tồn tại.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <span className="material-symbols-outlined text-xl text-primary">
                    check_circle
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Đặt tiêu đề rõ ràng, súc tích và đúng trọng tâm nội dung.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <span className="material-symbols-outlined text-xl text-primary">
                    check_circle
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Chọn đúng danh mục để bài viết của bạn được tiếp cận tốt hơn.
                </p>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
export default CreateTopic;
