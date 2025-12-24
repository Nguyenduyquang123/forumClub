import { useState } from "react";
import axios from "axios";
import {  useNavigate, useParams } from "react-router-dom";
import RichTextEditor from "../components/RichTextEditor";
import { generateEventDescription } from "../services/geminiService";
import { toast } from "react-toastify";

function CreateEvent() {
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const [clubId, setClubId] = useState(id);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false);
  const [form, setForm] = useState({
    club_id: clubId,
    created_by: user.id,
    title: "",
    banner: "",
    description: "",
    start_time: "",
    end_time: "",
    location: "",
    max_participants: 100,
    notify: false,
    require_registration: false,
  });
  const navigate = useNavigate();
  const textToHTML = (text: string) => {
    if (!text) return "";

    return text
      .trim()
      .replace(/\r\n/g, "\n") // chuẩn hóa Windows
      .split(/\n\s*\n/) // đoạn = dòng trống
      .map((p) => {
        const line = p.trim().replace(/\n/g, "<br />");
        return line ? `<p>${line}</p>` : "";
      })
      .join("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) setFile(selected);
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const handleSetDescription = (html) => {
    setForm((prev) => ({
      ...prev,
      description: html,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (key === "banner" && !file) return;

      if (key === "notify" || key === "require_registration") {
        formData.append(key, value ? "1" : "0"); // gửi 1 hoặc 0
      } else if (typeof value === "number") {
        formData.append(key, value.toString());
      } else {
        formData.append(key, value);
      }
    });

    if (file) formData.append("banner", file);

    try {
      const res = await axios.post(
        "http://localhost:8000/api/events",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      // reset form
      setForm({
        club_id: clubId,
        created_by: user.id,
        title: "",
        banner: "",
        description: "",
        start_time: "",
        end_time: "",
        location: "",
        max_participants: 100,
        notify: false,
        require_registration: false,
      });
      toast.success("Tạo sự kiện thành công!");
      navigate(`/homeClub/${clubId}/even-club`);
    } catch (err) {
      console.error("Lỗi Axios:", err.response?.data || err);
     
    }
  };
  const handleGenerateDescription = async () => {
    if (!form.title.trim()) {
      alert("Vui lòng nhập tên sự kiện trước");
      return;
    }

    try {
      setLoadingAI(true);

      const aiText = await generateEventDescription(form.title);
      const html = textToHTML(aiText);

      setForm((prev) => ({
        ...prev,
        description: html,
      }));
      console.log("Generated AI description:", form.description);
    } catch (e) {
      alert("Không thể tạo mô tả sự kiện");
    } finally {
      setLoadingAI(false);
    }
  };
  console.log(form);

  return (
    <form onSubmit={handleSubmit}>
      <section>
        <h2 className="text-[#111418] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Thông tin cơ bản
        </h2>
        <div className="flex max-w-full flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#111418] dark:text-gray-300 text-base font-medium leading-normal pb-2">
              Tên Sự kiện *
            </p>
            <input
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] dark:text-white focus:outline-0 focus:ring-0 border border-[#dbe0e6] dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-primary h-14 placeholder:text-[#617589] p-[15px] text-base font-normal leading-normal"
              placeholder="Nhập tên sự kiện của bạn"
              name="title"
              value={form.title}
              onChange={handleChange}
            />
     
            <button
              type="button"
              disabled={!form.title.trim() || loadingAI}
              onClick={handleGenerateDescription}
              className="
    mt-3 inline-flex items-center gap-2
    px-4 py-2 rounded-lg
    text-sm font-medium
    text-white
    bg-gradient-to-r from-indigo-500 to-purple-600
    hover:from-indigo-600 hover:to-purple-700
    focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    transition-all duration-200
    shadow-sm hover:shadow-md
  "
            >
              {loadingAI ? (
                <>
                  <svg
                    className="w-4 h-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  Đang tạo nội dung...
                </>
              ) : (
                <>
                  <span>✨</span>
                  Áp dụng gợi ý AI
                </>
              )}
            </button>
          </label>
        </div>
        <div className="flex flex-col p-4">
          <div className="flex flex-col items-center gap-6 rounded-lg border-2 border-dashed border-[#dbe0e6] dark:border-gray-600 px-6 py-14">
            <div className="flex max-w-[480px] flex-col items-center gap-2">
              <p className="text-[#111418] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] text-center">
                Ảnh bìa sự kiện
              </p>
              <p className="text-[#617589] dark:text-gray-400 text-sm font-normal leading-normal text-center">
                Kéo và thả hoặc nhấp để tải lên
              </p>
            </div>

            <label
              htmlFor="banner"
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#f0f2f4] dark:bg-gray-700 text-[#111418] dark:text-white text-sm font-bold leading-normal tracking-[0.015em]"
            >
              Chọn ảnh
            </label>

            <input
              id="banner"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            {file && (
              <p className="text-sm text-gray-500 mt-2">
                Đã chọn: <span className="font-semibold">{file.name}</span>
              </p>
            )}
          </div>
        </div>
        <div className="flex max-w-full flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <RichTextEditor
              content={form.description}
              setContent={(html) =>
                setForm((prev) => ({ ...prev, description: html }))
              }
            />
          </label>
        </div>
      </section>

      <section>
        <h2 className="text-[#111418] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Thời gian và Địa điểm
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4 py-3">
          <label className="flex flex-col">
            <p className="text-[#111418] dark:text-gray-300 text-base font-medium leading-normal pb-2">
              Thời gian Bắt đầu
            </p>
            <div className="relative">
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] dark:text-white focus:outline-0 focus:ring-0 border border-[#dbe0e6] dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-primary h-14 placeholder:text-[#617589] p-[15px] text-base font-normal leading-normal"
                type="datetime-local"
                name="start_time"
                value={form.start_time}
                onChange={handleChange}
                required
              />
            </div>
          </label>
          <label className="flex flex-col">
            <p className="text-[#111418] dark:text-gray-300 text-base font-medium leading-normal pb-2">
              Thời gian Kết thúc
            </p>
            <div className="relative">
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] dark:text-white focus:outline-0 focus:ring-0 border border-[#dbe0e6] dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-primary h-14 placeholder:text-[#617589] p-[15px] text-base font-normal leading-normal"
                type="datetime-local"
                name="end_time"
                value={form.end_time}
                onChange={handleChange}
                required
              />
            </div>
          </label>
        </div>
        <div className="flex max-w-full flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#111418] dark:text-gray-300 text-base font-medium leading-normal pb-2">
              Địa điểm
            </p>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                location_on
              </span>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] dark:text-white focus:outline-0 focus:ring-0 border border-[#dbe0e6] dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-primary h-14 placeholder:text-[#617589] pl-12 pr-[15px] py-[15px] text-base font-normal leading-normal"
                placeholder="Nhập địa điểm hoặc liên kết trực tuyến"
                name="location"
                value={form.location}
                onChange={handleChange}
              />
            </div>
          </label>
        </div>
      </section>

      <section>
        <div className="flex max-w-xs flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#111418] dark:text-gray-300 text-base font-medium leading-normal pb-2">
              Số lượng người tham gia tối đa
            </p>
            <input
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] dark:text-white focus:outline-0 focus:ring-0 border border-[#dbe0e6] dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-primary h-14 placeholder:text-[#617589] p-[15px] text-base font-normal leading-normal"
              placeholder="Không giới hạn"
              type="number"
              name="max_participants"
              value={form.max_participants}
              onChange={handleChange}
            />
          </label>
        </div>
      </section>

      <section>
        <div className="space-y-3 px-4 py-3">
          <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
            <input
              type="checkbox"
              name="notify"
              checked={form.notify}
              onChange={handleChange}
              className="form-checkbox h-5 w-5 rounded text-primary focus:ring-primary/50 border-[#dbe0e6] dark:border-gray-600 bg-white dark:bg-gray-800"
            />
            <span className="text-[#111418] dark:text-gray-300 text-base font-medium">
              Gửi thông báo cho thành viên
            </span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
            <input
              type="checkbox"
              name="require_registration"
              checked={form.require_registration}
              onChange={handleChange}
              className="form-checkbox h-5 w-5 rounded text-primary focus:ring-primary/50 border-[#dbe0e6] dark:border-gray-600 bg-white dark:bg-gray-800"
            />
            <span className="text-[#111418] dark:text-gray-300 text-base font-medium">
              Yêu cầu đăng ký
            </span>
          </label>
        </div>
      </section>
      <button
        type="submit"
        className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80"
      >
        Tạo sự kiện
      </button>
    </form>
  );
}

export default CreateEvent;
