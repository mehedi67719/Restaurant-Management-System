import React, { useState } from "react";
import { Link, useLocation } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Useauth from "../../Hooks/Useauth";
import { fetchuser } from "../../Components/api";
import { FaUser, FaUsers, FaUtensils, FaClipboardList, FaShoppingCart, FaBoxOpen, FaList } from "react-icons/fa";
import Spinner from "../../Components/Spinner";

const Sidebar = ({ mobile }) => {
  const location = useLocation();
  const { User } = Useauth();
  const [activeTooltip, setActiveTooltip] = useState(null);

  const { data: users = [], isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: fetchuser,
  });

  if (isLoading) return <div className="p-4"><Spinner/></div>;
  if (isError) return <div className="p-4 text-red-500">Failed to load</div>;

  const currentUser = users.find((u) => u.email === User?.email);

  const adminLinks = [
    { name: "Profile", path: "/dashboard", icon: <FaUser /> },
    { name: "Manage Users", path: "/dashboard/admin/manage-user", icon: <FaUsers /> },
    { name: "Manage Restaurants", path: "/dashboard/admin/manage-restaurants", icon: <FaUtensils /> },
    { name: "Manage Foods", path: "/dashboard/admin/manage-foods", icon: <FaClipboardList /> },
    { name: "My Orders", path: "/dashboard/my-order", icon: <FaShoppingCart /> },
  ];

  const sellerLinks = [
    { name: "Profile", path: "/dashboard", icon: <FaUser /> },
    { name: "Add Food", path: "/dashboard/seller/add-food", icon: <FaUtensils /> },
    { name: "Manage Foods", path: "/dashboard/seller/manage-foods", icon: <FaClipboardList /> },
    { name: "Food Orders", path: "/dashboard/seller/orders", icon: <FaShoppingCart /> },
    { name: "Delivered Foods", path: "/dashboard/seller/delivered", icon: <FaBoxOpen /> },
    { name: "My Orders", path: "/dashboard/my-order", icon: <FaList /> },
    { name: "Total Orders", path: "/dashboard/seller/total-orders", icon: <FaClipboardList /> },
  ];

  const userLinks = [
    { name: "Profile", path: "/dashboard", icon: <FaUser /> },
    { name: "My Orders", path: "/dashboard/my-order", icon: <FaShoppingCart /> },
  ];

  let links = userLinks;
  if (currentUser?.role === "admin") links = adminLinks;
  else if (currentUser?.role === "seller") links = sellerLinks;

  return (
    <div className={`flex flex-col h-full ${mobile ? "items-center" : ""} bg-white dark:bg-black text-gray-800 dark:text-gray-200 shadow-md lg:p-4 md:p-4 space-y-3`}>
      {!mobile && (
        <h2 className="text-2xl font-bold mb-6 text-orange-500 capitalize">
          {currentUser?.role || "user"} Dashboard
        </h2>
      )}

      {links.map((link, index) => (
        <div key={link.path} className="relative w-full">
          <Link
            to={link.path}
            onClick={() => mobile && setActiveTooltip(activeTooltip === index ? null : index)}
            className={`flex ${mobile ? "flex-col items-center" : "items-center md:justify-start"} justify-center md:justify-start lg:px-3 px-1.5 md:px-3 lg:py-3 md:py-3 py-1.5 rounded-xl font-medium transition-all duration-300 group ${
              location.pathname === link.path
                ? "bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-lg"
                : "hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-400 hover:text-white"
            }`}
          >
            <span className="text-xl">{link.icon}</span>
            {!mobile && <span className="ml-3">{link.name}</span>}
          </Link>

          {mobile && activeTooltip === index && (
            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-black text-white px-2 py-1 rounded-md text-sm whitespace-nowrap z-50">
              {link.name}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
