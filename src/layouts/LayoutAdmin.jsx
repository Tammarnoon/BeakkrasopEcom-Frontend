import { Outlet } from "react-router-dom";
import { useState } from "react";
import SidebarAdmin from "../components/admin/SidebarAdmin";
import HeaderbarAdmin from "../components/admin/HeaderbarAdmin";

const LayoutAdmin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen">
      {/* ใช้ Transition สำหรับ Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-0"
        } transition-all duration-300 overflow-hidden`}
      >
        <SidebarAdmin />
      </div>
      <div className="flex-1 flex-col overflow-y-auto">
        <HeaderbarAdmin toggleSidebar={toggleSidebar} />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LayoutAdmin;
