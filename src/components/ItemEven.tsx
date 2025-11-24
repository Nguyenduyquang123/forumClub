import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";

const ItemEven = ({ limit }) => {
  const [events, setEvents] = useState([]);
  const { id: clubId } = useParams();
  const [openMenuId, setOpenMenuId] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  // ==========================
  // 1. Fetch danh sách sự kiện
  // ==========================
  const fetchEvents = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/clubs/${clubId}/events`,
        {
          params: { user_id: user.id },
        }
      );

      setEvents(res.data.events);
      setUserRole(res.data.user_role_in_club);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách sự kiện:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);


  const toggleMenu = (e, eventId) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenMenuId(openMenuId === eventId ? null : eventId);
  };

  const deleteEvent = async (eventId) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/events/${eventId}`,
        {
          data: { auth_user_id: user.id },
        }
      );

      alert(res.data.message);

      // Cập nhật lại danh sách
      fetchEvents();
      setOpenMenuId(null);
    } catch (err) {
      alert(err.response?.data?.error || "Không thể xóa sự kiện");
    }
  };


  useEffect(() => {
    const handleClickOutside = () => setOpenMenuId(null);
    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const eventsToShow = limit ? events.slice(0, limit) : events;

  return (
    <>
      {eventsToShow.length > 0 ? (
        eventsToShow.map((event) => (
          <div key={event.id} className="relative">
            <Link
              to={`/homeClub/${clubId}/even-club/detail-event/${event.id}`}
              className="flex flex-col bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Banner */}
              <div
                className="w-full aspect-video bg-cover bg-center relative"
                style={{
                  backgroundImage: `url("${
                    event?.banner ? event.banner : "/default-banner.jpg"
                  }")`,
                }}
              >
                {/* Nút 3 chấm */}
                {(userRole === "owner" || userRole === "admin") && (
                  <button
                    onClick={(e) => toggleMenu(e, event.id)}
                    className="absolute top-2 right-2 p-2 bg-black/40 hover:bg-black/60 rounded-full text-white"
                  >
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                )}
              </div>

              {/* Nội dung */}
              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
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
              </div>
            </Link>

            {/* Popup menu */}
            {openMenuId === event.id && (
              <div
                className="absolute top-10 right-3 bg-white dark:bg-gray-700 shadow-lg rounded-lg border border-gray-200 dark:border-gray-600 py-2 z-50"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => deleteEvent(event.id)}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  Xóa sự kiện
                </button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500 dark:text-gray-400 text-center col-span-full">
          Không có sự kiện nào được tìm thấy.
        </p>
      )}
    </>
  );
};

export default ItemEven;
