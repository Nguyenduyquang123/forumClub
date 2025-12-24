import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface JoinRequest {
  id: number;
  user?: {
    displayName: string;
    avatarUrl: string;
  };
  created_at: string;
}

function AddMember() {
  const { id:clubId } = useParams();
  const [requests, setRequests] = useState<JoinRequest[]>([]);
  const [loading, setLoading] = useState(true);

  // ===== LOAD DATA =====
  useEffect(() => {
    const loadRequests = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:8000/api/clubs/${clubId}/join-requests`
        );
        setRequests(res.data || []);
      } catch (error) {
        console.error("Load requests error: ", error);
      } finally {
        setLoading(false);
      }
    };
    loadRequests();
  }, [clubId]);

  // ===== HANDLE APPROVE =====
  const handleApprove = async (reqId: number) => {
    try {
      await axios.post(
        `http://localhost:8000/api/clubs/${clubId}/join-requests/${reqId}/approve`
      );
      setLoading(true);
      const res = await axios.get(
        `http://localhost:8000/api/clubs/${clubId}/join-requests`
      );
      setRequests(res.data || []);
      setLoading(false);
      toast.success("Đã chấp nhận yêu cầu!");
    } catch (error) {
      console.error("Approve error:", error);
      setLoading(false);
    }
  };

  // ===== HANDLE REJECT =====
  const handleReject = async (reqId: number) => {
    try {
      await axios.post(
        `http://localhost:8000/api/clubs/${clubId}/join-requests/${reqId}/reject`
      );
      setLoading(true);
      const res = await axios.get(
        `http://localhost:8000/api/clubs/${clubId}/join-requests`
      );
      setRequests(res.data || []);
      setLoading(false);
      toast.success("Đã từ chối yêu cầu!");
    } catch (error) {
      console.error("Reject error:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center py-10">Đang tải...</p>;
  }

  return (
    <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="flex flex-col gap-8">
        <div className="flex flex-wrap justify-between gap-4 items-center">
          <h1 className="text-[#0e131b] dark:text-white text-3xl md:text-4xl font-black tracking-tighter">
            Danh sách Yêu cầu Xin vào CLB
          </h1>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="flex flex-col divide-y divide-gray-200 dark:divide-gray-700">

            {/* Không có yêu cầu */}
            {requests.length === 0 && (
              <div className="flex flex-col items-center justify-center text-center p-12">
                <span className="material-symbols-outlined text-6xl text-gray-400 dark:text-gray-500">
                  inbox
                </span>
                <p className="mt-4 text-base font-semibold text-[#0e131b] dark:text-white">
                  Không có yêu cầu mới nào
                </p>
                <p className="mt-1 text-sm text-[#6c757d] dark:text-gray-400">
                  Hiện tại không có yêu cầu xin tham gia nào đang chờ xử lý.
                </p>
              </div>
            )}

            {/* Có yêu cầu */}
            {requests.map((req: JoinRequest) => (
              <div
                key={req.id}
                className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-14"
                    style={{
                      backgroundImage: `url("${req.user?.avatarUrl}")`,
                    }}
                  ></div>

                  <div className="flex flex-col justify-center min-w-0">
                    <p className="text-[#0e131b] dark:text-white text-base font-bold truncate">
                      {req.user?.displayName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Gửi ngày: {new Date(req.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 shrink-0 self-end md:self-center">
                  <button
                    onClick={() => handleReject(req.id)}
                    className="px-4 py-2 text-sm font-semibold text-white bg-[#dc3545] rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Từ chối
                  </button>

                  <button
                    onClick={() => handleApprove(req.id)}
                    className="px-4 py-2 text-sm font-semibold text-white bg-[#28a745] rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Chấp nhận
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default AddMember;
