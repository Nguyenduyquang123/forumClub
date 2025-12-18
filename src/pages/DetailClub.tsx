import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function DetailClub() {
  const { clubId } = useParams();

  const [club, setClub] = useState(null);
  const [memberCount, setMemberCount] = useState(0);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")|| "");

  useEffect(() => {
    // Lấy thông tin CLB
    axios
      .get(`http://localhost:8000/api/clubs/${clubId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setClub(res.data);
      });

    // Lấy số lượng thành viên
    axios
      .get(`http://localhost:8000/api/clubs/${clubId}/members/count`)
      .then((res) => {
        setMemberCount(res.data.members_count);
      });
  }, [clubId]);
  const handleJoinRequest = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/clubs/${clubId}/join-request`,
        {
          user_id: user?.id, // tùy bạn đang lấy user ID từ đâu
        }
      );

      console.log("API response:", res.data);
      alert(res.data.message || "Đã gửi yêu cầu!");
    } catch (error: any) {
      if (error.response) {
        console.error("API Error:", error.response.data);
        alert(error.response.data.message || "Lỗi máy chủ");
      } else {
        console.error("Unexpected Error:", error);
        alert("Không thể gửi yêu cầu!");
      }
    }
  };

  if (!club) {
    return (
      <main className="flex justify-center items-center h-screen">
        <p className="text-slate-900 dark:text-white">Đang tải...</p>
      </main>
    );
  }

  return (
    <main className="flex flex-1 justify-center items-center p-4 sm:p-6 lg:p-8">
      <div className="layout-content-container w-full max-w-2xl flex flex-col items-center">
        <div
          className="bg-white dark:bg-gray-900 shadow-2xl rounded-xl p-8 sm:p-12 text-center w-full 
          ring-4 ring-blue-50 dark:ring-blue-900/50 transition-shadow duration-300 hover:shadow-3xl"
        >
          <div className="flex flex-col gap-4 mb-8 items-center">
            {/* AVATAR */}
            <img
              alt="Club Avatar"
              className="w-30 h-30 rounded-full object-cover mb-4 border-1  dark:border-gray-800 shadow-md"
              src={
                `http://localhost:8000/${club.avatar_url}` ||
                "https://via.placeholder.com/150"
              }
            />

            {/* TÊN CLB */}
            <h2 className="text-slate-900 dark:text-white sm:text-4xl font-black leading-tight tracking-[-0.033em]">
              {club.name}
            </h2>

            {/* SỐ THÀNH VIÊN */}
            <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400">
              <span className="material-symbols-outlined text-xl">groups</span>
              <span className="text-base font-medium">
                {memberCount} thành viên
              </span>
            </div>

            {/* MÔ TẢ */}
            <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg font-normal leading-relaxed max-w-lg mx-auto mt-2">
              {club.description || "CLB chưa có mô tả."}
            </p>
          </div>

          {/* BUTTON */}
          <div className="flex justify-center">
            <button
              onClick={handleJoinRequest}
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary text-slate-50 gap-2 pl-5 text-base font-bold leading-normal tracking-[0.015em] hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors duration-200"
            >
              <span className="material-symbols-outlined">add</span>
              <span className="truncate">Xin tham gia</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default DetailClub;
