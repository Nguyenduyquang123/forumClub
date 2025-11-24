import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";



function DetailEven() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [members, setMembers] = useState([]);
  const [joined, setJoined] = useState(false);
  const userlocal = JSON.parse(localStorage.getItem("user") || "{}");

  const fetchParticipants = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/events/${eventId}/participants`
      );
      setMembers(res.data);
      setJoined(res.data.some((p) => p.user.id === userlocal.id));
    } catch (err) {
      console.error("Lỗi khi tải danh sách người tham gia:", err);
    }
  };

  useEffect(() => {
    fetchParticipants();
  }, [eventId]);

  // Toggle tham gia / hủy
  const handleToggleJoin = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/events/${eventId}/toggle-join`,
        { user_id: userlocal.id } // gửi userId
      );
      setJoined(res.data.joined);
      fetchParticipants(); // refresh danh sách người tham gia
    } catch (err) {
      console.error("Lỗi khi thay đổi trạng thái tham gia:", err);
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/events/${eventId}`)
      .then((res) => setEvent(res.data))
      .catch((err) => console.error("Lỗi khi tải chi tiết sự kiện:", err));
  }, [eventId]);

  if (!event)
    return <p className="text-center mt-10">⏳ Đang tải chi tiết sự kiện...</p>;
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 md:px-10 lg:px-20 xl:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1 gap-6">
            {/* Banner */}
            <div
              className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden min-h-80 md:min-h-[320px] lg:min-h-[400px] rounded-xl"
              style={{
                backgroundImage: `url("${
                  event?.banner ? event.banner : "/default-banner.jpg"
                }")`,
              }}
            ></div>

            {/* Thông tin sự kiện */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap justify-between gap-4 p-4">
                <div className="flex min-w-72 flex-col gap-3">
                  <p className="text-gray-900 dark:text-white text-3xl md:text-4xl font-black leading-tight">
                    {event.title}
                  </p>
                  <div className="flex items-center gap-2">
                    <img
                      alt="Avatar CLB"
                      className="size-6 rounded-full object-cover"
                      src={event.creator.avatarUrl || "https://placehold.co/40"}
                    />
                    <p className="text-gray-500 dark:text-gray-400 text-base">
                      Người tạo "{event.creator.displayName}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Thời gian và địa điểm */}
              <div className="flex flex-col gap-2 px-4">
                <div className="flex items-center gap-4 min-h-14">
                  <div className="text-gray-800 dark:text-gray-200 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 shrink-0 size-10">
                    <span className="material-symbols-outlined">
                      calendar_month
                    </span>
                  </div>
                  <p className="text-gray-800 dark:text-gray-200 text-base flex-1">
                    {event.start_time || "Chưa cập nhật thời gian"}
                  </p>
                </div>
                <div className="flex items-center gap-4 min-h-14">
                  <div className="text-gray-800 dark:text-gray-200 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 shrink-0 size-10">
                    <span className="material-symbols-outlined">
                      location_on
                    </span>
                  </div>
                  <p className="text-gray-800 dark:text-gray-200 text-base flex-1">
                    {event.location || "Chưa cập nhật địa điểm"}
                  </p>
                </div>
              </div>
            </div>

            {event.require_registration === 1 ? (
              <div className="flex justify-center">
                <div className="flex w-full flex-col items-stretch gap-3 px-4 py-3 md:flex-row">
                  <div>
                    <button
                      className={`h-12 w-110 font-bold rounded-lg ${
                        joined
                          ? "bg-red-500 text-white"
                          : "bg-primary text-white"
                      }`}
                      onClick={handleToggleJoin}
                    >
                      {joined ? "Hủy tham gia" : "Tham gia"}
                    </button>
                  </div>
                  <button className="flex-1 h-12 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-bold rounded-lg">
                    Thêm vào lịch
                  </button>
                </div>
              </div>
            ) : null}

            {/* Phần mô tả */}
            <div className="px-4 py-3">
              <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="-mb-px flex gap-6">
                  <button
                    onClick={() => setActiveTab("description")}
                    className={`pb-4 text-sm font-medium border-b-2 ${
                      activeTab === "description"
                        ? "border-primary text-primary"
                        : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    }`}
                  >
                    Mô tả
                  </button>

                  <button
                    onClick={() => setActiveTab("participants")}
                    className={`pb-4 text-sm font-medium border-b-2 ${
                      activeTab === "participants"
                        ? "border-primary text-primary"
                        : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    }`}
                  >
                    Người tham gia ({members.length})
                  </button>
                </nav>
              </div>
              {activeTab === "description" && (
                <div className="py-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    Chi tiết sự kiện
                  </h3>
                    <div
                      className="
                        text-gray-600 dark:text-gray-300 leading-relaxed 
                        [&_ul]:list-disc [&_ul]:ml-6 
                        [&_ol]:list-decimal [&_ol]:ml-6 
                        [&_li]:mb-1 
                        [&_p]:mb-3
                      "
                      dangerouslySetInnerHTML={{ __html: event.description || "Chưa có mô tả cho sự kiện này." }}
                    ></div>
                </div>
              )}
              {activeTab === "participants" && (
                <div className="py-6">
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {members.length} người tham gia
                      </h3>
                      <div className="relative w-full sm:max-w-xs rounded-lg border-gray-300 border-2 border-solid ">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 b">
                          <span
                            className="material-symbols-outlined text-gray-500 dark:text-gray-400"
                            //     style="font-size: 20px;"
                          >
                            search
                          </span>
                        </div>
                        <input
                          className="block w-full rounded-lg border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white pl-10 h-10 text-sm"
                          placeholder="Tìm kiếm người tham gia..."
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      {members.map((m) => (
                        <div
                          key={m.id}
                          className="flex items-center gap-4 rounded-lg bg-gray-50 dark:bg-gray-800 p-3"
                        >
                          <img
                            alt={m.user.avataUrl}
                            className="w-12 h-12 rounded-full object-cover"
                            src={
                              m.user.avatarUrl ||
                              "https://via.placeholder.com/48"
                            }
                          />
                          <div className="flex-1">
                            <p className="font-bold text-gray-900 dark:text-white">
                              {m.user.displayName}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {m.role}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DetailEven;
