import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "../../Components/Navbar";
import { Outlet } from "react-router";

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full sticky top-0 z-50">
        <Navbar />
      </div>

      <div className="flex flex-1 relative">
        <div className="hidden md:block w-[15%] min-w-[200px] bg-white dark:bg-black shadow-md sticky top-[64px] h-[calc(100vh-64px)]">
          <Sidebar />
        </div>

        <div className="md:hidden w-10 bg-white dark:bg-black shadow-md  flex flex-col items-center space-y-0.5 sticky top-[64px] h-[calc(100vh-64px)]">
          <Sidebar mobile />
        </div>

        <div className="flex-1 lg:p-6 md:p-4 p-2 overflow-auto relative">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
