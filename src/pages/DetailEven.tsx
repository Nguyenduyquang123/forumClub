import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function DetailEven() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/events/${eventId}`)
      .then((res) => setEvent(res.data))
      .catch((err) => console.error("Lỗi khi tải chi tiết sự kiện:", err));
  }, [eventId]);
  console.log(event)

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

            {/* Nút hành động */}
            <div className="flex justify-center">
              <div className="flex w-full flex-col items-stretch gap-3 px-4 py-3 md:flex-row">
                <button className="flex-1 h-12 bg-primary text-white font-bold rounded-lg">
                  Đăng ký tham gia
                </button>
                <button className="flex-1 h-12 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-bold rounded-lg">
                  Thêm vào lịch
                </button>
                <button className="flex-1 h-12 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-bold rounded-lg">
                  Chia sẻ
                </button>
              </div>
            </div>

            {/* Phần mô tả */}
            <div className="px-4 py-3">
              <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="-mb-px flex gap-6">
                  <a className="border-b-2 border-primary pb-4 text-sm font-medium text-primary">
                    Mô tả
                  </a>
                  <a className="border-b-2 border-transparent pb-4 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                    Người tham gia (12)
                  </a>
                  <a className="border-b-2 border-transparent pb-4 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                    Thảo luận
                  </a>
                </nav>
              </div>

              <div className="py-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Chi tiết sự kiện
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {event.description || "Chưa có mô tả cho sự kiện này."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DetailEven;
