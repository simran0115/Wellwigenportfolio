function FacilitySection() {
  const facilities = [
    {
      title: "General Medicine",
      desc: "4 Doctors available today",
      wait: "~15m",
      status: "OPEN",
      statusColor: "bg-green-100 text-green-600",
    },
    {
      title: "Cardiology Unit",
      desc: "Specialized heart care",
      wait: "~45m",
      status: "BUSY",
      statusColor: "bg-red-100 text-red-500",
    },
    {
      title: "Imaging & Radiology",
      desc: "Advanced diagnostic scans",
      wait: "~10m",
      status: "OPEN",
      statusColor: "bg-green-100 text-green-600",
    },
  ];

  return (
    <div className="mt-10">
      {/* Heading */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">
          Facility Directory
        </h2>

        <button className="text-blue-600 font-medium">
          View All Facilities
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-3 gap-6">
        {facilities.map((facility, index) => (
          <div
            key={index}
            className="bg-white rounded-[28px] p-6 shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-center mb-5">
              <div className="w-12 h-12 bg-[#DDF1FF] rounded-full flex items-center justify-center text-xl">
                ✚
              </div>

              <span
                className={`px-4 py-1 rounded-full text-xs font-semibold ${facility.statusColor}`}
              >
                {facility.status}
              </span>
            </div>

            <h3 className="text-xl font-bold mb-2">
              {facility.title}
            </h3>

            <p className="text-gray-500 mb-5">
              {facility.desc}
            </p>

            <p className="text-gray-400">
              Wait time: {facility.wait}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FacilitySection;