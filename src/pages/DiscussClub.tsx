import { Link } from "react-router-dom";
import ItemDiscuss from "../components/ItemDiscuss";

function DiscussClub() {
  return (
    <div className=" flex flex-col  flex-1">
      <div className="flex flex-wrap gap-2 px-1 pb-4">
        <a
          className="text-gray-500 dark:text-gray-400 hover:text-primary text-sm font-medium leading-normal"
          href="#"
        >
          Trang chủ
        </a>
        <span className="text-gray-400 dark:text-gray-500 text-sm font-medium leading-normal">
          /
        </span>
        <span className="text-[#111418] dark:text-gray-200 text-sm font-medium leading-normal">
          Thảo Luận Chung
        </span>
      </div>
      <div className="flex flex-wrap justify-between items-center gap-4 pb-6">
        <div className="flex flex-col gap-2">
          <p className="text-[#111418] dark:text-white text-3xl font-black leading-tight tracking-[-0.033em]">
            Thảo Luận Chung
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">
            Nơi trao đổi mọi chủ đề về hoạt động của câu lạc bộ.
          </p>
        </div>
        <Link to={"create-topic"}>
          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-5 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] gap-2 hover:bg-primary/90 transition-colors">
            <span className="material-symbols-outlined !text-xl">add</span>
            <span className="truncate">Tạo chủ đề mới</span>
          </button>
        </Link>
      </div>
      <div className="flex flex-col gap-4 mb-6">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
            search
          </span>
          <input
            className="form-input w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/50"
            placeholder="Tìm kiếm chủ đề..."
            type="text"
          />
        </div>
        <div className="flex flex-wrap items-center gap-3"> 
          <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-gray-100 dark:bg-gray-800 px-3 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <span className="material-symbols-outlined !text-lg text-gray-500 dark:text-gray-400">
              calendar_today
            </span>
            <p className="text-sm font-medium text-[#111418] dark:text-gray-200">
              Ngày đăng
            </p>
            <span className="material-symbols-outlined !text-lg text-gray-500 dark:text-gray-400">
              expand_more
            </span>
          </button>
     
          <div className="flex-grow"></div>
          <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-gray-100 dark:bg-gray-800 px-3 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <span className="material-symbols-outlined !text-lg text-gray-500 dark:text-gray-400">
              sort
            </span>
            <p className="text-sm font-medium text-[#111418] dark:text-gray-200">
              Sắp xếp: Mới nhất
            </p>
            <span className="material-symbols-outlined !text-lg text-gray-500 dark:text-gray-400">
              expand_more
            </span>
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <ItemDiscuss />
      </div>
      <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <button className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
          <span className="material-symbols-outlined !text-xl">
            chevron_left
          </span>
        </button>
        <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white">
          1
        </button>
        <button className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
          2
        </button>
        <button className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
          3
        </button>
        <span className="px-2">...</span>
        <button className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
          10
        </button>
        <button className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
          <span className="material-symbols-outlined !text-xl">
            chevron_right
          </span>
        </button>
      </div>
    </div>
  );
}
export default DiscussClub;
