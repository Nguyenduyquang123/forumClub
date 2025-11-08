import { NavLink } from "react-router-dom";
import { useState } from "react";

const CategoryList = () => {
  const [categories] = useState([
    { name: "Trang chủ", path: "/" },
    { name: "Danh sách câu lạc bộ", path: "/clubs" },
  ]);

  return (
    <nav className="flex gap-6">
      {categories.map((category) => (
        <NavLink
          key={category.name}
          to={category.path}
          className={({ isActive }) =>
            `
            relative text-sm font-medium transition-all duration-300
            ${
              isActive
                ? "text-primary after:scale-x-100"
                : "text-slate-500 hover:text-primary after:scale-x-0 hover:after:scale-x-100"
            }
            after:content-[''] after:absolute after:left-0 after:-bottom-1
            after:h-[2px] after:w-full after:bg-primary after:origin-left
            after:transition-transform after:duration-300
          `
          }
        >
          {category.name}
        </NavLink>
      ))}
    </nav>
  );
};

export default CategoryList;
