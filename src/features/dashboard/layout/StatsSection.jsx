function StatsSection() {
  const stats = [
    {
      title: "HEART RATE",
      value: "72",
      unit: "bpm",
      change: "+2.4%",
      color: "text-green-500",
    },
    {
      title: "BLOOD OXYGEN",
      value: "98",
      unit: "%",
      change: "-0.8%",
      color: "text-red-400",
    },
    {
      title: "BLOOD PRESSURE",
      value: "120/80",
      unit: "mmHg",
      change: "NORMAL",
      color: "text-green-500",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-6 mt-8 mb-8">
      {stats.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-[28px] p-6 shadow-sm hover:shadow-md transition"
        >
          <div className="flex justify-between items-center mb-6">
            <span className="text-xl">♡</span>

            <span className={`text-sm font-semibold ${item.color}`}>
              {item.change}
            </span>
          </div>

          <p className="text-gray-400 text-sm mb-2">
            {item.title}
          </p>

          <h2 className="text-4xl font-bold">
            {item.value}
            <span className="text-lg font-medium ml-2">
              {item.unit}
            </span>
          </h2>
        </div>
      ))}
    </div>
  );
}

export default StatsSection;