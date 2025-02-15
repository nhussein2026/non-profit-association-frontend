import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // For redirection
import { toast } from "react-toastify"; // For notifications
import "react-toastify/dist/ReactToastify.css"; // Import styles

const Login = () => {
  const [email, setEmail] = useState("");
  const [sifre, setSifre] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/auth/giris", {
        email,
        sifre,
      });

      // Show success toast message
      toast.success("Giriş başarılı! Yönlendiriliyorsunuz...", {
        position: "top-right",
        autoClose: 2000,
      });

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Giriş başarısız!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        onSubmit={handleLogin}
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Giriş Yap
        </h2>

        {/* Email Input */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Şifre
          </label>
          <input
            type="password"
            value={sifre}
            onChange={(e) => setSifre(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Giriş Yap
        </button>
        {/* Register Link */}
        <p className="text-center text-gray-600 mt-2">
          Hesabınız yok mu?{" "}
          <Link
            to="/register"
            className="text-blue-500 hover:text-blue-700 font-semibold"
          >
            Kayıt Ol
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
