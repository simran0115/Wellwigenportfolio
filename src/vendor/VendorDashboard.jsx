import { Bell, Search, Heart, HelpCircle, LogOut } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { useState } from "react";

/* PRODUCTS */
const products = [
  {
    name: "Dragon Fruit",
    price: 120,
    stock: 45,
    img: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=500"
  },
  {
    name: "Orange",
    price: 85,
    stock: 12,
    img: "https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?w=500"
  },
  {
    name: "Lime",
    price: 60,
    stock: 38,
    img: "https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?w=500"
  },
  {
    name: "Cherries",
    price: 450,
    stock: 3,
    img: "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?w=500"
  }
];

/* SALES DATA */
const data = [
  { name: "Jan", sales: 60000 },
  { name: "Feb", sales: 85000 },
  { name: "Mar", sales: 105000 },
  { name: "Apr", sales: 120000 },
  { name: "May", sales: 95000 },
  { name: "Jun", sales: 142000 }
];

/* TEMP DELIVERY DATA */
const deliveries = [
  { customer: "Rahul", product: "Apples", date: "2026-04-23" },
  { customer: "Priya", product: "Oranges", date: "2026-04-24" },
  { customer: "Amit", product: "Lime", date: "2026-04-26" }
];

export default function VendorDashboard() {
  const [showNotif, setShowNotif] = useState(false);

  const today = new Date();

  const notifications = deliveries.map((d) => {
    const dDate = new Date(d.date);
    const diff = Math.ceil((dDate - today) / (1000 * 60 * 60 * 24));

    if (diff === 0) return `🚚 Delivery TODAY for ${d.customer}`;
    if (diff === 1) return `⏰ Reminder: Delivery tomorrow for ${d.customer}`;
    return `📦 Upcoming delivery for ${d.customer}`;
  });

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-64 p-6 flex flex-col justify-between bg-white border-r">

        <div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-10">
            Well Wigen
          </h1>

          <ul className="space-y-2 text-gray-700 text-sm">
            <li className="bg-teal-600 text-white px-4 py-2 rounded-md">
              Dashboard
            </li>
            <li className="hover:bg-gray-100 px-4 py-2 rounded-md cursor-pointer">Products</li>
            <li className="hover:bg-gray-100 px-4 py-2 rounded-md cursor-pointer">Orders</li>
            <li className="hover:bg-gray-100 px-4 py-2 rounded-md cursor-pointer">Analytics</li>
          </ul>
        </div>

        <div className="space-y-2 text-sm text-gray-700">
          <button className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition">
            + Add Product
          </button>

          <button className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 w-full">
            <HelpCircle size={16} /> Help & Support
          </button>

          <button className="flex items-center gap-2 px-3 py-2 rounded-md text-red-600 hover:bg-red-50 w-full">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-8 space-y-6">

        {/* TOP BAR */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Dashboard
          </h2>

          <div className="flex gap-4 items-center relative">
            <div className="flex items-center bg-white border rounded-md px-3 py-2 shadow-sm">
              <Search size={16} />
              <input
                className="ml-2 outline-none text-sm"
                placeholder="Search..."
              />
            </div>

            {/* NOTIFICATION */}
            <div className="relative">
              <Bell
                className="cursor-pointer text-gray-700"
                onClick={() => setShowNotif(!showNotif)}
              />

              {showNotif && (
                <div className="absolute right-0 mt-3 w-72 bg-white border rounded-md shadow-lg p-4">
                  <h4 className="font-medium mb-2 text-gray-800">
                    Notifications
                  </h4>

                  {notifications.map((n, i) => (
                    <div key={i} className="text-sm p-2 bg-gray-50 rounded mb-2">
                      {n}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="w-9 h-9 bg-teal-600 rounded-full"></div>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-6">
          <Stat title="Revenue" value="₹1,42,850" />
          <Stat title="Orders" value="1,284" />
          <Stat title="Growth" value="+8.2%" highlight />
        </div>

        {/* PRODUCTS */}
        <div className="grid grid-cols-4 gap-6">
          {products.map((p, i) => (
            <div key={i} className="bg-white rounded-md shadow-sm border hover:shadow-md transition">
              <img
                src={p.img}
                className="h-40 w-full object-cover rounded-t-md"
              />
              <div className="p-4">
                <h4 className="font-medium text-gray-800">{p.name}</h4>
                <p className="text-teal-600 font-semibold">₹{p.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CHART */}
        <div className="grid grid-cols-4 gap-6">

          <div className="col-span-3 bg-white p-5 rounded-md shadow-sm border">
            <h3 className="mb-4 font-medium text-gray-800">
              Sales Overview
            </h3>

            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#14b8a6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-teal-600 text-white p-5 rounded-md shadow-sm flex flex-col justify-between">
            <div>
              <p className="text-xs opacity-80">TRENDING</p>
              <h3 className="text-lg font-semibold mt-2">
                Citrus Boost
              </h3>
              <p className="text-sm mt-1 opacity-90">
                Increase citrus stock this week.
              </p>
            </div>

            <button className="bg-white text-teal-600 px-3 py-1 rounded-md mt-3">
              View →
            </button>
          </div>

        </div>

        {/* DELIVERIES */}
        <div className="bg-white p-5 rounded-md shadow-sm border">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Scheduled Deliveries
          </h3>

          {deliveries.map((d, i) => (
            <div key={i} className="flex justify-between bg-gray-50 p-3 rounded-md mb-2">
              <div>
                <p className="font-medium">{d.customer}</p>
                <p className="text-sm text-gray-500">{d.product}</p>
              </div>
              <p className="text-sm text-gray-600">
                {new Date(d.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

/* STAT CARD */
function Stat({ title, value, highlight }) {
  return (
    <div className="bg-white p-5 rounded-md shadow-sm border">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className={`text-2xl font-semibold mt-1 ${highlight ? "text-green-600" : "text-gray-800"}`}>
        {value}
      </h2>
    </div>
  );
}