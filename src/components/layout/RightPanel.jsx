function RightPanel() {
  return (
    <div className="space-y-6 mt-8">

      {/* Status Pills */}
      <div className="flex gap-3">
        <div className="bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-medium">
          Status: Stable
        </div>

        <div className="bg-gray-200 text-gray-600 px-4 py-2 rounded-full text-sm font-medium">
          Last Sync: 12m ago
        </div>
      </div>

      {/* Appointment Card */}
      <div className="bg-[#005A87] text-white rounded-[30px] p-7 shadow-lg">
        <p className="text-sm tracking-[3px] mb-4">
          UPCOMING APPOINTMENT
        </p>

        <h2 className="text-3xl font-bold mb-2">
          Dr. Sarah Jenkins
        </h2>

        <p className="mb-6 text-gray-200">
          Annual Health Assessment
        </p>

        <div className="flex items-center gap-4 mb-6">
          <div className="bg-white/20 px-4 py-3 rounded-xl">
            OCT 24
          </div>

          <div>
            <h4 className="font-bold">
              10:30 AM
            </h4>

            <p className="text-sm text-gray-200">
              Main Building, Wing B
            </p>
          </div>
        </div>

        <button className="w-full bg-white text-[#005A87] py-3 rounded-full font-semibold">
          Manage Booking
        </button>
      </div>

      {/* Quick Actions */}
      <div className="bg-[#EEF3F3] rounded-[30px] p-6">
        <h3 className="font-bold mb-5">
          QUICK ACTIONS
        </h3>

        <div className="space-y-3">
          <button className="w-full bg-white py-3 rounded-full shadow-sm">
            Book Appointment
          </button>

          <button className="w-full bg-white py-3 rounded-full shadow-sm">
            Request Refill
          </button>

          <button className="w-full bg-white py-3 rounded-full shadow-sm">
            Message Doctor
          </button>
        </div>
      </div>
    </div>
  );
}

export default RightPanel;