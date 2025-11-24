import axios from "axios";
import { useEffect, useState } from "react";
import TimeAgo from "timeago-react";
import "../utils/viLocale";

function Notification() {
  const [invites, setInvites] = useState([]);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    fetchInvites();
  }, []);

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

  const handleAccept = async (inviteId) => {
    try {
      await axios.post(
        `http://localhost:8000/api/clubs/invites/${inviteId}/accept`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchInvites();
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (inviteId) => {
    try {
      await axios.post(
        `http://localhost:8000/api/clubs/invites/${inviteId}/reject`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchInvites();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/users/${userId}/notifications`)
      .then((res) => setNotifications(res.data))
      .catch((err) => console.error(err));
  }, [userId]);
  const notificationsWithUsers = notifications.map((n) => {
    if (n.type !== "like") return n;

    const users = [n.from_user]; // ví dụ bạn có thêm người khác từ server
    n.displayUsers = users;
    return n;
  });

  console.log(notifications);

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 flex-grow">
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-1/4 xl:w-1/5">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm sticky top-24">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
              Bộ lọc
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  Trạng thái
                </h3>
                <div className="flex flex-col gap-2">
                  <a
                    className="px-3 py-2 text-sm font-medium rounded-md bg-primary/10 text-primary dark:bg-primary/20"
                    href="#"
                  >
                    Tất cả
                  </a>
                  <a
                    className="px-3 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    href="#"
                  >
                    Chưa đọc
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  Loại thông báo
                </h3>
                <div className="flex flex-col gap-2">
                  <a
                    className="px-3 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    href="#"
                  >
                    Bình luận &amp; Trả lời
                  </a>
                  <a
                    className="px-3 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    href="#"
                  >
                    Lời mời
                  </a>
                  <a
                    className="px-3 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    href="#"
                  >
                    Sự kiện
                  </a>
                  <a
                    className="px-3 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    href="#"
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
                <li className="p-4 sm:p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 group relative bg-primary/5 dark:bg-primary/10">
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
                      <div className="mt-3 flex gap-2">
                        <button
                          onClick={() => handleAccept(invite.id)}
                          className="px-3 py-1.5 text-xs font-bold bg-primary text-white rounded-md hover:bg-primary/90"
                        >
                          Chấp nhận
                        </button>
                        <button
                          onClick={() => handleReject(invite.id)}
                          className="px-3 py-1.5 text-xs font-bold bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
                        >
                          Từ chối
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        className="flex size-8 items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-400"
                        title="Đánh dấu đã đọc"
                      >
                        <span className="material-symbols-outlined !text-[18px]">
                          done
                        </span>
                      </button>
                      <button
                        className="flex size-8 items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-400"
                        title="Xóa"
                      >
                        <span className="material-symbols-outlined !text-[18px]">
                          delete
                        </span>
                      </button>
                    </div>
                    <div className="w-2.5 h-2.5 bg-primary rounded-full absolute top-6 right-6"></div>
                  </div>
                </li>
              ))}
              {notifications.map((noti) => (
                <li
                  key={noti.id}
                  className={`p-4 sm:p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 group relative 
                  ${
                    noti.is_read === 0
                      ? "bg-primary/5 dark:bg-primary/10"
                      : "bg-white dark:bg-gray-800"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Avatar — mỗi loại khác nhau */}
                    {noti.type === "comment" && (
                      <img
                        className="h-12 w-12 rounded-full object-cover shrink-0"
                        src={`${noti.from_user.avatarUrl}`}
                        alt={noti.from_user.username}
                      />
                    )}

                    {noti.type === "invite" && (
                      <div className="relative h-12 w-12 shrink-0">
                        <img
                          className="h-12 w-12 rounded-full object-cover"
                          src={`http://localhost:8000/${noti.club.avatar_url}`}
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

                    {noti.type === "like" && (
                      <img
                        className="h-12 w-12 rounded-full object-cover shrink-0"
                        src={`${noti.from_user.avatarUrl}`}
                      />
                    )}

                    {/* Nội dung notification */}
                    <div className="flex-1">
                      {noti.type === "comment" && (
                        <p className="text-sm text-gray-800 dark:text-gray-200">
                          <a className="font-bold hover:underline">
                            {noti.from_user.username}
                          </a>{" "}
                          {noti.title}"
                        </p>
                      )}

                      {noti.type === "invite" && (
                        <p className="text-sm text-gray-800 dark:text-gray-200">
                          Bạn có một lời mời tham gia câu lạc bộ{" "}
                          <a
                            className="font-bold hover:underline"
                            href={`/clubs/${noti.club.id}`}
                          >
                            "{noti.club.name}"
                          </a>
                          .
                        </p>
                      )}

                      {noti.type === "club_event" && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Sự kiện{" "}
                          <a className="font-bold hover:underline text-gray-800 dark:text-gray-200">
                            "{noti.title}"
                          </a>{" "}
                          sắp diễn ra.
                        </p>
                      )}

                      {noti.type === "like" && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          <a
                            className="font-bold text-gray-800 dark:text-gray-200 hover:underline"
                            href="#"
                          >
                            {noti.displayUsers[0].displayName}
                          </a>
                          {noti.displayUsers.length > 1 && (
                            <>
                              {" và "}
                              <a
                                className="font-bold text-gray-800 dark:text-gray-200 hover:underline"
                                href="#"
                              >
                                {noti.displayUsers.length - 1} người khác
                              </a>
                            </>
                          )}{" "}
                          đã thích bài viết của bạn.
                        </p>
                      )}

                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <TimeAgo datetime={noti.created_at} locale="vi" />
                      </p>
                    </div>

                    {/* Nút hover */}
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="flex size-8 items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-400">
                        <span className="material-symbols-outlined !text-[18px]">
                          done
                        </span>
                      </button>
                      <button className="flex size-8 items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-400">
                        <span className="material-symbols-outlined !text-[18px]">
                          delete
                        </span>
                      </button>
                    </div>

                    {/* Dot unread */}
                    {/* Chấm xanh nếu chưa đọc */}
                    {noti.is_read === 0 && (
                      <div className="w-2.5 h-2.5 bg-primary rounded-full absolute top-6 right-6"></div>
                    )}
                  </div>
                </li>
              ))}

              {/* <li className="p-4 sm:p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 group relative bg-primary/5 dark:bg-primary/10">
                <div className="flex items-start gap-4">
                  <img
                    alt="Avatar Anh Tuấn"
                    className="h-12 w-12 rounded-full object-cover shrink-0"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCyLzd0jyf5ZyU7hk_05c7yZoT1rr0K3dPA3z10yrUBNRRR94a-XKabUmqrNs0M-A0T6u-MfP5WaQ1mTX5ZFt1iZSUTgC8hsdbpk2y5equpmbjgptz2rNyuMDEPAMbSWacecTwKoBLXyqDGDrrjnLm4NdAEGQq81zac5cjWIDEPggoqy3QoO5ShEr-dLhEd0IqZHrwl6kdJ4ihhqByqHixCSuSVz3vm_UpTHz6AzU8gN1OS_LkytVwl3Sarc4zgLimvaP6vOpmMk0"
                  />
                  <div className="flex-1">
                    <p className="text-sm text-gray-800 dark:text-gray-200">
                      <a className="font-bold hover:underline" href="#">
                        Anh Tuấn
                      </a>{" "}
                      đã bình luận trong chủ đề{" "}
                      <a
                        className="font-bold text-primary hover:underline"
                        href="#"
                      >
                        "Kế hoạch dã ngoại cuối tuần"
                      </a>
                      .
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      5 phút trước
                    </p>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      className="flex size-8 items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-400"
                      title="Đánh dấu đã đọc"
                    >
                      <span className="material-symbols-outlined !text-[18px]">
                        done
                      </span>
                    </button>
                    <button
                      className="flex size-8 items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-400"
                      title="Xóa"
                    >
                      <span className="material-symbols-outlined !text-[18px]">
                        delete
                      </span>
                    </button>
                  </div>
                  <div className="w-2.5 h-2.5 bg-primary rounded-full absolute top-6 right-6"></div>
                </div>
              </li> */}

              {/* <li className="p-4 sm:p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 group relative">
                <div className="flex items-start gap-4">
                  <div className="relative h-12 w-12 shrink-0">
                    <div className="h-12 w-12 rounded-lg bg-red-100 dark:bg-red-900/50 flex items-center justify-center">
                      <span className="material-symbols-outlined text-red-500 dark:text-red-400">
                        event_available
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Sự kiện{" "}
                      <a
                        className="font-bold text-gray-800 dark:text-gray-200 hover:underline"
                        href="#"
                      >
                        "Gặp mặt cuối năm"
                      </a>{" "}
                      sắp diễn ra trong 3 ngày tới.
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      2 ngày trước
                    </p>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      className="flex size-8 items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-400"
                      title="Đánh dấu chưa đọc"
                    >
                      <span className="material-symbols-outlined !text-[18px]">
                        drafts
                      </span>
                    </button>
                    <button
                      className="flex size-8 items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-400"
                      title="Xóa"
                    >
                      <span className="material-symbols-outlined !text-[18px]">
                        delete
                      </span>
                    </button>
                  </div>
                </div>
              </li>
              <li className="p-4 sm:p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 group relative">
                <div className="flex items-start gap-4">
                  <img
                    alt="Avatar Minh Quang"
                    className="h-12 w-12 rounded-full object-cover shrink-0"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDv5aGmh91JabphkJY56powVZPX2PUiCgGoKcsFdfapRGPHcun4zfxJa_HYc3nN-k9wgdusjCWA3PHRcHyIL3XSdHlco48lmWy0kcgn6A-Q3Nz1ppPEyDkbdSDNfhUwb-4unEaOJfQdDUwF7qtZIOXD_69Z72Qy436P17v0SiB_ro3a6Ia8nfoJdXJoZYmNrjIehAWF_Q7Z4M2bbI03oIx5i3z3z4xNr3yc8KVOF7wt8gucTVC3_wzSk8t9UG5b6mA4SkMrcvhfkqE"
                  />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <a
                        className="font-bold text-gray-800 dark:text-gray-200 hover:underline"
                        href="#"
                      >
                        Minh Quang
                      </a>{" "}
                      và{" "}
                      <a
                        className="font-bold text-gray-800 dark:text-gray-200 hover:underline"
                        href="#"
                      >
                        2 người khác
                      </a>{" "}
                      đã thích bài viết của bạn.
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      3 ngày trước
                    </p>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      className="flex size-8 items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-400"
                      title="Đánh dấu chưa đọc"
                    >
                      <span className="material-symbols-outlined !text-[18px]">
                        drafts
                      </span>
                    </button>
                    <button
                      className="flex size-8 items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-400"
                      title="Xóa"
                    >
                      <span className="material-symbols-outlined !text-[18px]">
                        delete
                      </span>
                    </button>
                  </div>
                </div>
              </li> */}
            </ul>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Hiển thị 1-4 trên 24 kết quả
              </span>
              <div className="flex gap-1">
                <button className="flex items-center justify-center h-8 w-8 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
                  <span className="material-symbols-outlined !text-lg">
                    chevron_left
                  </span>
                </button>
                <button className="flex items-center justify-center h-8 w-8 rounded-md bg-primary/10 text-primary dark:bg-primary/20 text-sm font-bold">
                  1
                </button>
                <button className="flex items-center justify-center h-8 w-8 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm font-medium">
                  2
                </button>
                <button className="flex items-center justify-center h-8 w-8 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm font-medium">
                  3
                </button>
                <span className="flex items-center justify-center h-8 w-8 text-gray-500">
                  ...
                </span>
                <button className="flex items-center justify-center h-8 w-8 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm font-medium">
                  6
                </button>
                <button className="flex items-center justify-center h-8 w-8 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
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
