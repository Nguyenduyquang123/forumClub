import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function EvenClub() {
  const { id: clubId } = useParams();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [memberClub, setMemberClub] = useState([]);
  const [events, setEvents] = useState([]);
  const [activeTab, setActiveTab] = useState("all"); // tab mặc định: tất cả
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const EVENTS_PER_PAGE = 8;
  // --- Lấy role ---
  useEffect(() => {
    const fetchRole = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/clubs/${clubId}/my-role`,
          { params: { user_id: user.id } }
        );
        setMemberClub(res.data);
      } catch (err) {
        console.error("Lỗi khi lấy vai trò thành viên:", err);
      }
    };
    fetchRole();
  }, [clubId, user.id]);

  // --- Lấy events ---
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        let res;
        if (activeTab === "joined") {
          // Gọi API lấy sự kiện mà user tham gia
          res = await axios.get(
            `http://localhost:8000/api/users/${user.id}/joined-events`,
            { params: { club_id: clubId } }
          );
          setEvents(res.data.events);
          console.log("joined events", res.data.events);
        } else {
          // Gọi API lấy tất cả sự kiện của câu lạc bộ
          res = await axios.get(
            `http://localhost:8000/api/clubs/${clubId}/events`,
            { params: { user_id: user.id } }
          );
          setEvents(res.data.events);
          console.log("all events", res.data.events);
        }
      } catch (err) {
        console.error("Lỗi khi lấy sự kiện:", err);
      }
    };

    fetchEvents();
  }, [clubId, user.id, activeTab]); // thêm activeTab vào dependency

  // --- Filter events theo tab ---
  const filteredEvents =
    activeTab === "joined"
      ? events
      : events.filter((e) => {
          const now = new Date();
          const today = now.toISOString().split("T")[0];

          const startDay = e.start_time.split(" ")[0];
          const endDay = e.end_time.split(" ")[0];

          switch (activeTab) {
            case "ongoing":
              return startDay <= today && today <= endDay;
            case "upcoming":
              return startDay > today;
            case "past":
              return endDay < today;
            default:
              return true;
          }
        });
  const totalPages = Math.ceil(filteredEvents.length / EVENTS_PER_PAGE);

  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * EVENTS_PER_PAGE,
    currentPage * EVENTS_PER_PAGE
  );

  // --- Toggle menu popup ---
  const toggleMenu = (e: any, eventId: number) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === eventId ? null : eventId);
  };

  // --- Xóa sự kiện ---
  const deleteEvent = async (eventId: number) => {
    try {
      await axios.delete(`http://localhost:8000/api/events/${eventId}`, {
        data: { auth_user_id: user.id },
      });
      alert("Xóa sự kiện thành công");
      setEvents(events.filter((e) => e.id !== eventId));
      setOpenMenuId(null);
    } catch (err) {
      alert("Không thể xóa sự kiện");
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  return (
    <div className="layout-content-container flex flex-col w-full max-w-6xl flex-1 gap-6">
      {/* Header */}
      <div className="flex flex-wrap justify-between gap-4 items-center">
        <div className="flex flex-col gap-2">
          <p className="text-4xl font-black text-[#111418] dark:text-white">
            Sự kiện
          </p>
          <p className="text-base text-[#617589] dark:text-gray-400">
            Khám phá những gì đang diễn ra trong câu lạc bộ
          </p>
        </div>
      </div>

      {/* Menu */}
      <div className="flex flex-wrap gap-2 items-center">
        {[
          { key: "all", label: "Tất cả" },
          { key: "ongoing", label: "Đang diễn ra" },
          { key: "upcoming", label: "Sắp tới" },
          { key: "past", label: "Đã qua" },
          { key: "joined", label: "Sự kiện tôi tham gia" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-md ${
              activeTab === tab.key
                ? "bg-primary/20 text-primary font-semibold"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}

        {/* Nút tạo sự kiện */}
        {memberClub &&
          (memberClub.role === "admin" || memberClub.role === "owner") && (
            <Link
              to={`/homeClub/${clubId}/even-club/create-event`}
              className="ml-auto inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
            >
              Tạo sự kiện
            </Link>
          )}
      </div>

      {/* List sự kiện */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
        {filteredEvents.length > 0 ? (
          paginatedEvents.map((event) => (
            <div key={event.id} className="relative">
              <Link
                to={`/homeClub/${clubId}/even-club/detail-event/${event.id}`}
                className="flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all"
              >
                <div
                  className="w-full aspect-video bg-cover bg-center relative"
                  style={{
                    backgroundImage: `url("${
                      event.banner || "/default-banner.jpg"
                    }")`,
                  }}
                >
                  {(memberClub.role === "admin" ||
                    memberClub.role === "owner") && (
                    <button
                      onClick={(e) => toggleMenu(e, event.id)}
                      className="absolute top-2 right-2 p-2 bg-black/40 hover:bg-black/60 rounded-full text-white"
                    >
                      <span className="material-symbols-outlined">
                        more_vert
                      </span>
                    </button>
                  )}
                </div>
                <div className="p-4 flex flex-col">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <FontAwesomeIcon icon={faCalendarDays} />{" "}
                    {new Date(event.start_time).toLocaleString("vi-VN")}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <FontAwesomeIcon icon={faLocationDot} />{" "}
                    {event.location || "Chưa cập nhật địa điểm"}
                  </p>
                </div>
              </Link>

              {/* Popup menu */}
              {(memberClub?.role === "admin" ||
                memberClub?.role === "owner") && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenuId(openMenuId === event.id ? null : event.id);
                    }}
                    className="absolute top-2 right-2 p-2 bg-black/40 hover:bg-black/60 rounded-full text-white z-10"
                  >
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>

                  {openMenuId === event.id && (
                    <div
                      className="absolute top-10 right-3 bg-white dark:bg-gray-700 shadow-lg rounded-lg border border-gray-200 dark:border-gray-600 py-2 z-50"
                      onClick={(e) => e.stopPropagation()} // ngăn bubbling lên Link
                    >
                      <button
                        onClick={() => deleteEvent(event.id)}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        Xóa sự kiện
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500 dark:text-gray-400">
            Không có sự kiện nào
          </p>
        )}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 py-1 rounded-lg border 
                 disabled:opacity-50 disabled:cursor-not-allowed
                 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>

          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 rounded-lg border ${
                currentPage === index + 1
                  ? "bg-primary text-white"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 py-1 rounded-lg border 
                 disabled:opacity-50 disabled:cursor-not-allowed
                 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default EvenClub;
