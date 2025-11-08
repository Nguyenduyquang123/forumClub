import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Cần nhập Link và useNavigate
import axios from "axios";

const MENU_ITEMS = [
  { label: "Hồ sơ", path: "/my-profile" },
  { label: "Cài đặt", path: "/settings" },
  { label: "Đăng xuất", path: "/logout" },
];

const UserMenu = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    try {
      if (token) {
        await axios.post(
          "http://localhost:8000/api/auth/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
    <div className="absolute right-0 w-48 bg-white rounded-md shadow-xl py-1 px-1 z-50 transform transition duration-300">
      {MENU_ITEMS.map((item) =>
        item.path === "/logout" ? (
          <button
            key={item.label}
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            {item.label}
          </button>
        ) : (
          <Link
            key={item.label}
            to={item.path}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            {item.label}
          </Link>
        )
      )}
    </div>
  );
};

export default UserMenu;
