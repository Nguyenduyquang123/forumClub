import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ItemEven from "../components/ItemEven";
import ItemDiscuss from "../components/ItemDiscuss";

function HomeClub() {
  const { id } = useParams(); // id câu lạc bộ trên URL
  const navigate = useNavigate();
  const [club, setClub] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClub = async () => {
      const token = localStorage.getItem("token");

      // 🔒 Nếu chưa đăng nhập → chuyển về login
      if (!token) {
        alert("Vui lòng đăng nhập để xem CLB này");
        navigate("/login");
        return;
      }

      try {
        // 📡 Gọi API lấy thông tin CLB
        const res = await axios.get(`http://localhost:8000/api/clubs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setClub(res.data);
      } catch (err: any) {
        if (err.response) {
          if (err.response.status === 403) {
            alert("🚫 Bạn không có quyền truy cập CLB này");
            navigate("/");
          } else if (err.response.status === 404) {
            alert("❌ CLB không tồn tại");
            navigate("/");
          } else if (err.response.status === 401) {
            alert("🔒 Phiên đăng nhập hết hạn, vui lòng đăng nhập lại");
            navigate("/login");
          }
        } else {
          console.error("Lỗi kết nối:", err);
          alert("Không thể kết nối đến máy chủ");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchClub();
  }, [id, navigate]);

  if (loading) return <p>⏳ Đang tải...</p>;
  if (!club) return null;

  return (
    <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-8 flex flex-col gap-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
          {club.name}
        </h2>
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Sự kiện sắp tới
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ItemEven limit={2} />
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Hoạt động gần đây
          </h2>
          <div className="flex flex-col gap-3 ">
            <ItemDiscuss excludePinned={true} />
          </div>
        </section>
      </div>
      <aside className="lg:col-span-4 flex flex-col gap-8">
        <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
            Danh mục diễn đàn
          </h3>
          <div className="flex flex-col gap-1">
            <a
              className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              href="#"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-slate-500">
                  campaign
                </span>
                <span className="text-sm font-medium">Thông báo chung</span>
              </div>
              <span className="text-sm font-medium bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                12
              </span>
            </a>
            <a
              className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              href="#"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-slate-500">
                  forum
                </span>
                <span className="text-sm font-medium">Thảo luận tự do</span>
              </div>
              <span className="text-sm font-medium bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                89
              </span>
            </a>
            <a
              className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              href="#"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-slate-500">
                  code
                </span>
                <span className="text-sm font-medium">Dự án A</span>
              </div>
              <span className="text-sm font-medium bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                45
              </span>
            </a>
            <a
              className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              href="#"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-slate-500">
                  celebration
                </span>
                <span className="text-sm font-medium">Sự kiện sắp tới</span>
              </div>
              <span className="text-sm font-medium bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                8
              </span>
            </a>
          </div>
        </div>
        <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
            Thành viên mới nhất
          </h3>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                data-alt="Avatar of Sarah Lee"
              ></div>
              <div>
                <p className="font-semibold text-sm">Sarah Lee</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Tham gia 2 giờ trước
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                data-alt="Avatar of Mark Chen"
              ></div>
              <div>
                <p className="font-semibold text-sm">Mark Chen</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Tham gia 5 giờ trước
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                data-alt="Avatar of Emily Carter"
              ></div>
              <div>
                <p className="font-semibold text-sm">Emily Carter</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Tham gia 1 ngày trước
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
export default HomeClub;
