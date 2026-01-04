import React from "react";
import { Link, useLocation } from "react-router";

const Sidebar = ({ closeSidebar }) => {
  const location = useLocation();
  const links = [
    { name: "Profile", path: "/dashboard" },
    { name: "Manage User", path: "/dashboard/admin/manage-user" },
    { name: "Manage Restaurants", path: "/dashboard/admin/manage-restaurants" },
    { name: "Manage Foods", path: "/dashboard/admin/manage-foods" },
  ];

  return (
    <div className="flex flex-col h-full bg-white dark:bg-black text-gray-800 dark:text-gray-200 shadow-md p-4 space-y-3">
      <h2 className="text-2xl font-bold mb-6 text-orange-500">Dashboard</h2>
      {links.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          onClick={closeSidebar} // click closes mobile sidebar
          className={`block px-5 py-3 rounded-xl font-medium transition-all duration-300
            ${
              location.pathname === link.path
                ? "bg-gradient-to-r from-[#f97316] to-[#fb923c] text-white shadow-lg"
                : "hover:bg-gradient-to-r hover:from-[#f97316] hover:to-[#fb923c] hover:text-white"
            }`}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
