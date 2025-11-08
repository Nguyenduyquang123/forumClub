import { useEffect, useState } from "react";
import axios from "axios";

function EditProfile() {
  const [user, setUser] = useState<any>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [passWord, setPassWord] = useState("");
  const [newPassWord, setNewPassWord] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  useEffect(() => {
    if (user) {
      setDisplayName(user?.displayName || "");
      setBio(user?.bio || "");
    }
  }, [user]);
  // 🟢 Lấy thông tin user từ token khi load trang
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get("http://localhost:8000/api/auth/profile/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
      } catch (err) {
        console.error("Lỗi khi lấy thông tin user:", err);
        // Xóa token nếu API trả về lỗi 401 (Unauthorized)
        localStorage.removeItem("token");
      }
    };
    fetchUser();
  }, []);

  // 🟢 Chọn file ảnh
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  // 🟢 Upload ảnh avatar
  // Upload ảnh avatar
  const handleUpload = async () => {
    if (!file) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Vui lòng đăng nhập lại.");
      localStorage.removeItem("token");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file); // Tên field 'avatar' khớp với backend

    setUploading(true);

    try {
      const res = await axios.post(
        "http://localhost:8000/api/user/avatar",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Đảm bảo đúng cú pháp
          },
        }
      );

      alert("Cập nhật ảnh thành công!");

      // Cập nhật state user với URL avatar mới từ response
      setUser((prev: any) => ({ ...prev, avatarUrl: res.data.avatar }));

      // Reset các state tạm thời
      setFile(null);
      setPreview(null);
    } catch (err: any) {
      console.error(err);
      if (err.response?.status === 401) {
        alert("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
        localStorage.removeItem("token");
      } else {
        alert(err.response?.data?.message || "Lỗi khi tải ảnh lên!");
      }
    } finally {
      setUploading(false);
    }
  };
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // ngăn reload trang khi submit form
    try {
      const token = localStorage.getItem("token");

      // ⚡ Lấy id từ user
      const userId = user?.id;

      if (!userId) {
        alert("Không tìm thấy ID người dùng!");
        return;
      }
      

      const res = await axios.put(
        `http://localhost:8000/api/users/${userId}`, // <-- dùng PUT + userId
        { displayName, bio },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser?.(res.data.user); // cập nhật lại state global
    } catch (err) {
      console.error(err);
      alert("Lỗi khi cập nhật thông tin!");
    }
  };
  const handleSubmitPassword = async (e) => {
    e.preventDefault(); // ngăn reload trang khi submit form
    try {
      const token = localStorage.getItem("token");

      // ⚡ Lấy id từ user
      const userId = user?.id;

      if (!userId) {
        alert("Không tìm thấy ID người dùng!");
        return;
      }
      if (newPassWord !== confirmNewPassword) {
        alert("Mật khẩu mới và xác nhận mật khẩu không trùng khớp!");
        return;
      }

      await axios.put(
        `http://localhost:8000/api/users/${userId}`, // <-- dùng PUT + userId
        {  oldPassword: passWord,
          password: newPassWord },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("cập nhật thông tin thành công!");
    } catch (err) {
      console.error(err);
      alert("Lỗi khi cập nhật thông tin!");
    }
  };

  if (!user) return <p className="p-4">⏳ Đang tải thông tin...</p>;

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <div className="flex flex-1 justify-center">
        <div className="flex flex-col max-w-[960px] flex-1 gap-8 p-4">
          <h2 className="text-3xl font-bold">Chỉnh sửa hồ sơ</h2>
          <hr />

          {/* Ảnh đại diện */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div
                className="bg-center bg-cover rounded-full h-32 w-32"
                style={{
                  backgroundImage: `url("${
                    preview || user.avatarUrl || "/default-avatar.png"
                  }")`,
                }}
              ></div>
              <div>
                <p className="text-xl font-bold">{user.displayName}</p>
                <p className="text-gray-500">Cập nhật ảnh đại diện</p>
              </div>
            </div>

            {/* Nút chọn và lưu ảnh */}
            <div className="flex gap-2">
              <input
                type="file"
                accept="image/*"
                id="avatarUpload"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <button
                onClick={() => document.getElementById("avatarUpload")?.click()}
                className="bg-gray-200 text-black px-4 py-2 rounded-lg font-semibold"
              >
                Tải ảnh lên
              </button>
              {file && (
                <button
                  onClick={handleUpload}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold"
                >
                  Lưu thay đổi
                </button>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-[#111418] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Thông tin cơ bản
            </h2>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-8"
            >
              {/* Nickname */}
              <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <p className="text-[#111418] dark:text-gray-200 text-base font-medium leading-normal pb-2">
                    Tên hiển thị / Nickname
                  </p>
                  <input
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] dark:text-white focus:outline-0 focus:ring-0 border border-[#dbe0e6] dark:border-gray-600 bg-white dark:bg-background-dark focus:border-primary dark:focus:border-primary h-14 placeholder:text-[#617589] p-[15px] text-base font-normal leading-normal"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                </label>
              </div>

              {/* Email */}
              <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <p className="text-[#111418] dark:text-gray-200 text-base font-medium leading-normal pb-2">
                    Email
                  </p>
                  <input
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-500 dark:text-gray-400 focus:outline-0 focus:ring-0 border border-[#dbe0e6] dark:border-gray-700 bg-gray-100 dark:bg-gray-800 h-14 placeholder:text-[#617589] p-[15px] text-base font-normal leading-normal cursor-not-allowed"
                    disabled
                    value={user?.email}
                  />
                </label>
              </div>

              {/* Bio */}
              <div className="flex w-full flex-wrap items-end gap-4 px-4 py-3 md:col-span-2">
                <label className="flex flex-col min-w-40 flex-1">
                  <p className="text-[#111418] dark:text-gray-200 text-base font-medium leading-normal pb-2">
                    Giới thiệu bản thân
                  </p>
                  <textarea
                    className="form-input flex w-full min-w-0 flex-1 resize-y overflow-hidden rounded-lg text-[#111418] dark:text-white focus:outline-0 focus:ring-0 border border-[#dbe0e6] dark:border-gray-600 bg-white dark:bg-background-dark focus:border-primary dark:focus:border-primary min-h-36 placeholder:text-[#617589] p-[15px] text-base font-normal leading-normal"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  ></textarea>
                </label>
              </div>

              {/* Submit */}
              <div className="px-4 py-3 md:col-span-2">
                <button
                  type="submit"
                  className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition font-medium"
                >
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>

          <div>
            <h2 className="text-[#111418] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Bảo mật
            </h2>
            <div className="w-full flex justify-between items-center ">
              <form
                onSubmit={handleSubmitPassword}
                className="p-4 pt-0 w-full border-gray-200 dark:border-gray-700 mt-2"
              >
                <div className="space-y-4">
                  {/* Mật khẩu cũ */}
                  <div>
                    <label
                      htmlFor="oldPassword"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Mật khẩu cũ
                    </label>
                    <input
                      type="password"
                      id="oldPassword"
                      name="oldPassword"
                      onChange={(e) => setPassWord(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                    />
                  </div>

                  {/* Mật khẩu mới */}
                  <div>
                    <label
                      htmlFor="newPassword"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Mật khẩu mới
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      //value={passwordData.newPassword}
                      onChange={(e) => setNewPassWord(e.target.value)}
                      required
                      minLength={6} // Thêm điều kiện độ dài tối thiểu
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                    />
                  </div>

                  {/* Xác nhận mật khẩu mới */}
                  <div>
                    <label
                      htmlFor="confirmNewPassword"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Xác nhận mật khẩu mới
                    </label>
                    <input
                      type="password"
                      id="confirmNewPassword"
                      name="confirmNewPassword"
                      //  value={passwordData.confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                    />
                  </div>
                </div>

                {/* Nút Submit */}
                <div className="flex justify-end mt-6 space-x-3">
                  <button
                    type="button"
                    // onClick={() => setIsFormVisible(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Xác nhận Đổi Mật khẩu
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div>
            <h2 className="text-[#111418] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Cài đặt Quyền riêng tư
            </h2>
            <div className="flex flex-col gap-4 p-4">
              <label
                className="flex cursor-pointer items-center justify-between"
                for="show-email"
              >
                <span className="flex flex-col">
                  <span className="text-base font-medium text-[#111418] dark:text-gray-200">
                    Hiển thị email công khai
                  </span>
                  <span className="text-sm text-[#617589] dark:text-gray-400">
                    Cho phép người khác xem địa chỉ email của bạn trên hồ sơ.
                  </span>
                </span>
                <input
                  className="form-checkbox h-5 w-5 rounded text-primary focus:ring-primary/50 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:checked:bg-primary"
                  id="show-email"
                  type="checkbox"
                />
              </label>
              <label
                className="flex cursor-pointer items-center justify-between"
                for="show-clubs"
              >
                <span className="flex flex-col">
                  <span className="text-base font-medium text-[#111418] dark:text-gray-200">
                    Hiển thị danh sách CLB
                  </span>
                  <span className="text-sm text-[#617589] dark:text-gray-400">
                    Cho phép mọi người xem các câu lạc bộ bạn đã tham gia.
                  </span>
                </span>
                <input
                  checked=""
                  className="form-checkbox h-5 w-5 rounded text-primary focus:ring-primary/50 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:checked:bg-primary"
                  id="show-clubs"
                  type="checkbox"
                />
              </label>
            </div>
          </div>

          <hr className="border-gray-200 dark:border-gray-700" />

          <div className="flex flex-col sm:flex-row justify-end gap-3 p-4">
            <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-[#f0f2f4] dark:bg-gray-700 text-[#111418] dark:text-white text-base font-bold leading-normal tracking-[0.015em]">
              <span className="truncate">Hủy</span>
            </button>
            <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em]">
              <span className="truncate">Lưu thay đổi</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
