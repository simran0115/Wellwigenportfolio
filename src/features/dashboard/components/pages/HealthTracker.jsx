import React from "react";

const reportsData = [
  { id: 1, title: "Monthly Patient Report", type: "PDF", date: "2026-03-31", status: "Completed" },
  { id: 2, title: "Appointment Summary", type: "Excel", date: "2026-03-30", status: "Pending" },
  { id: 3, title: "Doctor Performance", type: "PDF", date: "2026-03-28", status: "Completed" },
  { id: 4, title: "Weekly Metrics", type: "Excel", date: "2026-03-27", status: "Pending" }
];

export default function Reports() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">Reports</h1>

      {/* Reports Table */}
      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">ID</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Title</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Type</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Date</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reportsData.map((report) => (
              <tr key={report.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-600">{report.id}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{report.title}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{report.type}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{report.date}</td>
                <td className={`px-6 py-4 text-sm font-medium ${
                  report.status === "Completed" ? "text-green-600" : "text-yellow-600"
                }`}>
                  {report.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Generate Report
        </button>
        <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition">
          Export All
        </button>
      </div>
    </div>
  );
}