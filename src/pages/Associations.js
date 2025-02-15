import React from "react";

const AssociationPage = () => {
  // Sample data for demonstration
  const associationInfo = {
    name: "Green Earth Association",
    phone: "+1 (123) 456-7890",
    email: "info@greenearth.org",
    address: "123 Green Street, Eco City, Earth",
  };

  const distributionLog = [
    {
      id: 1,
      date: "2023-10-01",
      item: "Food Supplies",
      quantity: "50 Kgs",
      recipient: "Local Shelter A",
    },
    {
      id: 2,
      date: "2023-10-05",
      item: "Clothing",
      quantity: "100 Pieces",
      recipient: "Refugee Camp B",
    },
    {
      id: 3,
      date: "2023-10-10",
      item: "Medical Kits",
      quantity: "20 Units",
      recipient: "Community Clinic C",
    },
    {
      id: 4,
      date: "2023-10-15",
      item: "School Supplies",
      quantity: "200 Sets",
      recipient: "Rural School D",
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Association Information Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          {associationInfo.name}
        </h1>
        <div className="space-y-2 text-gray-700">
          <p>
            <span className="font-semibold">Phone:</span>{" "}
            {associationInfo.phone}
          </p>
          <p>
            <span className="font-semibold">Email:</span>{" "}
            {associationInfo.email}
          </p>
          <p>
            <span className="font-semibold">Address:</span>{" "}
            {associationInfo.address}
          </p>
        </div>
      </div>

      {/* Distribution Log Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Distribution Log
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recipient
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {distributionLog.map((log) => (
                <tr key={log.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.item}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.recipient}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AssociationPage;
