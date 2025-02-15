import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  // State to track if the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Change this based on your auth logic

  return (
    <nav className="bg-white shadow-md">
      <ul className="flex justify-center space-x-4 p-4">
        <li>
          <Link to="/" className="text-blue-500 hover:text-blue-700">
            Home
          </Link>
        </li>
        <li>
          <Link to="/association" className="text-blue-500 hover:text-blue-700">
            Association
          </Link>
        </li>
        <li>
          <Link to="/application" className="text-blue-500 hover:text-blue-700">
            Application
          </Link>
        </li>
        <li>
          <Link to="/requests" className="text-blue-500 hover:text-blue-700">
            Requests
          </Link>
        </li>
        {/* Conditionally render Login or Profile */}
        {isLoggedIn ? (
          <li>
            <Link to="/profile" className="text-blue-500 hover:text-blue-700">
              Profile
            </Link>
          </li>
        ) : (
          <li>
            <Link to="/login" className="text-blue-500 hover:text-blue-700">
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
