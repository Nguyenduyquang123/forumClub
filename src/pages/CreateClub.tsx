import { use, useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "../components/ui/select";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateClub() {
  const [selectName, setSelectName] = useState("");
  const [selectDescription, setSelectDescription] = useState("");
  const [selectPublic, setSelectPublic] = useState("");
  const [selectOwner, setSelectOwner] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [selectAvatarUrl, setSelectAvatarUrl] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (value: string) => {
    console.log("Thể loại được chọn:", value);
    setSelectCategory(value);
  };
  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("http://localhost:8000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", selectName);
      formData.append("description", selectDescription);
      formData.append("owner_id", user ? user.user.id.toString() : "0000");
      formData.append("category_id", selectCategory);

      if (selectAvatarUrl) {
        formData.append("avatar_url", selectAvatarUrl); // file object
      }

      const res = await axios.post(
        "http://localhost:8000/api/clubs/",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      navigate(`/userClubs`);

      console.log("✅ Club created successfully:", res.data);
    } catch (error) {
      console.error("❌ Error creating club:", error.response?.data || error);
    }
  };

  return (
    <main className="flex flex-1 justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-3xl">
        <div className="flex min-w-72 flex-col gap-2 mb-8">
          <h1 className="text-gray-900 dark:text-white text-3xl sm:text-4xl font-black leading-tight tracking-[-0.033em]">
            Tạo Câu lạc bộ Mới của bạn
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">
            Cùng kết nối với những người cùng sở thích.
          </p>
        </div>
        <div className="bg-white dark:bg-background-dark rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <label className="flex flex-col w-full">
              <p className="text-gray-800 dark:text-gray-200 text-base font-medium leading-normal pb-2">
                Tên Câu lạc bộ
              </p>
              <input
                className="p-3 form-input flex w-full min-w-0 flex-1 resize-none rounded-lg text-gray-800 dark:text-gray-200 focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-primary h-12 placeholder:text-gray-400 dark:placeholder:text-gray-500 px-4 text-base font-normal leading-normal"
                placeholder="CLB Yêu Sách Sài Gòn"
                value={selectName}
                onChange={(e) => setSelectName(e.target.value)}
              />
            </label>
            <label className="flex flex-col w-full">
              <p className="text-gray-800 dark:text-gray-200 text-base font-medium leading-normal pb-2">
                Mô tả
              </p>
              <textarea
                className="form-input flex w-full min-w-0 flex-1 resize-y overflow-hidden rounded-lg text-gray-800 dark:text-gray-200 focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-primary min-h-32 placeholder:text-gray-400 dark:placeholder:text-gray-500 p-4 text-base font-normal leading-normal"
                placeholder="Kể cho mọi người về câu lạc bộ của bạn..."
                value={selectDescription}
                onChange={(e) => setSelectDescription(e.target.value)}
              ></textarea>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col w-full">
                <p className="text-gray-800 dark:text-gray-200 text-base font-medium leading-normal pb-2">
                  Loại hình
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <label className="flex-1 flex items-center p-4 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/10 dark:has-[:checked]:bg-primary/20 transition-colors">
                    <input
                      className="form-radio text-primary focus:ring-primary/50"
                      name="club-type"
                      type="radio"
                      value="public"
                      checked={selectPublic === "public"}
                      onChange={() => setSelectPublic("public")}
                    />
                    <span className="ml-3 text-gray-700 dark:text-gray-300">
                      Công khai
                    </span>
                  </label>
                  <label className="flex-1 flex items-center p-4 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/10 dark:has-[:checked]:bg-primary/20 transition-colors">
                    <input
                      className="form-radio text-primary focus:ring-primary/50"
                      name="club-type"
                      type="radio"
                      value="private"
                      checked={selectPublic === "private"}
                      onChange={() => setSelectPublic("private")}
                    />
                    <span className="ml-3 text-gray-700 dark:text-gray-300">
                      Riêng tư
                    </span>
                  </label>
                </div>
              </div>
              <label className="flex flex-col w-full">
                <p className="text-gray-800 dark:text-gray-200 text-base font-medium leading-normal pb-2">
                  Thể loại
                </p>
                <Select onValueChange={handleChange}>
                  <SelectTrigger className="form-select fle w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-800 dark:text-gray-200 focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-primary h-12 px-4 text-base font-normal leading-normal">
                    <SelectValue placeholder="Chọn thể loại" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Âm nhạc</SelectItem>
                    <SelectItem value="2">Công nghệ</SelectItem>
                    <SelectItem value="3">Thể thao</SelectItem>
                  </SelectContent>
                </Select>
              </label>
            </div>
            <div className="flex flex-col w-full">
              <p className="text-gray-800 dark:text-gray-200 text-base font-medium leading-normal pb-2">
                Ảnh đại diện
              </p>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <span className="material-symbols-outlined text-4xl text-gray-500 dark:text-gray-400">
                      cloud_upload
                    </span>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Nhấn để tải lên</span>{" "}
                      hoặc kéo và thả
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    className="hidden"
                    id="dropzone-file"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setSelectAvatarUrl(e.target.files[0]);
                      }
                    }}
                  />
                  {selectAvatarUrl && (
                    <p className="text-sm text-green-600 mt-2">
                      ✅{" "}
                      {selectAvatarUrl.name
                        ? selectAvatarUrl.name
                        : "Chưa chọn tệp"}
                    </p>
                  )}
                </label>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-4">
              <Button className="flex w-full sm:w-auto max-w-xs cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-6 text-base font-bold leading-normal tracking-wide hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                Hủy bỏ
              </Button>
              <Button
                className="flex w-full sm:w-auto max-w-xs cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-primary text-white px-6 text-base font-bold leading-normal tracking-wide hover:bg-primary/90 transition-colors"
                type="submit"
              >
                Tạo Câu lạc bộ
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
export default CreateClub;
