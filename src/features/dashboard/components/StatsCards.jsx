const StatsCards = () => {
  const stats = [
    { title: "Total Revenue", value: "₹1,42,850", color: "text-blue-600" },
    { title: "Total Orders", value: "1,284" },
    { title: "Growth Rate", value: "8.2%" }
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((item, i) => (
        <div key={i} className="bg-white p-4 rounded-2xl shadow">
          <h3 className="text-sm text-gray-500">{item.title}</h3>
          <p className={`text-xl font-bold ${item.color || ""}`}>
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;