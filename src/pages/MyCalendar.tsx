import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import vi from "date-fns/locale/vi";
import { useEffect, useState } from "react";
import axios from "axios";

import "react-big-calendar/lib/css/react-big-calendar.css";
import { useNavigate } from "react-router-dom";

const locales = { vi };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const messages = {
  today: "Hôm nay",
  previous: "Trước",
  next: "Tiếp",
  month: "Tháng",
  week: "Tuần",
  day: "Ngày",
  agenda: "Lịch biểu",
  date: "Ngày",
  time: "Giờ",
  event: "Sự kiện",
  noEventsInRange: "Không có sự kiện nào.",
};

export default function MyCalendar() {
  const [events, setEvents] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");

        const res = await axios.get(
          `http://localhost:8000/api/calendar/${user.id}`
        );

        // Chuyển dữ liệu backend sang format mà react-big-calendar hiểu
        const mappedEvents = res.data.map((e) => ({
            id: e.event_id,
            club_id: e.club_id,
          title: e.title,
          start: new Date(e.start), // backend nên trả ISO string
          end: new Date(e.end),
        }));

        setEvents(mappedEvents);
    
        console.log("Lấy sự kiện lịch cá nhân:", events);
      } catch (err) {
        console.error("Lỗi khi tải sự kiện:", err);
      }
    };

    fetchEvents();
  }, []);
const handleSelectEvent = (event) => {
  // event ở đây là object của sự kiện
  navigate(`/homeClub/${event.club_id}/even-club/detail-event/${event.id}`);
};

  return (
    <div className="h-[600px] border rounded-2xl p-4 bg-white dark:bg-neutral-900 dark:border-neutral-700 shadow">
      <Calendar
        localizer={localizer}
        culture="vi"
        messages={messages}
        events={events}
        startAccessor="start"
        endAccessor="end"
        className="rbc-tailwind"
        onSelectEvent={handleSelectEvent}
      />
    </div>
  );
}
