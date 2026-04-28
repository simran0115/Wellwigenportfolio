import React from "react";

const prescriptionsData = [
  {
    id: 1,
    patient: "John Doe",
    doctor: "Dr. Smith",
    medication: "Amlodipine 5mg",
    dosage: "Once daily",
    startDate: "2026-04-01",
    endDate: "2026-04-30"
  },
  {
    id: 2,
    patient: "Jane Smith",
    doctor: "Dr. Johnson",
    medication: "Metformin 500mg",
    dosage: "Twice daily",
    startDate: "2026-04-03",
    endDate: "2026-05-03"
  },
  {
    id: 3,
    patient: "Michael Brown",
    doctor: "Dr. Lee",
    medication: "Salbutamol Inhaler",
    dosage: "As needed",
    startDate: "2026-04-05",
    endDate: "2026-05-05"
  },
  {
    id: 4,
    patient: "Emily Davis",
    doctor: "Dr. Patel",
    medication: "Sumatriptan 50mg",
    dosage: "As needed",
    startDate: "2026-04-07",
    endDate: "2026-04-14"
  }
];

export default function Prescriptions() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">Prescriptions</h1>

      {/* Prescriptions Table */}
      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">ID</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Patient</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Doctor</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Medication</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Dosage</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Start Date</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">End Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {prescriptionsData.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-600">{record.id}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{record.patient}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{record.doctor}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{record.medication}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{record.dosage}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{record.startDate}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{record.endDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Add Prescription
        </button>
        <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition">
          Export Prescriptions
        </button>
      </div>
    </div>
  );
}