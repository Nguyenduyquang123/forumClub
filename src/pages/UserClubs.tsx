import { Link, useNavigate } from "react-router-dom";
import Item from "../components/Item";
import { Button } from "../components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";

function UserClubs() {
  const [clubs, setClubs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyClubs = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get("http://localhost:8000/api/my-clubs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setClubs(res.data);
      } catch (error: any) {
        console.error("❌ Lỗi lấy danh sách CLB:", error);
        if (error.response?.status === 401) {
          alert("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
        }
        setClubs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMyClubs();
  }, [navigate]);

  const handleClubClick = (clubId: number) => {
    navigate(`/homeClub/${clubId}`);
  };

  if (loading) return <div className="p-4">⏳ Đang tải dữ liệu...</div>;

  return (
    <main className="flex-1 w-full container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
      <div className="flex flex-col md:flex-row md:flex-wrap justify-between items-start md:items-center gap-4 p-4">
        <h1 className="text-4xl font-black tracking-tighter text-gray-900 dark:text-white min-w-72">
          Câu lạc bộ của bạn
        </h1>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="flex-grow">
            <label className="flex flex-col min-w-40 h-12 w-full">
              <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                <div className="text-gray-500 dark:text-gray-400 flex border-none bg-gray-100 dark:bg-gray-800 items-center justify-center pl-4 rounded-l-lg border-r-0">
                  <span className="material-symbols-outlined text-2xl">
                    search
                  </span>
                </div>
                <input
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border-none bg-gray-100 dark:bg-gray-800 h-full placeholder:text-gray-500 dark:placeholder:text-gray-400 px-4 text-base font-normal"
                  placeholder="Tìm kiếm câu lạc bộ..."
                  value=""
                />
              </div>
            </label>
          </div>
          <Link to="/createClub">
            <Button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-white text-sm font-bold leading-normal tracking-wide hover:bg-primary/90 transition-colors">
              <span className="truncate">Tạo Mới</span>
            </Button>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {clubs.map((club, index) => (
          <Item
            key={index}
            id={club.id}
            imageUrl={club.avatar_url}
            title={club.name}
            description={club.description}
            memberCount={club.members_count} // bang thanh vien nua
            onClubClick={handleClubClick}
          />
        ))}
      </div>
      <div className="flex items-center justify-center p-4 mt-8">
        <a
          className="flex size-10 items-center justify-center text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary"
          href="#"
        >
          <span className="material-symbols-outlined text-2xl">
            chevron_left
          </span>
        </a>
        <a
          className="text-sm font-bold leading-normal flex size-10 items-center justify-center text-white rounded-full bg-primary"
          href="#"
        >
          1
        </a>
        <a
          className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          href="#"
        >
          2
        </a>
        <a
          className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          href="#"
        >
          3
        </a>
        <span className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-gray-700 dark:text-gray-300 rounded-full">
          ...
        </span>
        <a
          className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          href="#"
        >
          8
        </a>
        <a
          className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          href="#"
        >
          9
        </a>
        <a
          className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          href="#"
        >
          10
        </a>
        <a
          className="flex size-10 items-center justify-center text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary"
          href="#"
        >
          <span className="material-symbols-outlined text-2xl">
            chevron_right
          </span>
        </a>
      </div>
    </main>
  );
}
export default UserClubs;
