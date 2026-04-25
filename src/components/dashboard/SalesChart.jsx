import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { motion } from "framer-motion";

const data = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 6000 },
  { name: "Mar", sales: 9000 },
  { name: "Apr", sales: 12000 },
  { name: "May", sales: 8000 },
  { name: "Jun", sales: 14000 }
];

const SalesChart = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-4 rounded-2xl shadow"
    >
      <h3 className="mb-4 font-semibold">Sales Performance</h3>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="sales" fill="#2563eb" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default SalesChart;