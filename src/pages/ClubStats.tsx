import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function ClubStats() {
  const { id: clubId } = useParams();
  const [stats, setStats] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0); // <-- thêm
  const [latestStat, setLatestStat] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/clubs/${clubId}/statistics`)
      .then((res) => {
        setStats(res.data);
        if (res.data.length) {
          setSelectedIndex(0); // mặc định: tháng mới nhất
          setLatestStat(res.data[0]);
        }
      })
      .catch((err) => console.error(err));
  }, [clubId]);

  // format data cho biểu đồ (không phụ thuộc selectedIndex)
  const formatStats = stats.map((item) => ({
    Tháng: `Tháng ${item.month}/${item.year}`,
    "Thành viên mới": item.new_members,
    "Tương tác": item.total_comments + item.total_posts + item.total_likes,
  }));



  return (
    <div id="pdfContent" className="p-6 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold">Thống kê câu lạc bộ</h1>

        <button
          onClick={() => {
            axios
              .post(
                `http://localhost:8000/api/clubs/${clubId}/statistics/generate`
              )
              .then(() => {
                alert("Đã tạo thống kê!");
                window.location.reload();
              })
              .catch((err) => console.error(err));
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Cập nhật thống kê tháng
        </button>
      </div>

      {/* Chọn tháng */}
      <div className="flex gap-3 items-center">
        <span className="font-medium text-lg">Chọn tháng:</span>
        <select
          className="border rounded px-3 py-2"
          value={selectedIndex}
          onChange={(e) => {
            const index = Number(e.target.value);
            setSelectedIndex(index);
            setLatestStat(stats[index]); 
          }}
        >
          {stats.map((item, index) => (
            <option key={index} value={index}>
              Tháng {item.month}/{item.year}
            </option>
          ))}
        </select>
      </div>

      {/* Biểu đồ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Thành viên mới */}
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4 text-zinc-800">
            Thành viên mới theo tháng
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={formatStats}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Tháng" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="Thành viên mới"
                fill="#4f46e5"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Lượt tương tác */}
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4 text-zinc-800">
            Lượt tương tác theo tháng
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={formatStats}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Tháng" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="Tương tác"
                stroke="#10b981"
                strokeWidth={3}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Members & Top Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Thành viên nổi bật */}
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4">Thành viên Nổi bật</h2>

          <table className="w-full text-left border-collapse">
            <tbody>
              {latestStat?.top_members?.map((member, index) => (
                <tr
                  key={member.user_id}
                  className={
                    index > 0
                      ? "border-t border-slate-200 dark:border-slate-700"
                      : ""
                  }
                >
                  <td className="p-3 flex items-center gap-3">
                    <span className="font-bold text-slate-500">
                      {index + 1}
                    </span>
                    <div
                      className="w-10 h-10 rounded-full bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${
                          member.avatar || "https://via.placeholder.com/40"
                        })`,
                      }}
                    ></div>
                    <span className="font-medium text-slate-800 dark:text-slate-200">
                      {member.name}
                    </span>
                  </td>
                  <td className="p-3 text-right font-bold text-slate-800 dark:text-slate-200">
                    {member.score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Sự kiện hàng đầu */}
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4">Sự kiện Hàng đầu</h2>

          <table className="w-full text-left border-collapse">
            <tbody>
              {latestStat?.top_events?.map((event, index) => (
                <tr
                  key={event.event_id}
                  className={
                    index > 0
                      ? "border-t border-slate-200 dark:border-slate-700"
                      : ""
                  }
                >
                  <td className="p-3 font-medium text-slate-800 dark:text-slate-200">
                    {event.name}
                  </td>
                  <td className="p-3 text-right font-bold text-slate-800 dark:text-slate-200 flex items-center justify-end gap-2">
                    <span className="material-symbols-outlined text-lg text-slate-500 dark:text-slate-400">
                      group
                    </span>
                    {event.participants}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
