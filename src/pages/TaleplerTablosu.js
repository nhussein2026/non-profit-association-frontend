import React, { useState, useEffect } from 'react';

const TaleplerTablosu = () => {
  const [talepler, setTalepler] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [hata, setHata] = useState(null);

  useEffect(() => {
    const verileriGetir = async () => {
      try {
        const response = await fetch('http://localhost:5000/talepler-tablosu');
        if (!response.ok) throw new Error('Veri alınamadı');
        const data = await response.json();
        setTalepler(data);
      } catch (error) {
        setHata(error.message);
      } finally {
        setYukleniyor(false);
      }
    };

    verileriGetir();
  }, []);

  if (yukleniyor) {
    return (
      <div className="flex justify-center items-center h-64">
        <svg
          className="animate-spin h-10 w-10 text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
      </div>
    );
  }

  if (hata) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded m-4"
        role="alert"
      >
        {hata}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full divide-y divide-gray-200 shadow rounded-lg">
        <thead className="bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Başvuran
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              TC Kimlik No
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Kategori
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Açıklama
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Miktar
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Durum
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              İletişim
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Adres
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {talepler.map((talep) => (
            <tr key={talep.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                {talep.name} {talep.surname}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{talep.national_id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{talep.kategori}</td>
              <td className="px-6 py-4 whitespace-nowrap">{talep.aciklama}</td>
              <td className="px-6 py-4 whitespace-nowrap">{talep.miktar}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium 
                    ${
                      talep.durum === 'Talep Edildi'
                        ? 'bg-yellow-100 text-yellow-800'
                        : talep.durum === 'Mevcut'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                >
                  {talep.durum}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{talep.phone}</td>
              <td className="px-6 py-4 whitespace-nowrap">{talep.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaleplerTablosu;
