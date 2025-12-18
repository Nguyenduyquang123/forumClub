import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "../fonts/Roboto-Regular-normal";
import "../fonts/Roboto-Bold-normal";
const formatDateTime = (str) => {
  const d = new Date(str);
  return d.toLocaleString("vi-VN", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

function ConfirmationEvent() {
  const { id } = useParams();
  const { eventId } = useParams();
  const [members, setMembers] = useState([]);
  const [event, setEvent] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [member, setMember] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  console.log(eventId);
  // Load danh sách
  const fetchMembers = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/events/${eventId}/participantss`
      );
      setMembers(res.data.participants || []);
      setFiltered(res.data.participants || []);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/events/${eventId}`)
      .then((res) => {
        const data = res.data;

        // Format lại thời gian
        const formatted = {
          ...data,
          start_time: data.start_time.replace(" ", "T"),
          end_time: data.end_time.replace(" ", "T"),
        };
        setEvent(formatted);
      })
      .catch((err) => console.error("Lỗi khi tải chi tiết sự kiện:", err));
  }, [eventId]);
  console.log("event", event);

  useEffect(() => {
    fetchMembers();
  }, []);

  // Search + Filter
  useEffect(() => {
    let list = [...members];

    if (search.trim() !== "") {
      list = list.filter((m) =>
        m.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      list = list.filter((m) => m.status === statusFilter);
    }

    setFiltered(list);
  }, [search, statusFilter, members]);

  // Xác nhận
  const handleConfirm = async (userId) => {
    await axios.post(
      `http://localhost:8000/api/events/${eventId}/participants/${userId}/confirm`
    );
    fetchMembers();
  };

  // Huỷ
  const handleCancel = async (userId) => {
    await axios.post(
      `http://localhost:8000/api/events/${eventId}/participants/${userId}/cancel`
    );
    fetchMembers();
  };
  useEffect(() => {
    const fetchRole = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/clubs/${id}/my-role`,
          {
            params: { user_id: user.id },
          }
        );
        setMember(res.data);
      } catch (err) {
        console.error("Lỗi khi lấy vai trò thành viên:", err);
      }
    };

    fetchRole();
  }, [id, user.id]);

  const exportPDF = () => {
    const doc = new jsPDF();

    doc.setFont("Roboto-Bold", "normal");
    doc.setFontSize(20);
    doc.text("Danh sách tham gia sự kiện", 14, 20);

    // Dòng Sự kiện
    doc.setFontSize(10);
    doc.setFont("Roboto-Regular", "normal");
    doc.text("Sự kiện:", 14, 30);

    doc.setFont("Roboto-Bold", "normal");
    doc.text(event.title || "", 30, 30);

    // Dòng Thời gian
    doc.setFont("Roboto-Regular", "normal");
    doc.text("Thời gian:", 14, 38);

    doc.setFont("Roboto-Bold", "normal");
    doc.text(formatDateTime(event.start_time), 30, 38);

    const rows = filtered.map((m, i) => [
      i + 1,
      m.name,
      m.status === "confirmed"
        ? "Đã xác nhận"
        : m.status === "pending"
        ? "Chưa xác nhận"
        : "Đã hủy",
    ]);

    autoTable(doc, {
      head: [["#", "Họ tên", "Trạng thái"]],
      body: rows,
      startY: 50,
      styles: {
        font: "Roboto-Regular",
        fontStyle: "normal",
        fontSize: 11,
      },
      headStyles: {
        font: "Roboto-Bold",
        fontStyle: "normal",
      },
    });

    doc.save("danh-sach.pdf");
  };

  return (
    <main className="flex flex-1 justify-center px-4 sm:px-6 lg:px-8">
      <div className="layout-content-container flex flex-col w-full max-w-5xl flex-1 gap-8">
        {/* Breadcrumb giữ nguyên */}
        <div className="flex flex-wrap gap-2">
          <a className="text-slate-500 dark:text-slate-400 text-sm">
            Trang chủ
          </a>
          <span>/</span>
          <a className="text-slate-500 dark:text-slate-400 text-sm">Sự kiện</a>
          <span>/</span>
          <a className="text-slate-500 dark:text-slate-400 text-sm">
            {event.title}
          </a>
          <span>/</span>
          <span className="text-slate-900 dark:text-slate-50 text-sm font-medium leading-normal">
            Xác nhận tham gia
          </span>
        </div>
        {/* TITLE */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap justify-between items-start gap-3">
            <h1 className="text-slate-900 dark:text-slate-50 text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">
              Xác nhận Danh sách Tham gia Sự kiện
            </h1>
          </div>

          {/* Thông tin sự kiện giữ nguyên */}
          <div className="bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800 rounded-lg p-6 grid grid-cols-1 md:grid-cols-[20%_1fr] gap-x-6">
            <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-subgrid py-3">
              <p className="text-slate-500 dark:text-slate-400 text-sm pt-3">
                Tên sự kiện:
              </p>
              <h1 className="text-slate-900 dark:text-slate-50 font-bold text-2xl">
                {event.title}
              </h1>
            </div>
            <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-subgrid border-t border-slate-200 dark:border-slate-800 py-3">
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Ngày & Giờ:
              </p>
              <p className="text-slate-900 dark:text-slate-50 text-sm">
                <p>{formatDateTime(event.start_time)}</p>
              </p>
            </div>
          </div>
        </div>
        {/* Cards thống kê */}
        <div className="flex flex-wrap gap-4">
          <div className="flex min-w-[158px] flex-1 flex-col gap-2 p-6 border rounded-lg bg-white dark:bg-background-dark">
            <p className="text-base">Tổng số</p>
            <p className="text-2xl font-bold">{members.length}</p>
          </div>

          <div className="flex min-w-[158px] flex-1 flex-col gap-2 p-6 border rounded-lg bg-white dark:bg-background-dark">
            <p className="text-base">Đã xác nhận</p>
            <p className="text-2xl font-bold text-green-600">
              {members.filter((m) => m.status === "confirmed").length}
            </p>
          </div>

          <div className="flex min-w-[158px] flex-1 flex-col gap-2 p-6 border rounded-lg bg-white dark:bg-background-dark">
            <p className="text-base">Chưa xác nhận</p>
            <p className="text-2xl font-bold text-amber-500">
              {members.filter((m) => m.status === "pending").length}
            </p>
          </div>
        </div>
        {/* ⭐ NÚT XUẤT PDF - THÊM Ở ĐÂY ⭐ */}{" "}
        <div className="flex justify-end">
          {" "}
          <button
            onClick={exportPDF}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            {" "}
            Xuất PDF{" "}
          </button>{" "}
        </div>
        {/* Bảng danh sách */}
        <div className="bg-white dark:bg-background-dark border rounded-lg overflow-hidden">
          <div className="p-4 flex flex-col sm:flex-row items-center gap-4 border-b">
            {/* Search */}
            <div className="relative w-full sm:flex-1">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                search
              </span>
              <input
                className="w-full pl-10 pr-4 py-2 text-sm border rounded-md bg-white dark:bg-slate-900"
                placeholder="Tìm thành viên..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Filter */}
            <div className="flex gap-2 w-full sm:w-auto">
              <select
                className="text-sm border rounded-md bg-white dark:bg-slate-900"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="confirmed">Đã xác nhận</option>
                <option value="pending">Chưa xác nhận</option>
              </select>
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 dark:bg-slate-800 text-xs uppercase">
                <tr>
                  <th className="px-6 py-3">Thành viên</th>
                  <th className="px-6 py-3">Trạng thái</th>

                  {(member?.role === "owner" || member?.role === "admin") && (
                    <th className="px-6 py-3 text-right">Hành động</th>
                  )}
                </tr>
              </thead>

              <tbody>
                {filtered.map((m) => (
                  <tr
                    key={m.user_id}
                    className="border-b dark:border-slate-800"
                  >
                    <td className="px-6 py-4 flex items-center gap-3 font-medium">
                      <img src={m.avatar} className="w-10 h-10 rounded-full" />
                      {m.name}
                    </td>

                    <td className="px-6 py-4">
                      {m.status === "confirmed" && (
                        <span className="px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          Đã xác nhận
                        </span>
                      )}

                      {m.status === "pending" && (
                        <span className="px-2.5 py-0.5 text-xs font-medium bg-amber-100 text-amber-800 rounded-full">
                          Chưa xác nhận
                        </span>
                      )}

                      {m.status === "cancelled" && (
                        <span className="px-2.5 py-0.5 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                          Đã hủy
                        </span>
                      )}
                    </td>

                    {(member?.role === "owner" || member?.role === "admin") && (
                      <td className="px-6 py-4 text-right space-x-4">
                        {m.status === "pending" && (
                          <button
                            onClick={() => handleConfirm(m.user_id)}
                            className="text-green-600 hover:underline"
                          >
                            Xác nhận
                          </button>
                        )}
                        {m.status === "cancelled" && (
                          <button
                            onClick={() => handleConfirm(m.user_id)}
                            className="text-green-600 hover:underline"
                          >
                            Xác nhận
                          </button>
                        )}

                        <button
                          onClick={() => handleCancel(m.user_id)}
                          className="text-red-600 hover:underline"
                        >
                          Hủy
                        </button>
                      </td>
                    )}
                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td className="px-6 py-4 text-center" colSpan="3">
                      Không có thành viên nào.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ConfirmationEvent;
