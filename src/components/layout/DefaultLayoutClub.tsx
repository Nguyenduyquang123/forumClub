import { useState, type ReactNode } from "react";
import Header from "./Header";
import { NavLink } from "react-router-dom";

function DefaultLayoutClub({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      <div className="flex flex-1">
        <aside className="sticky top-[69px] h-[calc(100vh-69px)] w-64 flex-col justify-between bg-white dark:bg-background-dark p-4 border-r border-slate-200 dark:border-slate-800 hidden lg:flex">
          <div className="flex flex-col gap-4">
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors">
              <span className="truncate">Tạo Bài Viết Mới</span>
            </button>
            <div className="flex flex-col gap-1 mt-2">
              <NavLink
                className={({
                  isActive,
                }) => `flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors
                ${isActive ? "bg-primary/10 font-bold text-primary" : ""}
                `}
                to="/homeClub/:id"
              >
                <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">
                  home
                </span>
                <p className="text-slate-600 dark:text-slate-200 text-sm font-medium leading-normal">
                  Trang chủ
                </p>
              </NavLink>
              <NavLink
                className={({
                  isActive,
                }) => `flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors
                ${isActive ? "bg-primary/10 font-bold text-primary" : ""}
                `}
                to="/clubs"
              >
                <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">
                  inbox
                </span>
                <p className="text-slate-600 dark:text-slate-200 text-sm font-medium leading-normal">
                  Chủ đề chưa đọc
                </p>
              </NavLink>
              <NavLink
                className={({
                  isActive,
                }) => `flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors
                ${isActive ? "bg-primary/10 font-bold text-primary" : ""}
                `}
                to="/clubs"
              >
                <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">
                  edit_square
                </span>
                <p className="text-slate-600 dark:text-slate-200 text-sm font-medium leading-normal">
                  Bài viết của tôi
                </p>
              </NavLink>
              <NavLink
                className="flex items-center gap-3 px-3 py-2 rounded-lg  dark:bg-primary/30"
                to="memberclub"
              >
                <span
                  className="material-symbols-outlined text-2xl text-slate-600"
                  //style="font-variation-settings: 'FILL' 1;"
                >
                  group
                </span>
                <p className="text-sm  text-slate-600 font-medium leading-normal">
                  Thành viên
                </p>
              </NavLink>
            </div>
            <div className="w-full border-t border-slate-200 dark:border-slate-800 my-2"></div>
            <h3 className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase px-3">
              Danh Mục
            </h3>
            <div className="flex flex-col gap-1">
              <NavLink
                className={({
                  isActive,
                }) => `flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors
                ${isActive ? "bg-primary/10 font-bold text-primary" : ""}
                `}
                to="/clubs"
              >
                <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">
                  campaign
                </span>
                <p className="text-slate-800 dark:text-slate-200 text-sm font-medium leading-normal">
                  Thông báo chung
                </p>
              </NavLink>
              <NavLink
                className={({
                  isActive,
                }) => `flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors
                ${isActive ? "bg-primary/10 font-bold text-primary" : ""}
                `}
                to="/clubs"
              >
                <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">
                  forum
                </span>
                <p className="text-slate-800 dark:text-slate-200 text-sm font-medium leading-normal">
                  Thảo luận Chung
                </p>
              </NavLink>
              <NavLink
                className={({
                  isActive,
                }) => `flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors
                ${isActive ? "bg-primary/10 font-bold text-primary" : ""}
                `}
                to="/clubs"
              >
                <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">
                  code
                </span>
                <p className="text-slate-800 dark:text-slate-200 text-sm font-medium leading-normal">
                  Dự án A
                </p>
              </NavLink>
              <NavLink
                className={({
                  isActive,
                }) => `flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors
                ${isActive ? "bg-primary/10 font-bold text-primary" : ""}
                `}
                to="even-club"
              >
                <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">
                  celebration
                </span>
                <p className="text-slate-800 dark:text-slate-200 text-sm font-medium leading-normal">
                  Sự kiện sắp tới
                </p>
              </NavLink>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <NavLink
              className={({
                isActive,
              }) => `flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors
              ${isActive ? "bg-primary/10 font-bold text-primary" : ""}
              `}
              to="/clubs"
            >
              <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">
                info
              </span>
              <p className="text-slate-800 dark:text-slate-200 text-sm font-medium leading-normal">
                Giới thiệu
              </p>
            </NavLink>
            <NavLink
              className={({
                isActive,
              }) => `flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors
              ${isActive ? "bg-primary/10 font-bold text-primary" : ""}
              `}
              to="/clubs"
            >
              <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">
                gavel
              </span>
              <p className="text-slate-800 dark:text-slate-200 text-sm font-medium leading-normal">
                Quy định
              </p>
            </NavLink>
          </div>
        </aside>

        <main className="flex-1 p-6 sm:p-4 lg:pl-15 lg:pr-15">{children}</main>
      </div>
    </div>
  );
}
export default DefaultLayoutClub;
