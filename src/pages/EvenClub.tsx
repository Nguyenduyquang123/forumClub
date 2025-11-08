import { Link } from "react-router-dom";
import ItemEven from "../components/ItemEven";

function EvenClub() {
  return (
    <div className="layout-content-container flex flex-col w-full max-w-6xl flex-1 gap-6">
      <div className="flex flex-wrap justify-between gap-4 items-center">
        <div className="flex min-w-72 flex-col gap-2">
          <p className="text-[#111418] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
            Sự kiện
          </p>
          <p className="text-[#617589] dark:text-gray-400 text-base font-normal leading-normal">
            Khám phá những gì đang diễn ra trong câu lạc bộ
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-2 rounded-xl bg-white dark:bg-background-dark/80 border border-gray-200 dark:border-gray-800">
        <div className="flex items-center w-full md:w-auto gap-2">
          <div className="relative w-full md:w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
              search
            </span>
            <input
              className="w-full h-10 pl-10 pr-4 py-2 bg-background-light dark:bg-gray-800 text-sm rounded-lg border-none focus:ring-2 focus:ring-primary"
              placeholder="Tìm kiếm sự kiện..."
              type="text"
            />
          </div>
        </div>
        <div className="flex gap-2 p-1 bg-background-light dark:bg-gray-800 rounded-lg w-full md:w-auto overflow-x-auto">
          <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-md bg-primary/20 dark:bg-primary/30 px-3">
            <p className="text-primary text-sm font-semibold leading-normal">
              Tất cả
            </p>
          </button>
          <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-md px-3 hover:bg-gray-200 dark:hover:bg-gray-700">
            <p className="text-[#111418] dark:text-gray-300 text-sm font-medium leading-normal">
              Tuần này
            </p>
          </button>
          <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-md px-3 hover:bg-gray-200 dark:hover:bg-gray-700">
            <p className="text-[#111418] dark:text-gray-300 text-sm font-medium leading-normal">
              Tháng này
            </p>
          </button>
          <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-md px-3 hover:bg-gray-200 dark:hover:bg-gray-700">
            <p className="text-[#111418] dark:text-gray-300 text-sm font-medium leading-normal">
              Thể thao
            </p>
          </button>
          <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-md px-3 hover:bg-gray-200 dark:hover:bg-gray-700">
            <p className="text-[#111418] dark:text-gray-300 text-sm font-medium leading-normal">
              Học thuật
            </p>
          </button>
        </div>
        <Link
          className="flex w-full md:w-auto max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-primary text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-4"
          to="create-event"
        >
          <span
            className="material-symbols-outlined text-xl"
            //    style="font-variation-settings: 'FILL' 1;"
          >
            add_circle
          </span>
          <span className="truncate">Tạo sự kiện</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <ItemEven />
      </div>
    </div>
  );
}
export default EvenClub;
