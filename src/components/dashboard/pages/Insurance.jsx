import React from "react";

const insuranceData = [
  {
    id: 1,
    patient: "John Doe",
    provider: "Apollo Health",
    policyNumber: "AP123456789",
    coverage: "₹5,00,000",
    expiry: "2027-04-01",
  },
  {
    id: 2,
    patient: "Jane Smith",
    provider: "Star Health",
    policyNumber: "ST987654321",
    coverage: "₹3,00,000",
    expiry: "2026-12-31",
  },
  {
    id: 3,
    patient: "Michael Brown",
    provider: "Religare Health",
    policyNumber: "RH456789123",
    coverage: "₹4,50,000",
    expiry: "2027-03-15",
  },
  {
    id: 4,
    patient: "Emily Davis",
    provider: "HDFC Ergo",
    policyNumber: "HE789123456",
    coverage: "₹2,00,000",
    expiry: "2026-11-30",
  }
];

export default function Insurance() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">Insurance Details</h1>

      {/* Insurance Table */}
      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">ID</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Patient</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Provider</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Policy Number</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Coverage</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Expiry Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {insuranceData.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-600">{record.id}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{record.patient}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{record.provider}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{record.policyNumber}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{record.coverage}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{record.expiry}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Add Insurance
        </button>
        <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition">
          Export Records
        </button>
      </div>
    </div>
  );
}