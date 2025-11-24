import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ItemEven from "../components/ItemEven";
import ItemDiscuss from "../components/ItemDiscuss";
import TimeAgo from "timeago-react";

function HomeClub() {
  const { id } = useParams(); // id câu lạc bộ trên URL
  const navigate = useNavigate();
  const [club, setClub] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const clubId = id;
  const [membersCount, setMembersCount] = useState([]);
  const [countNotify, setCountNotify] = useState(0);
  const [countDiscuss, setCountDiscuss] = useState(0);
  const [countEvents, setCountEvents] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));
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
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/clubs/${clubId}/member`
        );
        setMembersCount(res.data);
      } catch (err) {
        console.error("Lỗi khi tải danh sách thành viên:", err);
      }
    };
    fetchMembers();
  }, [clubId]);
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const recentMembers = membersCount.filter((member) => {
    const joinedAt = new Date(member.joined_at);
    return joinedAt >= oneWeekAgo; // chỉ lấy người mới trong 7 ngày qua
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy bài đăng
        const postRes = await axios.get(
          `http://localhost:8000/api/clubs/${clubId}/posts`
        );

        const posts = postRes.data.posts;

        // 1) Thông báo chung
        setCountNotify(posts.filter((p) => p.notify_members === 1).length);

        // 2) Thảo luận tự do
        setCountDiscuss(
          posts.filter((p) => !p.notify_members || p.notify_members === 0)
            .length
        );

        // 3) Sự kiện sắp tới
        const res = await axios.get(
          `http://localhost:8000/api/clubs/${clubId}/events`,
          {
            params: { user_id: user.id },
          }
        );
        const now = new Date();

        const upcomingAndCurrent = res.data.events.filter((event) => {
          const start = new Date(event.start_time);
          const end = new Date(event.end_time);

          const isCurrent = start <= now && now <= end;
          const isUpcoming = start > now;

          return isCurrent || isUpcoming;
        });
        setCountEvents(upcomingAndCurrent.length);
      } catch (err) {
        console.log("Lỗi lấy thống kê danh mục:", err);
      }
    };

    fetchData();
  }, [clubId]);
  console.log(countEvents);
  if (loading) return <p>⏳ Đang tải...</p>;
  if (!club) return null;

  return (
    <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-8 flex flex-col gap-8">
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
            {/* --- Thông báo chung --- */}
            <Link
              to={`/homeClub/${clubId}/notifications`}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-slate-500">
                  campaign
                </span>
                <span className="text-sm font-medium">Thông báo chung</span>
              </div>
              <span className="text-sm font-medium bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                {countNotify}
              </span>
            </Link>

            {/* --- Thảo luận tự do --- */}
            <Link
              to={`/homeClub/${clubId}/discuss`}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-slate-500">
                  forum
                </span>
                <span className="text-sm font-medium">Thảo luận tự do</span>
              </div>
              <span className="text-sm font-medium bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                {countDiscuss}
              </span>
            </Link>

            {/* --- Sự kiện sắp tới --- */}
            <Link
              to={`/homeClub/${clubId}/events`}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-slate-500">
                  celebration
                </span>
                <span className="text-sm font-medium">Sự kiện sắp tới</span>
              </div>
              <span className="text-sm font-medium bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                {countEvents}
              </span>
            </Link>
          </div>
        </div>
        <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
            Thành viên mới nhất
          </h3>
          <div className="flex flex-col gap-4">
            {recentMembers.length > 0 ? (
              recentMembers.map((member) => (
                <div className="flex items-center gap-3">
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                    data-alt="Avatar of Sarah Lee"
                    style={{
                      backgroundImage: `url(${
                        member.user?.avatarUrl || "/default-avatar.png"
                      })`,
                    }}
                  ></div>
                  <div>
                    <p className="font-semibold text-sm">
                      {member.user.displayName}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Tham gia{" "}
                      <TimeAgo datetime={member?.joined_at} locale="vi" />
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">
                Không có ai tham gia trong tuần qua
              </p>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
export default HomeClub;
