import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUsers, 
  faUserShield, 
  faFileAlt, 
  faBoxOpen, 
  faChartPie,
  faCube
} from '@fortawesome/free-solid-svg-icons';

Chart.register(...registerables);

const Home = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAdmins: 0,
    totalApplications: 0,
    pendingApplications: 0,
    totalProducts: 0,
    productCategories: [],
    applicationStatus: {}
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, appsRes, productsRes] = await Promise.all([
          axios.get('http://localhost:5000/users/stats'),
          axios.get('http://localhost:5000/applications/stats'),
          axios.get('http://localhost:5000/products/stats')
        ]);

        setStats({
          totalUsers: usersRes.data.totalUsers,
          totalAdmins: usersRes.data.totalAdmins,
          totalApplications: appsRes.data.totalApplications,
          pendingApplications: appsRes.data.pendingApplications,
          applicationStatus: appsRes.data.statusDistribution,
          totalProducts: productsRes.data.totalProducts,
          productCategories: productsRes.data.categoryDistribution
        });
      } catch (error) {
        console.error('İstatistikler alınırken hata:', error);
      }
    };

    fetchStats();
  }, []);

  // Grafik veri konfigürasyonları
  const statusChartData = {
    labels: ['Onaylandı', 'Beklemede', 'Reddedildi'],
    datasets: [{
      data: [
        stats.applicationStatus.approved || 0,
        stats.applicationStatus.pending || 0,
        stats.applicationStatus.rejected || 0
      ],
      backgroundColor: ['#10B981', '#3B82F6', '#EF4444']
    }]
  };

  const productChartData = {
    labels: stats.productCategories.map(c => c.category),
    datasets: [{
      label: 'Talep Edilen Miktar',
      data: stats.productCategories.map(c => c.total),
      backgroundColor: '#3B82F6'
    }]
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Hayır Kurumu Panosu</h1>
      
      {/* İstatistik Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          icon={faUsers}
          title="Toplam Kullanıcı"
          value={stats.totalUsers}
          color="bg-blue-100"
          textColor="text-blue-600"
        />
        <StatCard
          icon={faUserShield}
          title="Yönetici Sayısı"
          value={stats.totalAdmins}
          color="bg-green-100"
          textColor="text-green-600"
        />
        <StatCard
          icon={faFileAlt}
          title="Bekleyen Başvuru"
          value={stats.pendingApplications}
          color="bg-yellow-100"
          textColor="text-yellow-600"
        />
        <StatCard
          icon={faBoxOpen}
          title="Toplam Ürün"
          value={stats.totalProducts}
          color="bg-purple-100"
          textColor="text-purple-600"
        />
      </div>

      {/* Grafikler Bölümü */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <FontAwesomeIcon icon={faChartPie} className="mr-2 text-blue-500" />
            Başvuru Durum Dağılımı
          </h3>
          <div className="h-64">
            <Doughnut data={statusChartData} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <FontAwesomeIcon icon={faCube} className="mr-2 text-green-500" />
            Kategoriye Göre Ürün Talepleri
          </h3>
          <div className="h-64">
            <Bar 
              data={productChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Son Etkinlikler */}
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        {/* <h3 className="text-lg font-semibold mb-4">Son Ürün Talepleri</h3> */}
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, color, textColor }) => (
  <div className={`${color} p-6 rounded-lg flex items-center justify-between`}>
    <div>
      <p className="text-sm text-gray-600">{title}</p>
      <p className={`text-3xl font-bold ${textColor}`}>{value}</p>
    </div>
    <FontAwesomeIcon icon={icon} className={`text-4xl opacity-50 ${textColor}`} />
  </div>
);

export default Home;