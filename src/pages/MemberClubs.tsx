function MemberClubs() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div className="flex flex-col gap-1">
          <p className="text-[#111418] dark:text-white text-3xl font-black leading-tight tracking-[-0.033em]">
            Quản lý Thành viên
          </p>
          <p className="text-[#617589] dark:text-gray-400 text-base font-normal leading-normal">
            Quản lý tất cả thành viên của Câu lạc bộ Cờ Vua.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white dark:bg-background-dark/80 p-6 rounded-xl border border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-bold text-[#111418] dark:text-white mb-4">
            Mời Thành viên Mới
          </h2>
          <div className="flex flex-col gap-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Nhập email hoặc tìm kiếm tên người dùng để gửi lời mời.
            </p>
            <div className="flex gap-2">
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-gray-700 bg-transparent h-10 placeholder:text-[#617589] dark:placeholder:text-gray-500 px-3 text-sm font-normal leading-normal"
                placeholder="Email hoặc tên người dùng..."
              />
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90">
                <span className="material-symbols-outlined text-lg">send</span>
                <span className="truncate">Gửi lời mời</span>
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-background-dark/80 p-6 rounded-xl border border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-bold text-[#111418] dark:text-white mb-4">
            Lời mời đang chờ xử lý
          </h2>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                eva.davis@email.com
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Đã gửi: 2 ngày trước
                </span>
                <button
                  aria-label="Hủy lời mời"
                  className="p-1 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-400"
                >
                  <span className="material-symbols-outlined text-base">close</span>
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                frank.g@email.com
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Đã gửi: 1 tuần trước
                </span>
                <button
                  aria-label="Hủy lời mời"
                  className="p-1 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-400"
                >
                  <span className="material-symbols-outlined text-base">close</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-grow">
          <label className="flex flex-col min-w-40 h-12 w-full">
            <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
              <div className="text-[#617589] dark:text-gray-400 flex border-none bg-white dark:bg-background-dark/80 items-center justify-center pl-4 rounded-l-lg border-r-0">
                <span className="material-symbols-outlined text-2xl">search</span>
              </div>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-lg text-[#111418] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border-none bg-white dark:bg-background-dark/80 h-full placeholder:text-[#617589] dark:placeholder:text-gray-500 px-4 text-base font-normal leading-normal"
                placeholder="Tìm kiếm thành viên theo tên hoặc email..."
                value=""
              />
            </div>
          </label>
        </div>
        <div className="flex gap-3 items-center">
          <button className="flex h-12 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-background-dark/80 px-4 text-[#111418] dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800">
            <span className="material-symbols-outlined text-xl">
              admin_panel_settings
            </span>
            <p className="text-sm font-medium leading-normal">Chức vụ: Tất cả</p>
            <span className="material-symbols-outlined text-xl">expand_more</span>
          </button>
          <button className="flex h-12 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-background-dark/80 px-4 text-[#111418] dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800">
            <span className="material-symbols-outlined text-xl">circle</span>
            <p className="text-sm font-medium leading-normal">
              Trạng thái: Đang hoạt động
            </p>
            <span className="material-symbols-outlined text-xl">expand_more</span>
          </button>
        </div>
      </div>
      <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark/80">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-900/50">
              <tr className="text-left">
                <th className="px-6 py-4 font-medium text-[#111418] dark:text-gray-300 w-2/5">
                  Tên
                </th>
                <th className="px-6 py-4 font-medium text-[#111418] dark:text-gray-300">
                  Chức vụ
                </th>
                <th className="px-6 py-4 font-medium text-[#111418] dark:text-gray-300">
                  Trạng thái
                </th>
                <th className="px-6 py-4 font-medium text-[#111418] dark:text-gray-300 text-right">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-4">
                    <div
                      className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                      data-alt="Avatar of Alice Johnson"
                      //style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCiBDkSb1PpwGOudvNYKOj8sgU2YiYHrrQFfFhxT30UAPwiTKdTOGECxjfBdc53Cjvm8G70lRkLbS3zZMF5jmCp25HDSlMeZIKc4r3MWlA8KbLGaGd_du4FdVynP8CSZkhAzYug_Mpui4WpYpXjfRjnWjYQ_7tvut7tZZ_GLdmmv5BV9gOrs1-k292I7w8K7MpLcdz_8utSwi90zdlbOsIcmzzkc1uN51IZ21m7ZfDCh9D9BsNyX48DsAyamJ9A3KiHUzhsP6nyM-U");'
                    ></div>
                    <div>
                      <div className="font-medium text-[#111418] dark:text-white">
                        Alice Johnson
                      </div>
                      <div className="text-[#617589] dark:text-gray-400">
                        alice.j@email.com
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300">
                    Người sáng lập
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
                    Đang hoạt động
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      aria-label="Gửi lời mời rời khỏi CLB"
                      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-[#617589] dark:text-gray-400"
                    >
                      <span className="material-symbols-outlined text-xl">
                        logout
                      </span>
                    </button>
                    <div className="relative inline-block text-left">
                      <button
                        aria-label="Chỉnh sửa vai trò"
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-[#617589] dark:text-gray-400 flex items-center"
                      >
                        <span className="material-symbols-outlined text-xl">
                          edit
                        </span>
                      </button>
                    </div>
                    <button
                      aria-label="Xóa thành viên"
                      className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400"
                    >
                      <span className="material-symbols-outlined text-xl">
                        delete
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="bg-gray-50/50 dark:bg-gray-900/30">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-4">
                    <div
                      className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                      data-alt="Avatar of Bob Williams"
                     // style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAkQdESaa_qd5V-lWRFtT8hvyndzsHQnhs_8Z65LDoJKVBzxoIL5H_wRgx4ZLjwzyPNsbvD31YI23BzqrCzVZS6pKWYLgtRrtLQT6TneuZ_0Z0iCoCEV5EeNzlLybiH6XCQo9n4ps-HrKHIyQ_w3oJLZzse_cRO3Iz6Y1104X-Q95Knds8jGx6DOgTzSvG1wuFXsnUbP-k0iw1VcOqLOFTYeWOIERNY5g8hCinopAzRkTMu8o-4oF-IsVRKApA37yxTmv9CS4xAyrk");'
                    ></div>
                    <div>
                      <div className="font-medium text-[#111418] dark:text-white">
                        Bob Williams
                      </div>
                      <div className="text-[#617589] dark:text-gray-400">
                        bob.w@email.com
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                    Quản trị viên
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
                    Đang hoạt động
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      aria-label="Gửi lời mời rời khỏi CLB"
                      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-[#617589] dark:text-gray-400"
                    >
                      <span className="material-symbols-outlined text-xl">
                        logout
                      </span>
                    </button>
                    <div className="relative inline-block text-left">
                      <button
                        aria-label="Chỉnh sửa vai trò"
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-[#617589] dark:text-gray-400 flex items-center"
                      >
                        <span className="material-symbols-outlined text-xl">
                          edit
                        </span>
                      </button>
                    </div>
                    <button
                      aria-label="Xóa thành viên"
                      className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400"
                    >
                      <span className="material-symbols-outlined text-xl">
                        delete
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-4">
                    <div
                      className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                      data-alt="Avatar of Charlie Brown"
                     // style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDM5Xd9kpG8KksWPcKGnM_Zve3Rv3bLlSE5MaFepQFMff6Qr_NRPJXK3DFLjOUOmx9Y8qswKTFOaytK1xZraNxv38dK9TLcY7UNd87QlOc0IqkaNeJfrGkXcFloXtaUjZbWDB_t-VGAtiElfD5uE8AoM06A7SBE_IXZm80gLtOE_EoqeocKP4Pynxn9CBUbASMa6GpZGduCp980h1YjYU0NhJQ2AlxynWJe-HtqJUW3ZzUjs2PxA1FAgBZaUOFO10XHlEZ1yKJdf4s");'
                    ></div>
                    <div>
                      <div className="font-medium text-[#111418] dark:text-white">
                        Charlie Brown
                      </div>
                      <div className="text-[#617589] dark:text-gray-400">
                        charlie.b@email.com
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300">
                    Thủ quỹ
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
                    Đang hoạt động
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      aria-label="Gửi lời mời rời khỏi CLB"
                      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-[#617589] dark:text-gray-400"
                    >
                      <span className="material-symbols-outlined text-xl">
                        logout
                      </span>
                    </button>
                    <div className="relative inline-block text-left">
                      <button
                        aria-label="Chỉnh sửa vai trò"
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-[#617589] dark:text-gray-400 flex items-center"
                      >
                        <span className="material-symbols-outlined text-xl">
                          edit
                        </span>
                      </button>
                    </div>
                    <button
                      aria-label="Xóa thành viên"
                      className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400"
                    >
                      <span className="material-symbols-outlined text-xl">
                        delete
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="bg-gray-50/50 dark:bg-gray-900/30">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-4">
                    <div
                      className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                      data-alt="Avatar of Diana Prince"
                      //style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAFkf8eM8_Wy600-IG9EFWgSFAMOrgxFcbLfcKC1TZyVkbwPtElLfol8k5pJOQizCvaG0hBSmJgSK9uhv1ibRCM_AhM_WRczkCbbXMws1V9UxpF1R1_GRzZx8xOSyGwoowilNQB30ph8oZvXRNGP18NQ69fygik3whNsrYrdiaGr8gEk7uxnid_D5F8MpsrMegoX3j61umBTw6pOnHW02ul8JWUVwGTLN_DhwutANgJ36WsfQEmdijrWNX2YkHlKi1aoE35kFvBqHs");'
                    ></div>
                    <div>
                      <div className="font-medium text-[#111418] dark:text-white">
                        Diana Prince
                      </div>
                      <div className="text-[#617589] dark:text-gray-400">
                        diana.p@email.com
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                    Thành viên
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300">
                    Bị cấm
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      aria-label="Gửi lời mời rời khỏi CLB"
                      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-[#617589] dark:text-gray-400"
                    >
                      <span className="material-symbols-outlined text-xl">
                        logout
                      </span>
                    </button>
                    <div className="relative inline-block text-left">
                      <button
                        aria-label="Chỉnh sửa vai trò"
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-[#617589] dark:text-gray-400 flex items-center"
                      >
                        <span className="material-symbols-outlined text-xl">
                          edit
                        </span>
                      </button>
                    </div>
                    <button
                      aria-label="Xóa thành viên"
                      className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400"
                    >
                      <span className="material-symbols-outlined text-xl">
                        delete
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default MemberClubs;
