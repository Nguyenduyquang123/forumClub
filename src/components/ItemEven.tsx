import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";

type EventType = {
  id: number;
  title: string;
  start_time: string;
  location?: string;
  banner?: string;
};

type ItemEvenProps = {
  limit?: number;
};

const ItemEven = ({ limit }: ItemEvenProps) => {
  const [events, setEvents] = useState<EventType[]>([]);
  const { id: clubId } = useParams();
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const fetchEvents = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/clubs/${clubId}/events`,
        { params: { user_id: user.id } }
      );

      const now = new Date();
      const upcomingEvents = (res.data.events || []).filter(
        (event: EventType) => new Date(event.start_time) > now
      );

      setEvents(upcomingEvents);
      setUserRole(res.data.user_role_in_club);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const eventsToShow = limit ? events.slice(0, limit) : events;

  return (
    <>
      {eventsToShow.map((event) => (
        <div key={event.id} className="relative">
          <Link
            to={`/homeClub/${clubId}/even-club/detail-event/${event.id}`}
            className="bg-white rounded-xl shadow-card overflow-hidden group hover:shadow-lg transition-all duration-300 block"
          >
            {/* Banner */}
            <div className="relative h-64 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>

              {(userRole === "owner" || userRole === "admin") && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenMenuId(openMenuId === event.id ? null : event.id);
                  }}
                  className="absolute top-4 right-4 z-20 bg-white/90 p-2 rounded-full"
                >
                  <span className="material-symbols-outlined">more_vert</span>
                </button>
              )}

              <div className="absolute bottom-4 left-4 z-20 text-white">
                <h2 className="text-2xl font-bold mb-2 line-clamp-2">
                  {event.title}
                </h2>
                <div className="flex items-center gap-4 text-sm">
                  <span>
                    <FontAwesomeIcon icon={faCalendarDays} />{" "}
                    {new Date(event.start_time).toLocaleString("vi-VN")}
                  </span>
                  <span>
                    <FontAwesomeIcon icon={faLocationDot} />{" "}
                    {event.location || "Chưa cập nhật"}
                  </span>
                </div>
              </div>

              <img
                src={event.banner || "/default-banner.jpg"}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </Link>

          {/* Menu */}
          {openMenuId === event.id && (
            <div className="absolute top-14 right-4 bg-white rounded-lg shadow z-50">
              <button className="px-4 py-2 text-red-600 hover:bg-gray-100 w-full text-left">
                Xóa sự kiện
              </button>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default ItemEven;
