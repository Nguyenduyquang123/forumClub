import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function CreateEvent() {
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const [clubId, setClubId] = useState(id);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    club_id: clubId,
    created_by: user.id,
    title: "",
    banner: "",
    description: "",
    start_time: "",
    end_time: "",
    location: "",
    type: "public",
    is_paid: false,
    max_participants: 100,
  });
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
  const handleRadioChange = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (key === "banner") return; // tránh ghi đè
      if (key === "is_paid") {
        formData.append(key, value ? "0" : "1");
      } else {
        formData.append(key, value);
      }
    });

    if (file) {
      formData.append("banner", file);
    }

    try {
      const res = await axios.post(
        "http://localhost:8000/api/events",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Tạo sự kiện thành công!");
      console.log(res.data);
      setForm({
        club_id: clubId,
        created_by: user.id,
        title: "",
        banner: "",
        description: "",
        start_time: "",
        end_time: "",
        location: "",
        type: "public",
        is_paid: false,
        max_participants: 100,
      });
    } catch (err) {
      console.error("Lỗi Axios:", err);
    }
  };


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

            {/* ✅ label để click chọn file */}
            <label
              htmlFor="banner"
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#f0f2f4] dark:bg-gray-700 text-[#111418] dark:text-white text-sm font-bold leading-normal tracking-[0.015em]"
            >
              Chọn ảnh
            </label>

            {/* ✅ input ẩn */}
            <input
              id="banner"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* Hiển thị tên file khi chọn */}
            {file && (
              <p className="text-sm text-gray-500 mt-2">
                Đã chọn: <span className="font-semibold">{file.name}</span>
              </p>
            )}
          </div>
        </div>
        <div className="flex max-w-full flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#111418] dark:text-gray-300 text-base font-medium leading-normal pb-2">
              Mô tả chi tiết
            </p>
            <div className="w-full rounded-lg border border-[#dbe0e6] dark:border-gray-600 bg-white dark:bg-gray-800 focus-within:border-primary">
              <div className="flex items-center gap-2 p-2 border-b border-[#dbe0e6] dark:border-gray-600 text-gray-600 dark:text-gray-400">
                <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                  <span
                    className="material-symbols-outlined"
                    // style="font-size: 20px;"
                  >
                    format_bold
                  </span>
                </button>
                <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                  <span
                    className="material-symbols-outlined"
                    // style="font-size: 20px;"
                  >
                    format_italic
                  </span>
                </button>
                <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                  <span
                    className="material-symbols-outlined"
                    // style="font-size: 20px;"
                  >
                    format_list_bulleted
                  </span>
                </button>
                <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                  <span
                    className="material-symbols-outlined"
                    //  style="font-size: 20px;"
                  >
                    link
                  </span>
                </button>
              </div>
              <textarea
                className="form-input flex w-full min-w-0 flex-1 resize-y overflow-hidden rounded-b-lg text-[#111418] dark:text-white focus:outline-0 focus:ring-0 border-0 bg-transparent min-h-36 placeholder:text-[#617589] p-[15px] text-base font-normal leading-normal"
                placeholder="Thêm mô tả chi tiết về sự kiện..."
                name="description"
                value={form.description}
                onChange={handleChange}
              ></textarea>
            </div>
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
        <h2 className="text-[#111418] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Thiết lập Sự kiện
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 px-4 py-3">
          {/* Loại sự kiện */}
          <div>
            <p className="text-[#111418] dark:text-gray-300 text-base font-medium leading-normal pb-2">
              Loại Sự kiện
            </p>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  className="form-radio text-primary focus:ring-primary/50"
                  name="type"
                  type="radio"
                  checked={form.type === "public"}
                  onChange={() => handleRadioChange("type", "public")}
                />
                <span className="text-[#111418] dark:text-gray-300">
                  Công khai
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  className="form-radio text-primary focus:ring-primary/50"
                  name="type"
                  type="radio"
                  checked={form.type === "private"}
                  onChange={() => handleRadioChange("type", "private")}
                />
                <span className="text-[#111418] dark:text-gray-300">
                  Riêng tư
                </span>
              </label>
            </div>
          </div>

          {/* Chi phí */}
          <div>
            <p className="text-[#111418] dark:text-gray-300 text-base font-medium leading-normal pb-2">
              Chi phí
            </p>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  className="form-radio text-primary focus:ring-primary/50"
                  name="is_paid"
                  type="radio"
                  checked={!form.is_paid}
                  onChange={() => handleRadioChange("is_paid", false)}
                />
                <span className="text-[#111418] dark:text-gray-300">
                  Miễn phí
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  className="form-radio text-primary focus:ring-primary/50"
                  name="is_paid"
                  type="radio"
                  checked={form.is_paid}
                  onChange={() => handleRadioChange("is_paid", true)}
                />
                <span className="text-[#111418] dark:text-gray-300">
                  Có phí
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Số lượng người tham gia */}
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
        <h2 className="text-[#111418] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Tùy chọn Nâng cao
        </h2>
        <div className="flex max-w-full flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#111418] dark:text-gray-300 text-base font-medium leading-normal pb-2">
              Thêm người tổ chức/liên hệ
            </p>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                search
              </span>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] dark:text-white focus:outline-0 focus:ring-0 border border-[#dbe0e6] dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-primary h-14 placeholder:text-[#617589] pl-12 pr-[15px] py-[15px] text-base font-normal leading-normal"
                placeholder="Tìm kiếm thành viên..."
                value=""
              />
            </div>
          </label>
        </div>
        <div className="space-y-3 px-4 py-3">
          <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
            <input
              className="form-checkbox h-5 w-5 rounded text-primary focus:ring-primary/50 border-[#dbe0e6] dark:border-gray-600 bg-white dark:bg-gray-800"
              type="checkbox"
            />
            <span className="text-[#111418] dark:text-gray-300 text-base font-medium">
              Yêu cầu đăng ký
            </span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
            <input
              className="form-checkbox h-5 w-5 rounded text-primary focus:ring-primary/50 border-[#dbe0e6] dark:border-gray-600 bg-white dark:bg-gray-800"
              type="checkbox"
            />
            <span className="text-[#111418] dark:text-gray-300 text-base font-medium">
              Gửi thông báo cho thành viên
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
