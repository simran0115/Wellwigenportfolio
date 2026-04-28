function DashboardNavbar() {
  return (
    <div className="flex justify-between items-center">

      {/* Search Bar */}
      <div className="w-[420px] bg-white px-6 py-4 rounded-full shadow-sm flex items-center gap-3">
        <span className="text-gray-400 text-lg">🔍</span>

        <input
          type="text"
          placeholder="Search facilities, doctors, or records..."
          className="outline-none w-full bg-transparent text-sm"
        />
      </div>

      {/* Right Profile Section */}
      <div className="flex items-center gap-5">

        <div className="flex gap-4 text-xl text-gray-500">
          <span>🔔</span>
          <span>💬</span>
          <span>⚙️</span>
        </div>

        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-sm">
          <img
            src="https://i.pravatar.cc/100"
            alt="profile"
            className="w-12 h-12 rounded-full"
          />

          <div>
            <h3 className="font-semibold text-sm">
              Dr. Julianne Smith
            </h3>

            <p className="text-xs text-gray-400">
              Senior Medical Officer
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default DashboardNavbar;