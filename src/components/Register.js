import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
import { toast } from "react-toastify"; // For toast notifications
import "react-toastify/dist/ReactToastify.css"; // Required CSS for toast notifications

const Kayit = () => {
  const [kullaniciAdi, setKullaniciAdi] = useState("");
  const [email, setEmail] = useState("");
  const [sifre, setSifre] = useState("");
  const [sifreTekrar, setSifreTekrar] = useState("");
  const [mesaj, setMesaj] = useState("");

  const navigate = useNavigate(); // Use useNavigate for redirection

  const handleKayit = async (e) => {
    e.preventDefault();

    if (sifre !== sifreTekrar) {
      setMesaj("Şifreler eşleşmiyor!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/auth/kayit", {
        kullanici_adi: kullaniciAdi,
        email,
        sifre,
        ad_soyad: kullaniciAdi, // You can change this to another field if needed
      });

      setMesaj(response.data.message);

      // Show success toast and redirect after 2 seconds
      toast.success("Kayıt başarılı! Yönlendiriliyorsunuz...");
      setTimeout(() => {
        navigate("/login"); // Redirect to login page
      }, 2000);
    } catch (error) {
      setMesaj(error.response?.data?.message || "Bir hata oluştu.");
      toast.error("Kayıt sırasında bir hata oluştu!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        onSubmit={handleKayit}
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Kayıt Ol
        </h2>

        {mesaj && <p className="text-red-500 text-center">{mesaj}</p>}

        {/* Kullanıcı Adı */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Kullanıcı Adı
          </label>
          <input
            type="text"
            value={kullaniciAdi}
            onChange={(e) => setKullaniciAdi(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Kullanıcı adınızı girin"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            E-posta
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="E-posta adresinizi girin"
            required
          />
        </div>

        {/* Şifre */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Şifre
          </label>
          <input
            type="password"
            value={sifre}
            onChange={(e) => setSifre(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Şifrenizi girin"
            required
          />
        </div>

        {/* Şifre Tekrar */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Şifre Tekrar
          </label>
          <input
            type="password"
            value={sifreTekrar}
            onChange={(e) => setSifreTekrar(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Şifreyi tekrar girin"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          Kayıt Ol
        </button>
        {/* login Link */}
        <p className="text-center text-gray-600 mt-2">
          Hesabınız var mı?{" "}
          <Link
            to="/login"
            className="text-blue-500 hover:text-blue-700 font-semibold"
          >
            Giriş Yap
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Kayit;
