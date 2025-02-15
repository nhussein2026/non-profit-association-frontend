import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For redirection
import { toast } from "react-toastify"; // For toast notifications
import "react-toastify/dist/ReactToastify.css"; // Toast styles

const Application = () => {
  const [formData, setFormData] = useState({
    ad: "",
    soyad: "",
    kimlik_no: "",
    telefon: "",
    adres: "",
  });

  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/applications/basvuru-ekle",
        formData
      );
 // Get the newly generated application ID
//  const newId = response.data.id;
       // Successfully received the ID from the response
       const { message, id } = response.data;
  // Show success toast
      toast.success(
        "Başvurunuz başarıyla gönderildi! Yönlendiriliyorsunuz...",
        {
          position: "top-right",
          autoClose: 2000, // Close after 2 seconds
        }
      );

       // Redirect to Talepler page with newId as a URL parameter
       setTimeout(() => {
        navigate(`/talepler/${id}`);
      }, 2000);
    } catch (error) {
      // Show error toast
      toast.error(error.response?.data?.message || "Başvuru başarısız!", {
        position: "top-right",
        autoClose: 3000, // Close after 3 seconds
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Başvuru Formu</h2>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="ad"
          >
            Ad
          </label>
          <input
            type="text"
            id="ad"
            className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            placeholder="Adınızı giriniz"
            value={formData.ad}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="soyad"
          >
            Soyad
          </label>
          <input
            type="text"
            id="soyad"
            className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            placeholder="Soyadınızı giriniz"
            value={formData.soyad}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="kimlik_no"
          >
            Kimlik Numarası
          </label>
          <input
            type="text"
            id="kimlik_no"
            className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            placeholder="Kimlik numaranızı giriniz"
            value={formData.kimlik_no}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="telefon"
          >
            Telefon
          </label>
          <input
            type="text"
            id="telefon"
            className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            placeholder="Telefon numaranızı giriniz"
            value={formData.telefon}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="adres"
          >
            Adres
          </label>
          <textarea
            id="adres"
            className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            placeholder="Adresinizi giriniz"
            value={formData.adres}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Başvuruyu Gönder
        </button>
      </form>
    </div>
  );
};

export default Application;
