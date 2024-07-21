import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import FaqPage from "./pages/FaqPage";
import SyaratPage from "./pages/SyaratPage";
import TestimonialPage from "./pages/TestimonialPage";
import StudiosPage from "./pages/StudiosPage";
import DetailProduct from "./pages/DetailProduct";
import PemilihanDaftar from "./pages/PemilihanDaftar";
import DasboardAdmin from "./pages/adminpage/DasboardAdmin";
import RiwayatSewaStudio from "./pages/RiwayatSewaStudio";
import DetailTicket from "./components/DetailTicket";
import AddStudios from "./components/AddStudios";
import EditStudios from "./components/EditStudios";
import PemilihanLogin from "./pages/PemilihanLogin";
import RegisterOwnerPage from "./pages/RegisterOwner";
import LoginPageOwner from "./pages/LoginOwner";
import RootLayout from "./RootLayout";
import EditProfile from "./pages/EditProfile";
// Import Admin dan Owner
import DashboardLayout from "./layouts/DashboardLayout";
import KelolaStudio from "./pages/adminpage/KelolaStudio";
import KelolaUser from "./pages/adminpage/KelolaUser";
import Reservasi from "./pages/adminpage/Reservasi";
import AddUsers from "./components/AddUsers";
import EditUserModal from "./components/EditUsers";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="fotografer" element={<StudiosPage />} />
          <Route path="riwayatpemesanan" element={<RiwayatSewaStudio />} />
          <Route path="detail-ticket/:id" element={<DetailTicket />} />
          <Route path="syaratketen" element={<SyaratPage />} />
          <Route path="testimonial" element={<TestimonialPage />} />
          <Route path="product/:id" element={<DetailProduct />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="editprofile" element={<EditProfile />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/loginowner" element={<LoginPageOwner />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/loginfor" element={<PemilihanLogin />} />
        <Route path="/registerowner" element={<RegisterOwnerPage />} />
        <Route path="/regisfor" element={<PemilihanDaftar />} />
        {/* Halaman Owner dan Admin */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<div>Dashboard</div>} />
          <Route path="kelola" element={<KelolaStudio />} />
          <Route path="kelolauser" element={<KelolaUser />} />
          <Route path="reservasi" element={<Reservasi />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
