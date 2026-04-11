import React from "react";
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
  const navItems = [
    { name: "Dashboard", icon: Squares2X2Icon, active: true },
    { name: "Appointments", icon: CalendarDaysIcon },
    { name: "Records", icon: DocumentTextIcon },
    { name: "Facilities", icon: BuildingOffice2Icon },
    { name: "Insurance", icon: ShieldCheckIcon },
    { name: "Settings", icon: Cog6ToothIcon },
  ];

  return (
    <aside className="w-[260px] min-h-screen bg-[#E8EEF0] px-[20px] py-[28px] border-r border-[#DFE6E8] flex flex-col justify-between">
      <div>
        <div className="mb-[36px]">
          <h1 className="text-[26px] font-[800] text-[#0B5B77]">Wellwigen</h1>
          <p className="text-[10px] mt-[4px] tracking-[2px] text-[#6B7280]">CLINICAL SANCTUARY</p>
        </div>

        <div className="space-y-[10px]">
          {navItems.map((item, i) => (
            <div key={i} className={`flex items-center gap-3 px-[14px] py-[14px] rounded-[18px] cursor-pointer ${item.active ? "bg-white shadow-sm" : "hover:bg-white/60"}`}>
              <item.icon className="w-[18px] h-[18px] text-[#5E7285]" />
              <span className="text-[15px] font-[500] text-[#4B5563]">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <button className="w-full flex items-center gap-3 px-[14px] py-[14px] rounded-[18px] hover:bg-white/70">
          <QuestionMarkCircleIcon className="w-5 h-5" />
          <span>Help Center</span>
        </button>

        <button className="w-full flex items-center gap-3 px-[14px] py-[14px] rounded-[18px] hover:bg-white/70">
          <ArrowLeftOnRectangleIcon className="w-5 h-5" />
          <span>Logout</span>
        </button>

        <button className="bg-[#005D86] text-white rounded-full py-[14px] text-[14px] font-[600] flex items-center justify-center gap-2 shadow-sm w-full">
          <LifebuoyIcon className="w-4 h-4" /> Emergency Support
        </button>
      </div>
    </aside>
  );
}