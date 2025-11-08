function GeneralDiscussion() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
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
        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-5 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] gap-2 hover:bg-primary/90 transition-colors">
          <span className="material-symbols-outlined !text-xl">add</span>
          <span className="truncate">Tạo chủ đề mới</span>
        </button>
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
              category
            </span>
            <p className="text-sm font-medium text-[#111418] dark:text-gray-200">
              Danh mục
            </p>
            <span className="material-symbols-outlined !text-lg text-gray-500 dark:text-gray-400">
              expand_more
            </span>
          </button>
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
          <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-gray-100 dark:bg-gray-800 px-3 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <span className="material-symbols-outlined !text-lg text-gray-500 dark:text-gray-400">
              trending_up
            </span>
            <p className="text-sm font-medium text-[#111418] dark:text-gray-200">
              Độ phổ biến
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
        <a className="group block" href="#">
          <div className="flex flex-col gap-4 rounded-xl border border-primary/20 bg-primary/5 p-4 transition-all duration-200 hover:border-primary/40 hover:bg-primary/10 dark:bg-primary/10 dark:hover:bg-primary/20">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined mt-1 text-primary">
                  push_pin
                </span>
                <div>
                  <h3 className="font-bold text-[#111418] transition-colors group-hover:text-primary dark:text-white dark:group-hover:text-primary">
                    Thông báo quan trọng về lịch sinh hoạt tháng tới
                  </h3>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-800 dark:bg-red-900/50 dark:text-red-300">
                      Thông Báo
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <div className="size-6 rounded-full bg-cover bg-center bg-no-repeat"></div>
                <span className="text-gray-600 dark:text-gray-300">Admin</span>
              </div>
              <div className="flex items-center gap-1.5" title="Bình luận">
                <span className="material-symbols-outlined !text-base">
                  chat_bubble_outline
                </span>
                <span>5</span>
              </div>
              <div className="flex items-center gap-1.5" title="Lượt xem">
                <span className="material-symbols-outlined !text-base">
                  visibility
                </span>
                <span>2.1k</span>
              </div>
              <div className="flex items-center gap-1.5" title="Hoạt động cuối">
                <span className="material-symbols-outlined !text-base">
                  schedule
                </span>
                <span>2 giờ trước</span>
              </div>
            </div>
          </div>
        </a>
        <a className="group block" href="#">
          <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 transition-all duration-200 hover:border-gray-300 hover:shadow-sm dark:border-gray-800 dark:bg-gray-800/50 dark:hover:border-gray-700">
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-bold text-[#111418] transition-colors group-hover:text-primary dark:text-white dark:group-hover:text-primary">
                Kế hoạch dã ngoại cuối tuần này
              </h3>
              <div
                className="size-2.5 flex-shrink-0 rounded-full bg-primary"
                title="Chủ đề chưa đọc"
              ></div>
            </div>
            <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <div className="size-6 rounded-full bg-cover bg-center bg-no-repeat"></div>
                <span className="text-gray-600 dark:text-gray-300">
                  Nguyễn Văn A
                </span>
              </div>
              <div className="flex items-center gap-1.5" title="Bình luận">
                <span className="material-symbols-outlined !text-base">
                  chat_bubble_outline
                </span>
                <span>15</span>
              </div>
              <div className="flex items-center gap-1.5" title="Lượt xem">
                <span className="material-symbols-outlined !text-base">
                  visibility
                </span>
                <span>128</span>
              </div>
              <div className="flex items-center gap-1.5" title="Hoạt động cuối">
                <span className="material-symbols-outlined !text-base">
                  schedule
                </span>
                <span>5 phút trước</span>
              </div>
            </div>
          </div>
        </a>
        <a className="group block" href="#">
          <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 transition-all duration-200 hover:border-gray-300 hover:shadow-sm dark:border-gray-800 dark:bg-gray-800/50 dark:hover:border-gray-700">
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-medium text-gray-600 transition-colors group-hover:text-primary dark:text-gray-300 dark:group-hover:text-primary">
                Góp ý về thiết kế áo đồng phục mới
              </h3>
            </div>
            <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <div className="size-6 rounded-full bg-cover bg-center bg-no-repeat"></div>
                <span className="text-gray-600 dark:text-gray-300">
                  Phạm Thị D
                </span>
              </div>
              <div className="flex items-center gap-1.5" title="Bình luận">
                <span className="material-symbols-outlined !text-base">
                  chat_bubble_outline
                </span>
                <span>32</span>
              </div>
              <div className="flex items-center gap-1.5" title="Lượt xem">
                <span className="material-symbols-outlined !text-base">
                  visibility
                </span>
                <span>450</span>
              </div>
              <div className="flex items-center gap-1.5" title="Hoạt động cuối">
                <span className="material-symbols-outlined !text-base">
                  schedule
                </span>
                <span>1 ngày trước</span>
              </div>
            </div>
          </div>
        </a>
        <a className="group block" href="#">
          <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 transition-all duration-200 hover:border-gray-300 hover:shadow-sm dark:border-gray-800 dark:bg-gray-800/50 dark:hover:border-gray-700">
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-bold text-[#111418] transition-colors group-hover:text-primary dark:text-white dark:group-hover:text-primary">
                Chia sẻ tài liệu học tập và kinh nghiệm
              </h3>
              <div
                className="size-2.5 flex-shrink-0 rounded-full bg-primary"
                title="Chủ đề chưa đọc"
              ></div>
            </div>
            <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <div className="size-6 rounded-full bg-cover bg-center bg-no-repeat"></div>
                <span className="text-gray-600 dark:text-gray-300">
                  Vũ Văn F
                </span>
              </div>
              <div className="flex items-center gap-1.5" title="Bình luận">
                <span className="material-symbols-outlined !text-base">
                  chat_bubble_outline
                </span>
                <span>8</span>
              </div>
              <div className="flex items-center gap-1.5" title="Lượt xem">
                <span className="material-symbols-outlined !text-base">
                  visibility
                </span>
                <span>98</span>
              </div>
              <div className="flex items-center gap-1.5" title="Hoạt động cuối">
                <span className="material-symbols-outlined !text-base">
                  schedule
                </span>
                <span>3 ngày trước</span>
              </div>
            </div>
          </div>
        </a>
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
export default GeneralDiscussion;
