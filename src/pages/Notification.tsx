import axios from "axios";
import { useEffect, useState } from "react";
import TimeAgo from "timeago-react";
import "../utils/viLocale";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Notification() {
  // minimal runtime types for notifications/invites
  type User = { id: number; displayName?: string; avatarUrl?: string };
  type Club = { id: number; name?: string; avatar_url?: string };
  type NotificationItem = {
    id: number;
    type: string;
    created_at: string;
    is_read: number | 0 | 1;
    from_user?: User;
    from_user_id?: number;
    displayUsers?: User[];
    users?: User[];
    ids?: number[];
    related_post_id?: number;
    related_comment_id?: number;
    title?: string;
    message?: string;
    club?: Club;
    club_id?: number;
    displayText?: string;
  };
  type Invite = {
    id: number;
    club: Club & { id: number; avatar_url?: string };
    created_at: string;
  };

  const [invites, setInvites] = useState<Invite[]>([]);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const userId = user?.id;
  const [filterRead, setFilterRead] = useState<"all" | "unread">("all");
  const [filterType, setFilterType] = useState<
    "all" | "comment" | "invite" | "event" | "other"
  >("all");

  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const ITEMS_PER_PAGE = 5;

  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    fetchInvites();
    fetchNotifications1();
  }, []);
  const navigate = useNavigate();
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8000/api/notifications/${id}`);

      // Cập nhật UI không cần reload
      setNotifications((prev) => prev.filter((n) => n.id !== id));
      toast.success("Xóa thông báo thành công!");
    } catch (err) {
      console.log(err);
    }
  };
  const markAsReadGroup = async (noti: NotificationItem) => {
    try {
      const ids = Array.isArray(noti.ids) ? noti.ids : noti.id ? [noti.id] : [];
      if (ids.length === 0) return;

      await Promise.all(
        ids.map((id) =>
          axios.post(`http://localhost:8000/api/notifications/read/${id}`)
        )
      );

      // Cập nhật UI
      setNotifications((prev) =>
        prev.map((n) =>
          ids.some((id) => n.id === id || n.ids?.includes(id))
            ? { ...n, is_read: 1 }
            : n
        )
      );
      
     
    } catch (err) {
      console.error(err);
    }
  };

  const handleRedirect = async (noti: NotificationItem) => {
    try {
      // 1. Gọi API đánh dấu đã đọc
      await axios.post(
        `http://localhost:8000/api/notifications/read/${noti.id}`
      );

      // 2. Update UI tại chỗ (không cần reload)
      setNotifications((prev) =>
        prev.map((item) =>
          item.id === noti.id ? { ...item, is_read: 1 } : item
        )
      );
      // Trường hợp like/comment/comment_like => vào bài post
      if (["like", "comment", "comment_like"].includes(noti.type)) {
        navigate(
          `/homeClub/${noti.club_id}/discuss-club/post/${noti.related_post_id}`
        );
        return;
      }

      // Bài đăng mới từ CLB
      if (noti.type === "club_post") {
        navigate(`/homeClub/${noti.club_id}/notification`);
        return;
      }

      // Sự kiện CLB
      if (noti.type === "club_event") {
        navigate(
          `/homeClub/${noti.club_id}/even-club/detail-event/${noti.from_user_id}`
        );
        return;
      }

      if (noti.type === "join_approved") {
        navigate(`/homeClub/${noti.club_id}`);
        return;
      }

      if (noti.type === "join_rejected") {
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchInvites = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/clubs/invites/pending",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setInvites(res.data);
    } catch (err) {
      console.error("Lỗi khi tải lời mời:", err);
    }
  };

  const fetchNotifications1 = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/users/${userId}/notifications`
      );

      const grouped = groupNotifications(res.data);
      setNotifications(grouped);
    } catch (err) {
      console.error(err);
    }
  };

  const groupNotifications = (list: (NotificationItem & { club_name?: string })[]) => {
    const result: NotificationItem[] = [];
    const map: Record<
      string,
      NotificationItem & {
        users?: User[];
        ids?: number[];
        is_read?: number;
        displayUsers?: User[];
      }
    > = {};

    list.forEach((n) => {
      const groupTypes = [
        "like",
        "comment",
        "comment_like",
        "join_approved",
        "join_rejected",
      ];

      if (!groupTypes.includes(n.type)) {
        result.push(n);
        return;
      }

      let key;
      if (n.type === "club_post") {
        n.displayText = `<strong>${n.from_user?.displayName}</strong> đã đăng bài trong <strong>${n.club?.name}</strong>`;
        n.displayUsers = n.from_user ? [n.from_user] : [];
      }
      if (n.type === "club_event") {
        key = `club_event_${n.id}`;
        map[key] = {
          ...n,
          displayUsers: [],
          displayText: `<strong>${n.club_name ?? n.club?.name}</strong> đã đăng sự kiện "${n.title}"`,
        };
        return;
      }

      if (n.type === "comment_like") {
        key = `comment_like_${n.related_comment_id}`;
      } else {
        key = `${n.type}_${n.related_post_id}`;
      }

      if (n.type === "join_approved") {
        n.displayText = `Bạn đã được duyệt vào câu lạc bộ <strong>${n.club?.name}</strong>`;
        result.push(n);
        return;
      }

      if (n.type === "join_rejected") {
        n.displayText = `Yêu cầu tham gia câu lạc bộ <strong>${n.club?.name}</strong> đã bị từ chối`;
        result.push(n);
        return;
      }

      if (!map[key]) {
        map[key] = {
          ...n,
          users: n.from_user ? [n.from_user] : [],
          ids: [n.id], // Lưu id của thông báo
          is_read: n.is_read, // trạng thái ban đầu
        };
      } else {
        const fromUserId = n.from_user?.id;
        if (fromUserId && !map[key].users?.some((u) => u.id === fromUserId)) {
          map[key].users = map[key].users || [];
          map[key].users.push(n.from_user as User);
        }
        map[key].ids = [...(map[key].ids || []), n.id]; // Thêm id vào nhóm
        map[key].is_read = map[key].is_read && n.is_read ? 1 : 0; // nhóm đã đọc nếu tất cả đã đọc
      }
    });

    Object.values(map).forEach((n) => {
      const usersArr = n.users || [];
      const count = usersArr.length;
      const u1 = usersArr[0];

      if (n.type === "like") {
        n.displayText =
          count === 1
            ? `<strong>${u1?.displayName}</strong> ${n.title}`
            : `<strong>${u1?.displayName}</strong> và ${count - 1} người khác ${n.title}`;
      }

      if (n.type === "comment") {
        n.displayText =
          count === 1
            ? `<strong>${u1?.displayName}</strong> ${n.message}`
            : `<strong>${u1?.displayName}</strong> và ${count - 1} người khác  ${n.message}`;
      }

      if (n.type === "comment_like") {
        n.displayText =
          count === 1
            ? `<strong>${u1?.displayName}</strong> đã thích bình luận của bạn`
            : `<strong>${u1?.displayName}</strong> và ${count - 1} người khác đã thích bình luận của bạn`;
      }

      n.displayUsers = usersArr;
      result.push(n);
    });
    result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return result;
  };
  const filteredNotifications = notifications.filter((noti) => {
    // 1️⃣ Lọc theo trạng thái đọc
    if (filterRead === "unread" && noti.is_read === 1) {
      return false;
    }

    // 2️⃣ Lọc theo loại thông báo
    if (filterType !== "all") {
      const mapType = {
        comment: ["comment", "comment_like", "like"],
        invite: ["invite", "join_approved", "join_rejected"],
        event: ["club_event"],
        other: ["club_post"],
      };

      if (!mapType[filterType]?.includes(noti.type)) {
        return false;
      }
    }

    return true;
  });

  const totalItems = filteredNotifications.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const paginatedNotifications = filteredNotifications.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const filterItemClass = (active: boolean) =>
    `px-3 py-2 text-sm font-medium rounded-md cursor-pointer
   transition-colors duration-200
   ${active ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"}`;

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 flex-grow">
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-1/4 xl:w-1/5">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm sticky top-24">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
              Bộ lọc
            </h2>

            <div className="space-y-4">
              {/* Trạng thái */}
              <div>
                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  Trạng thái
                </h3>

                <div className="flex flex-col gap-2">
                  <a
                    onClick={() => setFilterRead("all")}
                    className={filterItemClass(filterRead === "all")}
                  >
                    Tất cả
                  </a>

                  <a
                    onClick={() => setFilterRead("unread")}
                    className={filterItemClass(filterRead === "unread")}
                  >
                    Chưa đọc
                  </a>
                </div>
              </div>

              {/* Loại thông báo */}
              <div>
                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  Loại thông báo
                </h3>
                <a
                  onClick={() => {
                    setFilterType("all");
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-2 text-sm font-medium rounded-md cursor-pointer
    transition-colors duration-200
    ${
      filterType === "all"
        ? "bg-primary/10 text-primary"
        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
    }
  `}
                >
                  Tất cả
                </a>

                <div className="flex flex-col gap-2">
                  <a
                    onClick={() => setFilterType("comment")}
                    className={filterItemClass(filterType === "comment")}
                  >
                    Bình luận & Trả lời
                  </a>

                  <a
                    onClick={() => setFilterType("invite")}
                    className={filterItemClass(filterType === "invite")}
                  >
                    Lời mời
                  </a>

                  <a
                    onClick={() => setFilterType("event")}
                    className={filterItemClass(filterType === "event")}
                  >
                    Sự kiện
                  </a>

                  <a
                    onClick={() => setFilterType("other")}
                    className={filterItemClass(filterType === "other")}
                  >
                    Khác
                  </a>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <div className="w-full lg:w-3/4 xl:w-4/5">
          <header className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
              Tất cả thông báo
            </h1>
            <button className="text-sm font-medium text-primary hover:underline">
              Đánh dấu đã đọc tất cả
            </button>
          </header>
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {notifications.length === 0 && invites.length === 0 ? (
                <li className="p-6 text-center text-gray-600 dark:text-gray-400">
                  Bạn không có thông báo nào.
                </li>
              ) : null}
              {invites.map((invite) => (
                <li
                  onClick={() => navigate(`/notification/${invite.id}`)}
                  className="p-4 sm:p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 group relative bg-primary/5 dark:bg-primary/10"
                >
                  <div className="flex items-start gap-4">
                    <div className="relative h-12 w-12 shrink-0">
                      <img
                        alt="Avatar Yêu Sách Hà Nội"
                        className="h-12 w-12 rounded-full object-cover"
                        src={`http://localhost:8000/${invite.club.avatar_url}`}
                      />
                      <div className="absolute -bottom-1 -right-1 flex items-center justify-center size-6 rounded-full bg-purple-500 text-white border-2 border-white dark:border-gray-800">
                        <span className="material-symbols-outlined !text-[14px]">
                          groups
                        </span>
                      </div>
                    </div>

                    <div className="flex-1">
                      <p className="text-sm text-gray-800 dark:text-gray-200">
                        Bạn có một lời mời tham gia câu lạc bộ{" "}
                        <a
                          className="font-bold hover:underline"
                          href={`/clubs/${invite.club.id}`}
                        >
                          "{invite.club.name}"
                        </a>
                        .
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <TimeAgo datetime={invite.created_at} locale="vi" />
                      </p>
                    </div>

                    <div className="w-2.5 h-2.5 bg-primary rounded-full absolute top-6 right-6"></div>
                  </div>
                </li>
              ))}
              {paginatedNotifications.map((noti) => (
                <li
                  key={noti.id}
                  onClick={() => handleRedirect(noti)} // <--- cần thêm
                  className={`p-4 sm:p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 group relative 
      ${
        noti.is_read === 0
          ? "bg-primary/5 dark:bg-primary/10"
          : "bg-white dark:bg-gray-800"
      }`}
                >
                  <div className="flex items-start gap-4">
                    {(noti.type === "like" ||
                      noti.type === "comment" ||
                      noti.type === "comment_like" ||
                      noti.type === "club_event") &&
                      noti.displayUsers && (
                        <div className="flex -space-x-2">
                          {noti.displayUsers.slice(0, 1).map((user) => (
                            <img
                              key={user.id}
                              src={user.avatarUrl}
                              alt={user.displayName}
                              className="h-10 w-10 rounded-full border-2 border-white dark:border-gray-800 object-cover"
                            />
                          ))}
                          {noti.displayUsers.length > 1 && (
                            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-300 dark:bg-gray-700 text-xs font-bold border-2 border-white dark:border-gray-800 -ml-2">
                              +{noti.displayUsers.length - 1}
                            </div>
                          )}
                        </div>
                      )}
                    {["join_approved", "join_rejected"].includes(noti.type) && (
                      <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                        <span className="material-symbols-outlined text-blue-600">
                          how_to_reg
                        </span>
                      </div>
                    )}

                    {noti.type === "invite" && (
                      <div className="relative h-12 w-12 shrink-0">
                        <img
                          className="h-12 w-12 rounded-full object-cover"
                          src={`http://localhost:8000/${noti.club?.avatar_url}`}
                        />
                        <div className="absolute -bottom-1 -right-1 flex items-center justify-center size-6 rounded-full bg-purple-500 text-white border-2">
                          <span className="material-symbols-outlined !text-[14px]">
                            groups
                          </span>
                        </div>
                      </div>
                    )}

                    {noti.type === "club_event" && (
                      <div className="h-12 w-12 rounded-lg bg-red-100 dark:bg-red-900/50 flex items-center justify-center">
                        <span className="material-symbols-outlined text-red-500">
                          event_available
                        </span>
                      </div>
                    )}
                    {noti.type === "club_post" && (
                      <div className=" ">
                        <img
                          src={
                            noti.club?.avatar_url
                              ? `http://localhost:8000/${noti.club.avatar_url}`
                              : "/default-club.png"
                          }
                          alt={noti.club?.name}
                          className="w-10 h-10 rounded-full object-cover border"
                        />
                      </div>
                    )}

                    <div className="flex-1">
                      {[
                        "like",
                        "comment",
                        "comment_like",
                        "club_event",
                        "join_approved",
                        "join_rejected",
                      ].includes(noti.type) && (
                        <div
                          className="text-sm mt-1"
                          dangerouslySetInnerHTML={{
                            __html: noti.displayText ?? "",
                          }}
                        ></div>
                      )}

                      {noti.type === "invite" && (
                        <p className="text-sm text-gray-800 dark:text-gray-200">
                          Bạn có một lời mời tham gia câu lạc bộ{" "}
                          <a
                            className="font-bold hover:underline"
                            href={`/clubs/${noti.club?.id}`}
                          >
                            "{noti.club?.name}"
                          </a>
                          .
                        </p>
                      )}
                      {noti.type === "club_post" && (
                        <div className="flex items-center gap-3">
                          <p className="text-sm text-gray-800 dark:text-gray-200">
                            CLB{" "}
                            {noti.club ? (
                              <a
                                className="font-bold hover:underline"
                                href={`/clubs/${noti.club.id}`}
                              >
                                "{noti.club.name}"
                              </a>
                            ) : (
                              <span className="italic text-gray-500">
                                Không xác định
                              </span>
                            )}{" "}
                            đã có thông báo mới
                          </p>
                        </div>
                      )}
                      {noti.type === "club_event" && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Sự kiện mới{" "}
                          <a className="font-bold hover:underline text-gray-800 dark:text-gray-200">
                            "{noti.title}"
                          </a>{" "}
                          .
                        </p>
                      )}

                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <TimeAgo datetime={noti.created_at} locale="vi" />
                      </p>
                    </div>

                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // tránh click vào li redirect
                          markAsReadGroup(noti);
                        }}
                        className="flex size-8 items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-400"
                        title="Đánh dấu đã đọc"
                      >
                        <span className="material-symbols-outlined !text-[18px]">
                          done
                        </span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // tránh click vào li gây redirect
                          handleDelete(noti.id);
                        }}
                        className="flex size-8 items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-400"
                        title="Xóa"
                      >
                        <span className="material-symbols-outlined !text-[18px]">
                          delete
                        </span>
                      </button>
                    </div>

                    {noti.is_read === 0 && (
                      <div className="w-2.5 h-2.5 bg-primary rounded-full absolute top-6 right-6"></div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Hiển thị {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
                {Math.min(currentPage * ITEMS_PER_PAGE, totalItems)} trên{" "}
                {totalItems} kết quả
              </span>

              <div className="flex gap-1">
                {/* Prev */}
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="flex items-center justify-center h-8 w-8 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40"
                >
                  <span className="material-symbols-outlined !text-lg">
                    chevron_left
                  </span>
                </button>

                {/* Page numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`flex items-center justify-center h-8 w-8 rounded-md text-sm font-bold
          ${
            page === currentPage
              ? "bg-primary/10 text-primary"
              : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
          }`}
                    >
                      {page}
                    </button>
                  )
                )}

                {/* Next */}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  className="flex items-center justify-center h-8 w-8 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40"
                >
                  <span className="material-symbols-outlined !text-lg">
                    chevron_right
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Notification;
