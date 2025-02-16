import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios

const HayirKurumlari = () => {
  const [data, setData] = useState([]); // State to store existing data
  const [isFormOpen, setIsFormOpen] = useState(false); // State to toggle form visibility
  const [formData, setFormData] = useState({
    ad: "",
    yetkili_kisi: "",
    telefon: "",
    email: "",
    adres: "",
  });

  // Fetch existing data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/hayir-kurumlari"); // Use Axios for GET request
      setData(response.data);
    } catch (error) {
      console.error("Veri alırken hata oluştu:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/hayir-kurumlari", formData); // Use Axios for POST request
      alert(response.data.message); // Show success message
      setIsFormOpen(false); // Close the form
      setFormData({ ad: "", yetkili_kisi: "", telefon: "", email: "", adres: "" }); // Reset form
      fetchData(); // Refresh the data
    } catch (error) {
      console.error("Veri eklerken hata oluştu:", error);
      alert("Veri eklenemedi");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Hayır Kurumları</h1>

      {/* Add Button */}
      <button
        onClick={() => setIsFormOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Yeni Hayır Kurumu Ekle
      </button>

      {/* Add Form */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Yeni Hayır Kurumu Ekle</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Ad</label>
                <input
                  type="text"
                  name="ad"
                  value={formData.ad}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Yetkili Kişi</label>
                <input
                  type="text"
                  name="yetkili_kisi"
                  value={formData.yetkili_kisi}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Telefon</label>
                <input
                  type="text"
                  name="telefon"
                  value={formData.telefon}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Adres</label>
                <input
                  type="text"
                  name="adres"
                  value={formData.adres}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                >
                  Kapat
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Gönder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Display Existing Data */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Mevcut Hayır Kurumları</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Ad</th>
              <th className="p-2 border">Yetkili Kişi</th>
              <th className="p-2 border">Telefon</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Adres</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border">
                <td className="p-2 border">{item.ad}</td>
                <td className="p-2 border">{item.yetkili_kisi}</td>
                <td className="p-2 border">{item.telefon}</td>
                <td className="p-2 border">{item.email}</td>
                <td className="p-2 border">{item.adres}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HayirKurumlari;
