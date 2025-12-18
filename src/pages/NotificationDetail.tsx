import { data, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function NotificationDetail() {
  const { inviteId } = useParams();
  const [invite, setInvite] = useState(null);
  const token = localStorage.getItem("token");
  console.log("inviteId", inviteId);
  console.log("token", token);
  const navigate = useNavigate();
  useEffect(() => {
    fetchInvite();
  }, [inviteId, token]);
  const fetchInvite = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/clubs/invites/${inviteId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setInvite(res.data);
      console.log("invite data", res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAccept = async (inviteId) => {
    try {
      await axios.post(
        `http://localhost:8000/api/clubs/invites/${inviteId}/accept`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate(-1);
      fetchInvite();
      alert("Bạn đã chấp nhận lời mời tham gia câu lạc bộ!");
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
      navigate(-1);
      fetchInvite();
      alert("Bạn đã từ chối lời mời tham gia câu lạc bộ!");
    } catch (err) {
      console.error(err);
    }
  };

  if (!invite) return <p>Đang tải...</p>;

  return (
    <main className="flex-1 flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="flex flex-col items-center p-8 sm:p-12 text-center">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-28 h-28 sm:w-32 sm:h-32 mb-6 border-4 border-gray-200"
            style={{
              backgroundImage: `url("http://localhost:8000/${invite.club.avatar_url}")`,
            }}
          ></div>
          <h1 className="text-slate-800 text-2xl sm:text-3xl font-bold leading-tight tracking-tight">
            Bạn được mời tham gia {invite.club.name}!
          </h1>
          <p className="text-gray-500 text-base font-normal leading-normal mt-3 max-w-lg">
            {invite.club.description}
          </p>
          <p className="text-gray-500 text-sm font-medium leading-normal mt-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-base">person</span>
            <span>Mời bởi {invite.inviter.displayName}</span>
          </p>
          {invite.status === "accepted" ? (
            <p className="text-green-600 font-semibold mt-4">
              Bạn đã chấp nhận lời mời này.
            </p>
          ) : invite.status === "rejected" ? (
            <p className="text-red-600 font-semibold mt-4">
              Bạn đã từ chối lời mời này.
            </p>
          ) : (
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => handleAccept(invite.id)}
                className="px-3 py-1.5 font-bold bg-primary text-white rounded-md hover:bg-primary/90"
              >
                Chấp nhận
              </button>
              <button
                onClick={() => handleReject(invite.id)}
                className="px-3 py-1.5 font-bold bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Từ chối
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default NotificationDetail;
