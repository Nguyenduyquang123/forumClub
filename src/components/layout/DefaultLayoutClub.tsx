import { useEffect, useState, type ReactNode } from "react";
import Header from "./Header";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function DefaultLayoutClub({ children }: { children: ReactNode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [club, setClub] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  const [memberClub, setMemberClub] = useState(null);

  const navClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors 
    ${isActive ? "bg-primary/10 font-bold text-primary" : ""}`;

  useEffect(() => {
    const fetchClub = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Vui lòng đăng nhập để xem CLB này");
        navigate("/login");
        return;
      }

      try {
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

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/clubs/${id}/my-role`,
          {
            params: { user_id: user.id },
          }
        );
        setMemberClub(res.data);
      } catch (err) {
        console.error("Lỗi khi lấy vai trò thành viên:", err);
      }
    };

    fetchRole();
  }, [id, user.id]);

  if (loading) return <p>⏳ Đang tải...</p>;
  if (!club) return null;
  return (
    <div>
      <Header />
      <div className="flex flex-1">
        <aside className="sticky top-[69px] h-[calc(100vh-69px)] w-64 flex-col justify-between bg-white dark:bg-background-dark p-4 border-r border-slate-200 dark:border-slate-800 hidden lg:flex">
          {/* Khối trên */}
          <div className="flex flex-col gap-4">
            <div className="bg-primary rounded-xl p-4 text-white shadow-lg shadow-teal-500/20 ">
              <h2 className="font-bold text-lg mb-1 align-center">
                {club.name}
              </h2>
              <p className="text-teal-100 text-xs opacity-90"></p>
            </div>

            {/* Menu chính */}
            <div className="flex flex-col gap-1 mt-2">
              <NavLink to={`/homeClub/${id}`} end className={navClass}>
                <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">
                  home
                </span>
                <p className="text-slate-600 dark:text-slate-200 text-sm font-medium leading-normal">
                  Trang chủ
                </p>
              </NavLink>
              {(memberClub?.role === "owner" ||
                memberClub?.role === "admin") && (
                <NavLink to={`/homeClub/${id}/Statistic`} className={navClass}>
                  <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">
                    analytics
                  </span>
                  <p className="text-slate-600 dark:text-slate-200 text-sm font-medium leading-normal">
                    Thống kê
                  </p>
                </NavLink>
              )}
              <NavLink to={`/homeClub/${id}/my-post-club`} className={navClass}>
                <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">
                  edit_square
                </span>
                <p className="text-slate-600 dark:text-slate-200 text-sm font-medium leading-normal">
                  Bài viết của tôi
                </p>
              </NavLink>

              <NavLink to={`/homeClub/${id}/memberclub`} className={navClass}>
                <span className="material-symbols-outlined text-2xl text-slate-600">
                  group
                </span>
                <p className="text-sm text-slate-600 font-medium leading-normal">
                  Thành viên
                </p>
              </NavLink>
              {(memberClub?.role === "owner" ||
                memberClub?.role === "admin") && (
                <NavLink to={`/homeClub/${id}/member`} className={navClass}>
                  <span className="material-symbols-outlined text-2xl text-slate-600">
                    person_add
                  </span>
                  <p className="text-sm text-slate-600 font-medium leading-normal">
                    Thành viên chờ duyệt
                  </p>
                </NavLink>
              )}
            </div>

            {/* Gạch chia */}
            <div className="w-full border-t border-slate-200 dark:border-slate-800 my-2"></div>

            {/* Danh mục */}
            <h3 className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase px-3">
              Danh Mục
            </h3>
            <div className="flex flex-col gap-1">
              <NavLink to={`/homeClub/${id}/notification`} className={navClass}>
                <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">
                  campaign
                </span>
                <p className="text-slate-800 dark:text-slate-200 text-sm font-medium leading-normal">
                  Thông báo chung
                </p>
              </NavLink>

              <NavLink to={`/homeClub/${id}/discuss-club`} className={navClass}>
                <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">
                  forum
                </span>
                <p className="text-slate-800 dark:text-slate-200 text-sm font-medium leading-normal">
                  Thảo luận Chung
                </p>
              </NavLink>

              <NavLink to={`/homeClub/${id}/even-club`} className={navClass}>
                <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">
                  celebration
                </span>
                <p className="text-slate-800 dark:text-slate-200 text-sm font-medium leading-normal">
                  Sự kiện
                </p>
              </NavLink>
            </div>
          </div>

          {/* Khối dưới */}
          <div className="flex flex-col gap-1">
            <NavLink to="/clubs" className={navClass}>
              <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">
                gavel
              </span>
              <p className="text-slate-800 dark:text-slate-200 text-sm font-medium leading-normal">
                Quy định
              </p>
            </NavLink>
            {(memberClub?.role === "owner" || memberClub?.role === "admin") && (
              <NavLink
                to={`/homeClub/${id}/club-settings`}
                className={navClass}
              >
                <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">
                  settings
                </span>
                <p className="text-slate-800 dark:text-slate-200 text-sm font-medium leading-normal">
                  Cài đặt câu lạc bộ
                </p>
              </NavLink>
            )}
          </div>
        </aside>

        <main className="flex-1 p-6 sm:p-4 lg:pl-15 lg:pr-15">{children}</main>
      </div>
    </div>
  );
}
export default DefaultLayoutClub;
