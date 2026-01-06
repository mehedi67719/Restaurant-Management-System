import React from "react";
import { Link, useLocation } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Useauth from "../../Hooks/Useauth";
import { fetchuser } from "../../Components/api";

const Sidebar = ({ closeSidebar }) => {
    const location = useLocation();
    const { User } = Useauth();

    const { data: users = [], isLoading, isError } = useQuery({
        queryKey: ["users"],
        queryFn: fetchuser,
    });

    if (isLoading) {
        return <div className="p-4">Loading...</div>;
    }

    if (isError) {
        return <div className="p-4 text-red-500">Failed to load</div>;
    }

    const currentUser = users.find((u) => u.email === User?.email);


    const adminLinks = [
        { name: "Profile", path: "/dashboard" },
        { name: "Manage Users", path: "/dashboard/admin/manage-user" },
        { name: "Manage Restaurants", path: "/dashboard/admin/manage-restaurants" },
        { name: "Manage Foods", path: "/dashboard/admin/manage-foods" },
        { name: "My Orders", path: "/dashboard/my-order" },
       
       
    ];

    const sellerLinks = [
        { name: "Profile", path: "/dashboard" },
        { name: "Add Food", path: "/dashboard/seller/add-food" },
        { name: "Manage Foods", path: "/dashboard/seller/manage-foods" },
        { name: "Food Orders", path: "/dashboard/seller/orders" },
        { name: "Delivered Foods", path: "/dashboard/seller/delivered" },
        { name: "My Orders", path: "/dashboard/my-order" },
        { name: "Total Orders", path: "/dashboard/seller/total-orders" },
        
    ];

    const userLinks = [
        { name: "Profile", path: "/dashboard" },
        { name: "My Orders", path: "/dashboard/my-order" },
       
    ];

    let links = userLinks;
    if (currentUser?.role === "admin") links = adminLinks;
    else if (currentUser?.role === "seller") links = sellerLinks;

    return (
        <div className="flex flex-col h-full bg-white dark:bg-black text-gray-800 dark:text-gray-200 shadow-md p-4 space-y-3">
            <h2 className="text-2xl font-bold mb-6 text-orange-500 capitalize">
                {currentUser?.role || "user"} Dashboard
            </h2>

            {links.map((link) => (
                <Link
                    key={link.path}
                    to={link.path}
                    onClick={closeSidebar}
                    className={`block px-5 py-3 rounded-xl font-medium transition-all duration-300
            ${location.pathname === link.path
                            ? "bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-lg"
                            : "hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-400 hover:text-white"
                        }`}
                >
                    {link.name}
                </Link>
            ))}
        </div>
    );
};

export default Sidebar;
