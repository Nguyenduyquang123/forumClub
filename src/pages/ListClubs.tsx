import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ListClubs() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const PAGE_SIZE = 6;

  useEffect(() => {
    axios
      .get("http://localhost:8000/clubs/public")
      .then((res) => {
        setClubs(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);
  const filteredClubs = clubs.filter((club) =>
    club.name.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filteredClubs.length / PAGE_SIZE);

  const paginatedClubs = filteredClubs.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  if (loading) {
    return (
      <main className="flex-grow p-6 w-[80%] m-auto">
        <p className="text-slate-900 dark:text-white text-lg">Đang tải...</p>
      </main>
    );
  }

  return (
    <main className="flex-grow p-6 w-[80%] m-auto">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-tighter">
            Khám phá các Câu lạc bộ
          </h1>
        </div>

        {/* SEARCH BAR */}
        <div className="px-0">
          <label className="flex flex-col min-w-40 h-12 w-full">
            <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
              <div className="text-slate-500 dark:text-slate-400 flex border-none bg-slate-100 dark:bg-slate-800 items-center justify-center pl-4 rounded-l-lg">
                <span className="material-symbols-outlined">search</span>
              </div>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border-none bg-slate-100 dark:bg-slate-800 h-full placeholder:text-slate-500 dark:placeholder:text-slate-400 px-4"
                placeholder="Tìm kiếm câu lạc bộ..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </label>
        </div>

        {/* CLUB LIST */}
        <div className="flex flex-col divide-y divide-slate-200 dark:divide-slate-800">
          {paginatedClubs.map((club) => (
            <div
              key={club.id}
              className="flex items-center gap-4 bg-transparent px-2 min-h-[72px] py-4 justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center rounded-lg bg-slate-200 dark:bg-slate-700 shrink-0 size-12 overflow-hidden">
                  <img
                    alt="Club Logo"
                    src={
                      `http://localhost:8000/${club.avatar_url}` ||
                      "https://via.placeholder.com/150"
                    }
                    className="size-12 rounded-lg object-cover"
                  />
                </div>

                <div className="flex flex-col justify-center">
                  <p className="text-slate-900 dark:text-white text-base font-medium leading-normal line-clamp-1">
                    {club.name}
                  </p>
                </div>
              </div>

              <div className="shrink-0">
                <Link to={`${club.id}`}>
                  <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white text-sm font-medium leading-normal hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
                    <span className="truncate">Xem chi tiết</span>
                  </button>
                </Link>
              </div>
            </div>
          ))}
          {filteredClubs.length === 0 && (
            <p className="text-center text-slate-500 dark:text-slate-400 py-8">
              Không tìm thấy câu lạc bộ phù hợp 😢
            </p>
          )}
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                currentPage === i + 1
                  ? "bg-primary text-white"
                  : "hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
    </main>
  );
}

export default ListClubs;
