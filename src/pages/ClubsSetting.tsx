import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastConfirm } from "../components/toastConfirm";
import { toast } from "react-toastify";

function ClubsSetting() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    avatar: null,
    public: null,
  });
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("");
  const token = localStorage.getItem("token");
  const [clubSettings, setClubSettings] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const [privacy, setPrivacy] = useState<number>(1);
  const [privacyStatus, setPrivacyStatus] = useState("");
  const [memberClub, setMemberClub] = useState(null);
  const userId = user?.id;
  const { id: clubId } = useParams();

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/clubs/${clubId}/my-role`,
          {
            params: { user_id: user.id },
          }
        );
        setMemberClub(res.data);
        console.log("memberClub", memberClub);
      } catch (err) {
        console.error("Lỗi khi lấy vai trò thành viên:", err);
      }
    };

    fetchRole();
  }, [clubId, user.id]);

  const handleDeleteClub = async () => {
    ToastConfirm(
      "Bạn có chắc chắn muốn xóa câu lạc bộ này không?",
      async () => {
        try {
          await axios.delete(`http://localhost:8000/api/clubs/${clubId}`, {
            data: { user_id: userId },
          });

        
          toast.success("Xóa câu lạc bộ thành công!");
          window.location.href = "/userClubs";
        } catch (err) {
          console.error(err);
          alert(err.response?.data?.message || "Lỗi khi xóa câu lạc bộ.");
          toast.error("Xóa câu lạc bộ thất bại!");
        }
      }
    );
  };

  useEffect(() => {
    if (clubSettings) {
      setForm({
        name: clubSettings.name,
        description: clubSettings.description,
        avatar: null,
        public: clubSettings.is_public,
      });
    }
    console.log(form);
  }, [clubSettings]);
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, avatar: file });
    }
  };
  const fetchClubSettings = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/clubs/${clubId}/settings`,
        {
          headers: {
            Authorization: `Bearer ${user?.api_token}`,
          },
        }
      );
      setClubSettings(response.data);

      setPrivacy(Number(response.data?.is_public));
    } catch (err) {
      console.error("Lỗi khi lấy cài đặt câu lạc bộ:", err);
    }
  };
  useEffect(() => {
    fetchClubSettings();
  }, [clubId]);
  const handleUpdate = async () => {
    const data = new FormData();
    data.append("name", form.name);
    data.append("description", form.description);

    if (form.avatar) {
      data.append("avatar", form.avatar);
    }

    try {
      await axios.post(
        `http://localhost:8000/api/clubs/${clubId}/update`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );


      toast.success("Cập nhật thành công!");
    } catch (err) {
      console.error(err);
      toast.error("Cập nhật thất bại!");
   
    }
  };
  const handleSendInvite = async () => {
    if (!input.trim()) {
      setStatus("Vui lòng nhập email hoặc tên người dùng.");
      return;
    }

    if (!token) {
      setStatus("⚠️ Bạn chưa đăng nhập.");
      return;
    }

    try {
      const userRes = await axios.get(`http://localhost:8000/api/users/find`, {
        params: { keyword: input },
        headers: { Authorization: `Bearer ${token}` },
      });

      const inviteeId = userRes.data.id;
      console.log(userRes.data);
      await axios.post(
        `http://localhost:8000/api/clubs/${clubId}/invite`,
        { invitee_id: inviteeId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setStatus("✅ Đã gửi lời mời thành công!");
      toast.success("Đã gửi lời mời thành công!");
      setInput("");
    } catch (error) {
      console.error("Chi tiết lỗi:", error.response?.data || error.message);
      if (error.response?.data?.message) {
        setStatus("⚠️ " + error.response.data.message);
      } else {
        setStatus("⚠️ Gửi lời mời thất bại!");
        toast.error("Gửi lời mời thất bại!");
      }
    }
  };
  const handleUpdatePrivacy = async () => {
    try {
      await axios.post(
        `http://localhost:8000/api/clubs/${clubId}/update-privacy`,
        { privacy },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPrivacyStatus("✅ Đã cập nhật quyền riêng tư");
      toast.success("Cập nhật quyền riêng tư thành công!");
    } catch (err) {
      console.error(err);
      setPrivacyStatus("❌ Cập nhật quyền riêng tư thất bại");
      toast.error("Cập nhật quyền riêng tư thất bại!");
    }
  };
  useEffect(() => {
    console.log("privacy updated:", privacy, typeof privacy);
  }, [privacy]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Cài đặt Câu lạc bộ
        </h1>
        <p className="mt-1 text-slate-600 dark:text-slate-400">
          Quản lý thông tin, thành viên và cài đặt của câu lạc bộ.
        </p>
      </div>
      <div className="space-y-10">
        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-3 mb-6">
            Thông tin chung
          </h2>
          <div className="space-y-6">
            <div>
              <label
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                for="club-name"
              >
                Tên câu lạc bộ
              </label>
              <input
                className="w-full p-2 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                id="club-name"
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                for="club-description"
              >
                Mô tả câu lạc bộ
              </label>
              <textarea
                className="p-2 w-full bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                id="club-description"
                rows="4"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Logo câu lạc bộ
              </label>
              <div className="flex items-center gap-4">
                <img
                  className="w-40 h-40 rounded-lg object-cover"
                  src={
                    form.avatar
                      ? URL.createObjectURL(form.avatar)
                      : `http://localhost:8000/${clubSettings?.avatar_url}`
                  }
                  alt="Club Logo"
                />
                <div>
                  <input
                    className="hidden"
                    id="logo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                  />
                  <label
                    className="cursor-pointer px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-md text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800"
                    for="logo-upload"
                  >
                    Thay đổi Logo
                  </label>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                    PNG, JPG, GIF up to 5MB.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-700">
              <button className="px-6 py-2 border border-slate-300 dark:border-slate-700 rounded-md text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800">
                Hủy
              </button>
              <button
                className="ml-3 px-6 py-2 bg-primary text-white rounded-md font-semibold hover:bg-blue-700"
                onClick={handleUpdate}
              >
                Lưu thay đổi
              </button>
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-3 mb-6">
            Quản lý thành viên
          </h2>
          <div className="space-y-6">
            <div>
              <label
                htmlFor="invite-code "
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
              >
                Mã mời
              </label>
              <input
                type="text"
                className=" px-3 py-1 border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-0 focus:ring-2 focus:ring-primary"
                value={clubSettings?.invite_code}
                readOnly
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                htmlFor="invite-member"
              >
                Mời thành viên mới
              </label>
              <div className="flex gap-2">
                <input
                  className="flex-grow bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  id="invite-member"
                  placeholder="Nhập email thành viên"
                  type="email"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <button
                  className="px-4 py-2 bg-primary text-white rounded-md font-semibold hover:bg-blue-700"
                  onClick={handleSendInvite}
                >
                  Gửi lời mời
                </button>
              </div>
              {status && (
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  {status}
                </p>
              )}
            </div>
          </div>
        </section>
        {memberClub?.role === "owner" && (
          <>
            <section>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                Quyền riêng tư
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="relative flex cursor-pointer rounded-lg border bg-white dark:bg-slate-800 p-4 shadow-sm focus:outline-none hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <input
                    className="sr-only peer"
                    name="privacy-setting"
                    type="radio"
                    value="public"
                    checked={privacy === 1}
                    onChange={() => setPrivacy(1)}
                  />

                  <span className="flex flex-1">
                    <span className="flex flex-col">
                      <span className="block text-sm font-medium text-slate-900 dark:text-white">
                        Công khai (Public)
                      </span>
                      <span className="mt-1 flex items-center text-sm text-slate-500 dark:text-slate-400">
                        Bất kỳ ai cũng có thể tìm thấy và xem nội dung câu lạc
                        bộ.
                      </span>
                    </span>
                  </span>

                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-px rounded-lg border-2 border-transparent peer-checked:border-primary peer-focus:border-primary"
                  ></span>
                </label>
                <label className="relative flex cursor-pointer rounded-lg border bg-white dark:bg-slate-800 p-4 shadow-sm focus:outline-none hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <input
                    className="sr-only peer"
                    name="privacy-setting"
                    type="radio"
                    value="private"
                    checked={privacy === 0}
                    onChange={() => setPrivacy(0)}
                  />

                  <span className="flex flex-1">
                    <span className="flex flex-col">
                      <span className="block text-sm font-medium text-slate-900 dark:text-white">
                        Riêng tư (Private)
                      </span>
                      <span className="mt-1 flex items-center text-sm text-slate-500 dark:text-slate-400">
                        Chỉ thành viên được duyệt mới có thể xem nội dung.
                      </span>
                    </span>
                  </span>

                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-px rounded-lg border-2 border-transparent peer-checked:border-primary peer-focus:border-primary"
                  ></span>
                </label>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleUpdatePrivacy}
                  className="px-5 py-2 bg-primary text-white rounded-md font-semibold hover:bg-blue-700"
                >
                  Lưu quyền riêng tư
                </button>
              </div>

              {privacyStatus && (
                <p className="mt-2 text-sm text-slate-600">{privacyStatus}</p>
              )}
            </section>

            <section>
              <div className="bg-danger-light dark:bg-danger-dark/20 border border-danger/30 rounded-lg p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                      Xóa câu lạc bộ
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 mt-1 max-w-xl">
                      Một khi bạn xóa câu lạc bộ, sẽ không thể khôi phục lại.
                      Tất cả bài đăng, bình luận và dữ liệu thành viên sẽ bị xóa
                      vĩnh viễn. Vui lòng chắc chắn.
                    </p>
                  </div>
                  <button
                    onClick={handleDeleteClub}
                    className="mt-4 md:mt-0 bg-red-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-700"
                  >
                    Xóa câu lạc bộ
                  </button>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
export default ClubsSetting;
