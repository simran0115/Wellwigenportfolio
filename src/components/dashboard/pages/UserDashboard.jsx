import React from "react";
import {
  MagnifyingGlassIcon,
  BellIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  Cog6ToothIcon,
  HeartIcon,
  MapPinIcon,
  ClockIcon,
  BeakerIcon,
  BoltIcon,
  UserGroupIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

export default function UserDashboard() {
  const stats = [
    ["HEART RATE", "72", "bpm", "+2.4%", HeartIcon],
    ["BLOOD OXYGEN", "98", "%", "-0.8%", BoltIcon],
    ["BLOOD PRESSURE", "120/80", "mmHg", "NORMAL", BeakerIcon],
  ];

  const facilities = [
    ["General Medicine", "4 Doctors available today", "~15m", "OPEN", UserGroupIcon],
    ["Cardiology Unit", "Specialized heart care", "~45m", "BUSY", HeartIcon],
    ["Imaging & Radiology", "Advanced diagnostic scans", "~10m", "OPEN", SparklesIcon],
  ];

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-[#F4F8F9] font-[Inter] antialiased px-[34px] py-[28px]">
      {/* Premium Background Glow */}
      <div className="absolute top-[-120px] right-[-80px] w-[420px] h-[420px] rounded-full bg-[#D8F2FF] blur-[120px] opacity-60"></div>
      <div className="absolute bottom-[-100px] left-[-50px] w-[320px] h-[320px] rounded-full bg-[#E9F7FF] blur-[120px] opacity-70"></div>

      <div className="relative z-10">
        {/* NAVBAR */}
        <div className="flex items-center justify-between mb-[34px]">
          <div className="w-[470px] h-[62px] bg-white/90 backdrop-blur-xl border border-white rounded-full flex items-center px-[24px] gap-3 shadow-[0_15px_40px_rgba(14,30,37,0.06)]">
            <MagnifyingGlassIcon className="w-5 h-5 text-[#8C97A8]" />
            <input
              placeholder="Search facilities, doctors, or records..."
              className="bg-transparent outline-none text-[14px] font-[500] text-[#374151] w-full placeholder:text-[#9CA3AF]"
            />
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 bg-white px-5 py-3 rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.04)]">
              <BellIcon className="w-5 h-5 text-[#4B5563]" />
              <ChatBubbleOvalLeftEllipsisIcon className="w-5 h-5 text-[#4B5563]" />
              <Cog6ToothIcon className="w-5 h-5 text-[#4B5563]" />
            </div>

            <div className="flex items-center gap-3 bg-white px-3 py-2 rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.04)]">
              <img src="https://i.pravatar.cc/150?img=32" className="w-[50px] h-[50px] rounded-full object-cover border-2 border-[#E6F7FF]" />
              <div>
                <h3 className="text-[14px] font-[800] text-[#111827]">Dr. Julianne Smith</h3>
                <p className="text-[12px] text-[#7B8794] font-[500]">Senior Medical Officer</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-[24px]">
          {/* LEFT SECTION */}
          <div className="col-span-8">
            <h1 className="text-[64px] font-[800] leading-[60px] tracking-[-2px] text-[#101010]">
              Patient<br />Central
            </h1>
            <p className="mt-[14px] text-[15px] font-[500] text-[#64707D] mb-[30px]">
              Welcome back, your sanctuary is ready. You have 3 pending notifications.
            </p>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-[18px] mb-[30px]">
              {stats.map((card, i) => {
                const Icon = card[4];
                return (
                  <div key={i} className="group bg-white/90 backdrop-blur-xl border border-white/80 rounded-[32px] px-[24px] py-[22px] min-h-[180px] shadow-[0_12px_30px_rgba(16,24,40,0.05)] hover:-translate-y-1 transition duration-500">
                    <div className="flex justify-between items-center mb-[26px]">
                      <div className="w-[50px] h-[50px] rounded-[18px] bg-gradient-to-br from-[#EAF8FF] to-[#D7EEFF] flex items-center justify-center shadow-inner group-hover:scale-110 transition duration-300">
                        <Icon className="w-[22px] h-[22px] text-[#005D86]" />
                      </div>
                      <span className={`text-[13px] font-[700] ${i === 1 ? "text-[#E25A5A]" : "text-[#19A874]"}`}>{card[3]}</span>
                    </div>
                    <p className="text-[12px] text-[#9CA3AF]">{card[0]}</p>
                    <h2 className="text-[42px] font-[800] text-[#111111] mt-[8px] leading-none">{card[1]}</h2>
                    <span className="text-[15px] text-[#6B7280] font-[500]">{card[2]}</span>
                  </div>
                );
              })}
            </div>

            {/* FACILITIES */}
            <div className="flex justify-between items-center mb-[18px]">
              <h2 className="text-[22px] font-[700] text-[#111111]">Facility Directory</h2>
              <button className="text-[#005D86] font-[700] text-[15px]">View All Facilities</button>
            </div>

            <div className="grid grid-cols-3 gap-[18px]">
              {facilities.map((item, i) => {
                const Icon = item[4];
                return (
                  <div key={i} className="group bg-white/90 backdrop-blur-xl border border-white/80 rounded-[32px] p-[22px] min-h-[240px] shadow-[0_12px_30px_rgba(16,24,40,0.05)] hover:-translate-y-1 transition duration-500">
                    <div className="flex justify-between items-center mb-[20px]">
                      <div className="w-[56px] h-[56px] rounded-[20px] bg-gradient-to-br from-[#E8F7FF] to-[#D4EAFF] flex items-center justify-center shadow-inner group-hover:scale-110 transition duration-300">
                        <Icon className="w-[24px] h-[24px] text-[#005D86]" />
                      </div>
                      <span className={`px-[14px] py-[6px] rounded-full text-[11px] font-[800] ${item[3] === "OPEN" ? "bg-[#E7F8EF] text-[#0BAA66]" : "bg-[#FDECEC] text-[#E35B5B]"}`}>{item[3]}</span>
                    </div>
                    <h3 className="text-[22px] font-[700] text-[#111111] leading-[32px]">{item[0]}</h3>
                    <p className="text-[15px] text-[#6B7280] mt-[10px]">{item[1]}</p>
                    <div className="flex items-center gap-2 mt-[34px] text-[#9CA3AF] text-[14px]">
                      <ClockIcon className="w-4 h-4" />
                      <span>Wait time: {item[2]}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="col-span-4 space-y-[20px]">
            <div className="bg-gradient-to-br from-[#005D86] via-[#0A7DA6] to-[#14A9C7] rounded-[34px] p-[30px] text-white shadow-[0_25px_50px_rgba(0,93,134,0.30)] hover:scale-[1.02] transition duration-500">
              <p className="text-[11px] tracking-[4px] uppercase font-[600]">Upcoming Appointment</p>
              <h2 className="text-[34px] font-[800] mt-[20px] leading-[46px]">Dr. Sarah Jenkins</h2>
              <p className="text-[16px] mt-[8px] text-[#D8ECF5]">Annual Health Assessment</p>
              <div className="flex justify-between mt-[28px] text-[18px] font-[700]">
                <span>24 Oct</span>
                <span>10:30 AM</span>
              </div>
              <button className="bg-white text-[#005D86] mt-[26px] w-full py-[15px] rounded-full font-[800] text-[14px] shadow-lg hover:scale-[1.03] transition">
                Manage Booking
              </button>
            </div>

            <div className="bg-white rounded-[32px] p-[22px] shadow-[0_12px_30px_rgba(16,24,40,0.05)]">
              <h2 className="text-[20px] font-[700] mb-[14px] text-[#111111]">Hospital Location</h2>
              <div className="bg-[#EEF3F4] rounded-[22px] h-[170px] flex items-center justify-center">
                <MapPinIcon className="w-10 h-10 text-[#005D86]" />
              </div>
            </div>

            <div className="bg-white rounded-[32px] p-[22px] shadow-[0_12px_30px_rgba(16,24,40,0.05)]">
              <h2 className="text-[28px] font-[900] text-[#111111] mb-[16px]">Quick Actions</h2>
              <div className="space-y-[10px]">
                {["Book Appointment", "Request Refill", "Message Doctor"].map((btn, i) => (
                  <button key={i} className="w-full bg-[#F2F5F6] rounded-full py-[14px] text-[13px] font-[600] text-[#374151] hover:bg-[#E8EEF0] hover:scale-[1.02] transition duration-300">
                    {btn}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-[32px] p-[22px] shadow-[0_12px_30px_rgba(16,24,40,0.05)]">
              <h2 className="text-[28px] font-[900] text-[#111111] mb-[14px]">Recent Activity</h2>
              <p className="font-[800] text-[15px] text-[#111111]">Prescription Ready</p>
              <p className="text-[14px] text-[#6B7280] mt-[6px] leading-[22px]">Your Amoxicillin refill is available for pickup.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
