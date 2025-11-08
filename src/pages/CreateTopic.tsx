import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

function CreateTopic() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPinned, setIsPinned] = useState(false);
  const [notifyMembers, setNotifyMembers] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user")); // Lấy user từ localStorage (nếu bạn lưu khi login)

      const userId = user?.id;
      const clubId = id; // tạm thời fix hoặc lấy từ context/router nếu có

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

      alert("Đăng bài thành công!");
      console.log("Bài viết:", res.data);
      setTitle("");
      setContent("");
      setIsPinned(false);
      setNotifyMembers(false);
    } catch (error) {
      console.error("Lỗi khi đăng bài:", error);
      alert("Không thể đăng bài. Kiểm tra console để biết thêm chi tiết.");
    }
  };
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
              <label className="pb-2" //for="topic-title"
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
              <p className="text-red-600 dark:text-red-400 text-sm mt-2 hidden">
                Tiêu đề không được để trống.
              </p>
            </div>
            <div className="flex flex-col w-full">
              <p className="text-gray-900 dark:text-white text-base font-medium leading-normal pb-2">
                Nội dung bài viết
              </p>
              <div className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary dark:focus-within:border-primary transition-all">
                <div className="flex items-center gap-1 p-2 border-b border-gray-300 dark:border-gray-700 bg-background-light dark:bg-gray-900/50">
                  <button className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
                    <span className="material-symbols-outlined text-xl">
                      format_bold
                    </span>
                  </button>
                  <button className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
                    <span className="material-symbols-outlined text-xl">
                      format_italic
                    </span>
                  </button>
                  <button className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
                    <span className="material-symbols-outlined text-xl">
                      format_underlined
                    </span>
                  </button>
                  <div className="w-px h-6 bg-gray-300 dark:border-gray-700 mx-1"></div>
                  <button className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
                    <span className="material-symbols-outlined text-xl">
                      format_list_bulleted
                    </span>
                  </button>
                  <button className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
                    <span className="material-symbols-outlined text-xl">
                      format_list_numbered
                    </span>
                  </button>
                  <div className="w-px h-6 bg-gray-300 dark:border-gray-700 mx-1"></div>
                  <button className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
                    <span className="material-symbols-outlined text-xl">
                      link
                    </span>
                  </button>
                  <button className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
                    <span className="material-symbols-outlined text-xl">
                      image
                    </span>
                  </button>
                </div>
                <textarea
                  className="form-input flex w-full min-w-0 flex-1 resize-y overflow-hidden text-gray-900 dark:text-white focus:outline-0 focus:ring-0 border-0 bg-white dark:bg-gray-800 min-h-60 placeholder:text-gray-500 dark:placeholder:text-gray-400 p-[15px] text-base font-normal leading-normal"
                  placeholder="Viết nội dung của bạn ở đây..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                ></textarea>
              </div>
            </div>

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
                    onChange={(e) => setIsPinned(e.target.checked)}
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
                    onChange={(e) => setNotifyMembers(e.target.checked)}
                  />
                  <span className="text-gray-700 dark:text-gray-300">
                    Gửi thông báo cho tất cả thành viên về chủ đề này
                  </span>
                </label>
              </div>
            </div>
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
