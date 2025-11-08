import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// 2. Nhập các biểu tượng bạn cần từ thư viện Solid icons (fas)
import { faLocationDot, faCalendarDays } from '@fortawesome/free-solid-svg-icons';

const ItemEven = ({ limit }) => {
  const [events, setEvents] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/clubs/${id}/events`
        );
        setEvents(res.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sự kiện:", error);
      }
    };
    fetchEvents();
  }, []);
    const eventsToShow = limit ? events.slice(0, limit) : events;

  return (
    <>
      {eventsToShow.length > 0 ? (
        eventsToShow.map((event) => (
          <Link
            to={`detail-event/${event.id}`}
            key={event.id}
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
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="w-full p-4 bg-gradient-to-t from-black/60 to-transparent rounded-b-2xl">
                  <p className="text-white text-sm line-clamp-2">
                    {event.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Nội dung */}
            <div className="p-4 flex flex-col justify-between flex-1">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                  {event.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                <FontAwesomeIcon icon={faCalendarDays}  />  {new Date(event.start_time).toLocaleString("vi-VN")}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
               <FontAwesomeIcon icon={faLocationDot}  />   {event.location || "Chưa cập nhật địa điểm"}
                </p>
              </div>

              {/* Nút hành động
              <div className="flex gap-2 mt-4">
                <button className="flex-1 rounded-lg h-9 px-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white text-sm font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition">
                  Xem chi tiết
                </button>
                <button className="flex-1 rounded-lg h-9 px-3 bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition">
                  Đăng ký
                </button>
              </div> */}
            </div>
          </Link>
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
