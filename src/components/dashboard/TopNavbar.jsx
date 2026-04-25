import { Bell, Search } from "lucide-react";

const TopNavbar = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-semibold">
        Welcome back, Vendor 👋
      </h2>

      <div className="flex items-center gap-4">
        <div className="flex items-center bg-white px-3 py-2 rounded-lg shadow">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="ml-2 outline-none text-sm"
          />
        </div>

        <Bell className="text-gray-600 cursor-pointer" />

        <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
      </div>
    </div>
  );
};

export default TopNavbar;