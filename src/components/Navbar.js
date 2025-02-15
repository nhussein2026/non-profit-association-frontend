import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  // Kullanıcının giriş yapıp yapmadığını takip etmek için state
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Auth mantığınıza göre bunu değiştirin

  return (
    <nav className="bg-white shadow-md">
      <ul className="flex justify-center space-x-4 p-4">
        <li>
          <Link to="/" className="text-blue-500 hover:text-blue-700">
            Ana Sayfa
          </Link>
        </li>
        <li>
          <Link to="/association" className="text-blue-500 hover:text-blue-700">
            Dernek
          </Link>
        </li>
        <li>
          <Link to="/application" className="text-blue-500 hover:text-blue-700">
            Başvuru
          </Link>
        </li>
        <li>
          <Link to="/requests" className="text-blue-500 hover:text-blue-700">
            Talepler
          </Link>
        </li>
        {/* Giriş yapıldıysa Profil, yapılmadıysa Giriş Yap göster */}
        {isLoggedIn ? (
          <li>
            <Link to="/profile" className="text-blue-500 hover:text-blue-700">
              Profil
            </Link>
          </li>
        ) : (
          <li>
            <Link to="/login" className="text-blue-500 hover:text-blue-700">
              Giriş Yap
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
