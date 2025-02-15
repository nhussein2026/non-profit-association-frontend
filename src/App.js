import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Application from "./components/Application";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import RequestApplications from "./pages/RequestApplications";
import AssociationPage from "./pages/Associations";
import { ToastContainer } from "react-toastify";

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
            <Route path="/requests" element={<RequestApplications />} />
            <Route path="/association" element={<AssociationPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
