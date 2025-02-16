import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MevcutKaynaklarPage = () => {
  const [mevcutKaynaklar, setMevcutKaynaklar] = useState([]);
  const [hayirKurumlari, setHayirKurumlari] = useState([]); // State to store Hayır Kurumları
  const [isFormOpen, setIsFormOpen] = useState(false);  // Toggle form visibility
  const [newItem, setNewItem] = useState({
    hayir_kurumu_id: '',
    kategori: '',
    aciklama: '',
    miktar: '',
    durum: '',
  });
  const [error, setError] = useState(null);

  // Fetch existing resources and Hayır Kurumları
  useEffect(() => {
    // Fetch Mevcut Kaynaklar
    axios
      .get('http://localhost:5000/mevcut-kaynaklar')
      .then((response) => {
        setMevcutKaynaklar(response.data);
      })
      .catch((err) => {
        setError('Veri alınırken bir hata oluştu');
      });

    // Fetch Hayır Kurumları
    axios
      .get('http://localhost:5000/hayir-kurumlari')
      .then((response) => {
        setHayirKurumlari(response.data);
      })
      .catch((err) => {
        setError('Hayır Kurumları alınırken bir hata oluştu');
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/mevcut-kaynaklar', newItem)
      .then((response) => {
        setMevcutKaynaklar([...mevcutKaynaklar, response.data]);
        setNewItem({
          hayir_kurumu_id: '',
          kategori: '',
          aciklama: '',
          miktar: '',
          durum: '',
        });
        setIsFormOpen(false); // Close the form on submit
      })
      .catch((err) => {
        setError('Yeni öğe eklenirken bir hata oluştu');
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Mevcut Kaynaklar</h1>

      {/* Displaying Error Message */}
      {error && <div className="bg-red-500 text-white p-2 mb-4">{error}</div>}

      {/* Add Button */}
      <button
        onClick={() => setIsFormOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Yeni Kaynak Ekle
      </button>

      {/* Add Form */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Yeni Kaynak Ekle</h2>
            <form onSubmit={handleSubmit}>
              {/* Hayır Kurumu Dropdown */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Hayır Kurumu</label>
                <select
                  name="hayir_kurumu_id"
                  value={newItem.hayir_kurumu_id}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Hayır Kurumu Seçin</option>
                  {hayirKurumlari.map((kurum) => (
                    <option key={kurum.id} value={kurum.id}>
                      {kurum.ad}
                    </option>
                  ))}
                </select>
              </div>

              {/* Kategori */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Kategori</label>
                <input
                  type="text"
                  name="kategori"
                  value={newItem.kategori}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              {/* Açıklama */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Açıklama</label>
                <input
                  type="text"
                  name="aciklama"
                  value={newItem.aciklama}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              {/* Miktar */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Miktar</label>
                <input
                  type="number"
                  name="miktar"
                  value={newItem.miktar}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              {/* Durum */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Durum</label>
                <input
                  type="text"
                  name="durum"
                  value={newItem.durum}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              {/* Buttons */}
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

      {/* Displaying List of Items */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Mevcut Kaynaklar</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Kategori</th>
              <th className="p-2 border">Açıklama</th>
              <th className="p-2 border">Miktar</th>
              <th className="p-2 border">Durum</th>
            </tr>
          </thead>
          <tbody>
            {mevcutKaynaklar.map((item) => (
              <tr key={item.id} className="border">
                <td className="p-2 border">{item.kategori}</td>
                <td className="p-2 border">{item.aciklama}</td>
                <td className="p-2 border">{item.miktar}</td>
                <td className="p-2 border">{item.durum}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MevcutKaynaklarPage;
