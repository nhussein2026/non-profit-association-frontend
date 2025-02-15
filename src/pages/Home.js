import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  // Sample data for demonstration
  const associationInfo = {
    name: "Green Earth Association",
    totalDistributions: 120,
    totalRequests: 45,
  };

  const recentRequests = [
    {
      id: 1,
      category: "Travel",
      description: "Business trip to New York",
      status: "Approved",
    },
    {
      id: 2,
      category: "Equipment",
      description: "Purchase new laptop",
      status: "Pending",
    },
  ];

  const recentDistributions = [
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
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white py-20 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to {associationInfo.name}
        </h1>
        <p className="text-lg mb-6">
          Join us in making a difference. Together, we can create a better
          future.
        </p>
        <Link
          to="/application"
          className="bg-white text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-all"
        >
          Submit a Request
        </Link>
      </div>

      {/* Quick Stats Section */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            {associationInfo.totalDistributions}
          </h2>
          <p className="text-gray-600">Total Distributions</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            {associationInfo.totalRequests}
          </h2>
          <p className="text-gray-600">Total Requests</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">100+</h2>
          <p className="text-gray-600">Active Members</p>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Recent Activity
        </h2>

        {/* Recent Requests */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Requests
          </h3>
          <div className="space-y-4">
            {recentRequests.map((request) => (
              <div key={request.id} className="border-b border-gray-200 pb-4">
                <p className="text-gray-700">
                  <span className="font-semibold">{request.category}:</span>{" "}
                  {request.description}
                </p>
                <p className="text-sm text-gray-600">
                  Status: {request.status}
                </p>
              </div>
            ))}
          </div>
          <Link
            to="/application"
            className="text-blue-500 hover:text-blue-700 mt-4 inline-block"
          >
            View All Requests →
          </Link>
        </div>

        {/* Recent Distributions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Distributions
          </h3>
          <div className="space-y-4">
            {recentDistributions.map((distribution) => (
              <div
                key={distribution.id}
                className="border-b border-gray-200 pb-4"
              >
                <p className="text-gray-700">
                  <span className="font-semibold">{distribution.item}:</span>{" "}
                  {distribution.quantity} to {distribution.recipient}
                </p>
                <p className="text-sm text-gray-600">
                  Date: {distribution.date}
                </p>
              </div>
            ))}
          </div>
          <Link
            to="/distribution-log"
            className="text-blue-500 hover:text-blue-700 mt-4 inline-block"
          >
            View Full Distribution Log →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
