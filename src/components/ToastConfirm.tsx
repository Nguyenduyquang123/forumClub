import { toast } from "react-toastify";

export const ToastConfirm = (message, onConfirm) => {
  toast(
    ({ closeToast }) => (
      <div className="flex gap-3">
        {/* Icon */}
        <div className="mt-1 text-red-600">
          <span className="material-symbols-outlined text-2xl">
            warning
          </span>
        </div>

        {/* Content */}
        <div className="flex-1">
          <p className="font-semibold text-gray-800 mb-1">
            Xác nhận hành động
          </p>
          <p className="text-sm text-gray-600 mb-3">
            {message}
          </p>

          <div className="flex justify-end gap-2">
            <button
              onClick={closeToast}
              className="px-3 py-1.5 text-sm rounded-md
                         bg-gray-100 hover:bg-gray-200
                         text-gray-700 transition"
            >
              Hủy
            </button>

            <button
              onClick={() => {
                closeToast();
                onConfirm();
              }}
              className="px-3 py-1.5 text-sm rounded-md
                         bg-red-600 hover:bg-red-700
                         text-white font-medium transition"
            >
              Xóa
            </button>
          </div>
        </div>
      </div>
    ),
    {
      autoClose: false,
      closeOnClick: false,
      draggable: false,
      className: "rounded-xl shadow-lg",
    }
  );
};
