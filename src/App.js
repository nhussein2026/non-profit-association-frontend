import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Application from "./components/Application";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import AssociationPage from "./pages/HayirKurumlari";
import { ToastContainer } from "react-toastify";
import Talepler from "./pages/Talepler";
import Kaynaklar from "./pages/Kaynaklar";
import TaleplerTablosu from "./pages/TaleplerTablosu";
import HayirKurumlari from "./pages/HayirKurumlari";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Router>
        <Navbar />
        <ToastContainer />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/application" element={<Application />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/kaynaklar" element={<Kaynaklar />} />
            <Route path="/association" element={<HayirKurumlari />} />
            <Route path="/talepler/:id" element={<Talepler />} />
            <Route path="/talepler-tablosu" element={<TaleplerTablosu />} />
        </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
