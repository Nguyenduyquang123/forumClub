import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function MemberClubs() {
  const [members, setMembers] = useState([]);
  const id = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [memberData, setMemberData] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [updateFlag, setUpdateFlag] = useState(false);
  const clubId = id.id;
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/clubs/${clubId}/members`
        );
        setMembers(res.data);
      } catch (err) {
        console.error("Lỗi khi tải danh sách thành viên:", err);
      }
    };
    fetchMembers();
  }, [clubId, updateFlag]);
  const handleEditClick = (member) => {
    setSelectedMember(member); // Lưu thông tin member
    setIsOpen(true); // Mở modal
  };
  useEffect(() => {
    if (selectedMember) {
      const fetchMembersDetail = async () => {
        try {
          const res = await axios.get(
            `http://localhost:8000/api/members/${selectedMember}`
          );
          setMemberData(res.data.data); // dùng res.data chứ không phải res.data.data
          setSelectedRole(res.data.data.role);
        } catch (err) {
          console.error("Lỗi khi tải chi tiết thành viên:", err);
          setMemberData(null);
        }
      };
      fetchMembersDetail();
    }
  }, [selectedMember]);
  const handleSaveRole = async () => {
    try {
      await axios.put(
        `http://localhost:8000/api/members/${selectedMember}/role`,
        {
          role: selectedRole,
        }
      );
      alert("Cập nhật chức vụ thành công");
      setIsOpen(false);
      setUpdateFlag(true);
      // reload danh sách nếu muốn
    } catch (err) {
      console.error("Lỗi khi cập nhật role:", err);
      alert("Cập nhật thất bại");
    }
  };
  const token = localStorage.getItem("token"); // ✅ Lấy token từ localStorage

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

      await axios.post(
        `http://localhost:8000/api/clubs/${clubId}/invite`,
        { invitee_id: inviteeId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setStatus("✅ Đã gửi lời mời thành công!");
      setInput("");
    } catch (error) {
      console.error("Chi tiết lỗi:", error.response?.data || error.message);
      if (error.response?.data?.message) {
        setStatus("⚠️ " + error.response.data.message);
      } else {
        setStatus("⚠️ Gửi lời mời thất bại!");
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div className="flex flex-col gap-1">
          <p className="text-[#111418] dark:text-white text-3xl font-black leading-tight tracking-[-0.033em]">
            Quản lý Thành viên
          </p>
          <p className="text-[#617589] dark:text-gray-400 text-base font-normal leading-normal">
            Quản lý tất cả thành viên của Câu lạc bộ Cờ Vua.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white dark:bg-background-dark/80 p-6 rounded-xl border border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-bold text-[#111418] dark:text-white mb-4">
            Mời Thành viên Mới
          </h2>
          <div className="flex flex-col gap-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Nhập email hoặc tìm kiếm tên người dùng để gửi lời mời.
            </p>
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-gray-700 bg-transparent h-10 placeholder:text-[#617589] dark:placeholder:text-gray-500 px-3 text-sm font-normal leading-normal"
                placeholder="Email hoặc tên người dùng..."
              />
              <button
                onClick={handleSendInvite}
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90"
              >
                <span className="material-symbols-outlined text-lg">send</span>
                <span className="truncate">Gửi lời mời</span>
              </button>
            </div>
            {status && (
              <p className="text-sm mt-2 text-gray-600 dark:text-gray-300">
                {status}
              </p>
            )}
          </div>
        </div>
        <div className="bg-white dark:bg-background-dark/80 p-6 rounded-xl border border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-bold text-[#111418] dark:text-white mb-4">
            Lời mời đang chờ xử lý
          </h2>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                eva.davis@email.com
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Đã gửi: 2 ngày trước
                </span>
                <button
                  aria-label="Hủy lời mời"
                  className="p-1 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-400"
                >
                  <span className="material-symbols-outlined text-base">
                    close
                  </span>
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                frank.g@email.com
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Đã gửi: 1 tuần trước
                </span>
                <button
                  aria-label="Hủy lời mời"
                  className="p-1 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-400"
                >
                  <span className="material-symbols-outlined text-base">
                    close
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-grow">
          <label className="flex flex-col min-w-40 h-12 w-full">
            <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
              <div className="text-[#617589] dark:text-gray-400 flex border-none bg-white dark:bg-background-dark/80 items-center justify-center pl-4 rounded-l-lg border-r-0">
                <span className="material-symbols-outlined text-2xl">
                  search
                </span>
              </div>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-lg text-[#111418] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border-none bg-white dark:bg-background-dark/80 h-full placeholder:text-[#617589] dark:placeholder:text-gray-500 px-4 text-base font-normal leading-normal"
                placeholder="Tìm kiếm thành viên theo tên hoặc email..."
                value=""
              />
            </div>
          </label>
        </div>
        <div className="flex gap-3 items-center">
          <button className="flex h-12 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-background-dark/80 px-4 text-[#111418] dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800">
            <span className="material-symbols-outlined text-xl">
              admin_panel_settings
            </span>
            <p className="text-sm font-medium leading-normal">
              Chức vụ: Tất cả
            </p>
            <span className="material-symbols-outlined text-xl">
              expand_more
            </span>
          </button>
          <button className="flex h-12 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-background-dark/80 px-4 text-[#111418] dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800">
            <span className="material-symbols-outlined text-xl">circle</span>
            <p className="text-sm font-medium leading-normal">
              Trạng thái: Đang hoạt động
            </p>
            <span className="material-symbols-outlined text-xl">
              expand_more
            </span>
          </button>
        </div>
      </div>
      <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark/80">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-900/50">
              <tr className="text-left">
                <th className="px-6 py-4 font-medium text-[#111418] dark:text-gray-300 w-2/5">
                  Tên
                </th>
                <th className="px-6 py-4 font-medium text-[#111418] dark:text-gray-300">
                  Chức vụ
                </th>

                <th className="px-6 py-4 font-medium text-[#111418] dark:text-gray-300 text-right">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {members.map((member) => (
                <tr key={member.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-4">
                      <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                        style={{
                          backgroundImage: `url(${
                            member.user?.avatarUrl || "/default-avatar.png"
                          })`,
                        }}
                      ></div>
                      <div>
                        <div className="font-medium text-[#111418] dark:text-white">
                          {member.user?.displayName}
                        </div>
                        <div className="text-[#617589] dark:text-gray-400">
                          {member.user?.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                      {member?.role}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-[#617589] dark:text-gray-400">
                        <span className="material-symbols-outlined text-xl">
                          logout
                        </span>
                      </button>
                      <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-[#617589] dark:text-gray-400">
                        <span
                          className="material-symbols-outlined text-xl"
                          onClick={() => handleEditClick(member.id)}
                        >
                          edit
                        </span>
                      </button>
                      <button className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400">
                        <span className="material-symbols-outlined text-xl">
                          delete
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {members.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-6 text-gray-500 dark:text-gray-400"
                  >
                    Không có thành viên nào trong câu lạc bộ này.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {isOpen && memberData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative w-full max-w-2xl transform overflow-hidden rounded-xl bg-white dark:bg-[#1C2A36] text-left shadow-xl transition-all">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-gray-200 p-6 dark:border-gray-700">
              <div>
                <h2 className="text-xl font-bold text-[#111418] dark:text-white">
                  Chỉnh sửa chức vụ
                </h2>
                <p className="text-sm text-[#617589] dark:text-gray-400">
                  Gán vai trò và quyền hạn cho thành viên.
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg p-1.5"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6">
              <div className="flex flex-col items-center gap-4">
                <div
                  className="bg-center bg-cover rounded-full h-24 w-24"
                  style={{
                    backgroundImage: `url(${
                      memberData.user?.avatarUrl || "/default-avatar.png"
                    })`,
                  }}
                ></div>
                <div className="text-center">
                  <p className="text-lg font-bold dark:text-white">
                    {memberData?.user?.displayName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {memberData.user.email}
                  </p>
                </div>
              </div>

              {/* Role Options */}
              <div>
                <h3 className="font-bold text-[#111418] dark:text-white pb-3">
                  Chọn một chức vụ
                </h3>
                <div className="flex flex-col gap-3">
                  <label className="flex items-center gap-4 rounded-lg border border-solid border-[#dbe0e6] dark:border-gray-600 p-[15px] hover:border-primary/50 dark:hover:border-primary/70 cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/5 dark:has-[:checked]:border-primary dark:has-[:checked]:bg-primary/10">
                    <input
                      type="radio"
                      name="role_selection_radio"
                      value="owner"
                      checked={selectedRole === "owner"}
                      onChange={(e) => setSelectedRole(e.target.value)}
                      className="h-5 w-5 border-2 border-[#dbe0e6] ..."
                    />
                    <div className="flex grow flex-col">
                      <p className="text-[#111418] dark:text-gray-100 text-sm font-medium leading-normal">
                        chủ tịch
                      </p>
                      <p className="text-[#617589] dark:text-gray-400 text-sm font-normal leading-normal">
                        Có quyền xóa câu lạc bộ.
                      </p>
                    </div>
                  </label>
                  <label className="flex items-center gap-4 rounded-lg border border-solid border-[#dbe0e6] dark:border-gray-600 p-[15px] hover:border-primary/50 dark:hover:border-primary/70 cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/5 dark:has-[:checked]:border-primary dark:has-[:checked]:bg-primary/10">
                    <input
                      type="radio"
                      name="role_selection_radio"
                      value="admin"
                      checked={selectedRole === "admin"}
                      onChange={(e) => setSelectedRole(e.target.value)}
                      className="h-5 w-5 border-2 border-[#dbe0e6] ..."
                    />
                    <div className="flex grow flex-col">
                      <p className="text-[#111418] dark:text-gray-100 text-sm font-medium leading-normal">
                        Quản lý
                      </p>
                      <p className="text-[#617589] dark:text-gray-400 text-sm font-normal leading-normal">
                        Có quyền quản lý thành viên và nội dung.
                      </p>
                    </div>
                  </label>
                  <label className="flex items-center gap-4 rounded-lg border border-solid border-[#dbe0e6] dark:border-gray-600 p-[15px] hover:border-primary/50 dark:hover:border-primary/70 cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/5 dark:has-[:checked]:border-primary dark:has-[:checked]:bg-primary/10">
                    <input
                      type="radio"
                      name="role_selection_radio"
                      value="member"
                      checked={selectedRole === "member"}
                      onChange={(e) => setSelectedRole(e.target.value)}
                      className="h-5 w-5 border-2 border-[#dbe0e6] ..."
                    />
                    <div className="flex grow flex-col">
                      <p className="text-[#111418] dark:text-gray-100 text-sm font-medium leading-normal">
                        Thành viên
                      </p>
                      <p className="text-[#617589] dark:text-gray-400 text-sm font-normal leading-normal">
                        Tham gia đăng bài và bình luận.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Custom role */}
              {memberData.role === "owner" ? (
                <div>
                  <p className="text-sm dark:text-white mb-2">
                    Thêm chức vụ mới (chỉ dành cho người tạo CLB)
                  </p>
                  <div className="flex">
                    <input
                      className="border p-3 rounded-l-lg w-full"
                      placeholder="Nhập tên chức vụ..."
                    />
                    <button className="bg-gray-100 p-3 rounded-r-lg">
                      <span className="material-symbols-outlined">add</span>
                    </button>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 border-t p-6">
              <button
                onClick={() => setIsOpen(false)}
                className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
              >
                Hủy
              </button>
              <button
                onClick={handleSaveRole}
                className="px-5 py-2 rounded-lg bg-primary text-white hover:bg-primary/90"
              >
                Lưu chức vụ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default MemberClubs;
