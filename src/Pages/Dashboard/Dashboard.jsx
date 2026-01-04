import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "../../Components/Navbar";
import { Outlet } from "react-router";
import {  IoReorderThree } from "react-icons/io5";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleCloseSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full sticky top-0 z-50">
        <Navbar />
      </div>

      <div className="flex flex-1 relative">
        <div className="hidden md:block w-[15%] min-w-[200px] bg-white dark:bg-black shadow-md sticky top-[64px] h-[calc(100vh-64px)]">
          <Sidebar />
        </div>

        <div
          className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-black z-50 shadow-md p-5 space-y-3 transform transition-transform duration-300 md:hidden ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar closeSidebar={handleCloseSidebar} />
        </div>

        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={handleCloseSidebar}
          ></div>
        )}

        <div className="flex-1 p-6 overflow-auto relative">
          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden fixed top-17 left-0 z-50 text-3xl dark:text-white"
            >
              <IoReorderThree className="text-2xl text-gray-800 dark:text-gray-200" />
            </button>
          )}
          <Outlet onClick={handleCloseSidebar} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
