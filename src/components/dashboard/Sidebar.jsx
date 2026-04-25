import { LayoutDashboard, Package, ShoppingCart, BarChart2, MessageCircle, User } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-64 bg-blue-700 text-white p-5 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold mb-6">Well Wigen</h1>

        <ul className="space-y-4">
          <li className="flex items-center gap-2 bg-blue-600 p-2 rounded">
            <LayoutDashboard size={18}/> Dashboard
          </li>
          <li className="flex items-center gap-2"><Package size={18}/> My Products</li>
          <li className="flex items-center gap-2"><ShoppingCart size={18}/> Orders</li>
          <li className="flex items-center gap-2"><BarChart2 size={18}/> Analytics</li>
          <li className="flex items-center gap-2"><MessageCircle size={18}/> Messages</li>
          <li className="flex items-center gap-2"><User size={18}/> Profile</li>
        </ul>
      </div>

      <button className="bg-blue-500 p-2 rounded mt-6">
        + Add New Product
      </button>
    </div>
  );
};

export default Sidebar;