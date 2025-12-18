import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ItemEven from "../components/ItemEven";
import ItemDiscuss from "../components/ItemDiscuss";
import TimeAgo from "timeago-react";

function HomeClub() {
  const { id: clubId } = useParams();
  const navigate = useNavigate();
  const [currentMember, setCurrentMember] = useState();
  const [club, setClub] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [pendingMembers, setPendingMembers] = useState<any[]>([]);
  const [members, setMembers] = useState<any[]>([]);
  const [countNotify, setCountNotify] = useState(0);
  const [countDiscuss, setCountDiscuss] = useState(0);
  const [countEvents, setCountEvents] = useState(0);
  const [allNotifies, setAllNotifies] = useState<any[]>([]);
  const [allDiscusses, setAllDiscusses] = useState<any[]>([]);
  const [allEvents, setAllEvents] = useState<any[]>([]);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/clubs/${clubId}/my-role`,
          {
            params: { user_id: user.id },
          }
        );
        setCurrentMember(res.data.role);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [clubId]);

  useEffect(() => {
    if (!token) {
      alert("Vui lòng đăng nhập để xem CLB này");
      navigate("/login");
      return;
    }

    const fetchClub = async () => {
      setLoading(true);

      try {
        const res = await axios.get(
          `http://localhost:8000/api/clubs/${clubId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setClub(res.data);
      } catch (err: any) {
        const status = err.response?.status;

        if (status === 401) {
          alert("🔒 Phiên đăng nhập hết hạn, vui lòng đăng nhập lại");
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        if (status === 403) {
          alert("🚫 Bạn không có quyền truy cập CLB này");
          navigate("/403");
          return;
        }

        if (status === 404) {
          alert("❌ CLB không tồn tại");
          navigate("/404");
          return;
        }

        alert("❗ Không thể kết nối đến máy chủ");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchClub();
  }, [clubId, token, navigate]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/clubs/${clubId}/member`
        );
        setMembers(res.data);
      } catch (err) {
        console.error("Lỗi khi tải danh sách thành viên:", err);
      }
    };
    fetchMembers();
  }, [clubId]);

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const recentMembers = members.filter(
    (m) => new Date(m.joined_at) >= oneWeekAgo
  );

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const postRes = await axios.get(
          `http://localhost:8000/api/clubs/${clubId}/posts`
        );
        const posts = postRes.data.posts || [];

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const countTodayNotify = posts.filter((p) => {
          const postDate = new Date(p.created_at);
          postDate.setHours(0, 0, 0, 0);
          return (
            postDate.getTime() === today.getTime() && p.notify_members === 1
          );
        }).length;

        const countTodayDiscuss = posts.filter((p) => {
          const postDate = new Date(p.created_at);
          postDate.setHours(0, 0, 0, 0);
          return (
            postDate.getTime() === today.getTime() &&
            (!p.notify_members || p.notify_members === 0)
          );
        }).length;

        setCountNotify(countTodayNotify);
        setCountDiscuss(countTodayDiscuss);
        setAllNotifies(posts.filter((p) => p.notify_members === 1));
        setAllDiscusses(
          posts.filter((p) => !p.notify_members || p.notify_members === 0)
        );

        const res = await axios.get(
          `http://localhost:8000/api/clubs/${clubId}/events`,
          {
            params: { user_id: user.id },
          }
        );

        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        const upcomingAndCurrent = (res.data.events || []).filter((event) => {
          const start = new Date(event.start_time);
          const end = new Date(event.end_time);

          return end >= today && start < tomorrow;
        });

        setAllEvents(res.data.events.length);
        setCountEvents(upcomingAndCurrent.length);
      } catch (err) {
        console.error("Lỗi lấy thống kê:", err);
      }
    };

    fetchStats();
  }, [clubId, user.id]);
  useEffect(() => {
    const fetchPending = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/clubs/${clubId}/join-requests`
        );
        setPendingMembers(res.data);
      } catch (err) {
        console.error("Lỗi khi tải danh sách chờ duyệt:", err);
      }
    };

    fetchPending();
  }, [clubId]);

  if (loading) return <p>⏳ Đang tải...</p>;
  if (!club) return null;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Sự kiện hôm nay",
            count: countEvents,
            icon: "calendar_month",
            color: "bg-blue-400",
          },
          {
            label: "Thông báo hôm nay",
            count: countNotify,
            icon: "campaign",
            color: "bg-yellow-500",
          },
          {
            label: "Thảo luận hôm nay",
            count: countDiscuss,
            icon: "forum",
            color: "bg-green-500",
          },
          {
            label: "Thành viên mới",
            count: recentMembers.length,
            icon: "person_add",
            color: "bg-purple-500",
          },
        ].map((item) => (
          <div
            key={item.label}
            className={`flex items-center gap-4 p-4 rounded-xl shadow h-25 ${item.color} text-white`}
          >
            <span className="material-symbols-outlined text-4xl">
              {item.icon}
            </span>
            <div className="flex flex-col">
              <span className="text-lg font-bold">{item.count}</span>
              <span className="text-sm">{item.label}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* ----- Dashboard chính ----- */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Tổng quan cá nhân hóa */}

          {/* Sự kiện sắp tới */}
          <section className="mt-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">
                event_upcoming
              </span>{" "}
              Sự kiện sắp tới
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ItemEven limit={2} />
            </div>
          </section>

          {/* Hoạt động gần đây */}
          <section className="mt-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">
                history
              </span>{" "}
              Hoạt động gần đây
            </h2>
            <div className="flex flex-col gap-3">
              <ItemDiscuss excludePinned={true} />
            </div>
          </section>
        </div>

        {/* ----- Sidebar cá nhân ----- */}
        <aside className="lg:col-span-4 flex flex-col gap-6">
          {/* Thành viên mới nhất */}
          <div className="bg-card-light dark:bg-card-dark rounded-xl shadow p-4">
            <h3 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">
              Thành viên mới nhất
            </h3>
            <div className="flex flex-col gap-3">
              {recentMembers.length > 0 ? (
                recentMembers.map((member) => (
                  <div key={member.user.id} className="flex items-center gap-3">
                    <div
                      className="bg-center bg-no-repeat bg-cover rounded-full w-12 h-12"
                      style={{
                        backgroundImage: `url(${
                          member.user.avatarUrl || "/default-avatar.png"
                        })`,
                      }}
                    />
                    <div>
                      <p className="font-semibold text-sm text-slate-900 dark:text-white">
                        {member.user.displayName}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Tham gia{" "}
                        <TimeAgo
                          datetime={
                            new Date(member.joined_at.replace(" ", "T") + "Z")
                          }
                          locale="vi"
                        />
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
          {/* Thành viên chờ duyệt */}
          {(currentMember === "owner" || currentMember === "admin") && (
            <div className="bg-card-light dark:bg-card-dark rounded-xl shadow p-4">
              <h3 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">
                Thành viên chờ duyệt
              </h3>

              <div className="flex flex-col gap-3">
                {pendingMembers.length > 0 ? (
                  pendingMembers.map((req) => (
                    <div
                      key={req.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="bg-center bg-no-repeat bg-cover rounded-full w-12 h-12"
                          style={{
                            backgroundImage: `url(${
                              req.user.avatarUrl || "/default-avatar.png"
                            })`,
                          }}
                        />
                        <div>
                          <p className="font-semibold text-sm text-slate-900 dark:text-white">
                            {req.user.displayName}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            Xin vào{" "}
                            <TimeAgo
                              datetime={
                                new Date(req.created_at.replace(" ", "T") + "Z")
                              }
                              locale="vi"
                            />
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">Không có ai xin vào</p>
                )}
              </div>
            </div>
          )}

          {/* Danh mục diễn đàn */}
          <div className="bg-card-light dark:bg-card-dark rounded-xl shadow p-4">
            <h3 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">
              Danh mục diễn đàn
            </h3>
            <div className="flex flex-col gap-2">
              {[
                {
                  label: "Thông báo chung",
                  count: allNotifies.length,
                  icon: "campaign",
                  link: "notification",
                },
                {
                  label: "Thảo luận tự do",
                  count: allDiscusses.length,
                  icon: "forum",
                  link: "discuss-club",
                },
                {
                  label: "Sự kiện",
                  count: allEvents,
                  icon: "celebration",
                  link: "even-club",
                },
              ].map((item) => (
                <Link
                  key={item.label}
                  to={`/homeClub/${clubId}/${item.link}`}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-slate-500">
                      {item.icon}
                    </span>
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  <span className="text-sm font-medium bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                    {item.count}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

export default HomeClub;
