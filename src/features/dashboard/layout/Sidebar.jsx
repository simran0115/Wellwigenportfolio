import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Squares2X2Icon,
  CalendarDaysIcon,
  DocumentTextIcon,
  BuildingOffice2Icon,
  ShieldCheckIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  ArrowLeftOnRectangleIcon,
  LifebuoyIcon,
} from "@heroicons/react/24/outline";

export default function Sidebar() {
  const location = useLocation();
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    // Optionally fetch every time it mounts or poll
    const fetchPending = async () => {
      try {
        // use 127.0.0.1 to avoid ipv6 resolution issues
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || "http://localhost:8000"}/api/vendor/all`);
        const data = await res.json();
        const pending = (data.vendors || []).filter(v => v.status === "pending").length;
        setPendingCount(pending);
      } catch (err) {
        console.error("Failed to fetch pending vendors:", err);
      }
    };
    fetchPending();
  }, [location.pathname]); // refetch on navigation

  const navItems = [
    { name: "Dashboard", icon: Squares2X2Icon, route: "/admin" },
    { name: "Appointments", icon: CalendarDaysIcon, route: "/admin/appointments" },
    { name: "Records", icon: DocumentTextIcon, route: "/admin/medical-records" },
    { name: "Facilities", icon: BuildingOffice2Icon, route: "/admin/facilities" },
    { name: "Insurance", icon: ShieldCheckIcon, route: "/admin/insurance" },
    { name: "Vendors", icon: BuildingOffice2Icon, route: "/admin/vendors" },
    { name: "Settings", icon: Cog6ToothIcon, route: "/admin/settings" },
  ];

  return (
    <aside className="w-[240px] min-h-screen bg-white px-5 py-8 border-r border-gray-100 flex flex-col justify-between whitespace-nowrap">
      <div>
        <div className="mb-10 px-2">
          <h1 className="text-xl font-bold tracking-tight text-gray-900">Wellwigen</h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Clinical Portal</p>
        </div>

        <div className="space-y-1">
          {navItems.map((item, i) => {
            const isActive = location.pathname === item.route;
            return (
              <Link to={item.route} key={i}>
                <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all ${isActive ? "bg-gray-50 text-blue-600" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}`}>
                  <item.icon className={`w-[18px] h-[18px] ${isActive ? "text-blue-600" : "text-gray-400"}`} />
                  <span className="text-sm font-medium">{item.name}</span>
                  {item.name === "Vendors" && pendingCount > 0 && (
                    <span className="ml-auto bg-blue-100 text-blue-600 text-[10px] font-bold px-1.5 py-0.5 rounded">
                      {pendingCount}
                    </span>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      <div className="space-y-1">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all">
          <QuestionMarkCircleIcon className="w-4 h-4" />
          <span className="text-sm font-medium">Support</span>
        </button>

        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all">
          <ArrowLeftOnRectangleIcon className="w-4 h-4" />
          <span className="text-sm font-medium">Log out</span>
        </button>
      </div>
    </aside>
  );
}