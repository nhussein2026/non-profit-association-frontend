import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Talepler = () => {
    const { id } = useParams(); // Get the ID from the URL
    const [formData, setFormData] = useState({
        basvuran_id: id || '',
        kategori: '',
        aciklama: '',
        miktar: ''
    });
    const [mesaj, setMesaj] = useState('');

    const kategoriler = [
        'Giyim', 
        'Gıda', 
        'Elektronik', 
        'Mobilya', 
        'Ev Aletleri', 
        'Kırtasiye', 
        'Sağlık', 
        'Hijyen Ürünleri'
    ];

    useEffect(() => {
        if (id) {
            setFormData((prevData) => ({ ...prevData, basvuran_id: id }));
        }
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/talepler/add', formData);
            setMesaj(response.data.message);
            setFormData({
                basvuran_id: id,
                kategori: '',
                aciklama: '',
                miktar: ''
            });
        } catch (error) {
            console.error(error);
            setMesaj('Bir hata oluştu. Lütfen tekrar deneyin.');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Yeni Ürün Talebi</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Kategori</label>
                    <select 
                        name="kategori" 
                        value={formData.kategori} 
                        onChange={handleChange} 
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    >
                        <option value="">Kategori Seçin</option>
                        {kategoriler.map((kategori, index) => (
                            <option key={index} value={kategori}>{kategori}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700">Açıklama</label>
                    <textarea 
                        name="aciklama" 
                        value={formData.aciklama} 
                        onChange={handleChange} 
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required 
                    ></textarea>
                </div>
                <div>
                    <label className="block text-gray-700">Miktar</label>
                    <input 
                        type="number" 
                        name="miktar" 
                        value={formData.miktar} 
                        onChange={handleChange} 
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required 
                    />
                </div>
                <button 
                    type="submit" 
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
                >
                    Talebi Gönder
                </button>
            </form>
            {mesaj && (
                <div className="mt-4 p-2 text-center text-white bg-green-500 rounded-md">
                    {mesaj}
                </div>
            )}
        </div>
    );
};

export default Talepler;
